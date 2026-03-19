import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type NegotiationSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$NegotiationSessionPayload>;
export type AggregateNegotiationSession = {
    _count: NegotiationSessionCountAggregateOutputType | null;
    _avg: NegotiationSessionAvgAggregateOutputType | null;
    _sum: NegotiationSessionSumAggregateOutputType | null;
    _min: NegotiationSessionMinAggregateOutputType | null;
    _max: NegotiationSessionMaxAggregateOutputType | null;
};
export type NegotiationSessionAvgAggregateOutputType = {
    agreedPrice: runtime.Decimal | null;
    agreedQuantity: number | null;
    buyerUnreadCount: number | null;
    farmerUnreadCount: number | null;
};
export type NegotiationSessionSumAggregateOutputType = {
    agreedPrice: runtime.Decimal | null;
    agreedQuantity: number | null;
    buyerUnreadCount: number | null;
    farmerUnreadCount: number | null;
};
export type NegotiationSessionMinAggregateOutputType = {
    id: string | null;
    buyerId: string | null;
    farmerId: string | null;
    productId: string | null;
    status: $Enums.NegotiationStatus | null;
    agreedPrice: runtime.Decimal | null;
    agreedQuantity: number | null;
    lastMessageAt: Date | null;
    lastMessagePreview: string | null;
    buyerUnreadCount: number | null;
    farmerUnreadCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NegotiationSessionMaxAggregateOutputType = {
    id: string | null;
    buyerId: string | null;
    farmerId: string | null;
    productId: string | null;
    status: $Enums.NegotiationStatus | null;
    agreedPrice: runtime.Decimal | null;
    agreedQuantity: number | null;
    lastMessageAt: Date | null;
    lastMessagePreview: string | null;
    buyerUnreadCount: number | null;
    farmerUnreadCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NegotiationSessionCountAggregateOutputType = {
    id: number;
    buyerId: number;
    farmerId: number;
    productId: number;
    status: number;
    agreedPrice: number;
    agreedQuantity: number;
    lastMessageAt: number;
    lastMessagePreview: number;
    buyerUnreadCount: number;
    farmerUnreadCount: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type NegotiationSessionAvgAggregateInputType = {
    agreedPrice?: true;
    agreedQuantity?: true;
    buyerUnreadCount?: true;
    farmerUnreadCount?: true;
};
export type NegotiationSessionSumAggregateInputType = {
    agreedPrice?: true;
    agreedQuantity?: true;
    buyerUnreadCount?: true;
    farmerUnreadCount?: true;
};
export type NegotiationSessionMinAggregateInputType = {
    id?: true;
    buyerId?: true;
    farmerId?: true;
    productId?: true;
    status?: true;
    agreedPrice?: true;
    agreedQuantity?: true;
    lastMessageAt?: true;
    lastMessagePreview?: true;
    buyerUnreadCount?: true;
    farmerUnreadCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NegotiationSessionMaxAggregateInputType = {
    id?: true;
    buyerId?: true;
    farmerId?: true;
    productId?: true;
    status?: true;
    agreedPrice?: true;
    agreedQuantity?: true;
    lastMessageAt?: true;
    lastMessagePreview?: true;
    buyerUnreadCount?: true;
    farmerUnreadCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NegotiationSessionCountAggregateInputType = {
    id?: true;
    buyerId?: true;
    farmerId?: true;
    productId?: true;
    status?: true;
    agreedPrice?: true;
    agreedQuantity?: true;
    lastMessageAt?: true;
    lastMessagePreview?: true;
    buyerUnreadCount?: true;
    farmerUnreadCount?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type NegotiationSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NegotiationSessionWhereInput;
    orderBy?: Prisma.NegotiationSessionOrderByWithRelationInput | Prisma.NegotiationSessionOrderByWithRelationInput[];
    cursor?: Prisma.NegotiationSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NegotiationSessionCountAggregateInputType;
    _avg?: NegotiationSessionAvgAggregateInputType;
    _sum?: NegotiationSessionSumAggregateInputType;
    _min?: NegotiationSessionMinAggregateInputType;
    _max?: NegotiationSessionMaxAggregateInputType;
};
export type GetNegotiationSessionAggregateType<T extends NegotiationSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateNegotiationSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNegotiationSession[P]> : Prisma.GetScalarType<T[P], AggregateNegotiationSession[P]>;
};
export type NegotiationSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NegotiationSessionWhereInput;
    orderBy?: Prisma.NegotiationSessionOrderByWithAggregationInput | Prisma.NegotiationSessionOrderByWithAggregationInput[];
    by: Prisma.NegotiationSessionScalarFieldEnum[] | Prisma.NegotiationSessionScalarFieldEnum;
    having?: Prisma.NegotiationSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NegotiationSessionCountAggregateInputType | true;
    _avg?: NegotiationSessionAvgAggregateInputType;
    _sum?: NegotiationSessionSumAggregateInputType;
    _min?: NegotiationSessionMinAggregateInputType;
    _max?: NegotiationSessionMaxAggregateInputType;
};
export type NegotiationSessionGroupByOutputType = {
    id: string;
    buyerId: string;
    farmerId: string;
    productId: string;
    status: $Enums.NegotiationStatus;
    agreedPrice: runtime.Decimal | null;
    agreedQuantity: number | null;
    lastMessageAt: Date | null;
    lastMessagePreview: string | null;
    buyerUnreadCount: number;
    farmerUnreadCount: number;
    createdAt: Date;
    updatedAt: Date;
    _count: NegotiationSessionCountAggregateOutputType | null;
    _avg: NegotiationSessionAvgAggregateOutputType | null;
    _sum: NegotiationSessionSumAggregateOutputType | null;
    _min: NegotiationSessionMinAggregateOutputType | null;
    _max: NegotiationSessionMaxAggregateOutputType | null;
};
type GetNegotiationSessionGroupByPayload<T extends NegotiationSessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NegotiationSessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NegotiationSessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NegotiationSessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NegotiationSessionGroupByOutputType[P]>;
}>>;
export type NegotiationSessionWhereInput = {
    AND?: Prisma.NegotiationSessionWhereInput | Prisma.NegotiationSessionWhereInput[];
    OR?: Prisma.NegotiationSessionWhereInput[];
    NOT?: Prisma.NegotiationSessionWhereInput | Prisma.NegotiationSessionWhereInput[];
    id?: Prisma.StringFilter<"NegotiationSession"> | string;
    buyerId?: Prisma.StringFilter<"NegotiationSession"> | string;
    farmerId?: Prisma.StringFilter<"NegotiationSession"> | string;
    productId?: Prisma.StringFilter<"NegotiationSession"> | string;
    status?: Prisma.EnumNegotiationStatusFilter<"NegotiationSession"> | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.DecimalNullableFilter<"NegotiationSession"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.IntNullableFilter<"NegotiationSession"> | number | null;
    lastMessageAt?: Prisma.DateTimeNullableFilter<"NegotiationSession"> | Date | string | null;
    lastMessagePreview?: Prisma.StringNullableFilter<"NegotiationSession"> | string | null;
    buyerUnreadCount?: Prisma.IntFilter<"NegotiationSession"> | number;
    farmerUnreadCount?: Prisma.IntFilter<"NegotiationSession"> | number;
    createdAt?: Prisma.DateTimeFilter<"NegotiationSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NegotiationSession"> | Date | string;
    buyer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    farmer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    messages?: Prisma.ChatMessageListRelationFilter;
    proposals?: Prisma.PriceProposalListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
};
export type NegotiationSessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    buyerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agreedPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    agreedQuantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastMessagePreview?: Prisma.SortOrderInput | Prisma.SortOrder;
    buyerUnreadCount?: Prisma.SortOrder;
    farmerUnreadCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    buyer?: Prisma.UserOrderByWithRelationInput;
    farmer?: Prisma.UserOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    messages?: Prisma.ChatMessageOrderByRelationAggregateInput;
    proposals?: Prisma.PriceProposalOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
};
export type NegotiationSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    buyerId_farmerId_productId?: Prisma.NegotiationSessionBuyerIdFarmerIdProductIdCompoundUniqueInput;
    AND?: Prisma.NegotiationSessionWhereInput | Prisma.NegotiationSessionWhereInput[];
    OR?: Prisma.NegotiationSessionWhereInput[];
    NOT?: Prisma.NegotiationSessionWhereInput | Prisma.NegotiationSessionWhereInput[];
    buyerId?: Prisma.StringFilter<"NegotiationSession"> | string;
    farmerId?: Prisma.StringFilter<"NegotiationSession"> | string;
    productId?: Prisma.StringFilter<"NegotiationSession"> | string;
    status?: Prisma.EnumNegotiationStatusFilter<"NegotiationSession"> | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.DecimalNullableFilter<"NegotiationSession"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.IntNullableFilter<"NegotiationSession"> | number | null;
    lastMessageAt?: Prisma.DateTimeNullableFilter<"NegotiationSession"> | Date | string | null;
    lastMessagePreview?: Prisma.StringNullableFilter<"NegotiationSession"> | string | null;
    buyerUnreadCount?: Prisma.IntFilter<"NegotiationSession"> | number;
    farmerUnreadCount?: Prisma.IntFilter<"NegotiationSession"> | number;
    createdAt?: Prisma.DateTimeFilter<"NegotiationSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NegotiationSession"> | Date | string;
    buyer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    farmer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    messages?: Prisma.ChatMessageListRelationFilter;
    proposals?: Prisma.PriceProposalListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
}, "id" | "buyerId_farmerId_productId">;
export type NegotiationSessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    buyerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agreedPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    agreedQuantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastMessagePreview?: Prisma.SortOrderInput | Prisma.SortOrder;
    buyerUnreadCount?: Prisma.SortOrder;
    farmerUnreadCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.NegotiationSessionCountOrderByAggregateInput;
    _avg?: Prisma.NegotiationSessionAvgOrderByAggregateInput;
    _max?: Prisma.NegotiationSessionMaxOrderByAggregateInput;
    _min?: Prisma.NegotiationSessionMinOrderByAggregateInput;
    _sum?: Prisma.NegotiationSessionSumOrderByAggregateInput;
};
export type NegotiationSessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.NegotiationSessionScalarWhereWithAggregatesInput | Prisma.NegotiationSessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.NegotiationSessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NegotiationSessionScalarWhereWithAggregatesInput | Prisma.NegotiationSessionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"NegotiationSession"> | string;
    buyerId?: Prisma.StringWithAggregatesFilter<"NegotiationSession"> | string;
    farmerId?: Prisma.StringWithAggregatesFilter<"NegotiationSession"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"NegotiationSession"> | string;
    status?: Prisma.EnumNegotiationStatusWithAggregatesFilter<"NegotiationSession"> | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.DecimalNullableWithAggregatesFilter<"NegotiationSession"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.IntNullableWithAggregatesFilter<"NegotiationSession"> | number | null;
    lastMessageAt?: Prisma.DateTimeNullableWithAggregatesFilter<"NegotiationSession"> | Date | string | null;
    lastMessagePreview?: Prisma.StringNullableWithAggregatesFilter<"NegotiationSession"> | string | null;
    buyerUnreadCount?: Prisma.IntWithAggregatesFilter<"NegotiationSession"> | number;
    farmerUnreadCount?: Prisma.IntWithAggregatesFilter<"NegotiationSession"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"NegotiationSession"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"NegotiationSession"> | Date | string;
};
export type NegotiationSessionCreateInput = {
    id?: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    buyer: Prisma.UserCreateNestedOneWithoutBuyerSessionsInput;
    farmer: Prisma.UserCreateNestedOneWithoutFarmerSessionsInput;
    product: Prisma.ProductCreateNestedOneWithoutSessionsInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionUncheckedCreateInput = {
    id?: string;
    buyerId: string;
    farmerId: string;
    productId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalUncheckedCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    buyer?: Prisma.UserUpdateOneRequiredWithoutBuyerSessionsNestedInput;
    farmer?: Prisma.UserUpdateOneRequiredWithoutFarmerSessionsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSessionsNestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUncheckedUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionCreateManyInput = {
    id?: string;
    buyerId: string;
    farmerId: string;
    productId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NegotiationSessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NegotiationSessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NegotiationSessionListRelationFilter = {
    every?: Prisma.NegotiationSessionWhereInput;
    some?: Prisma.NegotiationSessionWhereInput;
    none?: Prisma.NegotiationSessionWhereInput;
};
export type NegotiationSessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NegotiationSessionBuyerIdFarmerIdProductIdCompoundUniqueInput = {
    buyerId: string;
    farmerId: string;
    productId: string;
};
export type NegotiationSessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    buyerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agreedPrice?: Prisma.SortOrder;
    agreedQuantity?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    lastMessagePreview?: Prisma.SortOrder;
    buyerUnreadCount?: Prisma.SortOrder;
    farmerUnreadCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NegotiationSessionAvgOrderByAggregateInput = {
    agreedPrice?: Prisma.SortOrder;
    agreedQuantity?: Prisma.SortOrder;
    buyerUnreadCount?: Prisma.SortOrder;
    farmerUnreadCount?: Prisma.SortOrder;
};
export type NegotiationSessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    buyerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agreedPrice?: Prisma.SortOrder;
    agreedQuantity?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    lastMessagePreview?: Prisma.SortOrder;
    buyerUnreadCount?: Prisma.SortOrder;
    farmerUnreadCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NegotiationSessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    buyerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agreedPrice?: Prisma.SortOrder;
    agreedQuantity?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    lastMessagePreview?: Prisma.SortOrder;
    buyerUnreadCount?: Prisma.SortOrder;
    farmerUnreadCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NegotiationSessionSumOrderByAggregateInput = {
    agreedPrice?: Prisma.SortOrder;
    agreedQuantity?: Prisma.SortOrder;
    buyerUnreadCount?: Prisma.SortOrder;
    farmerUnreadCount?: Prisma.SortOrder;
};
export type NegotiationSessionScalarRelationFilter = {
    is?: Prisma.NegotiationSessionWhereInput;
    isNot?: Prisma.NegotiationSessionWhereInput;
};
export type NegotiationSessionCreateNestedManyWithoutBuyerInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutBuyerInput, Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput> | Prisma.NegotiationSessionCreateWithoutBuyerInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutBuyerInput | Prisma.NegotiationSessionCreateOrConnectWithoutBuyerInput[];
    createMany?: Prisma.NegotiationSessionCreateManyBuyerInputEnvelope;
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
};
export type NegotiationSessionCreateNestedManyWithoutFarmerInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutFarmerInput, Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput> | Prisma.NegotiationSessionCreateWithoutFarmerInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutFarmerInput | Prisma.NegotiationSessionCreateOrConnectWithoutFarmerInput[];
    createMany?: Prisma.NegotiationSessionCreateManyFarmerInputEnvelope;
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
};
export type NegotiationSessionUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutBuyerInput, Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput> | Prisma.NegotiationSessionCreateWithoutBuyerInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutBuyerInput | Prisma.NegotiationSessionCreateOrConnectWithoutBuyerInput[];
    createMany?: Prisma.NegotiationSessionCreateManyBuyerInputEnvelope;
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
};
export type NegotiationSessionUncheckedCreateNestedManyWithoutFarmerInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutFarmerInput, Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput> | Prisma.NegotiationSessionCreateWithoutFarmerInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutFarmerInput | Prisma.NegotiationSessionCreateOrConnectWithoutFarmerInput[];
    createMany?: Prisma.NegotiationSessionCreateManyFarmerInputEnvelope;
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
};
export type NegotiationSessionUpdateManyWithoutBuyerNestedInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutBuyerInput, Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput> | Prisma.NegotiationSessionCreateWithoutBuyerInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutBuyerInput | Prisma.NegotiationSessionCreateOrConnectWithoutBuyerInput[];
    upsert?: Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutBuyerInput | Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutBuyerInput[];
    createMany?: Prisma.NegotiationSessionCreateManyBuyerInputEnvelope;
    set?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    disconnect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    delete?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    update?: Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutBuyerInput | Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutBuyerInput[];
    updateMany?: Prisma.NegotiationSessionUpdateManyWithWhereWithoutBuyerInput | Prisma.NegotiationSessionUpdateManyWithWhereWithoutBuyerInput[];
    deleteMany?: Prisma.NegotiationSessionScalarWhereInput | Prisma.NegotiationSessionScalarWhereInput[];
};
export type NegotiationSessionUpdateManyWithoutFarmerNestedInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutFarmerInput, Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput> | Prisma.NegotiationSessionCreateWithoutFarmerInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutFarmerInput | Prisma.NegotiationSessionCreateOrConnectWithoutFarmerInput[];
    upsert?: Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutFarmerInput | Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutFarmerInput[];
    createMany?: Prisma.NegotiationSessionCreateManyFarmerInputEnvelope;
    set?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    disconnect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    delete?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    update?: Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutFarmerInput | Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutFarmerInput[];
    updateMany?: Prisma.NegotiationSessionUpdateManyWithWhereWithoutFarmerInput | Prisma.NegotiationSessionUpdateManyWithWhereWithoutFarmerInput[];
    deleteMany?: Prisma.NegotiationSessionScalarWhereInput | Prisma.NegotiationSessionScalarWhereInput[];
};
export type NegotiationSessionUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutBuyerInput, Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput> | Prisma.NegotiationSessionCreateWithoutBuyerInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutBuyerInput | Prisma.NegotiationSessionCreateOrConnectWithoutBuyerInput[];
    upsert?: Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutBuyerInput | Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutBuyerInput[];
    createMany?: Prisma.NegotiationSessionCreateManyBuyerInputEnvelope;
    set?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    disconnect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    delete?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    update?: Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutBuyerInput | Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutBuyerInput[];
    updateMany?: Prisma.NegotiationSessionUpdateManyWithWhereWithoutBuyerInput | Prisma.NegotiationSessionUpdateManyWithWhereWithoutBuyerInput[];
    deleteMany?: Prisma.NegotiationSessionScalarWhereInput | Prisma.NegotiationSessionScalarWhereInput[];
};
export type NegotiationSessionUncheckedUpdateManyWithoutFarmerNestedInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutFarmerInput, Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput> | Prisma.NegotiationSessionCreateWithoutFarmerInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutFarmerInput | Prisma.NegotiationSessionCreateOrConnectWithoutFarmerInput[];
    upsert?: Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutFarmerInput | Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutFarmerInput[];
    createMany?: Prisma.NegotiationSessionCreateManyFarmerInputEnvelope;
    set?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    disconnect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    delete?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    update?: Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutFarmerInput | Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutFarmerInput[];
    updateMany?: Prisma.NegotiationSessionUpdateManyWithWhereWithoutFarmerInput | Prisma.NegotiationSessionUpdateManyWithWhereWithoutFarmerInput[];
    deleteMany?: Prisma.NegotiationSessionScalarWhereInput | Prisma.NegotiationSessionScalarWhereInput[];
};
export type NegotiationSessionCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProductInput, Prisma.NegotiationSessionUncheckedCreateWithoutProductInput> | Prisma.NegotiationSessionCreateWithoutProductInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutProductInput | Prisma.NegotiationSessionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.NegotiationSessionCreateManyProductInputEnvelope;
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
};
export type NegotiationSessionUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProductInput, Prisma.NegotiationSessionUncheckedCreateWithoutProductInput> | Prisma.NegotiationSessionCreateWithoutProductInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutProductInput | Prisma.NegotiationSessionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.NegotiationSessionCreateManyProductInputEnvelope;
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
};
export type NegotiationSessionUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProductInput, Prisma.NegotiationSessionUncheckedCreateWithoutProductInput> | Prisma.NegotiationSessionCreateWithoutProductInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutProductInput | Prisma.NegotiationSessionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutProductInput | Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.NegotiationSessionCreateManyProductInputEnvelope;
    set?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    disconnect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    delete?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    update?: Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutProductInput | Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.NegotiationSessionUpdateManyWithWhereWithoutProductInput | Prisma.NegotiationSessionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.NegotiationSessionScalarWhereInput | Prisma.NegotiationSessionScalarWhereInput[];
};
export type NegotiationSessionUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProductInput, Prisma.NegotiationSessionUncheckedCreateWithoutProductInput> | Prisma.NegotiationSessionCreateWithoutProductInput[] | Prisma.NegotiationSessionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutProductInput | Prisma.NegotiationSessionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutProductInput | Prisma.NegotiationSessionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.NegotiationSessionCreateManyProductInputEnvelope;
    set?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    disconnect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    delete?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    connect?: Prisma.NegotiationSessionWhereUniqueInput | Prisma.NegotiationSessionWhereUniqueInput[];
    update?: Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutProductInput | Prisma.NegotiationSessionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.NegotiationSessionUpdateManyWithWhereWithoutProductInput | Prisma.NegotiationSessionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.NegotiationSessionScalarWhereInput | Prisma.NegotiationSessionScalarWhereInput[];
};
export type EnumNegotiationStatusFieldUpdateOperationsInput = {
    set?: $Enums.NegotiationStatus;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NegotiationSessionCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutMessagesInput, Prisma.NegotiationSessionUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.NegotiationSessionWhereUniqueInput;
};
export type NegotiationSessionUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutMessagesInput, Prisma.NegotiationSessionUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.NegotiationSessionUpsertWithoutMessagesInput;
    connect?: Prisma.NegotiationSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.NegotiationSessionUpdateToOneWithWhereWithoutMessagesInput, Prisma.NegotiationSessionUpdateWithoutMessagesInput>, Prisma.NegotiationSessionUncheckedUpdateWithoutMessagesInput>;
};
export type NegotiationSessionCreateNestedOneWithoutProposalsInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProposalsInput, Prisma.NegotiationSessionUncheckedCreateWithoutProposalsInput>;
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutProposalsInput;
    connect?: Prisma.NegotiationSessionWhereUniqueInput;
};
export type NegotiationSessionUpdateOneRequiredWithoutProposalsNestedInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProposalsInput, Prisma.NegotiationSessionUncheckedCreateWithoutProposalsInput>;
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutProposalsInput;
    upsert?: Prisma.NegotiationSessionUpsertWithoutProposalsInput;
    connect?: Prisma.NegotiationSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.NegotiationSessionUpdateToOneWithWhereWithoutProposalsInput, Prisma.NegotiationSessionUpdateWithoutProposalsInput>, Prisma.NegotiationSessionUncheckedUpdateWithoutProposalsInput>;
};
export type NegotiationSessionCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutOrdersInput, Prisma.NegotiationSessionUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.NegotiationSessionWhereUniqueInput;
};
export type NegotiationSessionUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutOrdersInput, Prisma.NegotiationSessionUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.NegotiationSessionCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.NegotiationSessionUpsertWithoutOrdersInput;
    connect?: Prisma.NegotiationSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.NegotiationSessionUpdateToOneWithWhereWithoutOrdersInput, Prisma.NegotiationSessionUpdateWithoutOrdersInput>, Prisma.NegotiationSessionUncheckedUpdateWithoutOrdersInput>;
};
export type NegotiationSessionCreateWithoutBuyerInput = {
    id?: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    farmer: Prisma.UserCreateNestedOneWithoutFarmerSessionsInput;
    product: Prisma.ProductCreateNestedOneWithoutSessionsInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionUncheckedCreateWithoutBuyerInput = {
    id?: string;
    farmerId: string;
    productId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalUncheckedCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionCreateOrConnectWithoutBuyerInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutBuyerInput, Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput>;
};
export type NegotiationSessionCreateManyBuyerInputEnvelope = {
    data: Prisma.NegotiationSessionCreateManyBuyerInput | Prisma.NegotiationSessionCreateManyBuyerInput[];
    skipDuplicates?: boolean;
};
export type NegotiationSessionCreateWithoutFarmerInput = {
    id?: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    buyer: Prisma.UserCreateNestedOneWithoutBuyerSessionsInput;
    product: Prisma.ProductCreateNestedOneWithoutSessionsInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionUncheckedCreateWithoutFarmerInput = {
    id?: string;
    buyerId: string;
    productId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalUncheckedCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionCreateOrConnectWithoutFarmerInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutFarmerInput, Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput>;
};
export type NegotiationSessionCreateManyFarmerInputEnvelope = {
    data: Prisma.NegotiationSessionCreateManyFarmerInput | Prisma.NegotiationSessionCreateManyFarmerInput[];
    skipDuplicates?: boolean;
};
export type NegotiationSessionUpsertWithWhereUniqueWithoutBuyerInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutBuyerInput, Prisma.NegotiationSessionUncheckedUpdateWithoutBuyerInput>;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutBuyerInput, Prisma.NegotiationSessionUncheckedCreateWithoutBuyerInput>;
};
export type NegotiationSessionUpdateWithWhereUniqueWithoutBuyerInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutBuyerInput, Prisma.NegotiationSessionUncheckedUpdateWithoutBuyerInput>;
};
export type NegotiationSessionUpdateManyWithWhereWithoutBuyerInput = {
    where: Prisma.NegotiationSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateManyMutationInput, Prisma.NegotiationSessionUncheckedUpdateManyWithoutBuyerInput>;
};
export type NegotiationSessionScalarWhereInput = {
    AND?: Prisma.NegotiationSessionScalarWhereInput | Prisma.NegotiationSessionScalarWhereInput[];
    OR?: Prisma.NegotiationSessionScalarWhereInput[];
    NOT?: Prisma.NegotiationSessionScalarWhereInput | Prisma.NegotiationSessionScalarWhereInput[];
    id?: Prisma.StringFilter<"NegotiationSession"> | string;
    buyerId?: Prisma.StringFilter<"NegotiationSession"> | string;
    farmerId?: Prisma.StringFilter<"NegotiationSession"> | string;
    productId?: Prisma.StringFilter<"NegotiationSession"> | string;
    status?: Prisma.EnumNegotiationStatusFilter<"NegotiationSession"> | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.DecimalNullableFilter<"NegotiationSession"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.IntNullableFilter<"NegotiationSession"> | number | null;
    lastMessageAt?: Prisma.DateTimeNullableFilter<"NegotiationSession"> | Date | string | null;
    lastMessagePreview?: Prisma.StringNullableFilter<"NegotiationSession"> | string | null;
    buyerUnreadCount?: Prisma.IntFilter<"NegotiationSession"> | number;
    farmerUnreadCount?: Prisma.IntFilter<"NegotiationSession"> | number;
    createdAt?: Prisma.DateTimeFilter<"NegotiationSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NegotiationSession"> | Date | string;
};
export type NegotiationSessionUpsertWithWhereUniqueWithoutFarmerInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutFarmerInput, Prisma.NegotiationSessionUncheckedUpdateWithoutFarmerInput>;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutFarmerInput, Prisma.NegotiationSessionUncheckedCreateWithoutFarmerInput>;
};
export type NegotiationSessionUpdateWithWhereUniqueWithoutFarmerInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutFarmerInput, Prisma.NegotiationSessionUncheckedUpdateWithoutFarmerInput>;
};
export type NegotiationSessionUpdateManyWithWhereWithoutFarmerInput = {
    where: Prisma.NegotiationSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateManyMutationInput, Prisma.NegotiationSessionUncheckedUpdateManyWithoutFarmerInput>;
};
export type NegotiationSessionCreateWithoutProductInput = {
    id?: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    buyer: Prisma.UserCreateNestedOneWithoutBuyerSessionsInput;
    farmer: Prisma.UserCreateNestedOneWithoutFarmerSessionsInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionUncheckedCreateWithoutProductInput = {
    id?: string;
    buyerId: string;
    farmerId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalUncheckedCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionCreateOrConnectWithoutProductInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProductInput, Prisma.NegotiationSessionUncheckedCreateWithoutProductInput>;
};
export type NegotiationSessionCreateManyProductInputEnvelope = {
    data: Prisma.NegotiationSessionCreateManyProductInput | Prisma.NegotiationSessionCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type NegotiationSessionUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutProductInput, Prisma.NegotiationSessionUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProductInput, Prisma.NegotiationSessionUncheckedCreateWithoutProductInput>;
};
export type NegotiationSessionUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutProductInput, Prisma.NegotiationSessionUncheckedUpdateWithoutProductInput>;
};
export type NegotiationSessionUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.NegotiationSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateManyMutationInput, Prisma.NegotiationSessionUncheckedUpdateManyWithoutProductInput>;
};
export type NegotiationSessionCreateWithoutMessagesInput = {
    id?: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    buyer: Prisma.UserCreateNestedOneWithoutBuyerSessionsInput;
    farmer: Prisma.UserCreateNestedOneWithoutFarmerSessionsInput;
    product: Prisma.ProductCreateNestedOneWithoutSessionsInput;
    proposals?: Prisma.PriceProposalCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionUncheckedCreateWithoutMessagesInput = {
    id?: string;
    buyerId: string;
    farmerId: string;
    productId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    proposals?: Prisma.PriceProposalUncheckedCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionCreateOrConnectWithoutMessagesInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutMessagesInput, Prisma.NegotiationSessionUncheckedCreateWithoutMessagesInput>;
};
export type NegotiationSessionUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutMessagesInput, Prisma.NegotiationSessionUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutMessagesInput, Prisma.NegotiationSessionUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.NegotiationSessionWhereInput;
};
export type NegotiationSessionUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.NegotiationSessionWhereInput;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutMessagesInput, Prisma.NegotiationSessionUncheckedUpdateWithoutMessagesInput>;
};
export type NegotiationSessionUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    buyer?: Prisma.UserUpdateOneRequiredWithoutBuyerSessionsNestedInput;
    farmer?: Prisma.UserUpdateOneRequiredWithoutFarmerSessionsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSessionsNestedInput;
    proposals?: Prisma.PriceProposalUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    proposals?: Prisma.PriceProposalUncheckedUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionCreateWithoutProposalsInput = {
    id?: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    buyer: Prisma.UserCreateNestedOneWithoutBuyerSessionsInput;
    farmer: Prisma.UserCreateNestedOneWithoutFarmerSessionsInput;
    product: Prisma.ProductCreateNestedOneWithoutSessionsInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionUncheckedCreateWithoutProposalsInput = {
    id?: string;
    buyerId: string;
    farmerId: string;
    productId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSessionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionCreateOrConnectWithoutProposalsInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProposalsInput, Prisma.NegotiationSessionUncheckedCreateWithoutProposalsInput>;
};
export type NegotiationSessionUpsertWithoutProposalsInput = {
    update: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutProposalsInput, Prisma.NegotiationSessionUncheckedUpdateWithoutProposalsInput>;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutProposalsInput, Prisma.NegotiationSessionUncheckedCreateWithoutProposalsInput>;
    where?: Prisma.NegotiationSessionWhereInput;
};
export type NegotiationSessionUpdateToOneWithWhereWithoutProposalsInput = {
    where?: Prisma.NegotiationSessionWhereInput;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutProposalsInput, Prisma.NegotiationSessionUncheckedUpdateWithoutProposalsInput>;
};
export type NegotiationSessionUpdateWithoutProposalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    buyer?: Prisma.UserUpdateOneRequiredWithoutBuyerSessionsNestedInput;
    farmer?: Prisma.UserUpdateOneRequiredWithoutFarmerSessionsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSessionsNestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateWithoutProposalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionCreateWithoutOrdersInput = {
    id?: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    buyer: Prisma.UserCreateNestedOneWithoutBuyerSessionsInput;
    farmer: Prisma.UserCreateNestedOneWithoutFarmerSessionsInput;
    product: Prisma.ProductCreateNestedOneWithoutSessionsInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionUncheckedCreateWithoutOrdersInput = {
    id?: string;
    buyerId: string;
    farmerId: string;
    productId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSessionInput;
    proposals?: Prisma.PriceProposalUncheckedCreateNestedManyWithoutSessionInput;
};
export type NegotiationSessionCreateOrConnectWithoutOrdersInput = {
    where: Prisma.NegotiationSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutOrdersInput, Prisma.NegotiationSessionUncheckedCreateWithoutOrdersInput>;
};
export type NegotiationSessionUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutOrdersInput, Prisma.NegotiationSessionUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateWithoutOrdersInput, Prisma.NegotiationSessionUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.NegotiationSessionWhereInput;
};
export type NegotiationSessionUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.NegotiationSessionWhereInput;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateWithoutOrdersInput, Prisma.NegotiationSessionUncheckedUpdateWithoutOrdersInput>;
};
export type NegotiationSessionUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    buyer?: Prisma.UserUpdateOneRequiredWithoutBuyerSessionsNestedInput;
    farmer?: Prisma.UserUpdateOneRequiredWithoutFarmerSessionsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSessionsNestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUncheckedUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionCreateManyBuyerInput = {
    id?: string;
    farmerId: string;
    productId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NegotiationSessionCreateManyFarmerInput = {
    id?: string;
    buyerId: string;
    productId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NegotiationSessionUpdateWithoutBuyerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    farmer?: Prisma.UserUpdateOneRequiredWithoutFarmerSessionsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSessionsNestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateWithoutBuyerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUncheckedUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateManyWithoutBuyerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NegotiationSessionUpdateWithoutFarmerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    buyer?: Prisma.UserUpdateOneRequiredWithoutBuyerSessionsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSessionsNestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateWithoutFarmerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUncheckedUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateManyWithoutFarmerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NegotiationSessionCreateManyProductInput = {
    id?: string;
    buyerId: string;
    farmerId: string;
    status?: $Enums.NegotiationStatus;
    agreedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: number | null;
    lastMessageAt?: Date | string | null;
    lastMessagePreview?: string | null;
    buyerUnreadCount?: number;
    farmerUnreadCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NegotiationSessionUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    buyer?: Prisma.UserUpdateOneRequiredWithoutBuyerSessionsNestedInput;
    farmer?: Prisma.UserUpdateOneRequiredWithoutFarmerSessionsNestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSessionNestedInput;
    proposals?: Prisma.PriceProposalUncheckedUpdateManyWithoutSessionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutSessionNestedInput;
};
export type NegotiationSessionUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNegotiationStatusFieldUpdateOperationsInput | $Enums.NegotiationStatus;
    agreedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    agreedQuantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastMessagePreview?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    buyerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    farmerUnreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NegotiationSessionCountOutputType = {
    messages: number;
    proposals: number;
    orders: number;
};
export type NegotiationSessionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    messages?: boolean | NegotiationSessionCountOutputTypeCountMessagesArgs;
    proposals?: boolean | NegotiationSessionCountOutputTypeCountProposalsArgs;
    orders?: boolean | NegotiationSessionCountOutputTypeCountOrdersArgs;
};
export type NegotiationSessionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionCountOutputTypeSelect<ExtArgs> | null;
};
export type NegotiationSessionCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
};
export type NegotiationSessionCountOutputTypeCountProposalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PriceProposalWhereInput;
};
export type NegotiationSessionCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type NegotiationSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    buyerId?: boolean;
    farmerId?: boolean;
    productId?: boolean;
    status?: boolean;
    agreedPrice?: boolean;
    agreedQuantity?: boolean;
    lastMessageAt?: boolean;
    lastMessagePreview?: boolean;
    buyerUnreadCount?: boolean;
    farmerUnreadCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    buyer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    farmer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.NegotiationSession$messagesArgs<ExtArgs>;
    proposals?: boolean | Prisma.NegotiationSession$proposalsArgs<ExtArgs>;
    orders?: boolean | Prisma.NegotiationSession$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.NegotiationSessionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["negotiationSession"]>;
export type NegotiationSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    buyerId?: boolean;
    farmerId?: boolean;
    productId?: boolean;
    status?: boolean;
    agreedPrice?: boolean;
    agreedQuantity?: boolean;
    lastMessageAt?: boolean;
    lastMessagePreview?: boolean;
    buyerUnreadCount?: boolean;
    farmerUnreadCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    buyer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    farmer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["negotiationSession"]>;
export type NegotiationSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    buyerId?: boolean;
    farmerId?: boolean;
    productId?: boolean;
    status?: boolean;
    agreedPrice?: boolean;
    agreedQuantity?: boolean;
    lastMessageAt?: boolean;
    lastMessagePreview?: boolean;
    buyerUnreadCount?: boolean;
    farmerUnreadCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    buyer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    farmer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["negotiationSession"]>;
export type NegotiationSessionSelectScalar = {
    id?: boolean;
    buyerId?: boolean;
    farmerId?: boolean;
    productId?: boolean;
    status?: boolean;
    agreedPrice?: boolean;
    agreedQuantity?: boolean;
    lastMessageAt?: boolean;
    lastMessagePreview?: boolean;
    buyerUnreadCount?: boolean;
    farmerUnreadCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type NegotiationSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "buyerId" | "farmerId" | "productId" | "status" | "agreedPrice" | "agreedQuantity" | "lastMessageAt" | "lastMessagePreview" | "buyerUnreadCount" | "farmerUnreadCount" | "createdAt" | "updatedAt", ExtArgs["result"]["negotiationSession"]>;
export type NegotiationSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    buyer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    farmer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.NegotiationSession$messagesArgs<ExtArgs>;
    proposals?: boolean | Prisma.NegotiationSession$proposalsArgs<ExtArgs>;
    orders?: boolean | Prisma.NegotiationSession$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.NegotiationSessionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type NegotiationSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    buyer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    farmer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type NegotiationSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    buyer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    farmer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $NegotiationSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NegotiationSession";
    objects: {
        buyer: Prisma.$UserPayload<ExtArgs>;
        farmer: Prisma.$UserPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
        messages: Prisma.$ChatMessagePayload<ExtArgs>[];
        proposals: Prisma.$PriceProposalPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        buyerId: string;
        farmerId: string;
        productId: string;
        status: $Enums.NegotiationStatus;
        agreedPrice: runtime.Decimal | null;
        agreedQuantity: number | null;
        lastMessageAt: Date | null;
        lastMessagePreview: string | null;
        buyerUnreadCount: number;
        farmerUnreadCount: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["negotiationSession"]>;
    composites: {};
};
export type NegotiationSessionGetPayload<S extends boolean | null | undefined | NegotiationSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload, S>;
export type NegotiationSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NegotiationSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NegotiationSessionCountAggregateInputType | true;
};
export interface NegotiationSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NegotiationSession'];
        meta: {
            name: 'NegotiationSession';
        };
    };
    findUnique<T extends NegotiationSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, NegotiationSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NegotiationSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NegotiationSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NegotiationSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, NegotiationSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NegotiationSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NegotiationSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NegotiationSessionFindManyArgs>(args?: Prisma.SelectSubset<T, NegotiationSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NegotiationSessionCreateArgs>(args: Prisma.SelectSubset<T, NegotiationSessionCreateArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NegotiationSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, NegotiationSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends NegotiationSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NegotiationSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends NegotiationSessionDeleteArgs>(args: Prisma.SelectSubset<T, NegotiationSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NegotiationSessionUpdateArgs>(args: Prisma.SelectSubset<T, NegotiationSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NegotiationSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, NegotiationSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NegotiationSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, NegotiationSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends NegotiationSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NegotiationSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends NegotiationSessionUpsertArgs>(args: Prisma.SelectSubset<T, NegotiationSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NegotiationSessionCountArgs>(args?: Prisma.Subset<T, NegotiationSessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NegotiationSessionCountAggregateOutputType> : number>;
    aggregate<T extends NegotiationSessionAggregateArgs>(args: Prisma.Subset<T, NegotiationSessionAggregateArgs>): Prisma.PrismaPromise<GetNegotiationSessionAggregateType<T>>;
    groupBy<T extends NegotiationSessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NegotiationSessionGroupByArgs['orderBy'];
    } : {
        orderBy?: NegotiationSessionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NegotiationSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNegotiationSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NegotiationSessionFieldRefs;
}
export interface Prisma__NegotiationSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    buyer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    farmer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    messages<T extends Prisma.NegotiationSession$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NegotiationSession$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    proposals<T extends Prisma.NegotiationSession$proposalsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NegotiationSession$proposalsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.NegotiationSession$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NegotiationSession$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NegotiationSessionFieldRefs {
    readonly id: Prisma.FieldRef<"NegotiationSession", 'String'>;
    readonly buyerId: Prisma.FieldRef<"NegotiationSession", 'String'>;
    readonly farmerId: Prisma.FieldRef<"NegotiationSession", 'String'>;
    readonly productId: Prisma.FieldRef<"NegotiationSession", 'String'>;
    readonly status: Prisma.FieldRef<"NegotiationSession", 'NegotiationStatus'>;
    readonly agreedPrice: Prisma.FieldRef<"NegotiationSession", 'Decimal'>;
    readonly agreedQuantity: Prisma.FieldRef<"NegotiationSession", 'Int'>;
    readonly lastMessageAt: Prisma.FieldRef<"NegotiationSession", 'DateTime'>;
    readonly lastMessagePreview: Prisma.FieldRef<"NegotiationSession", 'String'>;
    readonly buyerUnreadCount: Prisma.FieldRef<"NegotiationSession", 'Int'>;
    readonly farmerUnreadCount: Prisma.FieldRef<"NegotiationSession", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"NegotiationSession", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"NegotiationSession", 'DateTime'>;
}
export type NegotiationSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
    where: Prisma.NegotiationSessionWhereUniqueInput;
};
export type NegotiationSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
    where: Prisma.NegotiationSessionWhereUniqueInput;
};
export type NegotiationSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
    where?: Prisma.NegotiationSessionWhereInput;
    orderBy?: Prisma.NegotiationSessionOrderByWithRelationInput | Prisma.NegotiationSessionOrderByWithRelationInput[];
    cursor?: Prisma.NegotiationSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NegotiationSessionScalarFieldEnum | Prisma.NegotiationSessionScalarFieldEnum[];
};
export type NegotiationSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
    where?: Prisma.NegotiationSessionWhereInput;
    orderBy?: Prisma.NegotiationSessionOrderByWithRelationInput | Prisma.NegotiationSessionOrderByWithRelationInput[];
    cursor?: Prisma.NegotiationSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NegotiationSessionScalarFieldEnum | Prisma.NegotiationSessionScalarFieldEnum[];
};
export type NegotiationSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
    where?: Prisma.NegotiationSessionWhereInput;
    orderBy?: Prisma.NegotiationSessionOrderByWithRelationInput | Prisma.NegotiationSessionOrderByWithRelationInput[];
    cursor?: Prisma.NegotiationSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NegotiationSessionScalarFieldEnum | Prisma.NegotiationSessionScalarFieldEnum[];
};
export type NegotiationSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NegotiationSessionCreateInput, Prisma.NegotiationSessionUncheckedCreateInput>;
};
export type NegotiationSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NegotiationSessionCreateManyInput | Prisma.NegotiationSessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NegotiationSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    data: Prisma.NegotiationSessionCreateManyInput | Prisma.NegotiationSessionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.NegotiationSessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type NegotiationSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateInput, Prisma.NegotiationSessionUncheckedUpdateInput>;
    where: Prisma.NegotiationSessionWhereUniqueInput;
};
export type NegotiationSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateManyMutationInput, Prisma.NegotiationSessionUncheckedUpdateManyInput>;
    where?: Prisma.NegotiationSessionWhereInput;
    limit?: number;
};
export type NegotiationSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NegotiationSessionUpdateManyMutationInput, Prisma.NegotiationSessionUncheckedUpdateManyInput>;
    where?: Prisma.NegotiationSessionWhereInput;
    limit?: number;
    include?: Prisma.NegotiationSessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type NegotiationSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
    where: Prisma.NegotiationSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.NegotiationSessionCreateInput, Prisma.NegotiationSessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NegotiationSessionUpdateInput, Prisma.NegotiationSessionUncheckedUpdateInput>;
};
export type NegotiationSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
    where: Prisma.NegotiationSessionWhereUniqueInput;
};
export type NegotiationSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NegotiationSessionWhereInput;
    limit?: number;
};
export type NegotiationSession$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where?: Prisma.ChatMessageWhereInput;
    orderBy?: Prisma.ChatMessageOrderByWithRelationInput | Prisma.ChatMessageOrderByWithRelationInput[];
    cursor?: Prisma.ChatMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatMessageScalarFieldEnum | Prisma.ChatMessageScalarFieldEnum[];
};
export type NegotiationSession$proposalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelect<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    include?: Prisma.PriceProposalInclude<ExtArgs> | null;
    where?: Prisma.PriceProposalWhereInput;
    orderBy?: Prisma.PriceProposalOrderByWithRelationInput | Prisma.PriceProposalOrderByWithRelationInput[];
    cursor?: Prisma.PriceProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PriceProposalScalarFieldEnum | Prisma.PriceProposalScalarFieldEnum[];
};
export type NegotiationSession$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderSelect<ExtArgs> | null;
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
export type NegotiationSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NegotiationSessionSelect<ExtArgs> | null;
    omit?: Prisma.NegotiationSessionOmit<ExtArgs> | null;
    include?: Prisma.NegotiationSessionInclude<ExtArgs> | null;
};
export {};
