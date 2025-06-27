import paymentService from "../../src/services/payment/payment.service";

describe("RT003 - Buscar pagamento por ID", () => {
  it("deve retornar o pagamento correspondente ao ID", async () => {
    const mockPayment = {
      id: 1,
      status: "Aprovado",
      paymentType: "PIX",
      deliveryProcessId: 1,
    };

    jest.spyOn(paymentService, "findOne").mockResolvedValue(mockPayment);

    const result = await paymentService.findOne("1");
    expect(result).toEqual(mockPayment);
  });
});
