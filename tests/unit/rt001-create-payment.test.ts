import paymentService from "../../src/services/payment/payment.service";
import paymentRepository from "../../src/repositories/payment/payment.repository";
import { PAYMENT_STATUS } from "../../src/constants/payment-status.const";

jest.mock("../../src/repositories/payment/payment.repository");

describe("RT001 - Criar pagamento", () => {
  const mockCreate = paymentRepository.create as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um pagamento válido", async () => {
    const input = {
      paymentType: "PIX",
      deliveryProcessId: 123,
      quotationEmail: "cliente@email.com",
    };

    mockCreate.mockResolvedValue({
      id: 1,
      ...input,
      status: PAYMENT_STATUS.APPROVED,
      createdAt: new Date(),
      createdBy: "",
    });

    const result = await paymentService.createPaymentUsecase(input);

    expect(mockCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        paymentType: "PIX",
        deliveryProcessId: 123,
        status: PAYMENT_STATUS.APPROVED,
      }),
    });

    expect(result).toHaveProperty("id");
  });

  it("deve lançar erro se faltar tipo de pagamento", async () => {
    const input = {
      deliveryProcessId: 123,
      quotationEmail: "cliente@email.com",
    };

    await expect(paymentService.createPaymentUsecase(input as any)).rejects.toThrow();
    expect(mockCreate).not.toHaveBeenCalled();
  });
});