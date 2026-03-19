import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ReviewModel = runtime.Types.Result.DefaultSelection<Prisma.$ReviewPayload>;
export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
export type ReviewAvgAggregateOutputType = {
    rating: number | null;
};
export type ReviewSumAggregateOutputType = {
    rating: number | null;
};
export type ReviewMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    reviewerId: string | null;
    farmerId: string | null;
    rating: number | null;
    comment: string | null;
    createdAt: Date | null;
};
export type ReviewMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    reviewerId: string | null;
    farmerId: string | null;
    rating: number | null;
    comment: string | null;
    createdAt: Date | null;
};
export type ReviewCountAggregateOutputType = {
    id: number;
    orderId: number;
    reviewerId: number;
    farmerId: number;
    rating: number;
    comment: number;
    createdAt: number;
    _all: number;
};
export type ReviewAvgAggregateInputType = {
    rating?: true;
};
export type ReviewSumAggregateInputType = {
    rating?: true;
};
export type ReviewMinAggregateInputType = {
    id?: true;
    orderId?: true;
    reviewerId?: true;
    farmerId?: true;
    rating?: true;
    comment?: true;
    createdAt?: true;
};
export type ReviewMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    reviewerId?: true;
    farmerId?: true;
    rating?: true;
    comment?: true;
    createdAt?: true;
};
export type ReviewCountAggregateInputType = {
    id?: true;
    orderId?: true;
    reviewerId?: true;
    farmerId?: true;
    rating?: true;
    comment?: true;
    createdAt?: true;
    _all?: true;
};
export type ReviewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReviewCountAggregateInputType;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
    [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReview[P]> : Prisma.GetScalarType<T[P], AggregateReview[P]>;
};
export type ReviewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithAggregationInput | Prisma.ReviewOrderByWithAggregationInput[];
    by: Prisma.ReviewScalarFieldEnum[] | Prisma.ReviewScalarFieldEnum;
    having?: Prisma.ReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReviewCountAggregateInputType | true;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type ReviewGroupByOutputType = {
    id: string;
    orderId: string;
    reviewerId: string;
    farmerId: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReviewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]>;
}>>;
export type ReviewWhereInput = {
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    id?: Prisma.StringFilter<"Review"> | string;
    orderId?: Prisma.StringFilter<"Review"> | string;
    reviewerId?: Prisma.StringFilter<"Review"> | string;
    farmerId?: Prisma.StringFilter<"Review"> | string;
    rating?: Prisma.IntFilter<"Review"> | number;
    comment?: Prisma.StringNullableFilter<"Review"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ReviewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
    reviewer?: Prisma.UserOrderByWithRelationInput;
};
export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    orderId?: string;
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    reviewerId?: Prisma.StringFilter<"Review"> | string;
    farmerId?: Prisma.StringFilter<"Review"> | string;
    rating?: Prisma.IntFilter<"Review"> | number;
    comment?: Prisma.StringNullableFilter<"Review"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "orderId">;
export type ReviewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ReviewCountOrderByAggregateInput;
    _avg?: Prisma.ReviewAvgOrderByAggregateInput;
    _max?: Prisma.ReviewMaxOrderByAggregateInput;
    _min?: Prisma.ReviewMinOrderByAggregateInput;
    _sum?: Prisma.ReviewSumOrderByAggregateInput;
};
export type ReviewScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReviewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    reviewerId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    farmerId?: Prisma.StringWithAggregatesFilter<"Review"> | string;
    rating?: Prisma.IntWithAggregatesFilter<"Review"> | number;
    comment?: Prisma.StringNullableWithAggregatesFilter<"Review"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Review"> | Date | string;
};
export type ReviewCreateInput = {
    id?: string;
    farmerId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutReviewInput;
    reviewer: Prisma.UserCreateNestedOneWithoutReviewsInput;
};
export type ReviewUncheckedCreateInput = {
    id?: string;
    orderId: string;
    reviewerId: string;
    farmerId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
};
export type ReviewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewNestedInput;
    reviewer?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
};
export type ReviewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewCreateManyInput = {
    id?: string;
    orderId: string;
    reviewerId: string;
    farmerId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
};
export type ReviewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewListRelationFilter = {
    every?: Prisma.ReviewWhereInput;
    some?: Prisma.ReviewWhereInput;
    none?: Prisma.ReviewWhereInput;
};
export type ReviewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReviewNullableScalarRelationFilter = {
    is?: Prisma.ReviewWhereInput | null;
    isNot?: Prisma.ReviewWhereInput | null;
};
export type ReviewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReviewAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type ReviewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReviewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReviewSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type ReviewCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput> | Prisma.ReviewCreateWithoutReviewerInput[] | Prisma.ReviewUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReviewerInput | Prisma.ReviewCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.ReviewCreateManyReviewerInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput> | Prisma.ReviewCreateWithoutReviewerInput[] | Prisma.ReviewUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReviewerInput | Prisma.ReviewCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.ReviewCreateManyReviewerInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput> | Prisma.ReviewCreateWithoutReviewerInput[] | Prisma.ReviewUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReviewerInput | Prisma.ReviewCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutReviewerInput | Prisma.ReviewUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.ReviewCreateManyReviewerInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutReviewerInput | Prisma.ReviewUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutReviewerInput | Prisma.ReviewUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput> | Prisma.ReviewCreateWithoutReviewerInput[] | Prisma.ReviewUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutReviewerInput | Prisma.ReviewCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutReviewerInput | Prisma.ReviewUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.ReviewCreateManyReviewerInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutReviewerInput | Prisma.ReviewUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutReviewerInput | Prisma.ReviewUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewCreateNestedOneWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutOrderInput;
    connect?: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUncheckedCreateNestedOneWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutOrderInput;
    connect?: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateOneWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutOrderInput;
    upsert?: Prisma.ReviewUpsertWithoutOrderInput;
    disconnect?: Prisma.ReviewWhereInput | boolean;
    delete?: Prisma.ReviewWhereInput | boolean;
    connect?: Prisma.ReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReviewUpdateToOneWithWhereWithoutOrderInput, Prisma.ReviewUpdateWithoutOrderInput>, Prisma.ReviewUncheckedUpdateWithoutOrderInput>;
};
export type ReviewUncheckedUpdateOneWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutOrderInput;
    upsert?: Prisma.ReviewUpsertWithoutOrderInput;
    disconnect?: Prisma.ReviewWhereInput | boolean;
    delete?: Prisma.ReviewWhereInput | boolean;
    connect?: Prisma.ReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReviewUpdateToOneWithWhereWithoutOrderInput, Prisma.ReviewUpdateWithoutOrderInput>, Prisma.ReviewUncheckedUpdateWithoutOrderInput>;
};
export type ReviewCreateWithoutReviewerInput = {
    id?: string;
    farmerId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutReviewInput;
};
export type ReviewUncheckedCreateWithoutReviewerInput = {
    id?: string;
    orderId: string;
    farmerId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutReviewerInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput>;
};
export type ReviewCreateManyReviewerInputEnvelope = {
    data: Prisma.ReviewCreateManyReviewerInput | Prisma.ReviewCreateManyReviewerInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutReviewerInput, Prisma.ReviewUncheckedUpdateWithoutReviewerInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutReviewerInput, Prisma.ReviewUncheckedCreateWithoutReviewerInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutReviewerInput, Prisma.ReviewUncheckedUpdateWithoutReviewerInput>;
};
export type ReviewUpdateManyWithWhereWithoutReviewerInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutReviewerInput>;
};
export type ReviewScalarWhereInput = {
    AND?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    OR?: Prisma.ReviewScalarWhereInput[];
    NOT?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    id?: Prisma.StringFilter<"Review"> | string;
    orderId?: Prisma.StringFilter<"Review"> | string;
    reviewerId?: Prisma.StringFilter<"Review"> | string;
    farmerId?: Prisma.StringFilter<"Review"> | string;
    rating?: Prisma.IntFilter<"Review"> | number;
    comment?: Prisma.StringNullableFilter<"Review"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
};
export type ReviewCreateWithoutOrderInput = {
    id?: string;
    farmerId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
    reviewer: Prisma.UserCreateNestedOneWithoutReviewsInput;
};
export type ReviewUncheckedCreateWithoutOrderInput = {
    id?: string;
    reviewerId: string;
    farmerId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutOrderInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput>;
};
export type ReviewUpsertWithoutOrderInput = {
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutOrderInput, Prisma.ReviewUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput>;
    where?: Prisma.ReviewWhereInput;
};
export type ReviewUpdateToOneWithWhereWithoutOrderInput = {
    where?: Prisma.ReviewWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutOrderInput, Prisma.ReviewUncheckedUpdateWithoutOrderInput>;
};
export type ReviewUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewer?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
};
export type ReviewUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewerId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewCreateManyReviewerInput = {
    id?: string;
    orderId: string;
    farmerId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
};
export type ReviewUpdateWithoutReviewerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewNestedInput;
};
export type ReviewUncheckedUpdateWithoutReviewerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutReviewerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    reviewerId?: boolean;
    farmerId?: boolean;
    rating?: boolean;
    comment?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    reviewerId?: boolean;
    farmerId?: boolean;
    rating?: boolean;
    comment?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    reviewerId?: boolean;
    farmerId?: boolean;
    rating?: boolean;
    comment?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    reviewerId?: boolean;
    farmerId?: boolean;
    rating?: boolean;
    comment?: boolean;
    createdAt?: boolean;
};
export type ReviewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "reviewerId" | "farmerId" | "rating" | "comment" | "createdAt", ExtArgs["result"]["review"]>;
export type ReviewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReviewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ReviewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Review";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
        reviewer: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        reviewerId: string;
        farmerId: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["review"]>;
    composites: {};
};
export type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReviewPayload, S>;
export type ReviewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReviewCountAggregateInputType | true;
};
export interface ReviewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Review'];
        meta: {
            name: 'Review';
        };
    };
    findUnique<T extends ReviewFindUniqueArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReviewFindFirstArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReviewFindManyArgs>(args?: Prisma.SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReviewCreateArgs>(args: Prisma.SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReviewCreateManyArgs>(args?: Prisma.SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReviewDeleteArgs>(args: Prisma.SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReviewUpdateArgs>(args: Prisma.SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReviewDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReviewUpdateManyArgs>(args: Prisma.SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReviewUpsertArgs>(args: Prisma.SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReviewCountArgs>(args?: Prisma.Subset<T, ReviewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReviewCountAggregateOutputType> : number>;
    aggregate<T extends ReviewAggregateArgs>(args: Prisma.Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>;
    groupBy<T extends ReviewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReviewGroupByArgs['orderBy'];
    } : {
        orderBy?: ReviewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReviewFieldRefs;
}
export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReviewFieldRefs {
    readonly id: Prisma.FieldRef<"Review", 'String'>;
    readonly orderId: Prisma.FieldRef<"Review", 'String'>;
    readonly reviewerId: Prisma.FieldRef<"Review", 'String'>;
    readonly farmerId: Prisma.FieldRef<"Review", 'String'>;
    readonly rating: Prisma.FieldRef<"Review", 'Int'>;
    readonly comment: Prisma.FieldRef<"Review", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Review", 'DateTime'>;
}
export type ReviewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
};
export type ReviewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReviewCreateManyInput | Prisma.ReviewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReviewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    data: Prisma.ReviewCreateManyInput | Prisma.ReviewCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReviewIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReviewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyInput>;
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type ReviewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyInput>;
    where?: Prisma.ReviewWhereInput;
    limit?: number;
    include?: Prisma.ReviewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReviewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
};
export type ReviewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type ReviewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
};
export {};
