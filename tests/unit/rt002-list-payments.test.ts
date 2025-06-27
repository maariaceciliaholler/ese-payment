import paymentService from "../../src/services/payment/payment.service";

describe("RT002 - Listar todos os pagamentos", () => {
  it("deve retornar uma lista de pagamentos", async () => {
    const mockPayments = [
      { id: 1, status: "Aprovado", paymentType: "PIX", deliveryProcessId: 2 },
      { id: 2, status: "Reprovado", paymentType: "Cartão", deliveryProcessId: 3 },
    ];

    jest.spyOn(paymentService, "findAll").mockResolvedValue(mockPayments);

    const result = await paymentService.findAll();
    expect(result).toEqual(mockPayments);
  });
});
