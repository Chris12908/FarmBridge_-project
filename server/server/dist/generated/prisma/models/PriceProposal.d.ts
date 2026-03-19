import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type PriceProposalModel = runtime.Types.Result.DefaultSelection<Prisma.$PriceProposalPayload>;
export type AggregatePriceProposal = {
    _count: PriceProposalCountAggregateOutputType | null;
    _avg: PriceProposalAvgAggregateOutputType | null;
    _sum: PriceProposalSumAggregateOutputType | null;
    _min: PriceProposalMinAggregateOutputType | null;
    _max: PriceProposalMaxAggregateOutputType | null;
};
export type PriceProposalAvgAggregateOutputType = {
    proposedPrice: runtime.Decimal | null;
    proposedQuantity: number | null;
};
export type PriceProposalSumAggregateOutputType = {
    proposedPrice: runtime.Decimal | null;
    proposedQuantity: number | null;
};
export type PriceProposalMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    proposedByUserId: string | null;
    proposedBy: $Enums.Role | null;
    proposedPrice: runtime.Decimal | null;
    proposedQuantity: number | null;
    note: string | null;
    status: $Enums.ProposalStatus | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PriceProposalMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    proposedByUserId: string | null;
    proposedBy: $Enums.Role | null;
    proposedPrice: runtime.Decimal | null;
    proposedQuantity: number | null;
    note: string | null;
    status: $Enums.ProposalStatus | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PriceProposalCountAggregateOutputType = {
    id: number;
    sessionId: number;
    proposedByUserId: number;
    proposedBy: number;
    proposedPrice: number;
    proposedQuantity: number;
    note: number;
    status: number;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PriceProposalAvgAggregateInputType = {
    proposedPrice?: true;
    proposedQuantity?: true;
};
export type PriceProposalSumAggregateInputType = {
    proposedPrice?: true;
    proposedQuantity?: true;
};
export type PriceProposalMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    proposedByUserId?: true;
    proposedBy?: true;
    proposedPrice?: true;
    proposedQuantity?: true;
    note?: true;
    status?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PriceProposalMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    proposedByUserId?: true;
    proposedBy?: true;
    proposedPrice?: true;
    proposedQuantity?: true;
    note?: true;
    status?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PriceProposalCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    proposedByUserId?: true;
    proposedBy?: true;
    proposedPrice?: true;
    proposedQuantity?: true;
    note?: true;
    status?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PriceProposalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PriceProposalWhereInput;
    orderBy?: Prisma.PriceProposalOrderByWithRelationInput | Prisma.PriceProposalOrderByWithRelationInput[];
    cursor?: Prisma.PriceProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PriceProposalCountAggregateInputType;
    _avg?: PriceProposalAvgAggregateInputType;
    _sum?: PriceProposalSumAggregateInputType;
    _min?: PriceProposalMinAggregateInputType;
    _max?: PriceProposalMaxAggregateInputType;
};
export type GetPriceProposalAggregateType<T extends PriceProposalAggregateArgs> = {
    [P in keyof T & keyof AggregatePriceProposal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePriceProposal[P]> : Prisma.GetScalarType<T[P], AggregatePriceProposal[P]>;
};
export type PriceProposalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PriceProposalWhereInput;
    orderBy?: Prisma.PriceProposalOrderByWithAggregationInput | Prisma.PriceProposalOrderByWithAggregationInput[];
    by: Prisma.PriceProposalScalarFieldEnum[] | Prisma.PriceProposalScalarFieldEnum;
    having?: Prisma.PriceProposalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PriceProposalCountAggregateInputType | true;
    _avg?: PriceProposalAvgAggregateInputType;
    _sum?: PriceProposalSumAggregateInputType;
    _min?: PriceProposalMinAggregateInputType;
    _max?: PriceProposalMaxAggregateInputType;
};
export type PriceProposalGroupByOutputType = {
    id: string;
    sessionId: string;
    proposedByUserId: string;
    proposedBy: $Enums.Role;
    proposedPrice: runtime.Decimal;
    proposedQuantity: number;
    note: string | null;
    status: $Enums.ProposalStatus;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: PriceProposalCountAggregateOutputType | null;
    _avg: PriceProposalAvgAggregateOutputType | null;
    _sum: PriceProposalSumAggregateOutputType | null;
    _min: PriceProposalMinAggregateOutputType | null;
    _max: PriceProposalMaxAggregateOutputType | null;
};
type GetPriceProposalGroupByPayload<T extends PriceProposalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PriceProposalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PriceProposalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PriceProposalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PriceProposalGroupByOutputType[P]>;
}>>;
export type PriceProposalWhereInput = {
    AND?: Prisma.PriceProposalWhereInput | Prisma.PriceProposalWhereInput[];
    OR?: Prisma.PriceProposalWhereInput[];
    NOT?: Prisma.PriceProposalWhereInput | Prisma.PriceProposalWhereInput[];
    id?: Prisma.StringFilter<"PriceProposal"> | string;
    sessionId?: Prisma.StringFilter<"PriceProposal"> | string;
    proposedByUserId?: Prisma.StringFilter<"PriceProposal"> | string;
    proposedBy?: Prisma.EnumRoleFilter<"PriceProposal"> | $Enums.Role;
    proposedPrice?: Prisma.DecimalFilter<"PriceProposal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFilter<"PriceProposal"> | number;
    note?: Prisma.StringNullableFilter<"PriceProposal"> | string | null;
    status?: Prisma.EnumProposalStatusFilter<"PriceProposal"> | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFilter<"PriceProposal"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PriceProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PriceProposal"> | Date | string;
    session?: Prisma.XOR<Prisma.NegotiationSessionScalarRelationFilter, Prisma.NegotiationSessionWhereInput>;
    messages?: Prisma.ChatMessageListRelationFilter;
};
export type PriceProposalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    proposedByUserId?: Prisma.SortOrder;
    proposedBy?: Prisma.SortOrder;
    proposedPrice?: Prisma.SortOrder;
    proposedQuantity?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    session?: Prisma.NegotiationSessionOrderByWithRelationInput;
    messages?: Prisma.ChatMessageOrderByRelationAggregateInput;
};
export type PriceProposalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PriceProposalWhereInput | Prisma.PriceProposalWhereInput[];
    OR?: Prisma.PriceProposalWhereInput[];
    NOT?: Prisma.PriceProposalWhereInput | Prisma.PriceProposalWhereInput[];
    sessionId?: Prisma.StringFilter<"PriceProposal"> | string;
    proposedByUserId?: Prisma.StringFilter<"PriceProposal"> | string;
    proposedBy?: Prisma.EnumRoleFilter<"PriceProposal"> | $Enums.Role;
    proposedPrice?: Prisma.DecimalFilter<"PriceProposal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFilter<"PriceProposal"> | number;
    note?: Prisma.StringNullableFilter<"PriceProposal"> | string | null;
    status?: Prisma.EnumProposalStatusFilter<"PriceProposal"> | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFilter<"PriceProposal"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PriceProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PriceProposal"> | Date | string;
    session?: Prisma.XOR<Prisma.NegotiationSessionScalarRelationFilter, Prisma.NegotiationSessionWhereInput>;
    messages?: Prisma.ChatMessageListRelationFilter;
}, "id">;
export type PriceProposalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    proposedByUserId?: Prisma.SortOrder;
    proposedBy?: Prisma.SortOrder;
    proposedPrice?: Prisma.SortOrder;
    proposedQuantity?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PriceProposalCountOrderByAggregateInput;
    _avg?: Prisma.PriceProposalAvgOrderByAggregateInput;
    _max?: Prisma.PriceProposalMaxOrderByAggregateInput;
    _min?: Prisma.PriceProposalMinOrderByAggregateInput;
    _sum?: Prisma.PriceProposalSumOrderByAggregateInput;
};
export type PriceProposalScalarWhereWithAggregatesInput = {
    AND?: Prisma.PriceProposalScalarWhereWithAggregatesInput | Prisma.PriceProposalScalarWhereWithAggregatesInput[];
    OR?: Prisma.PriceProposalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PriceProposalScalarWhereWithAggregatesInput | Prisma.PriceProposalScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PriceProposal"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"PriceProposal"> | string;
    proposedByUserId?: Prisma.StringWithAggregatesFilter<"PriceProposal"> | string;
    proposedBy?: Prisma.EnumRoleWithAggregatesFilter<"PriceProposal"> | $Enums.Role;
    proposedPrice?: Prisma.DecimalWithAggregatesFilter<"PriceProposal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntWithAggregatesFilter<"PriceProposal"> | number;
    note?: Prisma.StringNullableWithAggregatesFilter<"PriceProposal"> | string | null;
    status?: Prisma.EnumProposalStatusWithAggregatesFilter<"PriceProposal"> | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"PriceProposal"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PriceProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PriceProposal"> | Date | string;
};
export type PriceProposalCreateInput = {
    id?: string;
    proposedByUserId: string;
    proposedBy: $Enums.Role;
    proposedPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity: number;
    note?: string | null;
    status?: $Enums.ProposalStatus;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    session: Prisma.NegotiationSessionCreateNestedOneWithoutProposalsInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutPriceProposalInput;
};
export type PriceProposalUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    proposedByUserId: string;
    proposedBy: $Enums.Role;
    proposedPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity: number;
    note?: string | null;
    status?: $Enums.ProposalStatus;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutPriceProposalInput;
};
export type PriceProposalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedBy?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    proposedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.NegotiationSessionUpdateOneRequiredWithoutProposalsNestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutPriceProposalNestedInput;
};
export type PriceProposalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedBy?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    proposedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutPriceProposalNestedInput;
};
export type PriceProposalCreateManyInput = {
    id?: string;
    sessionId: string;
    proposedByUserId: string;
    proposedBy: $Enums.Role;
    proposedPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity: number;
    note?: string | null;
    status?: $Enums.ProposalStatus;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PriceProposalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedBy?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    proposedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PriceProposalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedBy?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    proposedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PriceProposalListRelationFilter = {
    every?: Prisma.PriceProposalWhereInput;
    some?: Prisma.PriceProposalWhereInput;
    none?: Prisma.PriceProposalWhereInput;
};
export type PriceProposalOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PriceProposalNullableScalarRelationFilter = {
    is?: Prisma.PriceProposalWhereInput | null;
    isNot?: Prisma.PriceProposalWhereInput | null;
};
export type PriceProposalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    proposedByUserId?: Prisma.SortOrder;
    proposedBy?: Prisma.SortOrder;
    proposedPrice?: Prisma.SortOrder;
    proposedQuantity?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PriceProposalAvgOrderByAggregateInput = {
    proposedPrice?: Prisma.SortOrder;
    proposedQuantity?: Prisma.SortOrder;
};
export type PriceProposalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    proposedByUserId?: Prisma.SortOrder;
    proposedBy?: Prisma.SortOrder;
    proposedPrice?: Prisma.SortOrder;
    proposedQuantity?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PriceProposalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    proposedByUserId?: Prisma.SortOrder;
    proposedBy?: Prisma.SortOrder;
    proposedPrice?: Prisma.SortOrder;
    proposedQuantity?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PriceProposalSumOrderByAggregateInput = {
    proposedPrice?: Prisma.SortOrder;
    proposedQuantity?: Prisma.SortOrder;
};
export type PriceProposalCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.PriceProposalCreateWithoutSessionInput, Prisma.PriceProposalUncheckedCreateWithoutSessionInput> | Prisma.PriceProposalCreateWithoutSessionInput[] | Prisma.PriceProposalUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.PriceProposalCreateOrConnectWithoutSessionInput | Prisma.PriceProposalCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.PriceProposalCreateManySessionInputEnvelope;
    connect?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
};
export type PriceProposalUncheckedCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.PriceProposalCreateWithoutSessionInput, Prisma.PriceProposalUncheckedCreateWithoutSessionInput> | Prisma.PriceProposalCreateWithoutSessionInput[] | Prisma.PriceProposalUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.PriceProposalCreateOrConnectWithoutSessionInput | Prisma.PriceProposalCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.PriceProposalCreateManySessionInputEnvelope;
    connect?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
};
export type PriceProposalUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.PriceProposalCreateWithoutSessionInput, Prisma.PriceProposalUncheckedCreateWithoutSessionInput> | Prisma.PriceProposalCreateWithoutSessionInput[] | Prisma.PriceProposalUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.PriceProposalCreateOrConnectWithoutSessionInput | Prisma.PriceProposalCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.PriceProposalUpsertWithWhereUniqueWithoutSessionInput | Prisma.PriceProposalUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.PriceProposalCreateManySessionInputEnvelope;
    set?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
    disconnect?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
    delete?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
    connect?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
    update?: Prisma.PriceProposalUpdateWithWhereUniqueWithoutSessionInput | Prisma.PriceProposalUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.PriceProposalUpdateManyWithWhereWithoutSessionInput | Prisma.PriceProposalUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.PriceProposalScalarWhereInput | Prisma.PriceProposalScalarWhereInput[];
};
export type PriceProposalUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.PriceProposalCreateWithoutSessionInput, Prisma.PriceProposalUncheckedCreateWithoutSessionInput> | Prisma.PriceProposalCreateWithoutSessionInput[] | Prisma.PriceProposalUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.PriceProposalCreateOrConnectWithoutSessionInput | Prisma.PriceProposalCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.PriceProposalUpsertWithWhereUniqueWithoutSessionInput | Prisma.PriceProposalUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.PriceProposalCreateManySessionInputEnvelope;
    set?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
    disconnect?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
    delete?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
    connect?: Prisma.PriceProposalWhereUniqueInput | Prisma.PriceProposalWhereUniqueInput[];
    update?: Prisma.PriceProposalUpdateWithWhereUniqueWithoutSessionInput | Prisma.PriceProposalUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.PriceProposalUpdateManyWithWhereWithoutSessionInput | Prisma.PriceProposalUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.PriceProposalScalarWhereInput | Prisma.PriceProposalScalarWhereInput[];
};
export type PriceProposalCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.PriceProposalCreateWithoutMessagesInput, Prisma.PriceProposalUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.PriceProposalCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.PriceProposalWhereUniqueInput;
};
export type PriceProposalUpdateOneWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.PriceProposalCreateWithoutMessagesInput, Prisma.PriceProposalUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.PriceProposalCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.PriceProposalUpsertWithoutMessagesInput;
    disconnect?: Prisma.PriceProposalWhereInput | boolean;
    delete?: Prisma.PriceProposalWhereInput | boolean;
    connect?: Prisma.PriceProposalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PriceProposalUpdateToOneWithWhereWithoutMessagesInput, Prisma.PriceProposalUpdateWithoutMessagesInput>, Prisma.PriceProposalUncheckedUpdateWithoutMessagesInput>;
};
export type EnumProposalStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProposalStatus;
};
export type PriceProposalCreateWithoutSessionInput = {
    id?: string;
    proposedByUserId: string;
    proposedBy: $Enums.Role;
    proposedPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity: number;
    note?: string | null;
    status?: $Enums.ProposalStatus;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutPriceProposalInput;
};
export type PriceProposalUncheckedCreateWithoutSessionInput = {
    id?: string;
    proposedByUserId: string;
    proposedBy: $Enums.Role;
    proposedPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity: number;
    note?: string | null;
    status?: $Enums.ProposalStatus;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutPriceProposalInput;
};
export type PriceProposalCreateOrConnectWithoutSessionInput = {
    where: Prisma.PriceProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.PriceProposalCreateWithoutSessionInput, Prisma.PriceProposalUncheckedCreateWithoutSessionInput>;
};
export type PriceProposalCreateManySessionInputEnvelope = {
    data: Prisma.PriceProposalCreateManySessionInput | Prisma.PriceProposalCreateManySessionInput[];
    skipDuplicates?: boolean;
};
export type PriceProposalUpsertWithWhereUniqueWithoutSessionInput = {
    where: Prisma.PriceProposalWhereUniqueInput;
    update: Prisma.XOR<Prisma.PriceProposalUpdateWithoutSessionInput, Prisma.PriceProposalUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.PriceProposalCreateWithoutSessionInput, Prisma.PriceProposalUncheckedCreateWithoutSessionInput>;
};
export type PriceProposalUpdateWithWhereUniqueWithoutSessionInput = {
    where: Prisma.PriceProposalWhereUniqueInput;
    data: Prisma.XOR<Prisma.PriceProposalUpdateWithoutSessionInput, Prisma.PriceProposalUncheckedUpdateWithoutSessionInput>;
};
export type PriceProposalUpdateManyWithWhereWithoutSessionInput = {
    where: Prisma.PriceProposalScalarWhereInput;
    data: Prisma.XOR<Prisma.PriceProposalUpdateManyMutationInput, Prisma.PriceProposalUncheckedUpdateManyWithoutSessionInput>;
};
export type PriceProposalScalarWhereInput = {
    AND?: Prisma.PriceProposalScalarWhereInput | Prisma.PriceProposalScalarWhereInput[];
    OR?: Prisma.PriceProposalScalarWhereInput[];
    NOT?: Prisma.PriceProposalScalarWhereInput | Prisma.PriceProposalScalarWhereInput[];
    id?: Prisma.StringFilter<"PriceProposal"> | string;
    sessionId?: Prisma.StringFilter<"PriceProposal"> | string;
    proposedByUserId?: Prisma.StringFilter<"PriceProposal"> | string;
    proposedBy?: Prisma.EnumRoleFilter<"PriceProposal"> | $Enums.Role;
    proposedPrice?: Prisma.DecimalFilter<"PriceProposal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFilter<"PriceProposal"> | number;
    note?: Prisma.StringNullableFilter<"PriceProposal"> | string | null;
    status?: Prisma.EnumProposalStatusFilter<"PriceProposal"> | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFilter<"PriceProposal"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PriceProposal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PriceProposal"> | Date | string;
};
export type PriceProposalCreateWithoutMessagesInput = {
    id?: string;
    proposedByUserId: string;
    proposedBy: $Enums.Role;
    proposedPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity: number;
    note?: string | null;
    status?: $Enums.ProposalStatus;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    session: Prisma.NegotiationSessionCreateNestedOneWithoutProposalsInput;
};
export type PriceProposalUncheckedCreateWithoutMessagesInput = {
    id?: string;
    sessionId: string;
    proposedByUserId: string;
    proposedBy: $Enums.Role;
    proposedPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity: number;
    note?: string | null;
    status?: $Enums.ProposalStatus;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PriceProposalCreateOrConnectWithoutMessagesInput = {
    where: Prisma.PriceProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.PriceProposalCreateWithoutMessagesInput, Prisma.PriceProposalUncheckedCreateWithoutMessagesInput>;
};
export type PriceProposalUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.PriceProposalUpdateWithoutMessagesInput, Prisma.PriceProposalUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.PriceProposalCreateWithoutMessagesInput, Prisma.PriceProposalUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.PriceProposalWhereInput;
};
export type PriceProposalUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.PriceProposalWhereInput;
    data: Prisma.XOR<Prisma.PriceProposalUpdateWithoutMessagesInput, Prisma.PriceProposalUncheckedUpdateWithoutMessagesInput>;
};
export type PriceProposalUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedBy?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    proposedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.NegotiationSessionUpdateOneRequiredWithoutProposalsNestedInput;
};
export type PriceProposalUncheckedUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedBy?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    proposedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PriceProposalCreateManySessionInput = {
    id?: string;
    proposedByUserId: string;
    proposedBy: $Enums.Role;
    proposedPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity: number;
    note?: string | null;
    status?: $Enums.ProposalStatus;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PriceProposalUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedBy?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    proposedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUpdateManyWithoutPriceProposalNestedInput;
};
export type PriceProposalUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedBy?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    proposedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutPriceProposalNestedInput;
};
export type PriceProposalUncheckedUpdateManyWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    proposedBy?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    proposedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    proposedQuantity?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PriceProposalCountOutputType = {
    messages: number;
};
export type PriceProposalCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    messages?: boolean | PriceProposalCountOutputTypeCountMessagesArgs;
};
export type PriceProposalCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalCountOutputTypeSelect<ExtArgs> | null;
};
export type PriceProposalCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
};
export type PriceProposalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    proposedByUserId?: boolean;
    proposedBy?: boolean;
    proposedPrice?: boolean;
    proposedQuantity?: boolean;
    note?: boolean;
    status?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.PriceProposal$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.PriceProposalCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["priceProposal"]>;
export type PriceProposalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    proposedByUserId?: boolean;
    proposedBy?: boolean;
    proposedPrice?: boolean;
    proposedQuantity?: boolean;
    note?: boolean;
    status?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["priceProposal"]>;
export type PriceProposalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    proposedByUserId?: boolean;
    proposedBy?: boolean;
    proposedPrice?: boolean;
    proposedQuantity?: boolean;
    note?: boolean;
    status?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["priceProposal"]>;
export type PriceProposalSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    proposedByUserId?: boolean;
    proposedBy?: boolean;
    proposedPrice?: boolean;
    proposedQuantity?: boolean;
    note?: boolean;
    status?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PriceProposalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "proposedByUserId" | "proposedBy" | "proposedPrice" | "proposedQuantity" | "note" | "status" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["priceProposal"]>;
export type PriceProposalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.PriceProposal$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.PriceProposalCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PriceProposalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
};
export type PriceProposalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
};
export type $PriceProposalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PriceProposal";
    objects: {
        session: Prisma.$NegotiationSessionPayload<ExtArgs>;
        messages: Prisma.$ChatMessagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        proposedByUserId: string;
        proposedBy: $Enums.Role;
        proposedPrice: runtime.Decimal;
        proposedQuantity: number;
        note: string | null;
        status: $Enums.ProposalStatus;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["priceProposal"]>;
    composites: {};
};
export type PriceProposalGetPayload<S extends boolean | null | undefined | PriceProposalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload, S>;
export type PriceProposalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PriceProposalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PriceProposalCountAggregateInputType | true;
};
export interface PriceProposalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PriceProposal'];
        meta: {
            name: 'PriceProposal';
        };
    };
    findUnique<T extends PriceProposalFindUniqueArgs>(args: Prisma.SelectSubset<T, PriceProposalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PriceProposalClient<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PriceProposalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PriceProposalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PriceProposalClient<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PriceProposalFindFirstArgs>(args?: Prisma.SelectSubset<T, PriceProposalFindFirstArgs<ExtArgs>>): Prisma.Prisma__PriceProposalClient<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PriceProposalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PriceProposalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PriceProposalClient<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PriceProposalFindManyArgs>(args?: Prisma.SelectSubset<T, PriceProposalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PriceProposalCreateArgs>(args: Prisma.SelectSubset<T, PriceProposalCreateArgs<ExtArgs>>): Prisma.Prisma__PriceProposalClient<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PriceProposalCreateManyArgs>(args?: Prisma.SelectSubset<T, PriceProposalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PriceProposalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PriceProposalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PriceProposalDeleteArgs>(args: Prisma.SelectSubset<T, PriceProposalDeleteArgs<ExtArgs>>): Prisma.Prisma__PriceProposalClient<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PriceProposalUpdateArgs>(args: Prisma.SelectSubset<T, PriceProposalUpdateArgs<ExtArgs>>): Prisma.Prisma__PriceProposalClient<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PriceProposalDeleteManyArgs>(args?: Prisma.SelectSubset<T, PriceProposalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PriceProposalUpdateManyArgs>(args: Prisma.SelectSubset<T, PriceProposalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PriceProposalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PriceProposalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PriceProposalUpsertArgs>(args: Prisma.SelectSubset<T, PriceProposalUpsertArgs<ExtArgs>>): Prisma.Prisma__PriceProposalClient<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PriceProposalCountArgs>(args?: Prisma.Subset<T, PriceProposalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PriceProposalCountAggregateOutputType> : number>;
    aggregate<T extends PriceProposalAggregateArgs>(args: Prisma.Subset<T, PriceProposalAggregateArgs>): Prisma.PrismaPromise<GetPriceProposalAggregateType<T>>;
    groupBy<T extends PriceProposalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PriceProposalGroupByArgs['orderBy'];
    } : {
        orderBy?: PriceProposalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PriceProposalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceProposalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PriceProposalFieldRefs;
}
export interface Prisma__PriceProposalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.NegotiationSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NegotiationSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    messages<T extends Prisma.PriceProposal$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PriceProposal$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PriceProposalFieldRefs {
    readonly id: Prisma.FieldRef<"PriceProposal", 'String'>;
    readonly sessionId: Prisma.FieldRef<"PriceProposal", 'String'>;
    readonly proposedByUserId: Prisma.FieldRef<"PriceProposal", 'String'>;
    readonly proposedBy: Prisma.FieldRef<"PriceProposal", 'Role'>;
    readonly proposedPrice: Prisma.FieldRef<"PriceProposal", 'Decimal'>;
    readonly proposedQuantity: Prisma.FieldRef<"PriceProposal", 'Int'>;
    readonly note: Prisma.FieldRef<"PriceProposal", 'String'>;
    readonly status: Prisma.FieldRef<"PriceProposal", 'ProposalStatus'>;
    readonly expiresAt: Prisma.FieldRef<"PriceProposal", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PriceProposal", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PriceProposal", 'DateTime'>;
}
export type PriceProposalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelect<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    include?: Prisma.PriceProposalInclude<ExtArgs> | null;
    where: Prisma.PriceProposalWhereUniqueInput;
};
export type PriceProposalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelect<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    include?: Prisma.PriceProposalInclude<ExtArgs> | null;
    where: Prisma.PriceProposalWhereUniqueInput;
};
export type PriceProposalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PriceProposalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PriceProposalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PriceProposalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelect<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    include?: Prisma.PriceProposalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PriceProposalCreateInput, Prisma.PriceProposalUncheckedCreateInput>;
};
export type PriceProposalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PriceProposalCreateManyInput | Prisma.PriceProposalCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PriceProposalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    data: Prisma.PriceProposalCreateManyInput | Prisma.PriceProposalCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PriceProposalIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PriceProposalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelect<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    include?: Prisma.PriceProposalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PriceProposalUpdateInput, Prisma.PriceProposalUncheckedUpdateInput>;
    where: Prisma.PriceProposalWhereUniqueInput;
};
export type PriceProposalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PriceProposalUpdateManyMutationInput, Prisma.PriceProposalUncheckedUpdateManyInput>;
    where?: Prisma.PriceProposalWhereInput;
    limit?: number;
};
export type PriceProposalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PriceProposalUpdateManyMutationInput, Prisma.PriceProposalUncheckedUpdateManyInput>;
    where?: Prisma.PriceProposalWhereInput;
    limit?: number;
    include?: Prisma.PriceProposalIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PriceProposalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelect<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    include?: Prisma.PriceProposalInclude<ExtArgs> | null;
    where: Prisma.PriceProposalWhereUniqueInput;
    create: Prisma.XOR<Prisma.PriceProposalCreateInput, Prisma.PriceProposalUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PriceProposalUpdateInput, Prisma.PriceProposalUncheckedUpdateInput>;
};
export type PriceProposalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelect<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    include?: Prisma.PriceProposalInclude<ExtArgs> | null;
    where: Prisma.PriceProposalWhereUniqueInput;
};
export type PriceProposalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PriceProposalWhereInput;
    limit?: number;
};
export type PriceProposal$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PriceProposalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelect<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    include?: Prisma.PriceProposalInclude<ExtArgs> | null;
};
export {};
