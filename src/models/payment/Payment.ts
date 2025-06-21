import { Model, DataType, Table, Column } from "sequelize-typescript";
import TPaymentModel from "../payment/interfaces/Payment.model";

@Table({
    tableName: "payment",
    modelName: "Payment",
})
class Payment extends Model<TPaymentModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_payment",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "pa_status",
    })
    status!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "pa_type",
    })
    paymentType!: string;

     @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "fk_delivery_process_uuid",
    })
    deliveryProcessId!: string;

    @Column({
        type: DataType.DATE,
        field: "created_at",
    })
    createdAt!: Date;

    @Column({
        type: DataType.STRING(255),
        field: "created_by",
    })
    createdBy!: string;

    @Column({
        type: DataType.DATE,
        field: "updated_at",
    })
    updatedAt!: Date;

    @Column({
        type: DataType.STRING(255),
        field: "updated_by",
    })
    updatedBy!: string;

    @Column({
        type: DataType.DATE,
        field: "deleted_at",
    })
    deletedAt!: Date;

    @Column({
        type: DataType.STRING(255),
        field: "deleted_by",
    })
    deletedBy!: string;
}

export default Payment;