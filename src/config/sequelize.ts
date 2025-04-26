import * as dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import Address from "../models/address/Address";
import CollectionSchedule from "../models/collection-schedule/CollectionSchedule";
import DeliveryAppointment from "../models/delivery/DeliveryAppointment";
import DeliveryProcess from "../models/delivery/DeliveryProcess";
import Feedback from "../models/feedback/Feedback";
import Fleet from "../models/fleet/Fleet";
import FleetVehicle from "../models/fleet/FleetVehicle";
import ItemRemittance from "../models/item-remittance/ItemRemittance";
import Offer from "../models/offer/Offer";
import Payment from "../models/payment/Payment";
import Quotation from "../models/quotation/Quotation";
import RemittanceTypeTax from "../models/item-remittance/RemittanceTypeTax";
import User from "../models/user/User";
import DeliveryProcessStatus from "../models/delivery/DeliveryProcessStatus";
import PaymentType from "../models/payment/PaymentType";
import PaymentStatus from "../models/payment/PaymentStatus";
import FleetVehicleFleet from "../models/fleet/FleetVehicleFleet";

dotenv.config();
const DATABASE_MODELS = [
    Address,
    CollectionSchedule,
    DeliveryAppointment,
    DeliveryProcess,
    Feedback,
    Fleet,
    FleetVehicle,
    ItemRemittance,
    Offer,
    Payment,
    Quotation,
    RemittanceTypeTax,
    User,
    DeliveryProcessStatus,
    PaymentType,
    PaymentStatus,
    FleetVehicleFleet,
];
class SequelizeAdapter {
    public instance: Sequelize | undefined;

    public async connectDataBase(forceSync?: boolean) {
        const databaseInstance = new Sequelize({
            database: process.env.POSTGRES_DB,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            port: Number(process.env.POSTGRES_PORT),
            host: process.env.POSTGRES_HOST,
            dialect: "postgres",
            logging: false,
            models: DATABASE_MODELS
        });

        this.instance = databaseInstance;
        try {
            await this.instance.authenticate();
            console.log("PostgreSQL Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the PostgreSQL database:", error);
        }
    }
}

export default new SequelizeAdapter();