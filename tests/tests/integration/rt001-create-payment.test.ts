import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
import { setupDB, closeDB } from "../test-utils";

describe("RT001 - Integração - Criar Pagamento", () => {
  beforeAll(setupDB);
  afterAll(closeDB);

  it("deve criar um pagamento com token válido", async () => {
    const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

    const token = jwt.sign(
      {
        id: 1,
        email: "maria@email.com",
        role: "ADMIN"
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

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
    expect(response.body.paymentType).toBe("PIX");
  });
});
