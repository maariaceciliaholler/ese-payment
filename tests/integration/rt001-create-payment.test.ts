import request from "supertest";
import app from "../../src/app";
import jwt from "jsonwebtoken";

describe("RT001 - Integração - Criar Pagamento", () => {
  it("deve criar um pagamento com token válido", async () => {
    const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

    // Gere o token manualmente com o payload esperado
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
