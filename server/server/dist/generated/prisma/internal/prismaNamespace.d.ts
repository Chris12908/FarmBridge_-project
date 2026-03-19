import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: any;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: any;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: any;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: any;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: any;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: any;
export declare const empty: any;
export declare const join: any;
export declare const raw: any;
export declare const Sql: any;
export type Sql = runtime.Sql;
export declare const Decimal: any;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: any;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: any;
export declare const JsonNull: any;
export declare const AnyNull: any;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly FarmerProfile: "FarmerProfile";
    readonly BuyerProfile: "BuyerProfile";
    readonly Address: "Address";
    readonly Product: "Product";
    readonly NegotiationSession: "NegotiationSession";
    readonly ChatMessage: "ChatMessage";
    readonly PriceProposal: "PriceProposal";
    readonly Order: "Order";
    readonly Notification: "Notification";
    readonly Review: "Review";
    readonly RefreshToken: "RefreshToken";
    readonly EmailVerification: "EmailVerification";
    readonly PasswordReset: "PasswordReset";
    readonly DeviceToken: "DeviceToken";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "farmerProfile" | "buyerProfile" | "address" | "product" | "negotiationSession" | "chatMessage" | "priceProposal" | "order" | "notification" | "review" | "refreshToken" | "emailVerification" | "passwordReset" | "deviceToken";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        FarmerProfile: {
            payload: Prisma.$FarmerProfilePayload<ExtArgs>;
            fields: Prisma.FarmerProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FarmerProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FarmerProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload>;
                };
                findFirst: {
                    args: Prisma.FarmerProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FarmerProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload>;
                };
                findMany: {
                    args: Prisma.FarmerProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload>[];
                };
                create: {
                    args: Prisma.FarmerProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload>;
                };
                createMany: {
                    args: Prisma.FarmerProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FarmerProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload>[];
                };
                delete: {
                    args: Prisma.FarmerProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload>;
                };
                update: {
                    args: Prisma.FarmerProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.FarmerProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FarmerProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FarmerProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload>[];
                };
                upsert: {
                    args: Prisma.FarmerProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FarmerProfilePayload>;
                };
                aggregate: {
                    args: Prisma.FarmerProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFarmerProfile>;
                };
                groupBy: {
                    args: Prisma.FarmerProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FarmerProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FarmerProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FarmerProfileCountAggregateOutputType> | number;
                };
            };
        };
        BuyerProfile: {
            payload: Prisma.$BuyerProfilePayload<ExtArgs>;
            fields: Prisma.BuyerProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BuyerProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BuyerProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                findFirst: {
                    args: Prisma.BuyerProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BuyerProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                findMany: {
                    args: Prisma.BuyerProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>[];
                };
                create: {
                    args: Prisma.BuyerProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                createMany: {
                    args: Prisma.BuyerProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BuyerProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>[];
                };
                delete: {
                    args: Prisma.BuyerProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                update: {
                    args: Prisma.BuyerProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.BuyerProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BuyerProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BuyerProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>[];
                };
                upsert: {
                    args: Prisma.BuyerProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                aggregate: {
                    args: Prisma.BuyerProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBuyerProfile>;
                };
                groupBy: {
                    args: Prisma.BuyerProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BuyerProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BuyerProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BuyerProfileCountAggregateOutputType> | number;
                };
            };
        };
        Address: {
            payload: Prisma.$AddressPayload<ExtArgs>;
            fields: Prisma.AddressFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AddressFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                findFirst: {
                    args: Prisma.AddressFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                findMany: {
                    args: Prisma.AddressFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>[];
                };
                create: {
                    args: Prisma.AddressCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                createMany: {
                    args: Prisma.AddressCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>[];
                };
                delete: {
                    args: Prisma.AddressDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                update: {
                    args: Prisma.AddressUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                deleteMany: {
                    args: Prisma.AddressDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AddressUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>[];
                };
                upsert: {
                    args: Prisma.AddressUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                aggregate: {
                    args: Prisma.AddressAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAddress>;
                };
                groupBy: {
                    args: Prisma.AddressGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AddressGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AddressCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AddressCountAggregateOutputType> | number;
                };
            };
        };
        Product: {
            payload: Prisma.$ProductPayload<ExtArgs>;
            fields: Prisma.ProductFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findMany: {
                    args: Prisma.ProductFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                create: {
                    args: Prisma.ProductCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                createMany: {
                    args: Prisma.ProductCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                delete: {
                    args: Prisma.ProductDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                update: {
                    args: Prisma.ProductUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                upsert: {
                    args: Prisma.ProductUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                aggregate: {
                    args: Prisma.ProductAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProduct>;
                };
                groupBy: {
                    args: Prisma.ProductGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductCountAggregateOutputType> | number;
                };
            };
        };
        NegotiationSession: {
            payload: Prisma.$NegotiationSessionPayload<ExtArgs>;
            fields: Prisma.NegotiationSessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NegotiationSessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NegotiationSessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload>;
                };
                findFirst: {
                    args: Prisma.NegotiationSessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NegotiationSessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload>;
                };
                findMany: {
                    args: Prisma.NegotiationSessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload>[];
                };
                create: {
                    args: Prisma.NegotiationSessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload>;
                };
                createMany: {
                    args: Prisma.NegotiationSessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NegotiationSessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload>[];
                };
                delete: {
                    args: Prisma.NegotiationSessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload>;
                };
                update: {
                    args: Prisma.NegotiationSessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload>;
                };
                deleteMany: {
                    args: Prisma.NegotiationSessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NegotiationSessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NegotiationSessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload>[];
                };
                upsert: {
                    args: Prisma.NegotiationSessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NegotiationSessionPayload>;
                };
                aggregate: {
                    args: Prisma.NegotiationSessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNegotiationSession>;
                };
                groupBy: {
                    args: Prisma.NegotiationSessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NegotiationSessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NegotiationSessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NegotiationSessionCountAggregateOutputType> | number;
                };
            };
        };
        ChatMessage: {
            payload: Prisma.$ChatMessagePayload<ExtArgs>;
            fields: Prisma.ChatMessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                findFirst: {
                    args: Prisma.ChatMessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                findMany: {
                    args: Prisma.ChatMessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                create: {
                    args: Prisma.ChatMessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                createMany: {
                    args: Prisma.ChatMessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChatMessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                delete: {
                    args: Prisma.ChatMessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                update: {
                    args: Prisma.ChatMessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                deleteMany: {
                    args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChatMessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                upsert: {
                    args: Prisma.ChatMessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                aggregate: {
                    args: Prisma.ChatMessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChatMessage>;
                };
                groupBy: {
                    args: Prisma.ChatMessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChatMessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageCountAggregateOutputType> | number;
                };
            };
        };
        PriceProposal: {
            payload: Prisma.$PriceProposalPayload<ExtArgs>;
            fields: Prisma.PriceProposalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PriceProposalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PriceProposalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload>;
                };
                findFirst: {
                    args: Prisma.PriceProposalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PriceProposalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload>;
                };
                findMany: {
                    args: Prisma.PriceProposalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload>[];
                };
                create: {
                    args: Prisma.PriceProposalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload>;
                };
                createMany: {
                    args: Prisma.PriceProposalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PriceProposalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload>[];
                };
                delete: {
                    args: Prisma.PriceProposalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload>;
                };
                update: {
                    args: Prisma.PriceProposalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload>;
                };
                deleteMany: {
                    args: Prisma.PriceProposalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PriceProposalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PriceProposalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload>[];
                };
                upsert: {
                    args: Prisma.PriceProposalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceProposalPayload>;
                };
                aggregate: {
                    args: Prisma.PriceProposalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePriceProposal>;
                };
                groupBy: {
                    args: Prisma.PriceProposalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceProposalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PriceProposalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceProposalCountAggregateOutputType> | number;
                };
            };
        };
        Order: {
            payload: Prisma.$OrderPayload<ExtArgs>;
            fields: Prisma.OrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findFirst: {
                    args: Prisma.OrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findMany: {
                    args: Prisma.OrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                create: {
                    args: Prisma.OrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                createMany: {
                    args: Prisma.OrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                delete: {
                    args: Prisma.OrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                update: {
                    args: Prisma.OrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                upsert: {
                    args: Prisma.OrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                aggregate: {
                    args: Prisma.OrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrder>;
                };
                groupBy: {
                    args: Prisma.OrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        Review: {
            payload: Prisma.$ReviewPayload<ExtArgs>;
            fields: Prisma.ReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                findFirst: {
                    args: Prisma.ReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                findMany: {
                    args: Prisma.ReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                create: {
                    args: Prisma.ReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                createMany: {
                    args: Prisma.ReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                delete: {
                    args: Prisma.ReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                update: {
                    args: Prisma.ReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.ReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                upsert: {
                    args: Prisma.ReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                aggregate: {
                    args: Prisma.ReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReview>;
                };
                groupBy: {
                    args: Prisma.ReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReviewCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
        EmailVerification: {
            payload: Prisma.$EmailVerificationPayload<ExtArgs>;
            fields: Prisma.EmailVerificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmailVerificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmailVerificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                findFirst: {
                    args: Prisma.EmailVerificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmailVerificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                findMany: {
                    args: Prisma.EmailVerificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[];
                };
                create: {
                    args: Prisma.EmailVerificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                createMany: {
                    args: Prisma.EmailVerificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmailVerificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[];
                };
                delete: {
                    args: Prisma.EmailVerificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                update: {
                    args: Prisma.EmailVerificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                deleteMany: {
                    args: Prisma.EmailVerificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmailVerificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmailVerificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[];
                };
                upsert: {
                    args: Prisma.EmailVerificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                aggregate: {
                    args: Prisma.EmailVerificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmailVerification>;
                };
                groupBy: {
                    args: Prisma.EmailVerificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmailVerificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationCountAggregateOutputType> | number;
                };
            };
        };
        PasswordReset: {
            payload: Prisma.$PasswordResetPayload<ExtArgs>;
            fields: Prisma.PasswordResetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                findFirst: {
                    args: Prisma.PasswordResetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                findMany: {
                    args: Prisma.PasswordResetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>[];
                };
                create: {
                    args: Prisma.PasswordResetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                createMany: {
                    args: Prisma.PasswordResetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PasswordResetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>[];
                };
                delete: {
                    args: Prisma.PasswordResetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                update: {
                    args: Prisma.PasswordResetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                deleteMany: {
                    args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PasswordResetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>[];
                };
                upsert: {
                    args: Prisma.PasswordResetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                aggregate: {
                    args: Prisma.PasswordResetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePasswordReset>;
                };
                groupBy: {
                    args: Prisma.PasswordResetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PasswordResetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetCountAggregateOutputType> | number;
                };
            };
        };
        DeviceToken: {
            payload: Prisma.$DeviceTokenPayload<ExtArgs>;
            fields: Prisma.DeviceTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DeviceTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DeviceTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                findFirst: {
                    args: Prisma.DeviceTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DeviceTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                findMany: {
                    args: Prisma.DeviceTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>[];
                };
                create: {
                    args: Prisma.DeviceTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                createMany: {
                    args: Prisma.DeviceTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DeviceTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>[];
                };
                delete: {
                    args: Prisma.DeviceTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                update: {
                    args: Prisma.DeviceTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.DeviceTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DeviceTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DeviceTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>[];
                };
                upsert: {
                    args: Prisma.DeviceTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                aggregate: {
                    args: Prisma.DeviceTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDeviceToken>;
                };
                groupBy: {
                    args: Prisma.DeviceTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DeviceTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceTokenCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: any;
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly googleId: "googleId";
    readonly role: "role";
    readonly name: "name";
    readonly phoneNumber: "phoneNumber";
    readonly avatarUrl: "avatarUrl";
    readonly isVerified: "isVerified";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const FarmerProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly bio: "bio";
    readonly farmName: "farmName";
    readonly farmLocation: "farmLocation";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly crops: "crops";
    readonly tags: "tags";
    readonly verificationStatus: "verificationStatus";
    readonly rating: "rating";
    readonly reviewCount: "reviewCount";
    readonly completedOrderCount: "completedOrderCount";
    readonly profileComplete: "profileComplete";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FarmerProfileScalarFieldEnum = (typeof FarmerProfileScalarFieldEnum)[keyof typeof FarmerProfileScalarFieldEnum];
export declare const BuyerProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly preferences: "preferences";
    readonly location: "location";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BuyerProfileScalarFieldEnum = (typeof BuyerProfileScalarFieldEnum)[keyof typeof BuyerProfileScalarFieldEnum];
export declare const AddressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly label: "label";
    readonly street: "street";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
    readonly isDefault: "isDefault";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly farmerId: "farmerId";
    readonly name: "name";
    readonly description: "description";
    readonly category: "category";
    readonly pricePerUnit: "pricePerUnit";
    readonly unit: "unit";
    readonly quantityAvailable: "quantityAvailable";
    readonly minimumOrder: "minimumOrder";
    readonly images: "images";
    readonly tags: "tags";
    readonly status: "status";
    readonly expiresAt: "expiresAt";
    readonly viewCount: "viewCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const NegotiationSessionScalarFieldEnum: {
    readonly id: "id";
    readonly buyerId: "buyerId";
    readonly farmerId: "farmerId";
    readonly productId: "productId";
    readonly status: "status";
    readonly agreedPrice: "agreedPrice";
    readonly agreedQuantity: "agreedQuantity";
    readonly lastMessageAt: "lastMessageAt";
    readonly lastMessagePreview: "lastMessagePreview";
    readonly buyerUnreadCount: "buyerUnreadCount";
    readonly farmerUnreadCount: "farmerUnreadCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NegotiationSessionScalarFieldEnum = (typeof NegotiationSessionScalarFieldEnum)[keyof typeof NegotiationSessionScalarFieldEnum];
export declare const ChatMessageScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly senderId: "senderId";
    readonly senderRole: "senderRole";
    readonly type: "type";
    readonly text: "text";
    readonly voiceNoteUrl: "voiceNoteUrl";
    readonly voiceNoteDurationSecs: "voiceNoteDurationSecs";
    readonly imageUrl: "imageUrl";
    readonly priceProposalId: "priceProposalId";
    readonly readByRecipient: "readByRecipient";
    readonly createdAt: "createdAt";
};
export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum];
export declare const PriceProposalScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly proposedByUserId: "proposedByUserId";
    readonly proposedBy: "proposedBy";
    readonly proposedPrice: "proposedPrice";
    readonly proposedQuantity: "proposedQuantity";
    readonly note: "note";
    readonly status: "status";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PriceProposalScalarFieldEnum = (typeof PriceProposalScalarFieldEnum)[keyof typeof PriceProposalScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly orderNumber: "orderNumber";
    readonly sessionId: "sessionId";
    readonly buyerId: "buyerId";
    readonly farmerId: "farmerId";
    readonly addressId: "addressId";
    readonly deliveryAddressSnapshot: "deliveryAddressSnapshot";
    readonly quantity: "quantity";
    readonly pricePerUnit: "pricePerUnit";
    readonly subtotal: "subtotal";
    readonly platformFee: "platformFee";
    readonly totalAmount: "totalAmount";
    readonly status: "status";
    readonly paymentMethod: "paymentMethod";
    readonly paymentStatus: "paymentStatus";
    readonly stripePaymentIntentId: "stripePaymentIntentId";
    readonly flutterwaveTxRef: "flutterwaveTxRef";
    readonly deliveryDate: "deliveryDate";
    readonly placedAt: "placedAt";
    readonly confirmedAt: "confirmedAt";
    readonly dispatchedAt: "dispatchedAt";
    readonly deliveredAt: "deliveredAt";
    readonly cancelledAt: "cancelledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly title: "title";
    readonly body: "body";
    readonly data: "data";
    readonly isRead: "isRead";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly reviewerId: "reviewerId";
    readonly farmerId: "farmerId";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly createdAt: "createdAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const EmailVerificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type EmailVerificationScalarFieldEnum = (typeof EmailVerificationScalarFieldEnum)[keyof typeof EmailVerificationScalarFieldEnum];
export declare const PasswordResetScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum];
export declare const DeviceTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly platform: "platform";
    readonly createdAt: "createdAt";
};
export type DeviceTokenScalarFieldEnum = (typeof DeviceTokenScalarFieldEnum)[keyof typeof DeviceTokenScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: any;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: any;
    readonly JsonNull: any;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: any;
    readonly JsonNull: any;
    readonly AnyNull: any;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumProductCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductCategory'>;
export type ListEnumProductCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductCategory[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type EnumListingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListingStatus'>;
export type ListEnumListingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListingStatus[]'>;
export type EnumNegotiationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NegotiationStatus'>;
export type ListEnumNegotiationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NegotiationStatus[]'>;
export type EnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType'>;
export type ListEnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType[]'>;
export type EnumProposalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProposalStatus'>;
export type ListEnumProposalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProposalStatus[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>;
export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>;
export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>;
export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>;
export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>;
export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>;
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    farmerProfile?: Prisma.FarmerProfileOmit;
    buyerProfile?: Prisma.BuyerProfileOmit;
    address?: Prisma.AddressOmit;
    product?: Prisma.ProductOmit;
    negotiationSession?: Prisma.NegotiationSessionOmit;
    chatMessage?: Prisma.ChatMessageOmit;
    priceProposal?: Prisma.PriceProposalOmit;
    order?: Prisma.OrderOmit;
    notification?: Prisma.NotificationOmit;
    review?: Prisma.ReviewOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
    emailVerification?: Prisma.EmailVerificationOmit;
    passwordReset?: Prisma.PasswordResetOmit;
    deviceToken?: Prisma.DeviceTokenOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
