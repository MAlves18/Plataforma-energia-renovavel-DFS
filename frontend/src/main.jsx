import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getCriterios, getMunicipios, executarTOPSIS } from "./services/api";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TopsisPage from "./pages/TopsisPage";
import MunicipiosPage from "./pages/MunicipiosPage";
import CriteriaPage from "./pages/CriteriaPage";
import MapPage from "./pages/MapPage";
import HistoryPage from "./pages/HistoryPage";
import "./style.css";

function App() {
  const [page, setPage] = useState("dashboard");
  const [criterios, setCriterios] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [weights, setWeights] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    Promise.all([getCriterios(), getMunicipios()]).then(([c, m]) => {
      setCriterios(c);
      setMunicipios(m);
      setWeights(c.map(x => Number(x.peso)));
    });
  }, []);

  const execute = async () => {
    const response = await executarTOPSIS(weights);
    setRanking(response.ranking || []);
    setPage("topsis");
  };

  const content = {
    dashboard: <Dashboard ranking={ranking} criterios={criterios} municipios={municipios} />,
    topsis: <TopsisPage criterios={criterios} weights={weights} setWeights={setWeights} ranking={ranking} execute={execute} />,
    municipios: <MunicipiosPage municipios={municipios} />,
    criterios: <CriteriaPage criterios={criterios} />,
    mapa: <MapPage municipios={municipios} ranking={ranking} />,
    historico: <HistoryPage />
  }[page];

  return <div className="layout"><Sidebar page={page} setPage={setPage} /><main>{content}</main></div>;
}

createRoot(document.getElementById("root")).render(<App />);
