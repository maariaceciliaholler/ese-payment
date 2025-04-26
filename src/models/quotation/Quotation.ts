import {
    Model,
    DataType,
    Table,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";

import Address from "../address/Address";
import ItemRemittance from "../item-remittance/ItemRemittance";
import Offer from "../offer/Offer";
import { TQuotationModel } from "../quotation/interfaces/Quotation.model";

@Table({
    tableName: "quotation", 
    modelName: "Quotation",
})
class Quotation extends Model<TQuotationModel> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "pk_quotation",
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "qu_cpf",
    })
    cpf!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "qu_email",
    })
    email!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "qu_current_date",
    })
    currentDate!: Date;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        field: "fk_origin_address",
    })
    originAddressId!: number;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        field: "fk_destination_address",
    })
    destinationAddressId!: number;

    @BelongsTo(() => Address, "fk_origin_address")
    originAddress?: Address;

    @BelongsTo(() => Address, "fk_destination_address")
    destinationAddress?: Address;

    @HasMany(() => Offer)
    offers?: Offer[];

    // Se houver relacionamento com ItemRemittance no futuro, descomente:
    // @HasMany(() => ItemRemittance)
    // itemRemittances?: ItemRemittance[];

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

export default Quotation;