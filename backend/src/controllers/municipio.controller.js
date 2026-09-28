import { pool } from "../config/database.js";
export async function criarMunicipio(req,res,next){
 try { const {nome,uf,latitude,longitude}=req.body; if(!nome||!uf)return res.status(400).json({message:"nome e uf são obrigatórios."}); const {rows}=await pool.query(`INSERT INTO municipios(nome,uf,latitude,longitude,geom) VALUES($1,$2,$3,$4,CASE WHEN $3::float IS NULL OR $4::float IS NULL THEN NULL ELSE ST_SetSRID(ST_MakePoint($4,$3),4326) END) RETURNING id,nome,uf,latitude,longitude`,[nome,uf.toUpperCase(),latitude||null,longitude||null]); res.status(201).json(rows[0]); } catch(e){next(e)}
}
