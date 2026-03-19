import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ChatMessageModel = runtime.Types.Result.DefaultSelection<Prisma.$ChatMessagePayload>;
export type AggregateChatMessage = {
    _count: ChatMessageCountAggregateOutputType | null;
    _avg: ChatMessageAvgAggregateOutputType | null;
    _sum: ChatMessageSumAggregateOutputType | null;
    _min: ChatMessageMinAggregateOutputType | null;
    _max: ChatMessageMaxAggregateOutputType | null;
};
export type ChatMessageAvgAggregateOutputType = {
    voiceNoteDurationSecs: number | null;
};
export type ChatMessageSumAggregateOutputType = {
    voiceNoteDurationSecs: number | null;
};
export type ChatMessageMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    senderId: string | null;
    senderRole: $Enums.Role | null;
    type: $Enums.MessageType | null;
    text: string | null;
    voiceNoteUrl: string | null;
    voiceNoteDurationSecs: number | null;
    imageUrl: string | null;
    priceProposalId: string | null;
    readByRecipient: boolean | null;
    createdAt: Date | null;
};
export type ChatMessageMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    senderId: string | null;
    senderRole: $Enums.Role | null;
    type: $Enums.MessageType | null;
    text: string | null;
    voiceNoteUrl: string | null;
    voiceNoteDurationSecs: number | null;
    imageUrl: string | null;
    priceProposalId: string | null;
    readByRecipient: boolean | null;
    createdAt: Date | null;
};
export type ChatMessageCountAggregateOutputType = {
    id: number;
    sessionId: number;
    senderId: number;
    senderRole: number;
    type: number;
    text: number;
    voiceNoteUrl: number;
    voiceNoteDurationSecs: number;
    imageUrl: number;
    priceProposalId: number;
    readByRecipient: number;
    createdAt: number;
    _all: number;
};
export type ChatMessageAvgAggregateInputType = {
    voiceNoteDurationSecs?: true;
};
export type ChatMessageSumAggregateInputType = {
    voiceNoteDurationSecs?: true;
};
export type ChatMessageMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    senderId?: true;
    senderRole?: true;
    type?: true;
    text?: true;
    voiceNoteUrl?: true;
    voiceNoteDurationSecs?: true;
    imageUrl?: true;
    priceProposalId?: true;
    readByRecipient?: true;
    createdAt?: true;
};
export type ChatMessageMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    senderId?: true;
    senderRole?: true;
    type?: true;
    text?: true;
    voiceNoteUrl?: true;
    voiceNoteDurationSecs?: true;
    imageUrl?: true;
    priceProposalId?: true;
    readByRecipient?: true;
    createdAt?: true;
};
export type ChatMessageCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    senderId?: true;
    senderRole?: true;
    type?: true;
    text?: true;
    voiceNoteUrl?: true;
    voiceNoteDurationSecs?: true;
    imageUrl?: true;
    priceProposalId?: true;
    readByRecipient?: true;
    createdAt?: true;
    _all?: true;
};
export type ChatMessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
    orderBy?: Prisma.ChatMessageOrderByWithRelationInput | Prisma.ChatMessageOrderByWithRelationInput[];
    cursor?: Prisma.ChatMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ChatMessageCountAggregateInputType;
    _avg?: ChatMessageAvgAggregateInputType;
    _sum?: ChatMessageSumAggregateInputType;
    _min?: ChatMessageMinAggregateInputType;
    _max?: ChatMessageMaxAggregateInputType;
};
export type GetChatMessageAggregateType<T extends ChatMessageAggregateArgs> = {
    [P in keyof T & keyof AggregateChatMessage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChatMessage[P]> : Prisma.GetScalarType<T[P], AggregateChatMessage[P]>;
};
export type ChatMessageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
    orderBy?: Prisma.ChatMessageOrderByWithAggregationInput | Prisma.ChatMessageOrderByWithAggregationInput[];
    by: Prisma.ChatMessageScalarFieldEnum[] | Prisma.ChatMessageScalarFieldEnum;
    having?: Prisma.ChatMessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChatMessageCountAggregateInputType | true;
    _avg?: ChatMessageAvgAggregateInputType;
    _sum?: ChatMessageSumAggregateInputType;
    _min?: ChatMessageMinAggregateInputType;
    _max?: ChatMessageMaxAggregateInputType;
};
export type ChatMessageGroupByOutputType = {
    id: string;
    sessionId: string;
    senderId: string;
    senderRole: $Enums.Role;
    type: $Enums.MessageType;
    text: string | null;
    voiceNoteUrl: string | null;
    voiceNoteDurationSecs: number | null;
    imageUrl: string | null;
    priceProposalId: string | null;
    readByRecipient: boolean;
    createdAt: Date;
    _count: ChatMessageCountAggregateOutputType | null;
    _avg: ChatMessageAvgAggregateOutputType | null;
    _sum: ChatMessageSumAggregateOutputType | null;
    _min: ChatMessageMinAggregateOutputType | null;
    _max: ChatMessageMaxAggregateOutputType | null;
};
type GetChatMessageGroupByPayload<T extends ChatMessageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChatMessageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChatMessageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChatMessageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChatMessageGroupByOutputType[P]>;
}>>;
export type ChatMessageWhereInput = {
    AND?: Prisma.ChatMessageWhereInput | Prisma.ChatMessageWhereInput[];
    OR?: Prisma.ChatMessageWhereInput[];
    NOT?: Prisma.ChatMessageWhereInput | Prisma.ChatMessageWhereInput[];
    id?: Prisma.StringFilter<"ChatMessage"> | string;
    sessionId?: Prisma.StringFilter<"ChatMessage"> | string;
    senderId?: Prisma.StringFilter<"ChatMessage"> | string;
    senderRole?: Prisma.EnumRoleFilter<"ChatMessage"> | $Enums.Role;
    type?: Prisma.EnumMessageTypeFilter<"ChatMessage"> | $Enums.MessageType;
    text?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    voiceNoteUrl?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    voiceNoteDurationSecs?: Prisma.IntNullableFilter<"ChatMessage"> | number | null;
    imageUrl?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    priceProposalId?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    readByRecipient?: Prisma.BoolFilter<"ChatMessage"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ChatMessage"> | Date | string;
    session?: Prisma.XOR<Prisma.NegotiationSessionScalarRelationFilter, Prisma.NegotiationSessionWhereInput>;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    priceProposal?: Prisma.XOR<Prisma.PriceProposalNullableScalarRelationFilter, Prisma.PriceProposalWhereInput> | null;
};
export type ChatMessageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    senderRole?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    text?: Prisma.SortOrderInput | Prisma.SortOrder;
    voiceNoteUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    voiceNoteDurationSecs?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    priceProposalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    readByRecipient?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    session?: Prisma.NegotiationSessionOrderByWithRelationInput;
    sender?: Prisma.UserOrderByWithRelationInput;
    priceProposal?: Prisma.PriceProposalOrderByWithRelationInput;
};
export type ChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ChatMessageWhereInput | Prisma.ChatMessageWhereInput[];
    OR?: Prisma.ChatMessageWhereInput[];
    NOT?: Prisma.ChatMessageWhereInput | Prisma.ChatMessageWhereInput[];
    sessionId?: Prisma.StringFilter<"ChatMessage"> | string;
    senderId?: Prisma.StringFilter<"ChatMessage"> | string;
    senderRole?: Prisma.EnumRoleFilter<"ChatMessage"> | $Enums.Role;
    type?: Prisma.EnumMessageTypeFilter<"ChatMessage"> | $Enums.MessageType;
    text?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    voiceNoteUrl?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    voiceNoteDurationSecs?: Prisma.IntNullableFilter<"ChatMessage"> | number | null;
    imageUrl?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    priceProposalId?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    readByRecipient?: Prisma.BoolFilter<"ChatMessage"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ChatMessage"> | Date | string;
    session?: Prisma.XOR<Prisma.NegotiationSessionScalarRelationFilter, Prisma.NegotiationSessionWhereInput>;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    priceProposal?: Prisma.XOR<Prisma.PriceProposalNullableScalarRelationFilter, Prisma.PriceProposalWhereInput> | null;
}, "id">;
export type ChatMessageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    senderRole?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    text?: Prisma.SortOrderInput | Prisma.SortOrder;
    voiceNoteUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    voiceNoteDurationSecs?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    priceProposalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    readByRecipient?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ChatMessageCountOrderByAggregateInput;
    _avg?: Prisma.ChatMessageAvgOrderByAggregateInput;
    _max?: Prisma.ChatMessageMaxOrderByAggregateInput;
    _min?: Prisma.ChatMessageMinOrderByAggregateInput;
    _sum?: Prisma.ChatMessageSumOrderByAggregateInput;
};
export type ChatMessageScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChatMessageScalarWhereWithAggregatesInput | Prisma.ChatMessageScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChatMessageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChatMessageScalarWhereWithAggregatesInput | Prisma.ChatMessageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ChatMessage"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"ChatMessage"> | string;
    senderId?: Prisma.StringWithAggregatesFilter<"ChatMessage"> | string;
    senderRole?: Prisma.EnumRoleWithAggregatesFilter<"ChatMessage"> | $Enums.Role;
    type?: Prisma.EnumMessageTypeWithAggregatesFilter<"ChatMessage"> | $Enums.MessageType;
    text?: Prisma.StringNullableWithAggregatesFilter<"ChatMessage"> | string | null;
    voiceNoteUrl?: Prisma.StringNullableWithAggregatesFilter<"ChatMessage"> | string | null;
    voiceNoteDurationSecs?: Prisma.IntNullableWithAggregatesFilter<"ChatMessage"> | number | null;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"ChatMessage"> | string | null;
    priceProposalId?: Prisma.StringNullableWithAggregatesFilter<"ChatMessage"> | string | null;
    readByRecipient?: Prisma.BoolWithAggregatesFilter<"ChatMessage"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string;
};
export type ChatMessageCreateInput = {
    id?: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
    session: Prisma.NegotiationSessionCreateNestedOneWithoutMessagesInput;
    sender: Prisma.UserCreateNestedOneWithoutSentMessagesInput;
    priceProposal?: Prisma.PriceProposalCreateNestedOneWithoutMessagesInput;
};
export type ChatMessageUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    senderId: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    priceProposalId?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
};
export type ChatMessageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.NegotiationSessionUpdateOneRequiredWithoutMessagesNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutSentMessagesNestedInput;
    priceProposal?: Prisma.PriceProposalUpdateOneWithoutMessagesNestedInput;
};
export type ChatMessageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priceProposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageCreateManyInput = {
    id?: string;
    sessionId: string;
    senderId: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    priceProposalId?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
};
export type ChatMessageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priceProposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageListRelationFilter = {
    every?: Prisma.ChatMessageWhereInput;
    some?: Prisma.ChatMessageWhereInput;
    none?: Prisma.ChatMessageWhereInput;
};
export type ChatMessageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ChatMessageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    senderRole?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    voiceNoteUrl?: Prisma.SortOrder;
    voiceNoteDurationSecs?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    priceProposalId?: Prisma.SortOrder;
    readByRecipient?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ChatMessageAvgOrderByAggregateInput = {
    voiceNoteDurationSecs?: Prisma.SortOrder;
};
export type ChatMessageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    senderRole?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    voiceNoteUrl?: Prisma.SortOrder;
    voiceNoteDurationSecs?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    priceProposalId?: Prisma.SortOrder;
    readByRecipient?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ChatMessageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    senderRole?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    voiceNoteUrl?: Prisma.SortOrder;
    voiceNoteDurationSecs?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    priceProposalId?: Prisma.SortOrder;
    readByRecipient?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ChatMessageSumOrderByAggregateInput = {
    voiceNoteDurationSecs?: Prisma.SortOrder;
};
export type ChatMessageCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput> | Prisma.ChatMessageCreateWithoutSenderInput[] | Prisma.ChatMessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSenderInput | Prisma.ChatMessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.ChatMessageCreateManySenderInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput> | Prisma.ChatMessageCreateWithoutSenderInput[] | Prisma.ChatMessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSenderInput | Prisma.ChatMessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.ChatMessageCreateManySenderInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput> | Prisma.ChatMessageCreateWithoutSenderInput[] | Prisma.ChatMessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSenderInput | Prisma.ChatMessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.ChatMessageCreateManySenderInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutSenderInput | Prisma.ChatMessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type ChatMessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput> | Prisma.ChatMessageCreateWithoutSenderInput[] | Prisma.ChatMessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSenderInput | Prisma.ChatMessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.ChatMessageCreateManySenderInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutSenderInput | Prisma.ChatMessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type ChatMessageCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSessionInput, Prisma.ChatMessageUncheckedCreateWithoutSessionInput> | Prisma.ChatMessageCreateWithoutSessionInput[] | Prisma.ChatMessageUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSessionInput | Prisma.ChatMessageCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.ChatMessageCreateManySessionInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUncheckedCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSessionInput, Prisma.ChatMessageUncheckedCreateWithoutSessionInput> | Prisma.ChatMessageCreateWithoutSessionInput[] | Prisma.ChatMessageUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSessionInput | Prisma.ChatMessageCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.ChatMessageCreateManySessionInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSessionInput, Prisma.ChatMessageUncheckedCreateWithoutSessionInput> | Prisma.ChatMessageCreateWithoutSessionInput[] | Prisma.ChatMessageUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSessionInput | Prisma.ChatMessageCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutSessionInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.ChatMessageCreateManySessionInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutSessionInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutSessionInput | Prisma.ChatMessageUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type ChatMessageUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSessionInput, Prisma.ChatMessageUncheckedCreateWithoutSessionInput> | Prisma.ChatMessageCreateWithoutSessionInput[] | Prisma.ChatMessageUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSessionInput | Prisma.ChatMessageCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutSessionInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.ChatMessageCreateManySessionInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutSessionInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutSessionInput | Prisma.ChatMessageUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type EnumMessageTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageType;
};
export type ChatMessageCreateNestedManyWithoutPriceProposalInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutPriceProposalInput, Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput> | Prisma.ChatMessageCreateWithoutPriceProposalInput[] | Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutPriceProposalInput | Prisma.ChatMessageCreateOrConnectWithoutPriceProposalInput[];
    createMany?: Prisma.ChatMessageCreateManyPriceProposalInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUncheckedCreateNestedManyWithoutPriceProposalInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutPriceProposalInput, Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput> | Prisma.ChatMessageCreateWithoutPriceProposalInput[] | Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutPriceProposalInput | Prisma.ChatMessageCreateOrConnectWithoutPriceProposalInput[];
    createMany?: Prisma.ChatMessageCreateManyPriceProposalInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUpdateManyWithoutPriceProposalNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutPriceProposalInput, Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput> | Prisma.ChatMessageCreateWithoutPriceProposalInput[] | Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutPriceProposalInput | Prisma.ChatMessageCreateOrConnectWithoutPriceProposalInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutPriceProposalInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutPriceProposalInput[];
    createMany?: Prisma.ChatMessageCreateManyPriceProposalInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutPriceProposalInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutPriceProposalInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutPriceProposalInput | Prisma.ChatMessageUpdateManyWithWhereWithoutPriceProposalInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type ChatMessageUncheckedUpdateManyWithoutPriceProposalNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutPriceProposalInput, Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput> | Prisma.ChatMessageCreateWithoutPriceProposalInput[] | Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutPriceProposalInput | Prisma.ChatMessageCreateOrConnectWithoutPriceProposalInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutPriceProposalInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutPriceProposalInput[];
    createMany?: Prisma.ChatMessageCreateManyPriceProposalInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutPriceProposalInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutPriceProposalInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutPriceProposalInput | Prisma.ChatMessageUpdateManyWithWhereWithoutPriceProposalInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type ChatMessageCreateWithoutSenderInput = {
    id?: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
    session: Prisma.NegotiationSessionCreateNestedOneWithoutMessagesInput;
    priceProposal?: Prisma.PriceProposalCreateNestedOneWithoutMessagesInput;
};
export type ChatMessageUncheckedCreateWithoutSenderInput = {
    id?: string;
    sessionId: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    priceProposalId?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
};
export type ChatMessageCreateOrConnectWithoutSenderInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput>;
};
export type ChatMessageCreateManySenderInputEnvelope = {
    data: Prisma.ChatMessageCreateManySenderInput | Prisma.ChatMessageCreateManySenderInput[];
    skipDuplicates?: boolean;
};
export type ChatMessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChatMessageUpdateWithoutSenderInput, Prisma.ChatMessageUncheckedUpdateWithoutSenderInput>;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput>;
};
export type ChatMessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateWithoutSenderInput, Prisma.ChatMessageUncheckedUpdateWithoutSenderInput>;
};
export type ChatMessageUpdateManyWithWhereWithoutSenderInput = {
    where: Prisma.ChatMessageScalarWhereInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateManyMutationInput, Prisma.ChatMessageUncheckedUpdateManyWithoutSenderInput>;
};
export type ChatMessageScalarWhereInput = {
    AND?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
    OR?: Prisma.ChatMessageScalarWhereInput[];
    NOT?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
    id?: Prisma.StringFilter<"ChatMessage"> | string;
    sessionId?: Prisma.StringFilter<"ChatMessage"> | string;
    senderId?: Prisma.StringFilter<"ChatMessage"> | string;
    senderRole?: Prisma.EnumRoleFilter<"ChatMessage"> | $Enums.Role;
    type?: Prisma.EnumMessageTypeFilter<"ChatMessage"> | $Enums.MessageType;
    text?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    voiceNoteUrl?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    voiceNoteDurationSecs?: Prisma.IntNullableFilter<"ChatMessage"> | number | null;
    imageUrl?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    priceProposalId?: Prisma.StringNullableFilter<"ChatMessage"> | string | null;
    readByRecipient?: Prisma.BoolFilter<"ChatMessage"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ChatMessage"> | Date | string;
};
export type ChatMessageCreateWithoutSessionInput = {
    id?: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
    sender: Prisma.UserCreateNestedOneWithoutSentMessagesInput;
    priceProposal?: Prisma.PriceProposalCreateNestedOneWithoutMessagesInput;
};
export type ChatMessageUncheckedCreateWithoutSessionInput = {
    id?: string;
    senderId: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    priceProposalId?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
};
export type ChatMessageCreateOrConnectWithoutSessionInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutSessionInput, Prisma.ChatMessageUncheckedCreateWithoutSessionInput>;
};
export type ChatMessageCreateManySessionInputEnvelope = {
    data: Prisma.ChatMessageCreateManySessionInput | Prisma.ChatMessageCreateManySessionInput[];
    skipDuplicates?: boolean;
};
export type ChatMessageUpsertWithWhereUniqueWithoutSessionInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChatMessageUpdateWithoutSessionInput, Prisma.ChatMessageUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutSessionInput, Prisma.ChatMessageUncheckedCreateWithoutSessionInput>;
};
export type ChatMessageUpdateWithWhereUniqueWithoutSessionInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateWithoutSessionInput, Prisma.ChatMessageUncheckedUpdateWithoutSessionInput>;
};
export type ChatMessageUpdateManyWithWhereWithoutSessionInput = {
    where: Prisma.ChatMessageScalarWhereInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateManyMutationInput, Prisma.ChatMessageUncheckedUpdateManyWithoutSessionInput>;
};
export type ChatMessageCreateWithoutPriceProposalInput = {
    id?: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
    session: Prisma.NegotiationSessionCreateNestedOneWithoutMessagesInput;
    sender: Prisma.UserCreateNestedOneWithoutSentMessagesInput;
};
export type ChatMessageUncheckedCreateWithoutPriceProposalInput = {
    id?: string;
    sessionId: string;
    senderId: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
};
export type ChatMessageCreateOrConnectWithoutPriceProposalInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutPriceProposalInput, Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput>;
};
export type ChatMessageCreateManyPriceProposalInputEnvelope = {
    data: Prisma.ChatMessageCreateManyPriceProposalInput | Prisma.ChatMessageCreateManyPriceProposalInput[];
    skipDuplicates?: boolean;
};
export type ChatMessageUpsertWithWhereUniqueWithoutPriceProposalInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChatMessageUpdateWithoutPriceProposalInput, Prisma.ChatMessageUncheckedUpdateWithoutPriceProposalInput>;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutPriceProposalInput, Prisma.ChatMessageUncheckedCreateWithoutPriceProposalInput>;
};
export type ChatMessageUpdateWithWhereUniqueWithoutPriceProposalInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateWithoutPriceProposalInput, Prisma.ChatMessageUncheckedUpdateWithoutPriceProposalInput>;
};
export type ChatMessageUpdateManyWithWhereWithoutPriceProposalInput = {
    where: Prisma.ChatMessageScalarWhereInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateManyMutationInput, Prisma.ChatMessageUncheckedUpdateManyWithoutPriceProposalInput>;
};
export type ChatMessageCreateManySenderInput = {
    id?: string;
    sessionId: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    priceProposalId?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
};
export type ChatMessageUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.NegotiationSessionUpdateOneRequiredWithoutMessagesNestedInput;
    priceProposal?: Prisma.PriceProposalUpdateOneWithoutMessagesNestedInput;
};
export type ChatMessageUncheckedUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priceProposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageUncheckedUpdateManyWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priceProposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageCreateManySessionInput = {
    id?: string;
    senderId: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    priceProposalId?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
};
export type ChatMessageUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.UserUpdateOneRequiredWithoutSentMessagesNestedInput;
    priceProposal?: Prisma.PriceProposalUpdateOneWithoutMessagesNestedInput;
};
export type ChatMessageUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priceProposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageUncheckedUpdateManyWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priceProposalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageCreateManyPriceProposalInput = {
    id?: string;
    sessionId: string;
    senderId: string;
    senderRole: $Enums.Role;
    type?: $Enums.MessageType;
    text?: string | null;
    voiceNoteUrl?: string | null;
    voiceNoteDurationSecs?: number | null;
    imageUrl?: string | null;
    readByRecipient?: boolean;
    createdAt?: Date | string;
};
export type ChatMessageUpdateWithoutPriceProposalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.NegotiationSessionUpdateOneRequiredWithoutMessagesNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutSentMessagesNestedInput;
};
export type ChatMessageUncheckedUpdateWithoutPriceProposalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageUncheckedUpdateManyWithoutPriceProposalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderRole?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    voiceNoteDurationSecs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    readByRecipient?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    senderId?: boolean;
    senderRole?: boolean;
    type?: boolean;
    text?: boolean;
    voiceNoteUrl?: boolean;
    voiceNoteDurationSecs?: boolean;
    imageUrl?: boolean;
    priceProposalId?: boolean;
    readByRecipient?: boolean;
    createdAt?: boolean;
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    priceProposal?: boolean | Prisma.ChatMessage$priceProposalArgs<ExtArgs>;
}, ExtArgs["result"]["chatMessage"]>;
export type ChatMessageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    senderId?: boolean;
    senderRole?: boolean;
    type?: boolean;
    text?: boolean;
    voiceNoteUrl?: boolean;
    voiceNoteDurationSecs?: boolean;
    imageUrl?: boolean;
    priceProposalId?: boolean;
    readByRecipient?: boolean;
    createdAt?: boolean;
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    priceProposal?: boolean | Prisma.ChatMessage$priceProposalArgs<ExtArgs>;
}, ExtArgs["result"]["chatMessage"]>;
export type ChatMessageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    senderId?: boolean;
    senderRole?: boolean;
    type?: boolean;
    text?: boolean;
    voiceNoteUrl?: boolean;
    voiceNoteDurationSecs?: boolean;
    imageUrl?: boolean;
    priceProposalId?: boolean;
    readByRecipient?: boolean;
    createdAt?: boolean;
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    priceProposal?: boolean | Prisma.ChatMessage$priceProposalArgs<ExtArgs>;
}, ExtArgs["result"]["chatMessage"]>;
export type ChatMessageSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    senderId?: boolean;
    senderRole?: boolean;
    type?: boolean;
    text?: boolean;
    voiceNoteUrl?: boolean;
    voiceNoteDurationSecs?: boolean;
    imageUrl?: boolean;
    priceProposalId?: boolean;
    readByRecipient?: boolean;
    createdAt?: boolean;
};
export type ChatMessageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "senderId" | "senderRole" | "type" | "text" | "voiceNoteUrl" | "voiceNoteDurationSecs" | "imageUrl" | "priceProposalId" | "readByRecipient" | "createdAt", ExtArgs["result"]["chatMessage"]>;
export type ChatMessageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    priceProposal?: boolean | Prisma.ChatMessage$priceProposalArgs<ExtArgs>;
};
export type ChatMessageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    priceProposal?: boolean | Prisma.ChatMessage$priceProposalArgs<ExtArgs>;
};
export type ChatMessageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.NegotiationSessionDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    priceProposal?: boolean | Prisma.ChatMessage$priceProposalArgs<ExtArgs>;
};
export type $ChatMessagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ChatMessage";
    objects: {
        session: Prisma.$NegotiationSessionPayload<ExtArgs>;
        sender: Prisma.$UserPayload<ExtArgs>;
        priceProposal: Prisma.$PriceProposalPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        senderId: string;
        senderRole: $Enums.Role;
        type: $Enums.MessageType;
        text: string | null;
        voiceNoteUrl: string | null;
        voiceNoteDurationSecs: number | null;
        imageUrl: string | null;
        priceProposalId: string | null;
        readByRecipient: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["chatMessage"]>;
    composites: {};
};
export type ChatMessageGetPayload<S extends boolean | null | undefined | ChatMessageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload, S>;
export type ChatMessageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChatMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChatMessageCountAggregateInputType | true;
};
export interface ChatMessageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ChatMessage'];
        meta: {
            name: 'ChatMessage';
        };
    };
    findUnique<T extends ChatMessageFindUniqueArgs>(args: Prisma.SelectSubset<T, ChatMessageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ChatMessageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ChatMessageFindFirstArgs>(args?: Prisma.SelectSubset<T, ChatMessageFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ChatMessageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ChatMessageFindManyArgs>(args?: Prisma.SelectSubset<T, ChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ChatMessageCreateArgs>(args: Prisma.SelectSubset<T, ChatMessageCreateArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ChatMessageCreateManyArgs>(args?: Prisma.SelectSubset<T, ChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ChatMessageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ChatMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ChatMessageDeleteArgs>(args: Prisma.SelectSubset<T, ChatMessageDeleteArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ChatMessageUpdateArgs>(args: Prisma.SelectSubset<T, ChatMessageUpdateArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ChatMessageDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ChatMessageUpdateManyArgs>(args: Prisma.SelectSubset<T, ChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ChatMessageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ChatMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ChatMessageUpsertArgs>(args: Prisma.SelectSubset<T, ChatMessageUpsertArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ChatMessageCountArgs>(args?: Prisma.Subset<T, ChatMessageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChatMessageCountAggregateOutputType> : number>;
    aggregate<T extends ChatMessageAggregateArgs>(args: Prisma.Subset<T, ChatMessageAggregateArgs>): Prisma.PrismaPromise<GetChatMessageAggregateType<T>>;
    groupBy<T extends ChatMessageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChatMessageGroupByArgs['orderBy'];
    } : {
        orderBy?: ChatMessageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ChatMessageFieldRefs;
}
export interface Prisma__ChatMessageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.NegotiationSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NegotiationSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__NegotiationSessionClient<runtime.Types.Result.GetResult<Prisma.$NegotiationSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sender<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    priceProposal<T extends Prisma.ChatMessage$priceProposalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ChatMessage$priceProposalArgs<ExtArgs>>): Prisma.Prisma__PriceProposalClient<runtime.Types.Result.GetResult<Prisma.$PriceProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ChatMessageFieldRefs {
    readonly id: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly sessionId: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly senderId: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly senderRole: Prisma.FieldRef<"ChatMessage", 'Role'>;
    readonly type: Prisma.FieldRef<"ChatMessage", 'MessageType'>;
    readonly text: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly voiceNoteUrl: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly voiceNoteDurationSecs: Prisma.FieldRef<"ChatMessage", 'Int'>;
    readonly imageUrl: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly priceProposalId: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly readByRecipient: Prisma.FieldRef<"ChatMessage", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ChatMessage", 'DateTime'>;
}
export type ChatMessageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where: Prisma.ChatMessageWhereUniqueInput;
};
export type ChatMessageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where: Prisma.ChatMessageWhereUniqueInput;
};
export type ChatMessageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChatMessageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChatMessageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChatMessageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChatMessageCreateInput, Prisma.ChatMessageUncheckedCreateInput>;
};
export type ChatMessageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ChatMessageCreateManyInput | Prisma.ChatMessageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ChatMessageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    data: Prisma.ChatMessageCreateManyInput | Prisma.ChatMessageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ChatMessageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ChatMessageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChatMessageUpdateInput, Prisma.ChatMessageUncheckedUpdateInput>;
    where: Prisma.ChatMessageWhereUniqueInput;
};
export type ChatMessageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ChatMessageUpdateManyMutationInput, Prisma.ChatMessageUncheckedUpdateManyInput>;
    where?: Prisma.ChatMessageWhereInput;
    limit?: number;
};
export type ChatMessageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChatMessageUpdateManyMutationInput, Prisma.ChatMessageUncheckedUpdateManyInput>;
    where?: Prisma.ChatMessageWhereInput;
    limit?: number;
    include?: Prisma.ChatMessageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ChatMessageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where: Prisma.ChatMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatMessageCreateInput, Prisma.ChatMessageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ChatMessageUpdateInput, Prisma.ChatMessageUncheckedUpdateInput>;
};
export type ChatMessageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where: Prisma.ChatMessageWhereUniqueInput;
};
export type ChatMessageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
    limit?: number;
};
export type ChatMessage$priceProposalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriceProposalSelect<ExtArgs> | null;
    omit?: Prisma.PriceProposalOmit<ExtArgs> | null;
    include?: Prisma.PriceProposalInclude<ExtArgs> | null;
    where?: Prisma.PriceProposalWhereInput;
};
export type ChatMessageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
};
export {};
