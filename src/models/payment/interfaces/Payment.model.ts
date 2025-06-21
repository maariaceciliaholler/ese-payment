import TBaseModel from "../../Base.model";

export type TPaymentModel = {
    id?: number;
    status: string;
    paymentType: string;
    deliveryProcessId: string;
    deliveryProcess?: any;
} & TBaseModel;

export default TPaymentModel;