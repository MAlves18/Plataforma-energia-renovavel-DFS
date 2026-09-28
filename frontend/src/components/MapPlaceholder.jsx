import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export default function MapPlaceholder({ municipios=[], ranking=[] }) {
 const scores=new Map(ranking.map(r=>[r.municipio,Number(r.ci)]));
 return <div className="card"><div className="section-head"><div><h2>Mapa georreferenciado</h2><p className="muted">Municípios analisados e coeficiente TOPSIS da última simulação.</p></div></div>
 <MapContainer center={[-12.5,-41.5]} zoom={6} scrollWheelZoom style={{height:440,borderRadius:12}}>
  <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {municipios.filter(m=>m.latitude&&m.longitude).map(m=>{const ci=scores.get(m.nome);return <CircleMarker key={m.id} center={[m.latitude,m.longitude]} radius={ci?8+ci*10:8} pathOptions={{fillOpacity:.75}}><Popup><strong>{m.nome}/{m.uf}</strong><br/>{ci!==undefined?`Ci: ${ci.toFixed(4)}`:"Execute o TOPSIS para visualizar o Ci."}</Popup></CircleMarker>})}
 </MapContainer><p className="muted note">Mapa base: OpenStreetMap. Indicadores desta versão são demonstrativos.</p></div>
}
