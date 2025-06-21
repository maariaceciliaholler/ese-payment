import { TPaymentModel } from "../../models/payment/interfaces/Payment.model";
import paymentRepository from "../../repositories/payment/payment.repository";
import { PAYMENT_STATUS } from "../../constants/payment-status.const";
import { sendTrackingCodeEmail } from "../../services/email/email.service";
import { z } from "zod";
import { updateDeliveryProcessMiddleware } from "../../middleware/tracking.middleware";

const INVOICED_STATUS_ID = 'b7aaddff-9a84-4e2e-91e7-383b409aef4a';

const paymentInputSchema = z.object({
    paymentType: z.string().nonempty(),
    deliveryProcessId: z.string().uuid(),
    quotationEmail: z.string().email(),
  });

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
        deliveryProcessId: string;
        quotationEmail: string;
      }, token: string) {
        try {
          paymentInputSchema.parse(data);
    
          const payment = await paymentRepository.create({
            data: {
              status: PAYMENT_STATUS.APPROVED,
              paymentType: data.paymentType,
              deliveryProcessId: data.deliveryProcessId,
              createdAt: new Date(),
              createdBy: "",
            },
          });
          
          await updateDeliveryProcessMiddleware(
            data.deliveryProcessId,
            { statusId: INVOICED_STATUS_ID },   
            token
          );
          await sendTrackingCodeEmail(data.quotationEmail, data.deliveryProcessId);
          return payment;
        } catch (error) {
  console.error('ERRO COMPLETO ►', error);        
  if (error instanceof Error) {
    console.error('MESSAGE ►', error.message);
  }
  throw new Error('Entrada inválida');
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
