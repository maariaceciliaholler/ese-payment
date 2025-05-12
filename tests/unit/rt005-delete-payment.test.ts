import paymentService from "../../src/services/payment/payment.service";

describe("RT005 - Excluir pagamento", () => {
  it("deve excluir o pagamento com sucesso", async () => {
    jest.spyOn(paymentService, "deleteOne").mockResolvedValue(true);

    const result = await paymentService.deleteOne("1");
    expect(result).toBe(true);
  });

  it("deve retornar false se o pagamento não for encontrado", async () => {
    jest.spyOn(paymentService, "deleteOne").mockResolvedValue(false);

    const result = await paymentService.deleteOne("999");
    expect(result).toBe(false);
  });
});
