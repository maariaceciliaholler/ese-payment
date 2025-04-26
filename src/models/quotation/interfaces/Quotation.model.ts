import TAddressModel from "../../address/interfaces/Address.model";
import TBaseModel from "../../Base.model";
import TItemRemittanceModel from "../../item-remittance/interface/ItemRemittance.model";
import TOfferModel from "../../offer/interfaces/Offer.model";

export type TQuotationModel = {
    id?: number;
    cpf: string;
    email: string;
    currentDate: Date;
    originAddressId?: number;
    destinationAddressId?: number;
    originAddress?: TAddressModel;
    destinationAddress?: TAddressModel;
    itemRemittances?: TItemRemittanceModel[];
    offers?: TOfferModel[];
} & TBaseModel;

export type TCreateQuotationWithAddresses = {
    quotation: TQuotationModel;
    destinationAddress: TAddressModel;
    originAddress: TAddressModel;
    itemRemittance: TItemRemittanceModel;
};
