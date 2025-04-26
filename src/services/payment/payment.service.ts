import { TPaymentModel } from "../../models/payment/interfaces/Payment.model";
import paymentRepository from "../../repositories/payment/payment.repository";
import deliveryProcessRepository from "../../repositories/delivery-process/delivery-process.repository";
import { PAYMENT_STATUS } from "../../constants/payment-status.const";
import { DELIVERY_PROCESS_STATUS } from "../../constants/delivery-process-status.const";

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

    async createPaymentUsecase(data: {
        paymentType: string;
        deliveryProcessId: number;
        quotationEmail: string;
    }) {
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

            await deliveryProcessRepository.update({
                data: {
                    id: data.deliveryProcessId,
                    status: DELIVERY_PROCESS_STATUS.INVOICED,
                },
            });

            return payment;
        } catch (error) {
            throw error;
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
