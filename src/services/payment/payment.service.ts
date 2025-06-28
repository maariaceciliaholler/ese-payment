import { PAYMENT_STATUS } from "../../constants/payment-status.const";
import { updateDeliveryProcessMiddleware } from "../../middleware/tracking.middleware";
import { TPaymentModel } from "../../models/payment/interfaces/Payment.model";
import paymentRepository from "../../repositories/payment/payment.repository";
import { sendTrackingCodeEmail } from "../../services/email/email.service";

class PaymentService {
    async findAll() {
        return paymentRepository.findAll();
    }

    async findOne(id: string) {
        return paymentRepository.findOne({ id });
    }

    async create(data: TPaymentModel) {
        return paymentRepository.create({ data });
    }
    async createPaymentUsecase(
        data: {
            paymentType: string;
            deliveryProcessId: string;
            quotationEmail: string;
        },
        token: string
    ) {
        try {
            const payment = await paymentRepository.create({
                data: {
                    status: PAYMENT_STATUS.APPROVED,
                    paymentType: data.paymentType,
                    deliveryProcessId: data.deliveryProcessId,
                    createdAt: new Date(),
                    createdBy: "",
                },
            });

            await updateDeliveryProcessMiddleware(data.deliveryProcessId, { statusId: 3 }, token);

            await sendTrackingCodeEmail(data.quotationEmail, data.deliveryProcessId);
            console.log("test");
            return payment;
        } catch (error) {
            console.error("ERRO COMPLETO ►", error);
            if (error instanceof Error) {
                console.error("MESSAGE ►", error.message);
            }
            throw new Error("Entrada inválida");
        }
    }

    async update(data: TPaymentModel) {
        return paymentRepository.update({ data });
    }

    async deleteOne(id: string) {
        return paymentRepository.delete({ id });
    }
}

export default new PaymentService();
