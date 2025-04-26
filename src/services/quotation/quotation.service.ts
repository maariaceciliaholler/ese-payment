import TAddressModel from "../../models/address/interfaces/Address.model";
import { TCreateQuotationWithAddresses, TQuotationModel } from "../../models/quotation/interfaces/Quotation.model";
import Address from "../../models/address/Address";
import Quotation from "../../models/quotation/Quotation";
import TItemRemittanceModel from "../../models/item-remittance/interface/ItemRemittance.model";
import ItemRemittance from "../../models/item-remittance/ItemRemittance";
import quotationRepository from "../../repositories/quotation/quotation.repository";

class QuotationService {
    async createQuotationWithAddressesUsecase({
        quotation,
        destinationAddress,
        originAddress,
        itemRemittance,
    }: TCreateQuotationWithAddresses) {
        try {
            const databaseOriginAddress = await Address.create(originAddress);

            const databaseDestinationAddress = await Address.create(destinationAddress);

            const databaseQuotation = await Quotation.create({
                ...quotation,
                originAddressId: databaseOriginAddress.id,
                destinationAddressId: databaseDestinationAddress.id,
            });

            await ItemRemittance.create({
                ...itemRemittance,
                quotationId: databaseQuotation.id,
            });

            return databaseQuotation;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        return quotationRepository.findAll();
    }

    async findAllWithoutApprovedOffers() {
        return quotationRepository.findAllWithoutApprovedOffers();
    }

    async findAllByCPF(cpf: string) {
        return quotationRepository.findAllByCPF({ cpf: cpf });
    }

    async findOne(id: string) {
        return quotationRepository.findOne({ id: id });
    }

    async create(data: TQuotationModel) {
        return quotationRepository.create({ data: data });
    }

    async update(data: TQuotationModel) {
        return quotationRepository.update({ data: data });
    }

    async deleteOne(id: string) {
        return quotationRepository.delete({ id: id });
    }
}
export default new QuotationService;
