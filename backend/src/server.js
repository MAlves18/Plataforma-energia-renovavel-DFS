import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import router from "./routes/index.js";
import fs from "fs";
import path from "path";
import { pool } from "./config/database.js";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    name: "API Plataforma de Vulnerabilidade Social Energética",
    version: "1.1.0",
    status: "online",
    health: "/health",
    documentation: "/docs/"
  });
});

app.get("/health", async (req, res) => { try { await pool.query("SELECT 1"); res.json({ status: "ok", database: "ok" }); } catch { res.status(503).json({ status: "degraded", database: "unavailable" }); } });
app.use("/api", router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openapiPath = path.join(__dirname, "../../docs/api/openapi.yaml");
const openapi = fs.readFileSync(openapiPath, "utf8");

// OpenAPI deve ser registrado antes do Swagger UI
app.get("/openapi.yaml", (req, res) => {
  res.type("application/yaml");
  res.send(openapi);
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "/openapi.yaml"
    }
  })
);

app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: "Erro interno do servidor." }); });

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`API executando na porta ${port}`));
}

export default app;
