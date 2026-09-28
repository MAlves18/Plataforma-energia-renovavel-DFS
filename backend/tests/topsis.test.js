import request from "supertest";
import app from "../src/server.js";
import { normalize, topsis } from "../src/services/topsis.service.js";

describe("TOPSIS", () => {
  test("normaliza uma coluna pelo método vetorial", () => {
    expect(normalize([[3], [4]])[0][0]).toBeCloseTo(0.6);
    expect(normalize([[3], [4]])[1][0]).toBeCloseTo(0.8);
  });

  test("coeficiente de proximidade fica entre 0 e 1", () => {
    const result = topsis([[1, 10], [2, 8], [3, 6]], [0.5, 0.5], ["beneficio", "custo"]);
    result.forEach(r => expect(r.ci).toBeGreaterThanOrEqual(0));
    result.forEach(r => expect(r.ci).toBeLessThanOrEqual(1));
  });

  test("API responde ao health check", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });
});
