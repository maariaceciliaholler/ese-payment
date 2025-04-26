import IBaseRepository from "../base.repository";
import { TDeliveryProcessModel } from "../../models/delivery/interfaces/DeliveryProcess.model";
import DeliveryProcess from "../../models/delivery/DeliveryProcess";
import Offer from "../../models/offer/Offer";
import Quotation from "../../models/quotation/Quotation";
import Address from "../../models/address/Address";
import ItemRemittance from "../../models/item-remittance/ItemRemittance";
import FleetVehicle from "../../models/fleet/FleetVehicle";
import Feedback from "../../models/feedback/Feedback";

class DeliveryProcessRepository implements IBaseRepository<TDeliveryProcessModel> {
    async findAll(): Promise<TDeliveryProcessModel[]> {
        const findAllResult = await DeliveryProcess.findAll();
        return findAllResult;
    }

    async findOne({ id }: { id: string | number }): Promise<TDeliveryProcessModel | null> {
        const findOneResult = await DeliveryProcess.findOne({
            where: { id },
            include: [
                {
                    model: Feedback,
                },

                {
                    model: Offer,
                    attributes: ["id", "status", "subtotal", "taxes", "total", "deliveryForecast"],
                    include: [
                        {
                            model: Quotation,
                            attributes: ["id", "cpf", "email", "currentDate"],
                            include: [
                                {
                                    model: Address,
                                    as: "originAddress", 
                                    attributes: [
                                        "streetAddress",
                                        "number",
                                        "city",
                                        "state",
                                        "country",
                                        "zipCode",
                                        "geoLatitude",
                                        "geoLongitude",
                                    ],
                                },
                                {
                                    model: Address,
                                    as: "destinationAddress", 
                                    attributes: [
                                        "streetAddress",
                                        "number",
                                        "city",
                                        "state",
                                        "country",
                                        "zipCode",
                                        "geoLatitude",
                                        "geoLongitude",
                                    ],
                                },
                                {
                                    model: ItemRemittance,
                                    attributes: ["id", "objectType", "weight"],
                                },
                            ],
                        },

                        {
                            model: FleetVehicle,
                            attributes: ["id", "model", "plate", "cpfDriver", "renavam"],
                        },
                    ],
                },
            ],
        });

        return findOneResult;
    }

    async delete({ id }: { id: string }): Promise<boolean> {
        const deletedRows = await DeliveryProcess.destroy({ where: { id } });

        if (deletedRows > 0) return true;
        return false;
    }
    async create({ data }: { data: TDeliveryProcessModel }): Promise<TDeliveryProcessModel> {
        const createResult = await DeliveryProcess.create(data);
        return createResult;
    }

    async update({ data }: { data: TDeliveryProcessModel }): Promise<TDeliveryProcessModel | null> {
        const [affectedRows] = await DeliveryProcess.update(data, { where: { id: data.id } });
        if (affectedRows > 0) return data;
        return null;
    }

    async findAllOpened(): Promise<TDeliveryProcessModel[] | null> {
        try {
            const deliveryProcesses = await DeliveryProcess.findAll({
                include: [
                    {
                        model: Feedback,
                    },
                    {
                        model: Offer,
                        attributes: [
                            "id",
                            "status",
                            "subtotal",
                            "taxes",
                            "total",
                            "deliveryForecast",
                        ],
                        include: [
                            {
                                model: Quotation,
                                attributes: ["id", "cpf", "email", "currentDate"],
                                include: [
                                    {
                                        model: Address,
                                        as: "originAddress", 
                                        attributes: [
                                            "streetAddress",
                                            "number",
                                            "city",
                                            "state",
                                            "country",
                                            "zipCode",
                                            "geoLatitude",
                                            "geoLongitude",
                                        ],
                                    },
                                    {
                                        model: Address,
                                        as: "destinationAddress", 
                                        attributes: [
                                            "streetAddress",
                                            "number",
                                            "city",
                                            "state",
                                            "country",
                                            "zipCode",
                                            "geoLatitude",
                                            "geoLongitude",
                                        ],
                                    },
                                    {
                                        model: ItemRemittance,
                                        attributes: ["id", "objectType", "weight"],
                                    },
                                ],
                            },
                            {
                                model: FleetVehicle,
                                attributes: ["id", "model", "plate", "cpfDriver", "renavam"],
                            },
                        ],
                    },
                ],
            });

            return deliveryProcesses;
        } catch (error) {
            console.error("Error fetching delivery processes:", error);
            throw error;
        }
    }
}

export default new DeliveryProcessRepository();