import paymentService from "../../services/payment/payment.service";

describe("RT004 - Atualizar pagamento", () => {
  it("deve atualizar e retornar o pagamento", async () => {
    const updatedPayment = {
      id: 1,
      status: "Reprovado",
      paymentType: "PIX",
      deliveryProcessId: 10,
    };

    jest.spyOn(paymentService, "update").mockResolvedValue(updatedPayment);

    const result = await paymentService.update(updatedPayment);
    expect(result).toEqual(updatedPayment);
  });
});
