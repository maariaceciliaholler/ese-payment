import request from "supertest";
import app from "../../src/app";
import { setupDB, closeDB } from "../test-utils";
import Payment from "../../src/models/payment/Payment";

jest.mock("../../src/middleware/auth.middleware", () => ({
  authMiddleware: (_req: any, _res: any, next: any) => next(),
}));

describe("RT002 - Integração - Buscar pagamento por ID", () => {
  beforeAll(setupDB);
  afterAll(closeDB);

  let createdPaymentId: number;

  beforeEach(async () => {
    await Payment.destroy({ where: {} });

    const created = await Payment.create({
      status: "Aprovado",
      paymentType: "PIX",
      deliveryProcessId: 1
    });

    createdPaymentId = created.id;
  });

  it("deve retornar um pagamento existente pelo ID", async () => {
    const response = await request(app).get(`/api/payment/${createdPaymentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: createdPaymentId,
      status: "Aprovado",
      paymentType: "PIX",
      deliveryProcessId: 1
    });
  });

  it("deve retornar 404 se o pagamento não for encontrado", async () => {
    const response = await request(app).get("/api/payment/999999"); 
    expect(response.status).toBe(404);
  });

  it("deve retornar 400 para um ID inválido", async () => {
    const response = await request(app).get("/api/payments/abc"); 
    expect(response.status).toBe(400); 
  });
});
