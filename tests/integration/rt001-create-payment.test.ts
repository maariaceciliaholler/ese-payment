import request from "supertest";
import app from "../../src/app";
import { getAuthToken } from "../getToken";

describe("RT001 - Integração - Criar Pagamento", () => {
  it("deve criar um pagamento com token válido", async () => {
    const token = await getAuthToken();

    const response = await request(app)
      .post("/api/payment/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentType: "PIX",
        deliveryProcessId: 123,
        quotationEmail: "cliente@email.com",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
