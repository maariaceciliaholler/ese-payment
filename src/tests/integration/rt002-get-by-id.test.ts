import request from "supertest";
import app from "../../app";
import { setupDB, closeDB } from "../test-utils";
import Payment from "../../models/payment/Payment";

jest.mock("../../middleware/checkAuth", () => ({
  checkAuth: (_req: any, _res: any, next: any) => next()
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
      deliveryProcessId: 101
    });

    createdPaymentId = created.id;
  });

  it("deve retornar um pagamento existente pelo ID", async () => {
    const response = await request(app).get(`/payments/${createdPaymentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: createdPaymentId,
      status: "Aprovado",
      paymentType: "PIX",
      deliveryProcessId: 101
    });
  });

  it("deve retornar 404 se o pagamento não for encontrado", async () => {
    const response = await request(app).get("/payments/999999"); 
    expect(response.status).toBe(404);
  });

  it("deve retornar 400 para um ID inválido", async () => {
    const response = await request(app).get("/payments/abc"); 
    expect(response.status).toBe(400); 
  });
});
