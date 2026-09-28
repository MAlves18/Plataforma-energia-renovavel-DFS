import { pool } from "../config/database.js";
import { topsis } from "../services/topsis.service.js";

export async function getMunicipios(req, res, next) {
  try { const { rows } = await pool.query("SELECT id,nome,uf,latitude,longitude FROM municipios ORDER BY nome"); res.json(rows); } catch (e) { next(e); }
}
export async function getCriterios(req, res, next) {
  try { const { rows } = await pool.query("SELECT id,codigo,nome,tipo,fonte,peso::float AS peso FROM criterios ORDER BY codigo"); res.json(rows); } catch (e) { next(e); }
}
export async function executarTOPSIS(req, res, next) {
  const client = await pool.connect();
  try {
    const { rows: criterios } = await client.query("SELECT id,codigo,tipo,peso::float AS peso FROM criterios ORDER BY codigo");
    const { rows: municipios } = await client.query("SELECT id,nome FROM municipios ORDER BY id");
    const weights = req.body.weights?.map(Number) ?? criterios.map(c => c.peso);
    if (weights.length !== criterios.length || weights.some(w => !Number.isFinite(w) || w < 0)) return res.status(400).json({message:"Pesos inválidos."});
    const total = weights.reduce((a,b)=>a+b,0); if (total <= 0) return res.status(400).json({message:"A soma dos pesos deve ser maior que zero."});
    const normalizedWeights = weights.map(w => w / total);
    const { rows: vals } = await client.query("SELECT municipio_id,criterio_id,valor::float AS valor FROM matriz_decisao");
    const map = new Map(vals.map(v => [`${v.municipio_id}:${v.criterio_id}`, v.valor]));
    const matrix = municipios.map(m => criterios.map(c => map.get(`${m.id}:${c.id}`) ?? 0));
    const result = topsis(matrix, normalizedWeights, criterios.map(c=>c.tipo));
    const ranking = result.map(r => ({...r, municipioId: municipios[r.index].id, municipio: municipios[r.index].nome, ci:Number(r.ci.toFixed(6)), dPlus:Number(r.dPlus.toFixed(6)), dMinus:Number(r.dMinus.toFixed(6))}));
    await client.query("BEGIN");
    const sim = await client.query("INSERT INTO simulacoes(pesos,parametros) VALUES($1,$2) RETURNING id,executada_em", [JSON.stringify(normalizedWeights), JSON.stringify({fonte:"dados demonstrativos"})]);
    for (const r of ranking) await client.query("INSERT INTO resultados_ranking(simulacao_id,municipio_id,distancia_positiva,distancia_negativa,coeficiente_proximidade,posicao) VALUES($1,$2,$3,$4,$5,$6)",[sim.rows[0].id,r.municipioId,r.dPlus,r.dMinus,r.ci,r.rank]);
    await client.query("COMMIT");
    res.json({ simulationId: sim.rows[0].id, ranking, weights: normalizedWeights });
  } catch(e) { await client.query("ROLLBACK").catch(()=>{}); next(e); } finally { client.release(); }
}
export async function getSimulacoes(req,res,next){
  try { const {rows}=await pool.query(`SELECT s.id,s.executada_em AS data,s.pesos,COALESCE(json_agg(json_build_object('rank',r.posicao,'municipio',m.nome,'ci',r.coeficiente_proximidade::float) ORDER BY r.posicao) FILTER (WHERE r.id IS NOT NULL),'[]') AS ranking FROM simulacoes s LEFT JOIN resultados_ranking r ON r.simulacao_id=s.id LEFT JOIN municipios m ON m.id=r.municipio_id GROUP BY s.id ORDER BY s.id DESC`); res.json(rows); } catch(e){next(e)}
}
export async function getRelatorio(req,res,next){
 try { const {rows}=await pool.query(`SELECT r.posicao AS rank,m.nome AS municipio,r.coeficiente_proximidade::float AS ci FROM resultados_ranking r JOIN municipios m ON m.id=r.municipio_id WHERE r.simulacao_id=(SELECT MAX(id) FROM simulacoes) ORDER BY r.posicao`); if(!rows.length)return res.status(404).json({message:"Nenhuma simulação executada."}); const esc=s=>`"${String(s).replaceAll('"','""')}"`; res.type("text/csv").send(["ranking,municipio,ci",...rows.map(r=>`${r.rank},${esc(r.municipio)},${r.ci}`)].join("\n")); } catch(e){next(e)}
}
