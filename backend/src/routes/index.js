import { Router } from "express";
import {
  getMunicipios, getCriterios, executarTOPSIS, getSimulacoes, getRelatorio
} from "../controllers/topsis.controller.js";
import { criarMunicipio } from "../controllers/municipio.controller.js";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.get("/municipios", getMunicipios);
router.post("/municipios", criarMunicipio);
router.get("/criterios", getCriterios);
router.post("/topsis/execute", executarTOPSIS);
router.get("/simulacoes", getSimulacoes);
router.get("/relatorios/latest.csv", getRelatorio);
router.post("/auth/register", register);
router.post("/auth/login", login);

export default router;
