import TBaseModel from "../../Base.model";
import TDeliveryProcessModel from "../../delivery/interfaces/DeliveryProcess.model";

export type TPaymentModel = {
    id?: number;
    status: string;
    paymentType: string;
    deliveryProcessId: number;
    deliveryProcess?: TDeliveryProcessModel;
} & TBaseModel;

export default TPaymentModel;