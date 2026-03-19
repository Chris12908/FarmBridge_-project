import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type BuyerProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$BuyerProfilePayload>;
export type AggregateBuyerProfile = {
    _count: BuyerProfileCountAggregateOutputType | null;
    _min: BuyerProfileMinAggregateOutputType | null;
    _max: BuyerProfileMaxAggregateOutputType | null;
};
export type BuyerProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    location: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BuyerProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    location: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BuyerProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    preferences: number;
    location: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BuyerProfileMinAggregateInputType = {
    id?: true;
    userId?: true;
    location?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BuyerProfileMaxAggregateInputType = {
    id?: true;
    userId?: true;
    location?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BuyerProfileCountAggregateInputType = {
    id?: true;
    userId?: true;
    preferences?: true;
    location?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BuyerProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithRelationInput | Prisma.BuyerProfileOrderByWithRelationInput[];
    cursor?: Prisma.BuyerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BuyerProfileCountAggregateInputType;
    _min?: BuyerProfileMinAggregateInputType;
    _max?: BuyerProfileMaxAggregateInputType;
};
export type GetBuyerProfileAggregateType<T extends BuyerProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateBuyerProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBuyerProfile[P]> : Prisma.GetScalarType<T[P], AggregateBuyerProfile[P]>;
};
export type BuyerProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithAggregationInput | Prisma.BuyerProfileOrderByWithAggregationInput[];
    by: Prisma.BuyerProfileScalarFieldEnum[] | Prisma.BuyerProfileScalarFieldEnum;
    having?: Prisma.BuyerProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BuyerProfileCountAggregateInputType | true;
    _min?: BuyerProfileMinAggregateInputType;
    _max?: BuyerProfileMaxAggregateInputType;
};
export type BuyerProfileGroupByOutputType = {
    id: string;
    userId: string;
    preferences: string[];
    location: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: BuyerProfileCountAggregateOutputType | null;
    _min: BuyerProfileMinAggregateOutputType | null;
    _max: BuyerProfileMaxAggregateOutputType | null;
};
type GetBuyerProfileGroupByPayload<T extends BuyerProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BuyerProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BuyerProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BuyerProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BuyerProfileGroupByOutputType[P]>;
}>>;
export type BuyerProfileWhereInput = {
    AND?: Prisma.BuyerProfileWhereInput | Prisma.BuyerProfileWhereInput[];
    OR?: Prisma.BuyerProfileWhereInput[];
    NOT?: Prisma.BuyerProfileWhereInput | Prisma.BuyerProfileWhereInput[];
    id?: Prisma.StringFilter<"BuyerProfile"> | string;
    userId?: Prisma.StringFilter<"BuyerProfile"> | string;
    preferences?: Prisma.StringNullableListFilter<"BuyerProfile">;
    location?: Prisma.StringNullableFilter<"BuyerProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type BuyerProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    preferences?: Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type BuyerProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.BuyerProfileWhereInput | Prisma.BuyerProfileWhereInput[];
    OR?: Prisma.BuyerProfileWhereInput[];
    NOT?: Prisma.BuyerProfileWhereInput | Prisma.BuyerProfileWhereInput[];
    preferences?: Prisma.StringNullableListFilter<"BuyerProfile">;
    location?: Prisma.StringNullableFilter<"BuyerProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type BuyerProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    preferences?: Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BuyerProfileCountOrderByAggregateInput;
    _max?: Prisma.BuyerProfileMaxOrderByAggregateInput;
    _min?: Prisma.BuyerProfileMinOrderByAggregateInput;
};
export type BuyerProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.BuyerProfileScalarWhereWithAggregatesInput | Prisma.BuyerProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.BuyerProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BuyerProfileScalarWhereWithAggregatesInput | Prisma.BuyerProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BuyerProfile"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"BuyerProfile"> | string;
    preferences?: Prisma.StringNullableListFilter<"BuyerProfile">;
    location?: Prisma.StringNullableWithAggregatesFilter<"BuyerProfile"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BuyerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"BuyerProfile"> | Date | string;
};
export type BuyerProfileCreateInput = {
    id?: string;
    preferences?: Prisma.BuyerProfileCreatepreferencesInput | string[];
    location?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutBuyerProfileInput;
};
export type BuyerProfileUncheckedCreateInput = {
    id?: string;
    userId: string;
    preferences?: Prisma.BuyerProfileCreatepreferencesInput | string[];
    location?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BuyerProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    preferences?: Prisma.BuyerProfileUpdatepreferencesInput | string[];
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutBuyerProfileNestedInput;
};
export type BuyerProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    preferences?: Prisma.BuyerProfileUpdatepreferencesInput | string[];
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BuyerProfileCreateManyInput = {
    id?: string;
    userId: string;
    preferences?: Prisma.BuyerProfileCreatepreferencesInput | string[];
    location?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BuyerProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    preferences?: Prisma.BuyerProfileUpdatepreferencesInput | string[];
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BuyerProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    preferences?: Prisma.BuyerProfileUpdatepreferencesInput | string[];
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BuyerProfileNullableScalarRelationFilter = {
    is?: Prisma.BuyerProfileWhereInput | null;
    isNot?: Prisma.BuyerProfileWhereInput | null;
};
export type BuyerProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    preferences?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BuyerProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BuyerProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BuyerProfileCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutUserInput, Prisma.BuyerProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutUserInput, Prisma.BuyerProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutUserInput, Prisma.BuyerProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.BuyerProfileUpsertWithoutUserInput;
    disconnect?: Prisma.BuyerProfileWhereInput | boolean;
    delete?: Prisma.BuyerProfileWhereInput | boolean;
    connect?: Prisma.BuyerProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BuyerProfileUpdateToOneWithWhereWithoutUserInput, Prisma.BuyerProfileUpdateWithoutUserInput>, Prisma.BuyerProfileUncheckedUpdateWithoutUserInput>;
};
export type BuyerProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutUserInput, Prisma.BuyerProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.BuyerProfileUpsertWithoutUserInput;
    disconnect?: Prisma.BuyerProfileWhereInput | boolean;
    delete?: Prisma.BuyerProfileWhereInput | boolean;
    connect?: Prisma.BuyerProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BuyerProfileUpdateToOneWithWhereWithoutUserInput, Prisma.BuyerProfileUpdateWithoutUserInput>, Prisma.BuyerProfileUncheckedUpdateWithoutUserInput>;
};
export type BuyerProfileCreatepreferencesInput = {
    set: string[];
};
export type BuyerProfileUpdatepreferencesInput = {
    set?: string[];
    push?: string | string[];
};
export type BuyerProfileCreateWithoutUserInput = {
    id?: string;
    preferences?: Prisma.BuyerProfileCreatepreferencesInput | string[];
    location?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BuyerProfileUncheckedCreateWithoutUserInput = {
    id?: string;
    preferences?: Prisma.BuyerProfileCreatepreferencesInput | string[];
    location?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BuyerProfileCreateOrConnectWithoutUserInput = {
    where: Prisma.BuyerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.BuyerProfileCreateWithoutUserInput, Prisma.BuyerProfileUncheckedCreateWithoutUserInput>;
};
export type BuyerProfileUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.BuyerProfileUpdateWithoutUserInput, Prisma.BuyerProfileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.BuyerProfileCreateWithoutUserInput, Prisma.BuyerProfileUncheckedCreateWithoutUserInput>;
    where?: Prisma.BuyerProfileWhereInput;
};
export type BuyerProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.BuyerProfileWhereInput;
    data: Prisma.XOR<Prisma.BuyerProfileUpdateWithoutUserInput, Prisma.BuyerProfileUncheckedUpdateWithoutUserInput>;
};
export type BuyerProfileUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    preferences?: Prisma.BuyerProfileUpdatepreferencesInput | string[];
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BuyerProfileUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    preferences?: Prisma.BuyerProfileUpdatepreferencesInput | string[];
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BuyerProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    preferences?: boolean;
    location?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["buyerProfile"]>;
export type BuyerProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    preferences?: boolean;
    location?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["buyerProfile"]>;
export type BuyerProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    preferences?: boolean;
    location?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["buyerProfile"]>;
export type BuyerProfileSelectScalar = {
    id?: boolean;
    userId?: boolean;
    preferences?: boolean;
    location?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BuyerProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "preferences" | "location" | "createdAt" | "updatedAt", ExtArgs["result"]["buyerProfile"]>;
export type BuyerProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BuyerProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BuyerProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $BuyerProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BuyerProfile";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        preferences: string[];
        location: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["buyerProfile"]>;
    composites: {};
};
export type BuyerProfileGetPayload<S extends boolean | null | undefined | BuyerProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload, S>;
export type BuyerProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BuyerProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BuyerProfileCountAggregateInputType | true;
};
export interface BuyerProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BuyerProfile'];
        meta: {
            name: 'BuyerProfile';
        };
    };
    findUnique<T extends BuyerProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, BuyerProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BuyerProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BuyerProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BuyerProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, BuyerProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BuyerProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BuyerProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BuyerProfileFindManyArgs>(args?: Prisma.SelectSubset<T, BuyerProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BuyerProfileCreateArgs>(args: Prisma.SelectSubset<T, BuyerProfileCreateArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BuyerProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, BuyerProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BuyerProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BuyerProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BuyerProfileDeleteArgs>(args: Prisma.SelectSubset<T, BuyerProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BuyerProfileUpdateArgs>(args: Prisma.SelectSubset<T, BuyerProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BuyerProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, BuyerProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BuyerProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, BuyerProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BuyerProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BuyerProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BuyerProfileUpsertArgs>(args: Prisma.SelectSubset<T, BuyerProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BuyerProfileCountArgs>(args?: Prisma.Subset<T, BuyerProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BuyerProfileCountAggregateOutputType> : number>;
    aggregate<T extends BuyerProfileAggregateArgs>(args: Prisma.Subset<T, BuyerProfileAggregateArgs>): Prisma.PrismaPromise<GetBuyerProfileAggregateType<T>>;
    groupBy<T extends BuyerProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BuyerProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: BuyerProfileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BuyerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuyerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BuyerProfileFieldRefs;
}
export interface Prisma__BuyerProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BuyerProfileFieldRefs {
    readonly id: Prisma.FieldRef<"BuyerProfile", 'String'>;
    readonly userId: Prisma.FieldRef<"BuyerProfile", 'String'>;
    readonly preferences: Prisma.FieldRef<"BuyerProfile", 'String[]'>;
    readonly location: Prisma.FieldRef<"BuyerProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"BuyerProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"BuyerProfile", 'DateTime'>;
}
export type BuyerProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithRelationInput | Prisma.BuyerProfileOrderByWithRelationInput[];
    cursor?: Prisma.BuyerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BuyerProfileScalarFieldEnum | Prisma.BuyerProfileScalarFieldEnum[];
};
export type BuyerProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithRelationInput | Prisma.BuyerProfileOrderByWithRelationInput[];
    cursor?: Prisma.BuyerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BuyerProfileScalarFieldEnum | Prisma.BuyerProfileScalarFieldEnum[];
};
export type BuyerProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithRelationInput | Prisma.BuyerProfileOrderByWithRelationInput[];
    cursor?: Prisma.BuyerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BuyerProfileScalarFieldEnum | Prisma.BuyerProfileScalarFieldEnum[];
};
export type BuyerProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BuyerProfileCreateInput, Prisma.BuyerProfileUncheckedCreateInput>;
};
export type BuyerProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BuyerProfileCreateManyInput | Prisma.BuyerProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BuyerProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    data: Prisma.BuyerProfileCreateManyInput | Prisma.BuyerProfileCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BuyerProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BuyerProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BuyerProfileUpdateInput, Prisma.BuyerProfileUncheckedUpdateInput>;
    where: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BuyerProfileUpdateManyMutationInput, Prisma.BuyerProfileUncheckedUpdateManyInput>;
    where?: Prisma.BuyerProfileWhereInput;
    limit?: number;
};
export type BuyerProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BuyerProfileUpdateManyMutationInput, Prisma.BuyerProfileUncheckedUpdateManyInput>;
    where?: Prisma.BuyerProfileWhereInput;
    limit?: number;
    include?: Prisma.BuyerProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BuyerProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where: Prisma.BuyerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.BuyerProfileCreateInput, Prisma.BuyerProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BuyerProfileUpdateInput, Prisma.BuyerProfileUncheckedUpdateInput>;
};
export type BuyerProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BuyerProfileWhereInput;
    limit?: number;
};
export type BuyerProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
};
export {};
