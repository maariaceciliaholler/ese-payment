import request from "supertest";
import app from "../../src/app";
import { setupDB, closeDB } from "../test-utils";
import { getValidToken } from "../main.test-auth";

jest.unmock("../../src/middleware/auth.middleware.ts");

describe("RT001 - Integração - Criar Pagamento", () => {
  let token: string;

  beforeAll(async () => {
    await setupDB();
    token = await getValidToken();
  });

  afterAll(closeDB);

  it("deve criar um pagamento com token válido", async () => {
    const payload = {
      paymentType: "PIX",
      deliveryProcessId: 1,
      quotationEmail: "mariaceciliaholler@gmail.com"
    };

    const response = await request(app)
      .post("/api/payment/create")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
      
    if (response.status !== 201) {
      console.error("Erro na criação do pagamento:", response.body);
    }

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.paymentType).toBe(payload.paymentType);
  });
});
