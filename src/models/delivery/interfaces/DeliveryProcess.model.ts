export default TDeliveryProcessModel;
import TBaseModel from "../../Base.model";
import TFeedbackModel from "../../feedback/interfaces/Feedback.model";
import TOfferModel from "../../offer/interfaces/Offer.model";

export type TDeliveryProcessModel = {
    id?: number;
    status: string;
    
    offerId?: number;
    feedbackId?: number;

    offer?: TOfferModel;
    feedback?: TFeedbackModel;
} & TBaseModel;
