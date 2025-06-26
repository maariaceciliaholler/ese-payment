import { z } from "zod";
import { TPaymentModel } from "../../models/payment/interfaces/Payment.model";
import Payment from "../../models/payment/Payment";
import IBaseRepository from "../base.repository";

const TPaymentSchema = z.object({
    status: z.string().nonempty(),
    paymentType: z.string().nonempty(),
    deliveryProcessId: z.number(),
});

class PaymentRepository implements IBaseRepository<TPaymentModel> {
    async findAll(): Promise<TPaymentModel[]> {
        const findAllResult = await Payment.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string }): Promise<TPaymentModel | null> {
        const findOneResult = await Payment.findOne({
            where: { id },
        });
        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await Payment.destroy({ where: { id } });
        return deletedRows > 0;
    }

    async create({ data }: { data: any }): Promise<TPaymentModel> {
        await this.validateInput(data);
        const createResult = await Payment.create(data);
        return createResult;
    }

    async update({ data }: { data: TPaymentModel }): Promise<TPaymentModel | null> {
        const [affectedRows] = await Payment.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }

    private async validateInput(data: TPaymentModel) {
        try {
            await TPaymentSchema.parseAsync(data);
        } catch (error) {
            throw new Error(
                "Erro. Os campos obrigatórios de pagamento devem ser preenchidos corretamente!"
            );
        }
    }
}

export default new PaymentRepository();
