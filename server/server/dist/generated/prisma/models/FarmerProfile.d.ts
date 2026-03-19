import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type FarmerProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$FarmerProfilePayload>;
export type AggregateFarmerProfile = {
    _count: FarmerProfileCountAggregateOutputType | null;
    _avg: FarmerProfileAvgAggregateOutputType | null;
    _sum: FarmerProfileSumAggregateOutputType | null;
    _min: FarmerProfileMinAggregateOutputType | null;
    _max: FarmerProfileMaxAggregateOutputType | null;
};
export type FarmerProfileAvgAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    rating: number | null;
    reviewCount: number | null;
    completedOrderCount: number | null;
};
export type FarmerProfileSumAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    rating: number | null;
    reviewCount: number | null;
    completedOrderCount: number | null;
};
export type FarmerProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    bio: string | null;
    farmName: string | null;
    farmLocation: string | null;
    latitude: number | null;
    longitude: number | null;
    verificationStatus: string | null;
    rating: number | null;
    reviewCount: number | null;
    completedOrderCount: number | null;
    profileComplete: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FarmerProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    bio: string | null;
    farmName: string | null;
    farmLocation: string | null;
    latitude: number | null;
    longitude: number | null;
    verificationStatus: string | null;
    rating: number | null;
    reviewCount: number | null;
    completedOrderCount: number | null;
    profileComplete: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FarmerProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    bio: number;
    farmName: number;
    farmLocation: number;
    latitude: number;
    longitude: number;
    crops: number;
    tags: number;
    verificationStatus: number;
    rating: number;
    reviewCount: number;
    completedOrderCount: number;
    profileComplete: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FarmerProfileAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
    rating?: true;
    reviewCount?: true;
    completedOrderCount?: true;
};
export type FarmerProfileSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
    rating?: true;
    reviewCount?: true;
    completedOrderCount?: true;
};
export type FarmerProfileMinAggregateInputType = {
    id?: true;
    userId?: true;
    bio?: true;
    farmName?: true;
    farmLocation?: true;
    latitude?: true;
    longitude?: true;
    verificationStatus?: true;
    rating?: true;
    reviewCount?: true;
    completedOrderCount?: true;
    profileComplete?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FarmerProfileMaxAggregateInputType = {
    id?: true;
    userId?: true;
    bio?: true;
    farmName?: true;
    farmLocation?: true;
    latitude?: true;
    longitude?: true;
    verificationStatus?: true;
    rating?: true;
    reviewCount?: true;
    completedOrderCount?: true;
    profileComplete?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FarmerProfileCountAggregateInputType = {
    id?: true;
    userId?: true;
    bio?: true;
    farmName?: true;
    farmLocation?: true;
    latitude?: true;
    longitude?: true;
    crops?: true;
    tags?: true;
    verificationStatus?: true;
    rating?: true;
    reviewCount?: true;
    completedOrderCount?: true;
    profileComplete?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FarmerProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FarmerProfileWhereInput;
    orderBy?: Prisma.FarmerProfileOrderByWithRelationInput | Prisma.FarmerProfileOrderByWithRelationInput[];
    cursor?: Prisma.FarmerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FarmerProfileCountAggregateInputType;
    _avg?: FarmerProfileAvgAggregateInputType;
    _sum?: FarmerProfileSumAggregateInputType;
    _min?: FarmerProfileMinAggregateInputType;
    _max?: FarmerProfileMaxAggregateInputType;
};
export type GetFarmerProfileAggregateType<T extends FarmerProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateFarmerProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFarmerProfile[P]> : Prisma.GetScalarType<T[P], AggregateFarmerProfile[P]>;
};
export type FarmerProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FarmerProfileWhereInput;
    orderBy?: Prisma.FarmerProfileOrderByWithAggregationInput | Prisma.FarmerProfileOrderByWithAggregationInput[];
    by: Prisma.FarmerProfileScalarFieldEnum[] | Prisma.FarmerProfileScalarFieldEnum;
    having?: Prisma.FarmerProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FarmerProfileCountAggregateInputType | true;
    _avg?: FarmerProfileAvgAggregateInputType;
    _sum?: FarmerProfileSumAggregateInputType;
    _min?: FarmerProfileMinAggregateInputType;
    _max?: FarmerProfileMaxAggregateInputType;
};
export type FarmerProfileGroupByOutputType = {
    id: string;
    userId: string;
    bio: string | null;
    farmName: string | null;
    farmLocation: string | null;
    latitude: number | null;
    longitude: number | null;
    crops: string[];
    tags: string[];
    verificationStatus: string;
    rating: number;
    reviewCount: number;
    completedOrderCount: number;
    profileComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: FarmerProfileCountAggregateOutputType | null;
    _avg: FarmerProfileAvgAggregateOutputType | null;
    _sum: FarmerProfileSumAggregateOutputType | null;
    _min: FarmerProfileMinAggregateOutputType | null;
    _max: FarmerProfileMaxAggregateOutputType | null;
};
type GetFarmerProfileGroupByPayload<T extends FarmerProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FarmerProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FarmerProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FarmerProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FarmerProfileGroupByOutputType[P]>;
}>>;
export type FarmerProfileWhereInput = {
    AND?: Prisma.FarmerProfileWhereInput | Prisma.FarmerProfileWhereInput[];
    OR?: Prisma.FarmerProfileWhereInput[];
    NOT?: Prisma.FarmerProfileWhereInput | Prisma.FarmerProfileWhereInput[];
    id?: Prisma.StringFilter<"FarmerProfile"> | string;
    userId?: Prisma.StringFilter<"FarmerProfile"> | string;
    bio?: Prisma.StringNullableFilter<"FarmerProfile"> | string | null;
    farmName?: Prisma.StringNullableFilter<"FarmerProfile"> | string | null;
    farmLocation?: Prisma.StringNullableFilter<"FarmerProfile"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"FarmerProfile"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"FarmerProfile"> | number | null;
    crops?: Prisma.StringNullableListFilter<"FarmerProfile">;
    tags?: Prisma.StringNullableListFilter<"FarmerProfile">;
    verificationStatus?: Prisma.StringFilter<"FarmerProfile"> | string;
    rating?: Prisma.FloatFilter<"FarmerProfile"> | number;
    reviewCount?: Prisma.IntFilter<"FarmerProfile"> | number;
    completedOrderCount?: Prisma.IntFilter<"FarmerProfile"> | number;
    profileComplete?: Prisma.BoolFilter<"FarmerProfile"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FarmerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FarmerProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type FarmerProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    farmName?: Prisma.SortOrderInput | Prisma.SortOrder;
    farmLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    crops?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    verificationStatus?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    completedOrderCount?: Prisma.SortOrder;
    profileComplete?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type FarmerProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.FarmerProfileWhereInput | Prisma.FarmerProfileWhereInput[];
    OR?: Prisma.FarmerProfileWhereInput[];
    NOT?: Prisma.FarmerProfileWhereInput | Prisma.FarmerProfileWhereInput[];
    bio?: Prisma.StringNullableFilter<"FarmerProfile"> | string | null;
    farmName?: Prisma.StringNullableFilter<"FarmerProfile"> | string | null;
    farmLocation?: Prisma.StringNullableFilter<"FarmerProfile"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"FarmerProfile"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"FarmerProfile"> | number | null;
    crops?: Prisma.StringNullableListFilter<"FarmerProfile">;
    tags?: Prisma.StringNullableListFilter<"FarmerProfile">;
    verificationStatus?: Prisma.StringFilter<"FarmerProfile"> | string;
    rating?: Prisma.FloatFilter<"FarmerProfile"> | number;
    reviewCount?: Prisma.IntFilter<"FarmerProfile"> | number;
    completedOrderCount?: Prisma.IntFilter<"FarmerProfile"> | number;
    profileComplete?: Prisma.BoolFilter<"FarmerProfile"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FarmerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FarmerProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type FarmerProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    farmName?: Prisma.SortOrderInput | Prisma.SortOrder;
    farmLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    crops?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    verificationStatus?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    completedOrderCount?: Prisma.SortOrder;
    profileComplete?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FarmerProfileCountOrderByAggregateInput;
    _avg?: Prisma.FarmerProfileAvgOrderByAggregateInput;
    _max?: Prisma.FarmerProfileMaxOrderByAggregateInput;
    _min?: Prisma.FarmerProfileMinOrderByAggregateInput;
    _sum?: Prisma.FarmerProfileSumOrderByAggregateInput;
};
export type FarmerProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.FarmerProfileScalarWhereWithAggregatesInput | Prisma.FarmerProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.FarmerProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FarmerProfileScalarWhereWithAggregatesInput | Prisma.FarmerProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FarmerProfile"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"FarmerProfile"> | string;
    bio?: Prisma.StringNullableWithAggregatesFilter<"FarmerProfile"> | string | null;
    farmName?: Prisma.StringNullableWithAggregatesFilter<"FarmerProfile"> | string | null;
    farmLocation?: Prisma.StringNullableWithAggregatesFilter<"FarmerProfile"> | string | null;
    latitude?: Prisma.FloatNullableWithAggregatesFilter<"FarmerProfile"> | number | null;
    longitude?: Prisma.FloatNullableWithAggregatesFilter<"FarmerProfile"> | number | null;
    crops?: Prisma.StringNullableListFilter<"FarmerProfile">;
    tags?: Prisma.StringNullableListFilter<"FarmerProfile">;
    verificationStatus?: Prisma.StringWithAggregatesFilter<"FarmerProfile"> | string;
    rating?: Prisma.FloatWithAggregatesFilter<"FarmerProfile"> | number;
    reviewCount?: Prisma.IntWithAggregatesFilter<"FarmerProfile"> | number;
    completedOrderCount?: Prisma.IntWithAggregatesFilter<"FarmerProfile"> | number;
    profileComplete?: Prisma.BoolWithAggregatesFilter<"FarmerProfile"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FarmerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FarmerProfile"> | Date | string;
};
export type FarmerProfileCreateInput = {
    id?: string;
    bio?: string | null;
    farmName?: string | null;
    farmLocation?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    crops?: Prisma.FarmerProfileCreatecropsInput | string[];
    tags?: Prisma.FarmerProfileCreatetagsInput | string[];
    verificationStatus?: string;
    rating?: number;
    reviewCount?: number;
    completedOrderCount?: number;
    profileComplete?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFarmerProfileInput;
};
export type FarmerProfileUncheckedCreateInput = {
    id?: string;
    userId: string;
    bio?: string | null;
    farmName?: string | null;
    farmLocation?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    crops?: Prisma.FarmerProfileCreatecropsInput | string[];
    tags?: Prisma.FarmerProfileCreatetagsInput | string[];
    verificationStatus?: string;
    rating?: number;
    reviewCount?: number;
    completedOrderCount?: number;
    profileComplete?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FarmerProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    crops?: Prisma.FarmerProfileUpdatecropsInput | string[];
    tags?: Prisma.FarmerProfileUpdatetagsInput | string[];
    verificationStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    completedOrderCount?: Prisma.IntFieldUpdateOperationsInput | number;
    profileComplete?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFarmerProfileNestedInput;
};
export type FarmerProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    crops?: Prisma.FarmerProfileUpdatecropsInput | string[];
    tags?: Prisma.FarmerProfileUpdatetagsInput | string[];
    verificationStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    completedOrderCount?: Prisma.IntFieldUpdateOperationsInput | number;
    profileComplete?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FarmerProfileCreateManyInput = {
    id?: string;
    userId: string;
    bio?: string | null;
    farmName?: string | null;
    farmLocation?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    crops?: Prisma.FarmerProfileCreatecropsInput | string[];
    tags?: Prisma.FarmerProfileCreatetagsInput | string[];
    verificationStatus?: string;
    rating?: number;
    reviewCount?: number;
    completedOrderCount?: number;
    profileComplete?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FarmerProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    crops?: Prisma.FarmerProfileUpdatecropsInput | string[];
    tags?: Prisma.FarmerProfileUpdatetagsInput | string[];
    verificationStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    completedOrderCount?: Prisma.IntFieldUpdateOperationsInput | number;
    profileComplete?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FarmerProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    crops?: Prisma.FarmerProfileUpdatecropsInput | string[];
    tags?: Prisma.FarmerProfileUpdatetagsInput | string[];
    verificationStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    completedOrderCount?: Prisma.IntFieldUpdateOperationsInput | number;
    profileComplete?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FarmerProfileNullableScalarRelationFilter = {
    is?: Prisma.FarmerProfileWhereInput | null;
    isNot?: Prisma.FarmerProfileWhereInput | null;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type FarmerProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    farmName?: Prisma.SortOrder;
    farmLocation?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    crops?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    verificationStatus?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    completedOrderCount?: Prisma.SortOrder;
    profileComplete?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FarmerProfileAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    completedOrderCount?: Prisma.SortOrder;
};
export type FarmerProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    farmName?: Prisma.SortOrder;
    farmLocation?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    verificationStatus?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    completedOrderCount?: Prisma.SortOrder;
    profileComplete?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FarmerProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    farmName?: Prisma.SortOrder;
    farmLocation?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    verificationStatus?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    completedOrderCount?: Prisma.SortOrder;
    profileComplete?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FarmerProfileSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    completedOrderCount?: Prisma.SortOrder;
};
export type FarmerProfileCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FarmerProfileCreateWithoutUserInput, Prisma.FarmerProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FarmerProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.FarmerProfileWhereUniqueInput;
};
export type FarmerProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FarmerProfileCreateWithoutUserInput, Prisma.FarmerProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FarmerProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.FarmerProfileWhereUniqueInput;
};
export type FarmerProfileUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FarmerProfileCreateWithoutUserInput, Prisma.FarmerProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FarmerProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FarmerProfileUpsertWithoutUserInput;
    disconnect?: Prisma.FarmerProfileWhereInput | boolean;
    delete?: Prisma.FarmerProfileWhereInput | boolean;
    connect?: Prisma.FarmerProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FarmerProfileUpdateToOneWithWhereWithoutUserInput, Prisma.FarmerProfileUpdateWithoutUserInput>, Prisma.FarmerProfileUncheckedUpdateWithoutUserInput>;
};
export type FarmerProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FarmerProfileCreateWithoutUserInput, Prisma.FarmerProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FarmerProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FarmerProfileUpsertWithoutUserInput;
    disconnect?: Prisma.FarmerProfileWhereInput | boolean;
    delete?: Prisma.FarmerProfileWhereInput | boolean;
    connect?: Prisma.FarmerProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FarmerProfileUpdateToOneWithWhereWithoutUserInput, Prisma.FarmerProfileUpdateWithoutUserInput>, Prisma.FarmerProfileUncheckedUpdateWithoutUserInput>;
};
export type FarmerProfileCreatecropsInput = {
    set: string[];
};
export type FarmerProfileCreatetagsInput = {
    set: string[];
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FarmerProfileUpdatecropsInput = {
    set?: string[];
    push?: string | string[];
};
export type FarmerProfileUpdatetagsInput = {
    set?: string[];
    push?: string | string[];
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FarmerProfileCreateWithoutUserInput = {
    id?: string;
    bio?: string | null;
    farmName?: string | null;
    farmLocation?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    crops?: Prisma.FarmerProfileCreatecropsInput | string[];
    tags?: Prisma.FarmerProfileCreatetagsInput | string[];
    verificationStatus?: string;
    rating?: number;
    reviewCount?: number;
    completedOrderCount?: number;
    profileComplete?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FarmerProfileUncheckedCreateWithoutUserInput = {
    id?: string;
    bio?: string | null;
    farmName?: string | null;
    farmLocation?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    crops?: Prisma.FarmerProfileCreatecropsInput | string[];
    tags?: Prisma.FarmerProfileCreatetagsInput | string[];
    verificationStatus?: string;
    rating?: number;
    reviewCount?: number;
    completedOrderCount?: number;
    profileComplete?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FarmerProfileCreateOrConnectWithoutUserInput = {
    where: Prisma.FarmerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FarmerProfileCreateWithoutUserInput, Prisma.FarmerProfileUncheckedCreateWithoutUserInput>;
};
export type FarmerProfileUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.FarmerProfileUpdateWithoutUserInput, Prisma.FarmerProfileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FarmerProfileCreateWithoutUserInput, Prisma.FarmerProfileUncheckedCreateWithoutUserInput>;
    where?: Prisma.FarmerProfileWhereInput;
};
export type FarmerProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.FarmerProfileWhereInput;
    data: Prisma.XOR<Prisma.FarmerProfileUpdateWithoutUserInput, Prisma.FarmerProfileUncheckedUpdateWithoutUserInput>;
};
export type FarmerProfileUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    crops?: Prisma.FarmerProfileUpdatecropsInput | string[];
    tags?: Prisma.FarmerProfileUpdatetagsInput | string[];
    verificationStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    completedOrderCount?: Prisma.IntFieldUpdateOperationsInput | number;
    profileComplete?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FarmerProfileUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    farmLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    crops?: Prisma.FarmerProfileUpdatecropsInput | string[];
    tags?: Prisma.FarmerProfileUpdatetagsInput | string[];
    verificationStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    completedOrderCount?: Prisma.IntFieldUpdateOperationsInput | number;
    profileComplete?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FarmerProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    bio?: boolean;
    farmName?: boolean;
    farmLocation?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    crops?: boolean;
    tags?: boolean;
    verificationStatus?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    completedOrderCount?: boolean;
    profileComplete?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["farmerProfile"]>;
export type FarmerProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    bio?: boolean;
    farmName?: boolean;
    farmLocation?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    crops?: boolean;
    tags?: boolean;
    verificationStatus?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    completedOrderCount?: boolean;
    profileComplete?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["farmerProfile"]>;
export type FarmerProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    bio?: boolean;
    farmName?: boolean;
    farmLocation?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    crops?: boolean;
    tags?: boolean;
    verificationStatus?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    completedOrderCount?: boolean;
    profileComplete?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["farmerProfile"]>;
export type FarmerProfileSelectScalar = {
    id?: boolean;
    userId?: boolean;
    bio?: boolean;
    farmName?: boolean;
    farmLocation?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    crops?: boolean;
    tags?: boolean;
    verificationStatus?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    completedOrderCount?: boolean;
    profileComplete?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FarmerProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "bio" | "farmName" | "farmLocation" | "latitude" | "longitude" | "crops" | "tags" | "verificationStatus" | "rating" | "reviewCount" | "completedOrderCount" | "profileComplete" | "createdAt" | "updatedAt", ExtArgs["result"]["farmerProfile"]>;
export type FarmerProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FarmerProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FarmerProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FarmerProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FarmerProfile";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        bio: string | null;
        farmName: string | null;
        farmLocation: string | null;
        latitude: number | null;
        longitude: number | null;
        crops: string[];
        tags: string[];
        verificationStatus: string;
        rating: number;
        reviewCount: number;
        completedOrderCount: number;
        profileComplete: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["farmerProfile"]>;
    composites: {};
};
export type FarmerProfileGetPayload<S extends boolean | null | undefined | FarmerProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload, S>;
export type FarmerProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FarmerProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FarmerProfileCountAggregateInputType | true;
};
export interface FarmerProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FarmerProfile'];
        meta: {
            name: 'FarmerProfile';
        };
    };
    findUnique<T extends FarmerProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, FarmerProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FarmerProfileClient<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FarmerProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FarmerProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FarmerProfileClient<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FarmerProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, FarmerProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__FarmerProfileClient<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FarmerProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FarmerProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FarmerProfileClient<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FarmerProfileFindManyArgs>(args?: Prisma.SelectSubset<T, FarmerProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FarmerProfileCreateArgs>(args: Prisma.SelectSubset<T, FarmerProfileCreateArgs<ExtArgs>>): Prisma.Prisma__FarmerProfileClient<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FarmerProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, FarmerProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FarmerProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FarmerProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FarmerProfileDeleteArgs>(args: Prisma.SelectSubset<T, FarmerProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__FarmerProfileClient<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FarmerProfileUpdateArgs>(args: Prisma.SelectSubset<T, FarmerProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__FarmerProfileClient<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FarmerProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, FarmerProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FarmerProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, FarmerProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FarmerProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FarmerProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FarmerProfileUpsertArgs>(args: Prisma.SelectSubset<T, FarmerProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__FarmerProfileClient<runtime.Types.Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FarmerProfileCountArgs>(args?: Prisma.Subset<T, FarmerProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FarmerProfileCountAggregateOutputType> : number>;
    aggregate<T extends FarmerProfileAggregateArgs>(args: Prisma.Subset<T, FarmerProfileAggregateArgs>): Prisma.PrismaPromise<GetFarmerProfileAggregateType<T>>;
    groupBy<T extends FarmerProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FarmerProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: FarmerProfileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FarmerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FarmerProfileFieldRefs;
}
export interface Prisma__FarmerProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FarmerProfileFieldRefs {
    readonly id: Prisma.FieldRef<"FarmerProfile", 'String'>;
    readonly userId: Prisma.FieldRef<"FarmerProfile", 'String'>;
    readonly bio: Prisma.FieldRef<"FarmerProfile", 'String'>;
    readonly farmName: Prisma.FieldRef<"FarmerProfile", 'String'>;
    readonly farmLocation: Prisma.FieldRef<"FarmerProfile", 'String'>;
    readonly latitude: Prisma.FieldRef<"FarmerProfile", 'Float'>;
    readonly longitude: Prisma.FieldRef<"FarmerProfile", 'Float'>;
    readonly crops: Prisma.FieldRef<"FarmerProfile", 'String[]'>;
    readonly tags: Prisma.FieldRef<"FarmerProfile", 'String[]'>;
    readonly verificationStatus: Prisma.FieldRef<"FarmerProfile", 'String'>;
    readonly rating: Prisma.FieldRef<"FarmerProfile", 'Float'>;
    readonly reviewCount: Prisma.FieldRef<"FarmerProfile", 'Int'>;
    readonly completedOrderCount: Prisma.FieldRef<"FarmerProfile", 'Int'>;
    readonly profileComplete: Prisma.FieldRef<"FarmerProfile", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"FarmerProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FarmerProfile", 'DateTime'>;
}
export type FarmerProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
    where: Prisma.FarmerProfileWhereUniqueInput;
};
export type FarmerProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
    where: Prisma.FarmerProfileWhereUniqueInput;
};
export type FarmerProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
    where?: Prisma.FarmerProfileWhereInput;
    orderBy?: Prisma.FarmerProfileOrderByWithRelationInput | Prisma.FarmerProfileOrderByWithRelationInput[];
    cursor?: Prisma.FarmerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FarmerProfileScalarFieldEnum | Prisma.FarmerProfileScalarFieldEnum[];
};
export type FarmerProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
    where?: Prisma.FarmerProfileWhereInput;
    orderBy?: Prisma.FarmerProfileOrderByWithRelationInput | Prisma.FarmerProfileOrderByWithRelationInput[];
    cursor?: Prisma.FarmerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FarmerProfileScalarFieldEnum | Prisma.FarmerProfileScalarFieldEnum[];
};
export type FarmerProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
    where?: Prisma.FarmerProfileWhereInput;
    orderBy?: Prisma.FarmerProfileOrderByWithRelationInput | Prisma.FarmerProfileOrderByWithRelationInput[];
    cursor?: Prisma.FarmerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FarmerProfileScalarFieldEnum | Prisma.FarmerProfileScalarFieldEnum[];
};
export type FarmerProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FarmerProfileCreateInput, Prisma.FarmerProfileUncheckedCreateInput>;
};
export type FarmerProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FarmerProfileCreateManyInput | Prisma.FarmerProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FarmerProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    data: Prisma.FarmerProfileCreateManyInput | Prisma.FarmerProfileCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FarmerProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FarmerProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FarmerProfileUpdateInput, Prisma.FarmerProfileUncheckedUpdateInput>;
    where: Prisma.FarmerProfileWhereUniqueInput;
};
export type FarmerProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FarmerProfileUpdateManyMutationInput, Prisma.FarmerProfileUncheckedUpdateManyInput>;
    where?: Prisma.FarmerProfileWhereInput;
    limit?: number;
};
export type FarmerProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FarmerProfileUpdateManyMutationInput, Prisma.FarmerProfileUncheckedUpdateManyInput>;
    where?: Prisma.FarmerProfileWhereInput;
    limit?: number;
    include?: Prisma.FarmerProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FarmerProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
    where: Prisma.FarmerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FarmerProfileCreateInput, Prisma.FarmerProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FarmerProfileUpdateInput, Prisma.FarmerProfileUncheckedUpdateInput>;
};
export type FarmerProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
    where: Prisma.FarmerProfileWhereUniqueInput;
};
export type FarmerProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FarmerProfileWhereInput;
    limit?: number;
};
export type FarmerProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FarmerProfileSelect<ExtArgs> | null;
    omit?: Prisma.FarmerProfileOmit<ExtArgs> | null;
    include?: Prisma.FarmerProfileInclude<ExtArgs> | null;
};
export {};
