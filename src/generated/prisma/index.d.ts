
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Closet
 * 
 */
export type Closet = $Result.DefaultSelection<Prisma.$ClosetPayload>
/**
 * Model Listing
 * 
 */
export type Listing = $Result.DefaultSelection<Prisma.$ListingPayload>
/**
 * Model TradePreference
 * 
 */
export type TradePreference = $Result.DefaultSelection<Prisma.$TradePreferencePayload>
/**
 * Model TradeRequest
 * 
 */
export type TradeRequest = $Result.DefaultSelection<Prisma.$TradeRequestPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model Favorite
 * 
 */
export type Favorite = $Result.DefaultSelection<Prisma.$FavoritePayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TradeStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED'
};

export type TradeStatus = (typeof TradeStatus)[keyof typeof TradeStatus]


export const ListingStatus: {
  ACTIVE: 'ACTIVE',
  SOLD: 'SOLD',
  ARCHIVED: 'ARCHIVED'
};

export type ListingStatus = (typeof ListingStatus)[keyof typeof ListingStatus]

}

export type TradeStatus = $Enums.TradeStatus

export const TradeStatus: typeof $Enums.TradeStatus

export type ListingStatus = $Enums.ListingStatus

export const ListingStatus: typeof $Enums.ListingStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.closet`: Exposes CRUD operations for the **Closet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Closets
    * const closets = await prisma.closet.findMany()
    * ```
    */
  get closet(): Prisma.ClosetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listing`: Exposes CRUD operations for the **Listing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Listings
    * const listings = await prisma.listing.findMany()
    * ```
    */
  get listing(): Prisma.ListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tradePreference`: Exposes CRUD operations for the **TradePreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradePreferences
    * const tradePreferences = await prisma.tradePreference.findMany()
    * ```
    */
  get tradePreference(): Prisma.TradePreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tradeRequest`: Exposes CRUD operations for the **TradeRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradeRequests
    * const tradeRequests = await prisma.tradeRequest.findMany()
    * ```
    */
  get tradeRequest(): Prisma.TradeRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favorite`: Exposes CRUD operations for the **Favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorites
    * const favorites = await prisma.favorite.findMany()
    * ```
    */
  get favorite(): Prisma.FavoriteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Closet: 'Closet',
    Listing: 'Listing',
    TradePreference: 'TradePreference',
    TradeRequest: 'TradeRequest',
    Tag: 'Tag',
    Favorite: 'Favorite',
    Message: 'Message'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "closet" | "listing" | "tradePreference" | "tradeRequest" | "tag" | "favorite" | "message"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Closet: {
        payload: Prisma.$ClosetPayload<ExtArgs>
        fields: Prisma.ClosetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClosetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClosetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload>
          }
          findFirst: {
            args: Prisma.ClosetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClosetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload>
          }
          findMany: {
            args: Prisma.ClosetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload>[]
          }
          create: {
            args: Prisma.ClosetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload>
          }
          createMany: {
            args: Prisma.ClosetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClosetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload>[]
          }
          delete: {
            args: Prisma.ClosetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload>
          }
          update: {
            args: Prisma.ClosetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload>
          }
          deleteMany: {
            args: Prisma.ClosetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClosetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClosetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload>[]
          }
          upsert: {
            args: Prisma.ClosetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClosetPayload>
          }
          aggregate: {
            args: Prisma.ClosetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCloset>
          }
          groupBy: {
            args: Prisma.ClosetGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClosetGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClosetCountArgs<ExtArgs>
            result: $Utils.Optional<ClosetCountAggregateOutputType> | number
          }
        }
      }
      Listing: {
        payload: Prisma.$ListingPayload<ExtArgs>
        fields: Prisma.ListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findFirst: {
            args: Prisma.ListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findMany: {
            args: Prisma.ListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          create: {
            args: Prisma.ListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          createMany: {
            args: Prisma.ListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          delete: {
            args: Prisma.ListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          update: {
            args: Prisma.ListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          deleteMany: {
            args: Prisma.ListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          upsert: {
            args: Prisma.ListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          aggregate: {
            args: Prisma.ListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListing>
          }
          groupBy: {
            args: Prisma.ListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingCountArgs<ExtArgs>
            result: $Utils.Optional<ListingCountAggregateOutputType> | number
          }
        }
      }
      TradePreference: {
        payload: Prisma.$TradePreferencePayload<ExtArgs>
        fields: Prisma.TradePreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradePreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradePreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload>
          }
          findFirst: {
            args: Prisma.TradePreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradePreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload>
          }
          findMany: {
            args: Prisma.TradePreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload>[]
          }
          create: {
            args: Prisma.TradePreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload>
          }
          createMany: {
            args: Prisma.TradePreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradePreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload>[]
          }
          delete: {
            args: Prisma.TradePreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload>
          }
          update: {
            args: Prisma.TradePreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload>
          }
          deleteMany: {
            args: Prisma.TradePreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradePreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradePreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload>[]
          }
          upsert: {
            args: Prisma.TradePreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePreferencePayload>
          }
          aggregate: {
            args: Prisma.TradePreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradePreference>
          }
          groupBy: {
            args: Prisma.TradePreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradePreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradePreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<TradePreferenceCountAggregateOutputType> | number
          }
        }
      }
      TradeRequest: {
        payload: Prisma.$TradeRequestPayload<ExtArgs>
        fields: Prisma.TradeRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          findFirst: {
            args: Prisma.TradeRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          findMany: {
            args: Prisma.TradeRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>[]
          }
          create: {
            args: Prisma.TradeRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          createMany: {
            args: Prisma.TradeRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>[]
          }
          delete: {
            args: Prisma.TradeRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          update: {
            args: Prisma.TradeRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          deleteMany: {
            args: Prisma.TradeRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>[]
          }
          upsert: {
            args: Prisma.TradeRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          aggregate: {
            args: Prisma.TradeRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradeRequest>
          }
          groupBy: {
            args: Prisma.TradeRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeRequestCountArgs<ExtArgs>
            result: $Utils.Optional<TradeRequestCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      Favorite: {
        payload: Prisma.$FavoritePayload<ExtArgs>
        fields: Prisma.FavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findFirst: {
            args: Prisma.FavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findMany: {
            args: Prisma.FavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          create: {
            args: Prisma.FavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          createMany: {
            args: Prisma.FavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FavoriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          delete: {
            args: Prisma.FavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          update: {
            args: Prisma.FavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          deleteMany: {
            args: Prisma.FavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FavoriteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          upsert: {
            args: Prisma.FavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          aggregate: {
            args: Prisma.FavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavorite>
          }
          groupBy: {
            args: Prisma.FavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    closet?: ClosetOmit
    listing?: ListingOmit
    tradePreference?: TradePreferenceOmit
    tradeRequest?: TradeRequestOmit
    tag?: TagOmit
    favorite?: FavoriteOmit
    message?: MessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    favorites: number
    messagesTo: number
    messagesFrom: number
    tradeRequestsSent: number
    tradeRequestsReceived: number
    listings: number
    TradePreference: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
    messagesTo?: boolean | UserCountOutputTypeCountMessagesToArgs
    messagesFrom?: boolean | UserCountOutputTypeCountMessagesFromArgs
    tradeRequestsSent?: boolean | UserCountOutputTypeCountTradeRequestsSentArgs
    tradeRequestsReceived?: boolean | UserCountOutputTypeCountTradeRequestsReceivedArgs
    listings?: boolean | UserCountOutputTypeCountListingsArgs
    TradePreference?: boolean | UserCountOutputTypeCountTradePreferenceArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTradeRequestsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTradeRequestsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTradePreferenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradePreferenceWhereInput
  }


  /**
   * Count Type ClosetCountOutputType
   */

  export type ClosetCountOutputType = {
    listings: number
  }

  export type ClosetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | ClosetCountOutputTypeCountListingsArgs
  }

  // Custom InputTypes
  /**
   * ClosetCountOutputType without action
   */
  export type ClosetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClosetCountOutputType
     */
    select?: ClosetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClosetCountOutputType without action
   */
  export type ClosetCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }


  /**
   * Count Type ListingCountOutputType
   */

  export type ListingCountOutputType = {
    tags: number
    favorites: number
    messages: number
    tradePreferences: number
    tradeRequestsInitiated: number
    tradeRequestsReceived: number
  }

  export type ListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | ListingCountOutputTypeCountTagsArgs
    favorites?: boolean | ListingCountOutputTypeCountFavoritesArgs
    messages?: boolean | ListingCountOutputTypeCountMessagesArgs
    tradePreferences?: boolean | ListingCountOutputTypeCountTradePreferencesArgs
    tradeRequestsInitiated?: boolean | ListingCountOutputTypeCountTradeRequestsInitiatedArgs
    tradeRequestsReceived?: boolean | ListingCountOutputTypeCountTradeRequestsReceivedArgs
  }

  // Custom InputTypes
  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCountOutputType
     */
    select?: ListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountTradePreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradePreferenceWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountTradeRequestsInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountTradeRequestsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestWhereInput
  }


  /**
   * Count Type TradeRequestCountOutputType
   */

  export type TradeRequestCountOutputType = {
    initiatorListings: number
    targetListings: number
  }

  export type TradeRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    initiatorListings?: boolean | TradeRequestCountOutputTypeCountInitiatorListingsArgs
    targetListings?: boolean | TradeRequestCountOutputTypeCountTargetListingsArgs
  }

  // Custom InputTypes
  /**
   * TradeRequestCountOutputType without action
   */
  export type TradeRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestCountOutputType
     */
    select?: TradeRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TradeRequestCountOutputType without action
   */
  export type TradeRequestCountOutputTypeCountInitiatorListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }

  /**
   * TradeRequestCountOutputType without action
   */
  export type TradeRequestCountOutputTypeCountTargetListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    listings: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | TagCountOutputTypeCountListingsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    clerkid: string | null
    image: string | null
    bio: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    clerkid: string | null
    image: string | null
    bio: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    firstName: number
    lastName: number
    clerkid: number
    image: number
    bio: number
    location: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    firstName?: true
    lastName?: true
    clerkid?: true
    image?: true
    bio?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    firstName?: true
    lastName?: true
    clerkid?: true
    image?: true
    bio?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    firstName?: true
    lastName?: true
    clerkid?: true
    image?: true
    bio?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    firstName: string | null
    lastName: string | null
    clerkid: string
    image: string | null
    bio: string | null
    location: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    clerkid?: boolean
    image?: boolean
    bio?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closet?: boolean | User$closetArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    messagesTo?: boolean | User$messagesToArgs<ExtArgs>
    messagesFrom?: boolean | User$messagesFromArgs<ExtArgs>
    tradeRequestsSent?: boolean | User$tradeRequestsSentArgs<ExtArgs>
    tradeRequestsReceived?: boolean | User$tradeRequestsReceivedArgs<ExtArgs>
    listings?: boolean | User$listingsArgs<ExtArgs>
    TradePreference?: boolean | User$TradePreferenceArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    clerkid?: boolean
    image?: boolean
    bio?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    clerkid?: boolean
    image?: boolean
    bio?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    clerkid?: boolean
    image?: boolean
    bio?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "firstName" | "lastName" | "clerkid" | "image" | "bio" | "location" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    closet?: boolean | User$closetArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    messagesTo?: boolean | User$messagesToArgs<ExtArgs>
    messagesFrom?: boolean | User$messagesFromArgs<ExtArgs>
    tradeRequestsSent?: boolean | User$tradeRequestsSentArgs<ExtArgs>
    tradeRequestsReceived?: boolean | User$tradeRequestsReceivedArgs<ExtArgs>
    listings?: boolean | User$listingsArgs<ExtArgs>
    TradePreference?: boolean | User$TradePreferenceArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      closet: Prisma.$ClosetPayload<ExtArgs> | null
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      messagesTo: Prisma.$MessagePayload<ExtArgs>[]
      messagesFrom: Prisma.$MessagePayload<ExtArgs>[]
      tradeRequestsSent: Prisma.$TradeRequestPayload<ExtArgs>[]
      tradeRequestsReceived: Prisma.$TradeRequestPayload<ExtArgs>[]
      listings: Prisma.$ListingPayload<ExtArgs>[]
      TradePreference: Prisma.$TradePreferencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      firstName: string | null
      lastName: string | null
      clerkid: string
      image: string | null
      bio: string | null
      location: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    closet<T extends User$closetArgs<ExtArgs> = {}>(args?: Subset<T, User$closetArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messagesTo<T extends User$messagesToArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messagesFrom<T extends User$messagesFromArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tradeRequestsSent<T extends User$tradeRequestsSentArgs<ExtArgs> = {}>(args?: Subset<T, User$tradeRequestsSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tradeRequestsReceived<T extends User$tradeRequestsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$tradeRequestsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    listings<T extends User$listingsArgs<ExtArgs> = {}>(args?: Subset<T, User$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    TradePreference<T extends User$TradePreferenceArgs<ExtArgs> = {}>(args?: Subset<T, User$TradePreferenceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly clerkid: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly location: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.closet
   */
  export type User$closetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    where?: ClosetWhereInput
  }

  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * User.messagesTo
   */
  export type User$messagesToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.messagesFrom
   */
  export type User$messagesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.tradeRequestsSent
   */
  export type User$tradeRequestsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    where?: TradeRequestWhereInput
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    cursor?: TradeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * User.tradeRequestsReceived
   */
  export type User$tradeRequestsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    where?: TradeRequestWhereInput
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    cursor?: TradeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * User.listings
   */
  export type User$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * User.TradePreference
   */
  export type User$TradePreferenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    where?: TradePreferenceWhereInput
    orderBy?: TradePreferenceOrderByWithRelationInput | TradePreferenceOrderByWithRelationInput[]
    cursor?: TradePreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradePreferenceScalarFieldEnum | TradePreferenceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Closet
   */

  export type AggregateCloset = {
    _count: ClosetCountAggregateOutputType | null
    _min: ClosetMinAggregateOutputType | null
    _max: ClosetMaxAggregateOutputType | null
  }

  export type ClosetMinAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ClosetMaxAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ClosetCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    createdAt: number
    _all: number
  }


  export type ClosetMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
  }

  export type ClosetMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
  }

  export type ClosetCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type ClosetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Closet to aggregate.
     */
    where?: ClosetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Closets to fetch.
     */
    orderBy?: ClosetOrderByWithRelationInput | ClosetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClosetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Closets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Closets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Closets
    **/
    _count?: true | ClosetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClosetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClosetMaxAggregateInputType
  }

  export type GetClosetAggregateType<T extends ClosetAggregateArgs> = {
        [P in keyof T & keyof AggregateCloset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCloset[P]>
      : GetScalarType<T[P], AggregateCloset[P]>
  }




  export type ClosetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClosetWhereInput
    orderBy?: ClosetOrderByWithAggregationInput | ClosetOrderByWithAggregationInput[]
    by: ClosetScalarFieldEnum[] | ClosetScalarFieldEnum
    having?: ClosetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClosetCountAggregateInputType | true
    _min?: ClosetMinAggregateInputType
    _max?: ClosetMaxAggregateInputType
  }

  export type ClosetGroupByOutputType = {
    id: string
    name: string
    userId: string
    createdAt: Date
    _count: ClosetCountAggregateOutputType | null
    _min: ClosetMinAggregateOutputType | null
    _max: ClosetMaxAggregateOutputType | null
  }

  type GetClosetGroupByPayload<T extends ClosetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClosetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClosetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClosetGroupByOutputType[P]>
            : GetScalarType<T[P], ClosetGroupByOutputType[P]>
        }
      >
    >


  export type ClosetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listings?: boolean | Closet$listingsArgs<ExtArgs>
    _count?: boolean | ClosetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["closet"]>

  export type ClosetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["closet"]>

  export type ClosetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["closet"]>

  export type ClosetSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type ClosetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId" | "createdAt", ExtArgs["result"]["closet"]>
  export type ClosetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listings?: boolean | Closet$listingsArgs<ExtArgs>
    _count?: boolean | ClosetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClosetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClosetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClosetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Closet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      listings: Prisma.$ListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["closet"]>
    composites: {}
  }

  type ClosetGetPayload<S extends boolean | null | undefined | ClosetDefaultArgs> = $Result.GetResult<Prisma.$ClosetPayload, S>

  type ClosetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClosetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClosetCountAggregateInputType | true
    }

  export interface ClosetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Closet'], meta: { name: 'Closet' } }
    /**
     * Find zero or one Closet that matches the filter.
     * @param {ClosetFindUniqueArgs} args - Arguments to find a Closet
     * @example
     * // Get one Closet
     * const closet = await prisma.closet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClosetFindUniqueArgs>(args: SelectSubset<T, ClosetFindUniqueArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Closet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClosetFindUniqueOrThrowArgs} args - Arguments to find a Closet
     * @example
     * // Get one Closet
     * const closet = await prisma.closet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClosetFindUniqueOrThrowArgs>(args: SelectSubset<T, ClosetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Closet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClosetFindFirstArgs} args - Arguments to find a Closet
     * @example
     * // Get one Closet
     * const closet = await prisma.closet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClosetFindFirstArgs>(args?: SelectSubset<T, ClosetFindFirstArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Closet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClosetFindFirstOrThrowArgs} args - Arguments to find a Closet
     * @example
     * // Get one Closet
     * const closet = await prisma.closet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClosetFindFirstOrThrowArgs>(args?: SelectSubset<T, ClosetFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Closets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClosetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Closets
     * const closets = await prisma.closet.findMany()
     * 
     * // Get first 10 Closets
     * const closets = await prisma.closet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const closetWithIdOnly = await prisma.closet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClosetFindManyArgs>(args?: SelectSubset<T, ClosetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Closet.
     * @param {ClosetCreateArgs} args - Arguments to create a Closet.
     * @example
     * // Create one Closet
     * const Closet = await prisma.closet.create({
     *   data: {
     *     // ... data to create a Closet
     *   }
     * })
     * 
     */
    create<T extends ClosetCreateArgs>(args: SelectSubset<T, ClosetCreateArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Closets.
     * @param {ClosetCreateManyArgs} args - Arguments to create many Closets.
     * @example
     * // Create many Closets
     * const closet = await prisma.closet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClosetCreateManyArgs>(args?: SelectSubset<T, ClosetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Closets and returns the data saved in the database.
     * @param {ClosetCreateManyAndReturnArgs} args - Arguments to create many Closets.
     * @example
     * // Create many Closets
     * const closet = await prisma.closet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Closets and only return the `id`
     * const closetWithIdOnly = await prisma.closet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClosetCreateManyAndReturnArgs>(args?: SelectSubset<T, ClosetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Closet.
     * @param {ClosetDeleteArgs} args - Arguments to delete one Closet.
     * @example
     * // Delete one Closet
     * const Closet = await prisma.closet.delete({
     *   where: {
     *     // ... filter to delete one Closet
     *   }
     * })
     * 
     */
    delete<T extends ClosetDeleteArgs>(args: SelectSubset<T, ClosetDeleteArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Closet.
     * @param {ClosetUpdateArgs} args - Arguments to update one Closet.
     * @example
     * // Update one Closet
     * const closet = await prisma.closet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClosetUpdateArgs>(args: SelectSubset<T, ClosetUpdateArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Closets.
     * @param {ClosetDeleteManyArgs} args - Arguments to filter Closets to delete.
     * @example
     * // Delete a few Closets
     * const { count } = await prisma.closet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClosetDeleteManyArgs>(args?: SelectSubset<T, ClosetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Closets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClosetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Closets
     * const closet = await prisma.closet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClosetUpdateManyArgs>(args: SelectSubset<T, ClosetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Closets and returns the data updated in the database.
     * @param {ClosetUpdateManyAndReturnArgs} args - Arguments to update many Closets.
     * @example
     * // Update many Closets
     * const closet = await prisma.closet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Closets and only return the `id`
     * const closetWithIdOnly = await prisma.closet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClosetUpdateManyAndReturnArgs>(args: SelectSubset<T, ClosetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Closet.
     * @param {ClosetUpsertArgs} args - Arguments to update or create a Closet.
     * @example
     * // Update or create a Closet
     * const closet = await prisma.closet.upsert({
     *   create: {
     *     // ... data to create a Closet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Closet we want to update
     *   }
     * })
     */
    upsert<T extends ClosetUpsertArgs>(args: SelectSubset<T, ClosetUpsertArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Closets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClosetCountArgs} args - Arguments to filter Closets to count.
     * @example
     * // Count the number of Closets
     * const count = await prisma.closet.count({
     *   where: {
     *     // ... the filter for the Closets we want to count
     *   }
     * })
    **/
    count<T extends ClosetCountArgs>(
      args?: Subset<T, ClosetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClosetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Closet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClosetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClosetAggregateArgs>(args: Subset<T, ClosetAggregateArgs>): Prisma.PrismaPromise<GetClosetAggregateType<T>>

    /**
     * Group by Closet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClosetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClosetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClosetGroupByArgs['orderBy'] }
        : { orderBy?: ClosetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClosetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClosetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Closet model
   */
  readonly fields: ClosetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Closet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClosetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listings<T extends Closet$listingsArgs<ExtArgs> = {}>(args?: Subset<T, Closet$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Closet model
   */
  interface ClosetFieldRefs {
    readonly id: FieldRef<"Closet", 'String'>
    readonly name: FieldRef<"Closet", 'String'>
    readonly userId: FieldRef<"Closet", 'String'>
    readonly createdAt: FieldRef<"Closet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Closet findUnique
   */
  export type ClosetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    /**
     * Filter, which Closet to fetch.
     */
    where: ClosetWhereUniqueInput
  }

  /**
   * Closet findUniqueOrThrow
   */
  export type ClosetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    /**
     * Filter, which Closet to fetch.
     */
    where: ClosetWhereUniqueInput
  }

  /**
   * Closet findFirst
   */
  export type ClosetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    /**
     * Filter, which Closet to fetch.
     */
    where?: ClosetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Closets to fetch.
     */
    orderBy?: ClosetOrderByWithRelationInput | ClosetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Closets.
     */
    cursor?: ClosetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Closets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Closets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Closets.
     */
    distinct?: ClosetScalarFieldEnum | ClosetScalarFieldEnum[]
  }

  /**
   * Closet findFirstOrThrow
   */
  export type ClosetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    /**
     * Filter, which Closet to fetch.
     */
    where?: ClosetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Closets to fetch.
     */
    orderBy?: ClosetOrderByWithRelationInput | ClosetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Closets.
     */
    cursor?: ClosetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Closets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Closets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Closets.
     */
    distinct?: ClosetScalarFieldEnum | ClosetScalarFieldEnum[]
  }

  /**
   * Closet findMany
   */
  export type ClosetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    /**
     * Filter, which Closets to fetch.
     */
    where?: ClosetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Closets to fetch.
     */
    orderBy?: ClosetOrderByWithRelationInput | ClosetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Closets.
     */
    cursor?: ClosetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Closets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Closets.
     */
    skip?: number
    distinct?: ClosetScalarFieldEnum | ClosetScalarFieldEnum[]
  }

  /**
   * Closet create
   */
  export type ClosetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    /**
     * The data needed to create a Closet.
     */
    data: XOR<ClosetCreateInput, ClosetUncheckedCreateInput>
  }

  /**
   * Closet createMany
   */
  export type ClosetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Closets.
     */
    data: ClosetCreateManyInput | ClosetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Closet createManyAndReturn
   */
  export type ClosetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * The data used to create many Closets.
     */
    data: ClosetCreateManyInput | ClosetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Closet update
   */
  export type ClosetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    /**
     * The data needed to update a Closet.
     */
    data: XOR<ClosetUpdateInput, ClosetUncheckedUpdateInput>
    /**
     * Choose, which Closet to update.
     */
    where: ClosetWhereUniqueInput
  }

  /**
   * Closet updateMany
   */
  export type ClosetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Closets.
     */
    data: XOR<ClosetUpdateManyMutationInput, ClosetUncheckedUpdateManyInput>
    /**
     * Filter which Closets to update
     */
    where?: ClosetWhereInput
    /**
     * Limit how many Closets to update.
     */
    limit?: number
  }

  /**
   * Closet updateManyAndReturn
   */
  export type ClosetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * The data used to update Closets.
     */
    data: XOR<ClosetUpdateManyMutationInput, ClosetUncheckedUpdateManyInput>
    /**
     * Filter which Closets to update
     */
    where?: ClosetWhereInput
    /**
     * Limit how many Closets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Closet upsert
   */
  export type ClosetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    /**
     * The filter to search for the Closet to update in case it exists.
     */
    where: ClosetWhereUniqueInput
    /**
     * In case the Closet found by the `where` argument doesn't exist, create a new Closet with this data.
     */
    create: XOR<ClosetCreateInput, ClosetUncheckedCreateInput>
    /**
     * In case the Closet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClosetUpdateInput, ClosetUncheckedUpdateInput>
  }

  /**
   * Closet delete
   */
  export type ClosetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
    /**
     * Filter which Closet to delete.
     */
    where: ClosetWhereUniqueInput
  }

  /**
   * Closet deleteMany
   */
  export type ClosetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Closets to delete
     */
    where?: ClosetWhereInput
    /**
     * Limit how many Closets to delete.
     */
    limit?: number
  }

  /**
   * Closet.listings
   */
  export type Closet$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Closet without action
   */
  export type ClosetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Closet
     */
    select?: ClosetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Closet
     */
    omit?: ClosetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClosetInclude<ExtArgs> | null
  }


  /**
   * Model Listing
   */

  export type AggregateListing = {
    _count: ListingCountAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  export type ListingMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    isPrivate: boolean | null
    userId: string | null
    closetId: string | null
    status: $Enums.ListingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListingMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    isPrivate: boolean | null
    userId: string | null
    closetId: string | null
    status: $Enums.ListingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListingCountAggregateOutputType = {
    id: number
    title: number
    description: number
    imageUrls: number
    isPrivate: number
    userId: number
    closetId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ListingMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    isPrivate?: true
    userId?: true
    closetId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListingMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    isPrivate?: true
    userId?: true
    closetId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListingCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrls?: true
    isPrivate?: true
    userId?: true
    closetId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listing to aggregate.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Listings
    **/
    _count?: true | ListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingMaxAggregateInputType
  }

  export type GetListingAggregateType<T extends ListingAggregateArgs> = {
        [P in keyof T & keyof AggregateListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListing[P]>
      : GetScalarType<T[P], AggregateListing[P]>
  }




  export type ListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithAggregationInput | ListingOrderByWithAggregationInput[]
    by: ListingScalarFieldEnum[] | ListingScalarFieldEnum
    having?: ListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingCountAggregateInputType | true
    _min?: ListingMinAggregateInputType
    _max?: ListingMaxAggregateInputType
  }

  export type ListingGroupByOutputType = {
    id: string
    title: string
    description: string
    imageUrls: string[]
    isPrivate: boolean
    userId: string
    closetId: string
    status: $Enums.ListingStatus
    createdAt: Date
    updatedAt: Date
    _count: ListingCountAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  type GetListingGroupByPayload<T extends ListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingGroupByOutputType[P]>
            : GetScalarType<T[P], ListingGroupByOutputType[P]>
        }
      >
    >


  export type ListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrls?: boolean
    isPrivate?: boolean
    userId?: boolean
    closetId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    closet?: boolean | ClosetDefaultArgs<ExtArgs>
    tags?: boolean | Listing$tagsArgs<ExtArgs>
    favorites?: boolean | Listing$favoritesArgs<ExtArgs>
    messages?: boolean | Listing$messagesArgs<ExtArgs>
    tradePreferences?: boolean | Listing$tradePreferencesArgs<ExtArgs>
    tradeRequestsInitiated?: boolean | Listing$tradeRequestsInitiatedArgs<ExtArgs>
    tradeRequestsReceived?: boolean | Listing$tradeRequestsReceivedArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrls?: boolean
    isPrivate?: boolean
    userId?: boolean
    closetId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    closet?: boolean | ClosetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrls?: boolean
    isPrivate?: boolean
    userId?: boolean
    closetId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    closet?: boolean | ClosetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrls?: boolean
    isPrivate?: boolean
    userId?: boolean
    closetId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "imageUrls" | "isPrivate" | "userId" | "closetId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["listing"]>
  export type ListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    closet?: boolean | ClosetDefaultArgs<ExtArgs>
    tags?: boolean | Listing$tagsArgs<ExtArgs>
    favorites?: boolean | Listing$favoritesArgs<ExtArgs>
    messages?: boolean | Listing$messagesArgs<ExtArgs>
    tradePreferences?: boolean | Listing$tradePreferencesArgs<ExtArgs>
    tradeRequestsInitiated?: boolean | Listing$tradeRequestsInitiatedArgs<ExtArgs>
    tradeRequestsReceived?: boolean | Listing$tradeRequestsReceivedArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    closet?: boolean | ClosetDefaultArgs<ExtArgs>
  }
  export type ListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    closet?: boolean | ClosetDefaultArgs<ExtArgs>
  }

  export type $ListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Listing"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      closet: Prisma.$ClosetPayload<ExtArgs>
      tags: Prisma.$TagPayload<ExtArgs>[]
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      tradePreferences: Prisma.$TradePreferencePayload<ExtArgs>[]
      tradeRequestsInitiated: Prisma.$TradeRequestPayload<ExtArgs>[]
      tradeRequestsReceived: Prisma.$TradeRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      imageUrls: string[]
      isPrivate: boolean
      userId: string
      closetId: string
      status: $Enums.ListingStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["listing"]>
    composites: {}
  }

  type ListingGetPayload<S extends boolean | null | undefined | ListingDefaultArgs> = $Result.GetResult<Prisma.$ListingPayload, S>

  type ListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListingCountAggregateInputType | true
    }

  export interface ListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Listing'], meta: { name: 'Listing' } }
    /**
     * Find zero or one Listing that matches the filter.
     * @param {ListingFindUniqueArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingFindUniqueArgs>(args: SelectSubset<T, ListingFindUniqueArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Listing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListingFindUniqueOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingFindFirstArgs>(args?: SelectSubset<T, ListingFindFirstArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Listings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Listings
     * const listings = await prisma.listing.findMany()
     * 
     * // Get first 10 Listings
     * const listings = await prisma.listing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingWithIdOnly = await prisma.listing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingFindManyArgs>(args?: SelectSubset<T, ListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Listing.
     * @param {ListingCreateArgs} args - Arguments to create a Listing.
     * @example
     * // Create one Listing
     * const Listing = await prisma.listing.create({
     *   data: {
     *     // ... data to create a Listing
     *   }
     * })
     * 
     */
    create<T extends ListingCreateArgs>(args: SelectSubset<T, ListingCreateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Listings.
     * @param {ListingCreateManyArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingCreateManyArgs>(args?: SelectSubset<T, ListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Listings and returns the data saved in the database.
     * @param {ListingCreateManyAndReturnArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Listing.
     * @param {ListingDeleteArgs} args - Arguments to delete one Listing.
     * @example
     * // Delete one Listing
     * const Listing = await prisma.listing.delete({
     *   where: {
     *     // ... filter to delete one Listing
     *   }
     * })
     * 
     */
    delete<T extends ListingDeleteArgs>(args: SelectSubset<T, ListingDeleteArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Listing.
     * @param {ListingUpdateArgs} args - Arguments to update one Listing.
     * @example
     * // Update one Listing
     * const listing = await prisma.listing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingUpdateArgs>(args: SelectSubset<T, ListingUpdateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Listings.
     * @param {ListingDeleteManyArgs} args - Arguments to filter Listings to delete.
     * @example
     * // Delete a few Listings
     * const { count } = await prisma.listing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingDeleteManyArgs>(args?: SelectSubset<T, ListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingUpdateManyArgs>(args: SelectSubset<T, ListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings and returns the data updated in the database.
     * @param {ListingUpdateManyAndReturnArgs} args - Arguments to update many Listings.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListingUpdateManyAndReturnArgs>(args: SelectSubset<T, ListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Listing.
     * @param {ListingUpsertArgs} args - Arguments to update or create a Listing.
     * @example
     * // Update or create a Listing
     * const listing = await prisma.listing.upsert({
     *   create: {
     *     // ... data to create a Listing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Listing we want to update
     *   }
     * })
     */
    upsert<T extends ListingUpsertArgs>(args: SelectSubset<T, ListingUpsertArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCountArgs} args - Arguments to filter Listings to count.
     * @example
     * // Count the number of Listings
     * const count = await prisma.listing.count({
     *   where: {
     *     // ... the filter for the Listings we want to count
     *   }
     * })
    **/
    count<T extends ListingCountArgs>(
      args?: Subset<T, ListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingAggregateArgs>(args: Subset<T, ListingAggregateArgs>): Prisma.PrismaPromise<GetListingAggregateType<T>>

    /**
     * Group by Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingGroupByArgs['orderBy'] }
        : { orderBy?: ListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Listing model
   */
  readonly fields: ListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Listing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    closet<T extends ClosetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClosetDefaultArgs<ExtArgs>>): Prisma__ClosetClient<$Result.GetResult<Prisma.$ClosetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends Listing$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Listing$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends Listing$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Listing$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends Listing$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Listing$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tradePreferences<T extends Listing$tradePreferencesArgs<ExtArgs> = {}>(args?: Subset<T, Listing$tradePreferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tradeRequestsInitiated<T extends Listing$tradeRequestsInitiatedArgs<ExtArgs> = {}>(args?: Subset<T, Listing$tradeRequestsInitiatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tradeRequestsReceived<T extends Listing$tradeRequestsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, Listing$tradeRequestsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Listing model
   */
  interface ListingFieldRefs {
    readonly id: FieldRef<"Listing", 'String'>
    readonly title: FieldRef<"Listing", 'String'>
    readonly description: FieldRef<"Listing", 'String'>
    readonly imageUrls: FieldRef<"Listing", 'String[]'>
    readonly isPrivate: FieldRef<"Listing", 'Boolean'>
    readonly userId: FieldRef<"Listing", 'String'>
    readonly closetId: FieldRef<"Listing", 'String'>
    readonly status: FieldRef<"Listing", 'ListingStatus'>
    readonly createdAt: FieldRef<"Listing", 'DateTime'>
    readonly updatedAt: FieldRef<"Listing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Listing findUnique
   */
  export type ListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findUniqueOrThrow
   */
  export type ListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findFirst
   */
  export type ListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findFirstOrThrow
   */
  export type ListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findMany
   */
  export type ListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listings to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing create
   */
  export type ListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to create a Listing.
     */
    data: XOR<ListingCreateInput, ListingUncheckedCreateInput>
  }

  /**
   * Listing createMany
   */
  export type ListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Listing createManyAndReturn
   */
  export type ListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing update
   */
  export type ListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to update a Listing.
     */
    data: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
    /**
     * Choose, which Listing to update.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing updateMany
   */
  export type ListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
  }

  /**
   * Listing updateManyAndReturn
   */
  export type ListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing upsert
   */
  export type ListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The filter to search for the Listing to update in case it exists.
     */
    where: ListingWhereUniqueInput
    /**
     * In case the Listing found by the `where` argument doesn't exist, create a new Listing with this data.
     */
    create: XOR<ListingCreateInput, ListingUncheckedCreateInput>
    /**
     * In case the Listing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
  }

  /**
   * Listing delete
   */
  export type ListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter which Listing to delete.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing deleteMany
   */
  export type ListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listings to delete
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to delete.
     */
    limit?: number
  }

  /**
   * Listing.tags
   */
  export type Listing$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Listing.favorites
   */
  export type Listing$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Listing.messages
   */
  export type Listing$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Listing.tradePreferences
   */
  export type Listing$tradePreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    where?: TradePreferenceWhereInput
    orderBy?: TradePreferenceOrderByWithRelationInput | TradePreferenceOrderByWithRelationInput[]
    cursor?: TradePreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradePreferenceScalarFieldEnum | TradePreferenceScalarFieldEnum[]
  }

  /**
   * Listing.tradeRequestsInitiated
   */
  export type Listing$tradeRequestsInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    where?: TradeRequestWhereInput
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    cursor?: TradeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * Listing.tradeRequestsReceived
   */
  export type Listing$tradeRequestsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    where?: TradeRequestWhereInput
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    cursor?: TradeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * Listing without action
   */
  export type ListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
  }


  /**
   * Model TradePreference
   */

  export type AggregateTradePreference = {
    _count: TradePreferenceCountAggregateOutputType | null
    _min: TradePreferenceMinAggregateOutputType | null
    _max: TradePreferenceMaxAggregateOutputType | null
  }

  export type TradePreferenceMinAggregateOutputType = {
    id: string | null
    listingId: string | null
    userId: string | null
    title: string | null
    imageUrl: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type TradePreferenceMaxAggregateOutputType = {
    id: string | null
    listingId: string | null
    userId: string | null
    title: string | null
    imageUrl: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type TradePreferenceCountAggregateOutputType = {
    id: number
    listingId: number
    userId: number
    title: number
    imageUrl: number
    notes: number
    createdAt: number
    _all: number
  }


  export type TradePreferenceMinAggregateInputType = {
    id?: true
    listingId?: true
    userId?: true
    title?: true
    imageUrl?: true
    notes?: true
    createdAt?: true
  }

  export type TradePreferenceMaxAggregateInputType = {
    id?: true
    listingId?: true
    userId?: true
    title?: true
    imageUrl?: true
    notes?: true
    createdAt?: true
  }

  export type TradePreferenceCountAggregateInputType = {
    id?: true
    listingId?: true
    userId?: true
    title?: true
    imageUrl?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type TradePreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradePreference to aggregate.
     */
    where?: TradePreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePreferences to fetch.
     */
    orderBy?: TradePreferenceOrderByWithRelationInput | TradePreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradePreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradePreferences
    **/
    _count?: true | TradePreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradePreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradePreferenceMaxAggregateInputType
  }

  export type GetTradePreferenceAggregateType<T extends TradePreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateTradePreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradePreference[P]>
      : GetScalarType<T[P], AggregateTradePreference[P]>
  }




  export type TradePreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradePreferenceWhereInput
    orderBy?: TradePreferenceOrderByWithAggregationInput | TradePreferenceOrderByWithAggregationInput[]
    by: TradePreferenceScalarFieldEnum[] | TradePreferenceScalarFieldEnum
    having?: TradePreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradePreferenceCountAggregateInputType | true
    _min?: TradePreferenceMinAggregateInputType
    _max?: TradePreferenceMaxAggregateInputType
  }

  export type TradePreferenceGroupByOutputType = {
    id: string
    listingId: string
    userId: string
    title: string
    imageUrl: string
    notes: string | null
    createdAt: Date
    _count: TradePreferenceCountAggregateOutputType | null
    _min: TradePreferenceMinAggregateOutputType | null
    _max: TradePreferenceMaxAggregateOutputType | null
  }

  type GetTradePreferenceGroupByPayload<T extends TradePreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradePreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradePreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradePreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], TradePreferenceGroupByOutputType[P]>
        }
      >
    >


  export type TradePreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    userId?: boolean
    title?: boolean
    imageUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradePreference"]>

  export type TradePreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    userId?: boolean
    title?: boolean
    imageUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradePreference"]>

  export type TradePreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    userId?: boolean
    title?: boolean
    imageUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradePreference"]>

  export type TradePreferenceSelectScalar = {
    id?: boolean
    listingId?: boolean
    userId?: boolean
    title?: boolean
    imageUrl?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type TradePreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "listingId" | "userId" | "title" | "imageUrl" | "notes" | "createdAt", ExtArgs["result"]["tradePreference"]>
  export type TradePreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TradePreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TradePreferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TradePreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradePreference"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      listingId: string
      userId: string
      title: string
      imageUrl: string
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["tradePreference"]>
    composites: {}
  }

  type TradePreferenceGetPayload<S extends boolean | null | undefined | TradePreferenceDefaultArgs> = $Result.GetResult<Prisma.$TradePreferencePayload, S>

  type TradePreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradePreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradePreferenceCountAggregateInputType | true
    }

  export interface TradePreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradePreference'], meta: { name: 'TradePreference' } }
    /**
     * Find zero or one TradePreference that matches the filter.
     * @param {TradePreferenceFindUniqueArgs} args - Arguments to find a TradePreference
     * @example
     * // Get one TradePreference
     * const tradePreference = await prisma.tradePreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradePreferenceFindUniqueArgs>(args: SelectSubset<T, TradePreferenceFindUniqueArgs<ExtArgs>>): Prisma__TradePreferenceClient<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TradePreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradePreferenceFindUniqueOrThrowArgs} args - Arguments to find a TradePreference
     * @example
     * // Get one TradePreference
     * const tradePreference = await prisma.tradePreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradePreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, TradePreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradePreferenceClient<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradePreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePreferenceFindFirstArgs} args - Arguments to find a TradePreference
     * @example
     * // Get one TradePreference
     * const tradePreference = await prisma.tradePreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradePreferenceFindFirstArgs>(args?: SelectSubset<T, TradePreferenceFindFirstArgs<ExtArgs>>): Prisma__TradePreferenceClient<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradePreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePreferenceFindFirstOrThrowArgs} args - Arguments to find a TradePreference
     * @example
     * // Get one TradePreference
     * const tradePreference = await prisma.tradePreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradePreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, TradePreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradePreferenceClient<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TradePreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradePreferences
     * const tradePreferences = await prisma.tradePreference.findMany()
     * 
     * // Get first 10 TradePreferences
     * const tradePreferences = await prisma.tradePreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradePreferenceWithIdOnly = await prisma.tradePreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradePreferenceFindManyArgs>(args?: SelectSubset<T, TradePreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TradePreference.
     * @param {TradePreferenceCreateArgs} args - Arguments to create a TradePreference.
     * @example
     * // Create one TradePreference
     * const TradePreference = await prisma.tradePreference.create({
     *   data: {
     *     // ... data to create a TradePreference
     *   }
     * })
     * 
     */
    create<T extends TradePreferenceCreateArgs>(args: SelectSubset<T, TradePreferenceCreateArgs<ExtArgs>>): Prisma__TradePreferenceClient<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TradePreferences.
     * @param {TradePreferenceCreateManyArgs} args - Arguments to create many TradePreferences.
     * @example
     * // Create many TradePreferences
     * const tradePreference = await prisma.tradePreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradePreferenceCreateManyArgs>(args?: SelectSubset<T, TradePreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradePreferences and returns the data saved in the database.
     * @param {TradePreferenceCreateManyAndReturnArgs} args - Arguments to create many TradePreferences.
     * @example
     * // Create many TradePreferences
     * const tradePreference = await prisma.tradePreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradePreferences and only return the `id`
     * const tradePreferenceWithIdOnly = await prisma.tradePreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradePreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, TradePreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TradePreference.
     * @param {TradePreferenceDeleteArgs} args - Arguments to delete one TradePreference.
     * @example
     * // Delete one TradePreference
     * const TradePreference = await prisma.tradePreference.delete({
     *   where: {
     *     // ... filter to delete one TradePreference
     *   }
     * })
     * 
     */
    delete<T extends TradePreferenceDeleteArgs>(args: SelectSubset<T, TradePreferenceDeleteArgs<ExtArgs>>): Prisma__TradePreferenceClient<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TradePreference.
     * @param {TradePreferenceUpdateArgs} args - Arguments to update one TradePreference.
     * @example
     * // Update one TradePreference
     * const tradePreference = await prisma.tradePreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradePreferenceUpdateArgs>(args: SelectSubset<T, TradePreferenceUpdateArgs<ExtArgs>>): Prisma__TradePreferenceClient<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TradePreferences.
     * @param {TradePreferenceDeleteManyArgs} args - Arguments to filter TradePreferences to delete.
     * @example
     * // Delete a few TradePreferences
     * const { count } = await prisma.tradePreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradePreferenceDeleteManyArgs>(args?: SelectSubset<T, TradePreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradePreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradePreferences
     * const tradePreference = await prisma.tradePreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradePreferenceUpdateManyArgs>(args: SelectSubset<T, TradePreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradePreferences and returns the data updated in the database.
     * @param {TradePreferenceUpdateManyAndReturnArgs} args - Arguments to update many TradePreferences.
     * @example
     * // Update many TradePreferences
     * const tradePreference = await prisma.tradePreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TradePreferences and only return the `id`
     * const tradePreferenceWithIdOnly = await prisma.tradePreference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradePreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, TradePreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TradePreference.
     * @param {TradePreferenceUpsertArgs} args - Arguments to update or create a TradePreference.
     * @example
     * // Update or create a TradePreference
     * const tradePreference = await prisma.tradePreference.upsert({
     *   create: {
     *     // ... data to create a TradePreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradePreference we want to update
     *   }
     * })
     */
    upsert<T extends TradePreferenceUpsertArgs>(args: SelectSubset<T, TradePreferenceUpsertArgs<ExtArgs>>): Prisma__TradePreferenceClient<$Result.GetResult<Prisma.$TradePreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TradePreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePreferenceCountArgs} args - Arguments to filter TradePreferences to count.
     * @example
     * // Count the number of TradePreferences
     * const count = await prisma.tradePreference.count({
     *   where: {
     *     // ... the filter for the TradePreferences we want to count
     *   }
     * })
    **/
    count<T extends TradePreferenceCountArgs>(
      args?: Subset<T, TradePreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradePreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradePreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradePreferenceAggregateArgs>(args: Subset<T, TradePreferenceAggregateArgs>): Prisma.PrismaPromise<GetTradePreferenceAggregateType<T>>

    /**
     * Group by TradePreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradePreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradePreferenceGroupByArgs['orderBy'] }
        : { orderBy?: TradePreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradePreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradePreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradePreference model
   */
  readonly fields: TradePreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradePreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradePreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TradePreference model
   */
  interface TradePreferenceFieldRefs {
    readonly id: FieldRef<"TradePreference", 'String'>
    readonly listingId: FieldRef<"TradePreference", 'String'>
    readonly userId: FieldRef<"TradePreference", 'String'>
    readonly title: FieldRef<"TradePreference", 'String'>
    readonly imageUrl: FieldRef<"TradePreference", 'String'>
    readonly notes: FieldRef<"TradePreference", 'String'>
    readonly createdAt: FieldRef<"TradePreference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradePreference findUnique
   */
  export type TradePreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    /**
     * Filter, which TradePreference to fetch.
     */
    where: TradePreferenceWhereUniqueInput
  }

  /**
   * TradePreference findUniqueOrThrow
   */
  export type TradePreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    /**
     * Filter, which TradePreference to fetch.
     */
    where: TradePreferenceWhereUniqueInput
  }

  /**
   * TradePreference findFirst
   */
  export type TradePreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    /**
     * Filter, which TradePreference to fetch.
     */
    where?: TradePreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePreferences to fetch.
     */
    orderBy?: TradePreferenceOrderByWithRelationInput | TradePreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradePreferences.
     */
    cursor?: TradePreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradePreferences.
     */
    distinct?: TradePreferenceScalarFieldEnum | TradePreferenceScalarFieldEnum[]
  }

  /**
   * TradePreference findFirstOrThrow
   */
  export type TradePreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    /**
     * Filter, which TradePreference to fetch.
     */
    where?: TradePreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePreferences to fetch.
     */
    orderBy?: TradePreferenceOrderByWithRelationInput | TradePreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradePreferences.
     */
    cursor?: TradePreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradePreferences.
     */
    distinct?: TradePreferenceScalarFieldEnum | TradePreferenceScalarFieldEnum[]
  }

  /**
   * TradePreference findMany
   */
  export type TradePreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    /**
     * Filter, which TradePreferences to fetch.
     */
    where?: TradePreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePreferences to fetch.
     */
    orderBy?: TradePreferenceOrderByWithRelationInput | TradePreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradePreferences.
     */
    cursor?: TradePreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePreferences.
     */
    skip?: number
    distinct?: TradePreferenceScalarFieldEnum | TradePreferenceScalarFieldEnum[]
  }

  /**
   * TradePreference create
   */
  export type TradePreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a TradePreference.
     */
    data: XOR<TradePreferenceCreateInput, TradePreferenceUncheckedCreateInput>
  }

  /**
   * TradePreference createMany
   */
  export type TradePreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradePreferences.
     */
    data: TradePreferenceCreateManyInput | TradePreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradePreference createManyAndReturn
   */
  export type TradePreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many TradePreferences.
     */
    data: TradePreferenceCreateManyInput | TradePreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradePreference update
   */
  export type TradePreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a TradePreference.
     */
    data: XOR<TradePreferenceUpdateInput, TradePreferenceUncheckedUpdateInput>
    /**
     * Choose, which TradePreference to update.
     */
    where: TradePreferenceWhereUniqueInput
  }

  /**
   * TradePreference updateMany
   */
  export type TradePreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradePreferences.
     */
    data: XOR<TradePreferenceUpdateManyMutationInput, TradePreferenceUncheckedUpdateManyInput>
    /**
     * Filter which TradePreferences to update
     */
    where?: TradePreferenceWhereInput
    /**
     * Limit how many TradePreferences to update.
     */
    limit?: number
  }

  /**
   * TradePreference updateManyAndReturn
   */
  export type TradePreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * The data used to update TradePreferences.
     */
    data: XOR<TradePreferenceUpdateManyMutationInput, TradePreferenceUncheckedUpdateManyInput>
    /**
     * Filter which TradePreferences to update
     */
    where?: TradePreferenceWhereInput
    /**
     * Limit how many TradePreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradePreference upsert
   */
  export type TradePreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the TradePreference to update in case it exists.
     */
    where: TradePreferenceWhereUniqueInput
    /**
     * In case the TradePreference found by the `where` argument doesn't exist, create a new TradePreference with this data.
     */
    create: XOR<TradePreferenceCreateInput, TradePreferenceUncheckedCreateInput>
    /**
     * In case the TradePreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradePreferenceUpdateInput, TradePreferenceUncheckedUpdateInput>
  }

  /**
   * TradePreference delete
   */
  export type TradePreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
    /**
     * Filter which TradePreference to delete.
     */
    where: TradePreferenceWhereUniqueInput
  }

  /**
   * TradePreference deleteMany
   */
  export type TradePreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradePreferences to delete
     */
    where?: TradePreferenceWhereInput
    /**
     * Limit how many TradePreferences to delete.
     */
    limit?: number
  }

  /**
   * TradePreference without action
   */
  export type TradePreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePreference
     */
    select?: TradePreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradePreference
     */
    omit?: TradePreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePreferenceInclude<ExtArgs> | null
  }


  /**
   * Model TradeRequest
   */

  export type AggregateTradeRequest = {
    _count: TradeRequestCountAggregateOutputType | null
    _min: TradeRequestMinAggregateOutputType | null
    _max: TradeRequestMaxAggregateOutputType | null
  }

  export type TradeRequestMinAggregateOutputType = {
    id: string | null
    fromUserId: string | null
    toUserId: string | null
    status: $Enums.TradeStatus | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeRequestMaxAggregateOutputType = {
    id: string | null
    fromUserId: string | null
    toUserId: string | null
    status: $Enums.TradeStatus | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeRequestCountAggregateOutputType = {
    id: number
    fromUserId: number
    toUserId: number
    status: number
    message: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TradeRequestMinAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    status?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeRequestMaxAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    status?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeRequestCountAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    status?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TradeRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeRequest to aggregate.
     */
    where?: TradeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequests to fetch.
     */
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradeRequests
    **/
    _count?: true | TradeRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeRequestMaxAggregateInputType
  }

  export type GetTradeRequestAggregateType<T extends TradeRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateTradeRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradeRequest[P]>
      : GetScalarType<T[P], AggregateTradeRequest[P]>
  }




  export type TradeRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestWhereInput
    orderBy?: TradeRequestOrderByWithAggregationInput | TradeRequestOrderByWithAggregationInput[]
    by: TradeRequestScalarFieldEnum[] | TradeRequestScalarFieldEnum
    having?: TradeRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeRequestCountAggregateInputType | true
    _min?: TradeRequestMinAggregateInputType
    _max?: TradeRequestMaxAggregateInputType
  }

  export type TradeRequestGroupByOutputType = {
    id: string
    fromUserId: string
    toUserId: string
    status: $Enums.TradeStatus
    message: string | null
    createdAt: Date
    updatedAt: Date
    _count: TradeRequestCountAggregateOutputType | null
    _min: TradeRequestMinAggregateOutputType | null
    _max: TradeRequestMaxAggregateOutputType | null
  }

  type GetTradeRequestGroupByPayload<T extends TradeRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeRequestGroupByOutputType[P]>
            : GetScalarType<T[P], TradeRequestGroupByOutputType[P]>
        }
      >
    >


  export type TradeRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    initiatorListings?: boolean | TradeRequest$initiatorListingsArgs<ExtArgs>
    targetListings?: boolean | TradeRequest$targetListingsArgs<ExtArgs>
    _count?: boolean | TradeRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeRequest"]>

  export type TradeRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeRequest"]>

  export type TradeRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeRequest"]>

  export type TradeRequestSelectScalar = {
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TradeRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fromUserId" | "toUserId" | "status" | "message" | "createdAt" | "updatedAt", ExtArgs["result"]["tradeRequest"]>
  export type TradeRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    initiatorListings?: boolean | TradeRequest$initiatorListingsArgs<ExtArgs>
    targetListings?: boolean | TradeRequest$targetListingsArgs<ExtArgs>
    _count?: boolean | TradeRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TradeRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TradeRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TradeRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradeRequest"
    objects: {
      fromUser: Prisma.$UserPayload<ExtArgs>
      toUser: Prisma.$UserPayload<ExtArgs>
      initiatorListings: Prisma.$ListingPayload<ExtArgs>[]
      targetListings: Prisma.$ListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fromUserId: string
      toUserId: string
      status: $Enums.TradeStatus
      message: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tradeRequest"]>
    composites: {}
  }

  type TradeRequestGetPayload<S extends boolean | null | undefined | TradeRequestDefaultArgs> = $Result.GetResult<Prisma.$TradeRequestPayload, S>

  type TradeRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeRequestCountAggregateInputType | true
    }

  export interface TradeRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradeRequest'], meta: { name: 'TradeRequest' } }
    /**
     * Find zero or one TradeRequest that matches the filter.
     * @param {TradeRequestFindUniqueArgs} args - Arguments to find a TradeRequest
     * @example
     * // Get one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeRequestFindUniqueArgs>(args: SelectSubset<T, TradeRequestFindUniqueArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TradeRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeRequestFindUniqueOrThrowArgs} args - Arguments to find a TradeRequest
     * @example
     * // Get one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestFindFirstArgs} args - Arguments to find a TradeRequest
     * @example
     * // Get one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeRequestFindFirstArgs>(args?: SelectSubset<T, TradeRequestFindFirstArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestFindFirstOrThrowArgs} args - Arguments to find a TradeRequest
     * @example
     * // Get one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TradeRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradeRequests
     * const tradeRequests = await prisma.tradeRequest.findMany()
     * 
     * // Get first 10 TradeRequests
     * const tradeRequests = await prisma.tradeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeRequestWithIdOnly = await prisma.tradeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeRequestFindManyArgs>(args?: SelectSubset<T, TradeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TradeRequest.
     * @param {TradeRequestCreateArgs} args - Arguments to create a TradeRequest.
     * @example
     * // Create one TradeRequest
     * const TradeRequest = await prisma.tradeRequest.create({
     *   data: {
     *     // ... data to create a TradeRequest
     *   }
     * })
     * 
     */
    create<T extends TradeRequestCreateArgs>(args: SelectSubset<T, TradeRequestCreateArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TradeRequests.
     * @param {TradeRequestCreateManyArgs} args - Arguments to create many TradeRequests.
     * @example
     * // Create many TradeRequests
     * const tradeRequest = await prisma.tradeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeRequestCreateManyArgs>(args?: SelectSubset<T, TradeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradeRequests and returns the data saved in the database.
     * @param {TradeRequestCreateManyAndReturnArgs} args - Arguments to create many TradeRequests.
     * @example
     * // Create many TradeRequests
     * const tradeRequest = await prisma.tradeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradeRequests and only return the `id`
     * const tradeRequestWithIdOnly = await prisma.tradeRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TradeRequest.
     * @param {TradeRequestDeleteArgs} args - Arguments to delete one TradeRequest.
     * @example
     * // Delete one TradeRequest
     * const TradeRequest = await prisma.tradeRequest.delete({
     *   where: {
     *     // ... filter to delete one TradeRequest
     *   }
     * })
     * 
     */
    delete<T extends TradeRequestDeleteArgs>(args: SelectSubset<T, TradeRequestDeleteArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TradeRequest.
     * @param {TradeRequestUpdateArgs} args - Arguments to update one TradeRequest.
     * @example
     * // Update one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeRequestUpdateArgs>(args: SelectSubset<T, TradeRequestUpdateArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TradeRequests.
     * @param {TradeRequestDeleteManyArgs} args - Arguments to filter TradeRequests to delete.
     * @example
     * // Delete a few TradeRequests
     * const { count } = await prisma.tradeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeRequestDeleteManyArgs>(args?: SelectSubset<T, TradeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradeRequests
     * const tradeRequest = await prisma.tradeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeRequestUpdateManyArgs>(args: SelectSubset<T, TradeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeRequests and returns the data updated in the database.
     * @param {TradeRequestUpdateManyAndReturnArgs} args - Arguments to update many TradeRequests.
     * @example
     * // Update many TradeRequests
     * const tradeRequest = await prisma.tradeRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TradeRequests and only return the `id`
     * const tradeRequestWithIdOnly = await prisma.tradeRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TradeRequest.
     * @param {TradeRequestUpsertArgs} args - Arguments to update or create a TradeRequest.
     * @example
     * // Update or create a TradeRequest
     * const tradeRequest = await prisma.tradeRequest.upsert({
     *   create: {
     *     // ... data to create a TradeRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradeRequest we want to update
     *   }
     * })
     */
    upsert<T extends TradeRequestUpsertArgs>(args: SelectSubset<T, TradeRequestUpsertArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TradeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestCountArgs} args - Arguments to filter TradeRequests to count.
     * @example
     * // Count the number of TradeRequests
     * const count = await prisma.tradeRequest.count({
     *   where: {
     *     // ... the filter for the TradeRequests we want to count
     *   }
     * })
    **/
    count<T extends TradeRequestCountArgs>(
      args?: Subset<T, TradeRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeRequestAggregateArgs>(args: Subset<T, TradeRequestAggregateArgs>): Prisma.PrismaPromise<GetTradeRequestAggregateType<T>>

    /**
     * Group by TradeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeRequestGroupByArgs['orderBy'] }
        : { orderBy?: TradeRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradeRequest model
   */
  readonly fields: TradeRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradeRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    initiatorListings<T extends TradeRequest$initiatorListingsArgs<ExtArgs> = {}>(args?: Subset<T, TradeRequest$initiatorListingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    targetListings<T extends TradeRequest$targetListingsArgs<ExtArgs> = {}>(args?: Subset<T, TradeRequest$targetListingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TradeRequest model
   */
  interface TradeRequestFieldRefs {
    readonly id: FieldRef<"TradeRequest", 'String'>
    readonly fromUserId: FieldRef<"TradeRequest", 'String'>
    readonly toUserId: FieldRef<"TradeRequest", 'String'>
    readonly status: FieldRef<"TradeRequest", 'TradeStatus'>
    readonly message: FieldRef<"TradeRequest", 'String'>
    readonly createdAt: FieldRef<"TradeRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"TradeRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradeRequest findUnique
   */
  export type TradeRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequest to fetch.
     */
    where: TradeRequestWhereUniqueInput
  }

  /**
   * TradeRequest findUniqueOrThrow
   */
  export type TradeRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequest to fetch.
     */
    where: TradeRequestWhereUniqueInput
  }

  /**
   * TradeRequest findFirst
   */
  export type TradeRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequest to fetch.
     */
    where?: TradeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequests to fetch.
     */
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeRequests.
     */
    cursor?: TradeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeRequests.
     */
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * TradeRequest findFirstOrThrow
   */
  export type TradeRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequest to fetch.
     */
    where?: TradeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequests to fetch.
     */
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeRequests.
     */
    cursor?: TradeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeRequests.
     */
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * TradeRequest findMany
   */
  export type TradeRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequests to fetch.
     */
    where?: TradeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequests to fetch.
     */
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradeRequests.
     */
    cursor?: TradeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequests.
     */
    skip?: number
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * TradeRequest create
   */
  export type TradeRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a TradeRequest.
     */
    data: XOR<TradeRequestCreateInput, TradeRequestUncheckedCreateInput>
  }

  /**
   * TradeRequest createMany
   */
  export type TradeRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradeRequests.
     */
    data: TradeRequestCreateManyInput | TradeRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradeRequest createManyAndReturn
   */
  export type TradeRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * The data used to create many TradeRequests.
     */
    data: TradeRequestCreateManyInput | TradeRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeRequest update
   */
  export type TradeRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a TradeRequest.
     */
    data: XOR<TradeRequestUpdateInput, TradeRequestUncheckedUpdateInput>
    /**
     * Choose, which TradeRequest to update.
     */
    where: TradeRequestWhereUniqueInput
  }

  /**
   * TradeRequest updateMany
   */
  export type TradeRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradeRequests.
     */
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyInput>
    /**
     * Filter which TradeRequests to update
     */
    where?: TradeRequestWhereInput
    /**
     * Limit how many TradeRequests to update.
     */
    limit?: number
  }

  /**
   * TradeRequest updateManyAndReturn
   */
  export type TradeRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * The data used to update TradeRequests.
     */
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyInput>
    /**
     * Filter which TradeRequests to update
     */
    where?: TradeRequestWhereInput
    /**
     * Limit how many TradeRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeRequest upsert
   */
  export type TradeRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the TradeRequest to update in case it exists.
     */
    where: TradeRequestWhereUniqueInput
    /**
     * In case the TradeRequest found by the `where` argument doesn't exist, create a new TradeRequest with this data.
     */
    create: XOR<TradeRequestCreateInput, TradeRequestUncheckedCreateInput>
    /**
     * In case the TradeRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeRequestUpdateInput, TradeRequestUncheckedUpdateInput>
  }

  /**
   * TradeRequest delete
   */
  export type TradeRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter which TradeRequest to delete.
     */
    where: TradeRequestWhereUniqueInput
  }

  /**
   * TradeRequest deleteMany
   */
  export type TradeRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeRequests to delete
     */
    where?: TradeRequestWhereInput
    /**
     * Limit how many TradeRequests to delete.
     */
    limit?: number
  }

  /**
   * TradeRequest.initiatorListings
   */
  export type TradeRequest$initiatorListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * TradeRequest.targetListings
   */
  export type TradeRequest$targetListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * TradeRequest without action
   */
  export type TradeRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    listings?: boolean | Tag$listingsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | Tag$listingsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      listings: Prisma.$ListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listings<T extends Tag$listingsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.listings
   */
  export type Tag$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model Favorite
   */

  export type AggregateFavorite = {
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  export type FavoriteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    listingId: string | null
  }

  export type FavoriteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    listingId: string | null
  }

  export type FavoriteCountAggregateOutputType = {
    id: number
    userId: number
    listingId: number
    _all: number
  }


  export type FavoriteMinAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
  }

  export type FavoriteMaxAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
  }

  export type FavoriteCountAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    _all?: true
  }

  export type FavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorite to aggregate.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorites
    **/
    _count?: true | FavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteMaxAggregateInputType
  }

  export type GetFavoriteAggregateType<T extends FavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorite[P]>
      : GetScalarType<T[P], AggregateFavorite[P]>
  }




  export type FavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithAggregationInput | FavoriteOrderByWithAggregationInput[]
    by: FavoriteScalarFieldEnum[] | FavoriteScalarFieldEnum
    having?: FavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteCountAggregateInputType | true
    _min?: FavoriteMinAggregateInputType
    _max?: FavoriteMaxAggregateInputType
  }

  export type FavoriteGroupByOutputType = {
    id: string
    userId: string
    listingId: string
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  type GetFavoriteGroupByPayload<T extends FavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectScalar = {
    id?: boolean
    userId?: boolean
    listingId?: boolean
  }

  export type FavoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "listingId", ExtArgs["result"]["favorite"]>
  export type FavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }

  export type $FavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Favorite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      listing: Prisma.$ListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      listingId: string
    }, ExtArgs["result"]["favorite"]>
    composites: {}
  }

  type FavoriteGetPayload<S extends boolean | null | undefined | FavoriteDefaultArgs> = $Result.GetResult<Prisma.$FavoritePayload, S>

  type FavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoriteCountAggregateInputType | true
    }

  export interface FavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favorite'], meta: { name: 'Favorite' } }
    /**
     * Find zero or one Favorite that matches the filter.
     * @param {FavoriteFindUniqueArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteFindUniqueArgs>(args: SelectSubset<T, FavoriteFindUniqueArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Favorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoriteFindUniqueOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteFindFirstArgs>(args?: SelectSubset<T, FavoriteFindFirstArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorites
     * const favorites = await prisma.favorite.findMany()
     * 
     * // Get first 10 Favorites
     * const favorites = await prisma.favorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteWithIdOnly = await prisma.favorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoriteFindManyArgs>(args?: SelectSubset<T, FavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Favorite.
     * @param {FavoriteCreateArgs} args - Arguments to create a Favorite.
     * @example
     * // Create one Favorite
     * const Favorite = await prisma.favorite.create({
     *   data: {
     *     // ... data to create a Favorite
     *   }
     * })
     * 
     */
    create<T extends FavoriteCreateArgs>(args: SelectSubset<T, FavoriteCreateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Favorites.
     * @param {FavoriteCreateManyArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteCreateManyArgs>(args?: SelectSubset<T, FavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Favorites and returns the data saved in the database.
     * @param {FavoriteCreateManyAndReturnArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Favorites and only return the `id`
     * const favoriteWithIdOnly = await prisma.favorite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FavoriteCreateManyAndReturnArgs>(args?: SelectSubset<T, FavoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Favorite.
     * @param {FavoriteDeleteArgs} args - Arguments to delete one Favorite.
     * @example
     * // Delete one Favorite
     * const Favorite = await prisma.favorite.delete({
     *   where: {
     *     // ... filter to delete one Favorite
     *   }
     * })
     * 
     */
    delete<T extends FavoriteDeleteArgs>(args: SelectSubset<T, FavoriteDeleteArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Favorite.
     * @param {FavoriteUpdateArgs} args - Arguments to update one Favorite.
     * @example
     * // Update one Favorite
     * const favorite = await prisma.favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteUpdateArgs>(args: SelectSubset<T, FavoriteUpdateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Favorites.
     * @param {FavoriteDeleteManyArgs} args - Arguments to filter Favorites to delete.
     * @example
     * // Delete a few Favorites
     * const { count } = await prisma.favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteDeleteManyArgs>(args?: SelectSubset<T, FavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteUpdateManyArgs>(args: SelectSubset<T, FavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites and returns the data updated in the database.
     * @param {FavoriteUpdateManyAndReturnArgs} args - Arguments to update many Favorites.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Favorites and only return the `id`
     * const favoriteWithIdOnly = await prisma.favorite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FavoriteUpdateManyAndReturnArgs>(args: SelectSubset<T, FavoriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Favorite.
     * @param {FavoriteUpsertArgs} args - Arguments to update or create a Favorite.
     * @example
     * // Update or create a Favorite
     * const favorite = await prisma.favorite.upsert({
     *   create: {
     *     // ... data to create a Favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorite we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteUpsertArgs>(args: SelectSubset<T, FavoriteUpsertArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteCountArgs} args - Arguments to filter Favorites to count.
     * @example
     * // Count the number of Favorites
     * const count = await prisma.favorite.count({
     *   where: {
     *     // ... the filter for the Favorites we want to count
     *   }
     * })
    **/
    count<T extends FavoriteCountArgs>(
      args?: Subset<T, FavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoriteAggregateArgs>(args: Subset<T, FavoriteAggregateArgs>): Prisma.PrismaPromise<GetFavoriteAggregateType<T>>

    /**
     * Group by Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Favorite model
   */
  readonly fields: FavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Favorite model
   */
  interface FavoriteFieldRefs {
    readonly id: FieldRef<"Favorite", 'String'>
    readonly userId: FieldRef<"Favorite", 'String'>
    readonly listingId: FieldRef<"Favorite", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Favorite findUnique
   */
  export type FavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findUniqueOrThrow
   */
  export type FavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findFirst
   */
  export type FavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findFirstOrThrow
   */
  export type FavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findMany
   */
  export type FavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorites to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite create
   */
  export type FavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a Favorite.
     */
    data: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
  }

  /**
   * Favorite createMany
   */
  export type FavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Favorite createManyAndReturn
   */
  export type FavoriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite update
   */
  export type FavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a Favorite.
     */
    data: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
    /**
     * Choose, which Favorite to update.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite updateMany
   */
  export type FavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
  }

  /**
   * Favorite updateManyAndReturn
   */
  export type FavoriteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite upsert
   */
  export type FavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the Favorite to update in case it exists.
     */
    where: FavoriteWhereUniqueInput
    /**
     * In case the Favorite found by the `where` argument doesn't exist, create a new Favorite with this data.
     */
    create: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
    /**
     * In case the Favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
  }

  /**
   * Favorite delete
   */
  export type FavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter which Favorite to delete.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite deleteMany
   */
  export type FavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorites to delete
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to delete.
     */
    limit?: number
  }

  /**
   * Favorite without action
   */
  export type FavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    fromId: string | null
    toId: string | null
    content: string | null
    listingId: string | null
    timestamp: Date | null
    updatedAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    fromId: string | null
    toId: string | null
    content: string | null
    listingId: string | null
    timestamp: Date | null
    updatedAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    fromId: number
    toId: number
    content: number
    listingId: number
    timestamp: number
    updatedAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    fromId?: true
    toId?: true
    content?: true
    listingId?: true
    timestamp?: true
    updatedAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    fromId?: true
    toId?: true
    content?: true
    listingId?: true
    timestamp?: true
    updatedAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    fromId?: true
    toId?: true
    content?: true
    listingId?: true
    timestamp?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    fromId: string
    toId: string
    content: string
    listingId: string | null
    timestamp: Date
    updatedAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromId?: boolean
    toId?: boolean
    content?: boolean
    listingId?: boolean
    timestamp?: boolean
    updatedAt?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | Message$listingArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromId?: boolean
    toId?: boolean
    content?: boolean
    listingId?: boolean
    timestamp?: boolean
    updatedAt?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | Message$listingArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromId?: boolean
    toId?: boolean
    content?: boolean
    listingId?: boolean
    timestamp?: boolean
    updatedAt?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | Message$listingArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    fromId?: boolean
    toId?: boolean
    content?: boolean
    listingId?: boolean
    timestamp?: boolean
    updatedAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fromId" | "toId" | "content" | "listingId" | "timestamp" | "updatedAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | Message$listingArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | Message$listingArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | Message$listingArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      from: Prisma.$UserPayload<ExtArgs>
      to: Prisma.$UserPayload<ExtArgs>
      listing: Prisma.$ListingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fromId: string
      toId: string
      content: string
      listingId: string | null
      timestamp: Date
      updatedAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    from<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    to<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listing<T extends Message$listingArgs<ExtArgs> = {}>(args?: Subset<T, Message$listingArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly fromId: FieldRef<"Message", 'String'>
    readonly toId: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly listingId: FieldRef<"Message", 'String'>
    readonly timestamp: FieldRef<"Message", 'DateTime'>
    readonly updatedAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message.listing
   */
  export type Message$listingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    clerkid: 'clerkid',
    image: 'image',
    bio: 'bio',
    location: 'location',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClosetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type ClosetScalarFieldEnum = (typeof ClosetScalarFieldEnum)[keyof typeof ClosetScalarFieldEnum]


  export const ListingScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    imageUrls: 'imageUrls',
    isPrivate: 'isPrivate',
    userId: 'userId',
    closetId: 'closetId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ListingScalarFieldEnum = (typeof ListingScalarFieldEnum)[keyof typeof ListingScalarFieldEnum]


  export const TradePreferenceScalarFieldEnum: {
    id: 'id',
    listingId: 'listingId',
    userId: 'userId',
    title: 'title',
    imageUrl: 'imageUrl',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type TradePreferenceScalarFieldEnum = (typeof TradePreferenceScalarFieldEnum)[keyof typeof TradePreferenceScalarFieldEnum]


  export const TradeRequestScalarFieldEnum: {
    id: 'id',
    fromUserId: 'fromUserId',
    toUserId: 'toUserId',
    status: 'status',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TradeRequestScalarFieldEnum = (typeof TradeRequestScalarFieldEnum)[keyof typeof TradeRequestScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const FavoriteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    listingId: 'listingId'
  };

  export type FavoriteScalarFieldEnum = (typeof FavoriteScalarFieldEnum)[keyof typeof FavoriteScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    fromId: 'fromId',
    toId: 'toId',
    content: 'content',
    listingId: 'listingId',
    timestamp: 'timestamp',
    updatedAt: 'updatedAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ListingStatus'
   */
  export type EnumListingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListingStatus'>
    


  /**
   * Reference to a field of type 'ListingStatus[]'
   */
  export type ListEnumListingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListingStatus[]'>
    


  /**
   * Reference to a field of type 'TradeStatus'
   */
  export type EnumTradeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TradeStatus'>
    


  /**
   * Reference to a field of type 'TradeStatus[]'
   */
  export type ListEnumTradeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TradeStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    clerkid?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    closet?: XOR<ClosetNullableScalarRelationFilter, ClosetWhereInput> | null
    favorites?: FavoriteListRelationFilter
    messagesTo?: MessageListRelationFilter
    messagesFrom?: MessageListRelationFilter
    tradeRequestsSent?: TradeRequestListRelationFilter
    tradeRequestsReceived?: TradeRequestListRelationFilter
    listings?: ListingListRelationFilter
    TradePreference?: TradePreferenceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    clerkid?: SortOrder
    image?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closet?: ClosetOrderByWithRelationInput
    favorites?: FavoriteOrderByRelationAggregateInput
    messagesTo?: MessageOrderByRelationAggregateInput
    messagesFrom?: MessageOrderByRelationAggregateInput
    tradeRequestsSent?: TradeRequestOrderByRelationAggregateInput
    tradeRequestsReceived?: TradeRequestOrderByRelationAggregateInput
    listings?: ListingOrderByRelationAggregateInput
    TradePreference?: TradePreferenceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    clerkid?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    closet?: XOR<ClosetNullableScalarRelationFilter, ClosetWhereInput> | null
    favorites?: FavoriteListRelationFilter
    messagesTo?: MessageListRelationFilter
    messagesFrom?: MessageListRelationFilter
    tradeRequestsSent?: TradeRequestListRelationFilter
    tradeRequestsReceived?: TradeRequestListRelationFilter
    listings?: ListingListRelationFilter
    TradePreference?: TradePreferenceListRelationFilter
  }, "id" | "username" | "email" | "clerkid">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    clerkid?: SortOrder
    image?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    clerkid?: StringWithAggregatesFilter<"User"> | string
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    location?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClosetWhereInput = {
    AND?: ClosetWhereInput | ClosetWhereInput[]
    OR?: ClosetWhereInput[]
    NOT?: ClosetWhereInput | ClosetWhereInput[]
    id?: UuidFilter<"Closet"> | string
    name?: StringFilter<"Closet"> | string
    userId?: UuidFilter<"Closet"> | string
    createdAt?: DateTimeFilter<"Closet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listings?: ListingListRelationFilter
  }

  export type ClosetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    listings?: ListingOrderByRelationAggregateInput
  }

  export type ClosetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ClosetWhereInput | ClosetWhereInput[]
    OR?: ClosetWhereInput[]
    NOT?: ClosetWhereInput | ClosetWhereInput[]
    name?: StringFilter<"Closet"> | string
    createdAt?: DateTimeFilter<"Closet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listings?: ListingListRelationFilter
  }, "id" | "userId">

  export type ClosetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: ClosetCountOrderByAggregateInput
    _max?: ClosetMaxOrderByAggregateInput
    _min?: ClosetMinOrderByAggregateInput
  }

  export type ClosetScalarWhereWithAggregatesInput = {
    AND?: ClosetScalarWhereWithAggregatesInput | ClosetScalarWhereWithAggregatesInput[]
    OR?: ClosetScalarWhereWithAggregatesInput[]
    NOT?: ClosetScalarWhereWithAggregatesInput | ClosetScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Closet"> | string
    name?: StringWithAggregatesFilter<"Closet"> | string
    userId?: UuidWithAggregatesFilter<"Closet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Closet"> | Date | string
  }

  export type ListingWhereInput = {
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    id?: UuidFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    description?: StringFilter<"Listing"> | string
    imageUrls?: StringNullableListFilter<"Listing">
    isPrivate?: BoolFilter<"Listing"> | boolean
    userId?: UuidFilter<"Listing"> | string
    closetId?: UuidFilter<"Listing"> | string
    status?: EnumListingStatusFilter<"Listing"> | $Enums.ListingStatus
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    closet?: XOR<ClosetScalarRelationFilter, ClosetWhereInput>
    tags?: TagListRelationFilter
    favorites?: FavoriteListRelationFilter
    messages?: MessageListRelationFilter
    tradePreferences?: TradePreferenceListRelationFilter
    tradeRequestsInitiated?: TradeRequestListRelationFilter
    tradeRequestsReceived?: TradeRequestListRelationFilter
  }

  export type ListingOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrls?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    closetId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    closet?: ClosetOrderByWithRelationInput
    tags?: TagOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    tradePreferences?: TradePreferenceOrderByRelationAggregateInput
    tradeRequestsInitiated?: TradeRequestOrderByRelationAggregateInput
    tradeRequestsReceived?: TradeRequestOrderByRelationAggregateInput
  }

  export type ListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    title?: StringFilter<"Listing"> | string
    description?: StringFilter<"Listing"> | string
    imageUrls?: StringNullableListFilter<"Listing">
    isPrivate?: BoolFilter<"Listing"> | boolean
    userId?: UuidFilter<"Listing"> | string
    closetId?: UuidFilter<"Listing"> | string
    status?: EnumListingStatusFilter<"Listing"> | $Enums.ListingStatus
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    closet?: XOR<ClosetScalarRelationFilter, ClosetWhereInput>
    tags?: TagListRelationFilter
    favorites?: FavoriteListRelationFilter
    messages?: MessageListRelationFilter
    tradePreferences?: TradePreferenceListRelationFilter
    tradeRequestsInitiated?: TradeRequestListRelationFilter
    tradeRequestsReceived?: TradeRequestListRelationFilter
  }, "id">

  export type ListingOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrls?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    closetId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ListingCountOrderByAggregateInput
    _max?: ListingMaxOrderByAggregateInput
    _min?: ListingMinOrderByAggregateInput
  }

  export type ListingScalarWhereWithAggregatesInput = {
    AND?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    OR?: ListingScalarWhereWithAggregatesInput[]
    NOT?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Listing"> | string
    title?: StringWithAggregatesFilter<"Listing"> | string
    description?: StringWithAggregatesFilter<"Listing"> | string
    imageUrls?: StringNullableListFilter<"Listing">
    isPrivate?: BoolWithAggregatesFilter<"Listing"> | boolean
    userId?: UuidWithAggregatesFilter<"Listing"> | string
    closetId?: UuidWithAggregatesFilter<"Listing"> | string
    status?: EnumListingStatusWithAggregatesFilter<"Listing"> | $Enums.ListingStatus
    createdAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
  }

  export type TradePreferenceWhereInput = {
    AND?: TradePreferenceWhereInput | TradePreferenceWhereInput[]
    OR?: TradePreferenceWhereInput[]
    NOT?: TradePreferenceWhereInput | TradePreferenceWhereInput[]
    id?: StringFilter<"TradePreference"> | string
    listingId?: UuidFilter<"TradePreference"> | string
    userId?: UuidFilter<"TradePreference"> | string
    title?: StringFilter<"TradePreference"> | string
    imageUrl?: StringFilter<"TradePreference"> | string
    notes?: StringNullableFilter<"TradePreference"> | string | null
    createdAt?: DateTimeFilter<"TradePreference"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TradePreferenceOrderByWithRelationInput = {
    id?: SortOrder
    listingId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    listing?: ListingOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TradePreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradePreferenceWhereInput | TradePreferenceWhereInput[]
    OR?: TradePreferenceWhereInput[]
    NOT?: TradePreferenceWhereInput | TradePreferenceWhereInput[]
    listingId?: UuidFilter<"TradePreference"> | string
    userId?: UuidFilter<"TradePreference"> | string
    title?: StringFilter<"TradePreference"> | string
    imageUrl?: StringFilter<"TradePreference"> | string
    notes?: StringNullableFilter<"TradePreference"> | string | null
    createdAt?: DateTimeFilter<"TradePreference"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TradePreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    listingId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TradePreferenceCountOrderByAggregateInput
    _max?: TradePreferenceMaxOrderByAggregateInput
    _min?: TradePreferenceMinOrderByAggregateInput
  }

  export type TradePreferenceScalarWhereWithAggregatesInput = {
    AND?: TradePreferenceScalarWhereWithAggregatesInput | TradePreferenceScalarWhereWithAggregatesInput[]
    OR?: TradePreferenceScalarWhereWithAggregatesInput[]
    NOT?: TradePreferenceScalarWhereWithAggregatesInput | TradePreferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TradePreference"> | string
    listingId?: UuidWithAggregatesFilter<"TradePreference"> | string
    userId?: UuidWithAggregatesFilter<"TradePreference"> | string
    title?: StringWithAggregatesFilter<"TradePreference"> | string
    imageUrl?: StringWithAggregatesFilter<"TradePreference"> | string
    notes?: StringNullableWithAggregatesFilter<"TradePreference"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TradePreference"> | Date | string
  }

  export type TradeRequestWhereInput = {
    AND?: TradeRequestWhereInput | TradeRequestWhereInput[]
    OR?: TradeRequestWhereInput[]
    NOT?: TradeRequestWhereInput | TradeRequestWhereInput[]
    id?: StringFilter<"TradeRequest"> | string
    fromUserId?: UuidFilter<"TradeRequest"> | string
    toUserId?: UuidFilter<"TradeRequest"> | string
    status?: EnumTradeStatusFilter<"TradeRequest"> | $Enums.TradeStatus
    message?: StringNullableFilter<"TradeRequest"> | string | null
    createdAt?: DateTimeFilter<"TradeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TradeRequest"> | Date | string
    fromUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    initiatorListings?: ListingListRelationFilter
    targetListings?: ListingListRelationFilter
  }

  export type TradeRequestOrderByWithRelationInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    status?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fromUser?: UserOrderByWithRelationInput
    toUser?: UserOrderByWithRelationInput
    initiatorListings?: ListingOrderByRelationAggregateInput
    targetListings?: ListingOrderByRelationAggregateInput
  }

  export type TradeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeRequestWhereInput | TradeRequestWhereInput[]
    OR?: TradeRequestWhereInput[]
    NOT?: TradeRequestWhereInput | TradeRequestWhereInput[]
    fromUserId?: UuidFilter<"TradeRequest"> | string
    toUserId?: UuidFilter<"TradeRequest"> | string
    status?: EnumTradeStatusFilter<"TradeRequest"> | $Enums.TradeStatus
    message?: StringNullableFilter<"TradeRequest"> | string | null
    createdAt?: DateTimeFilter<"TradeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TradeRequest"> | Date | string
    fromUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    initiatorListings?: ListingListRelationFilter
    targetListings?: ListingListRelationFilter
  }, "id">

  export type TradeRequestOrderByWithAggregationInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    status?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TradeRequestCountOrderByAggregateInput
    _max?: TradeRequestMaxOrderByAggregateInput
    _min?: TradeRequestMinOrderByAggregateInput
  }

  export type TradeRequestScalarWhereWithAggregatesInput = {
    AND?: TradeRequestScalarWhereWithAggregatesInput | TradeRequestScalarWhereWithAggregatesInput[]
    OR?: TradeRequestScalarWhereWithAggregatesInput[]
    NOT?: TradeRequestScalarWhereWithAggregatesInput | TradeRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TradeRequest"> | string
    fromUserId?: UuidWithAggregatesFilter<"TradeRequest"> | string
    toUserId?: UuidWithAggregatesFilter<"TradeRequest"> | string
    status?: EnumTradeStatusWithAggregatesFilter<"TradeRequest"> | $Enums.TradeStatus
    message?: StringNullableWithAggregatesFilter<"TradeRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TradeRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TradeRequest"> | Date | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    listings?: ListingListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    listings?: ListingOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    listings?: ListingListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type FavoriteWhereInput = {
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    id?: StringFilter<"Favorite"> | string
    userId?: UuidFilter<"Favorite"> | string
    listingId?: UuidFilter<"Favorite"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }

  export type FavoriteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    user?: UserOrderByWithRelationInput
    listing?: ListingOrderByWithRelationInput
  }

  export type FavoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_listingId?: FavoriteUserIdListingIdCompoundUniqueInput
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    userId?: UuidFilter<"Favorite"> | string
    listingId?: UuidFilter<"Favorite"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }, "id" | "userId_listingId">

  export type FavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    _count?: FavoriteCountOrderByAggregateInput
    _max?: FavoriteMaxOrderByAggregateInput
    _min?: FavoriteMinOrderByAggregateInput
  }

  export type FavoriteScalarWhereWithAggregatesInput = {
    AND?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    OR?: FavoriteScalarWhereWithAggregatesInput[]
    NOT?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Favorite"> | string
    userId?: UuidWithAggregatesFilter<"Favorite"> | string
    listingId?: UuidWithAggregatesFilter<"Favorite"> | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    fromId?: UuidFilter<"Message"> | string
    toId?: UuidFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    listingId?: UuidNullableFilter<"Message"> | string | null
    timestamp?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    from?: XOR<UserScalarRelationFilter, UserWhereInput>
    to?: XOR<UserScalarRelationFilter, UserWhereInput>
    listing?: XOR<ListingNullableScalarRelationFilter, ListingWhereInput> | null
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    content?: SortOrder
    listingId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    updatedAt?: SortOrder
    from?: UserOrderByWithRelationInput
    to?: UserOrderByWithRelationInput
    listing?: ListingOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    fromId?: UuidFilter<"Message"> | string
    toId?: UuidFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    listingId?: UuidNullableFilter<"Message"> | string | null
    timestamp?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    from?: XOR<UserScalarRelationFilter, UserWhereInput>
    to?: XOR<UserScalarRelationFilter, UserWhereInput>
    listing?: XOR<ListingNullableScalarRelationFilter, ListingWhereInput> | null
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    content?: SortOrder
    listingId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    fromId?: UuidWithAggregatesFilter<"Message"> | string
    toId?: UuidWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    listingId?: UuidNullableWithAggregatesFilter<"Message"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    messagesTo?: MessageCreateNestedManyWithoutToInput
    messagesFrom?: MessageCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutToUserInput
    listings?: ListingCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    messagesTo?: MessageUncheckedCreateNestedManyWithoutToInput
    messagesFrom?: MessageUncheckedCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestUncheckedCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutToUserInput
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutToUserNestedInput
    listings?: ListingUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUncheckedUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUncheckedUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUncheckedUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutToUserNestedInput
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClosetCreateInput = {
    id?: string
    name?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClosetInput
    listings?: ListingCreateNestedManyWithoutClosetInput
  }

  export type ClosetUncheckedCreateInput = {
    id?: string
    name?: string
    userId: string
    createdAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutClosetInput
  }

  export type ClosetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClosetNestedInput
    listings?: ListingUpdateManyWithoutClosetNestedInput
  }

  export type ClosetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutClosetNestedInput
  }

  export type ClosetCreateManyInput = {
    id?: string
    name?: string
    userId: string
    createdAt?: Date | string
  }

  export type ClosetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClosetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingCreateInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    closet: ClosetCreateNestedOneWithoutListingsInput
    tags?: TagCreateNestedManyWithoutListingsInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
    messages?: MessageCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutListingsInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
    messages?: MessageUncheckedCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceUncheckedCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestUncheckedCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    closet?: ClosetUpdateOneRequiredWithoutListingsNestedInput
    tags?: TagUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
    messages?: MessageUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
    messages?: MessageUncheckedUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUncheckedUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUncheckedUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingCreateManyInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePreferenceCreateInput = {
    id?: string
    title: string
    imageUrl: string
    notes?: string | null
    createdAt?: Date | string
    listing: ListingCreateNestedOneWithoutTradePreferencesInput
    user: UserCreateNestedOneWithoutTradePreferenceInput
  }

  export type TradePreferenceUncheckedCreateInput = {
    id?: string
    listingId: string
    userId: string
    title: string
    imageUrl: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type TradePreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutTradePreferencesNestedInput
    user?: UserUpdateOneRequiredWithoutTradePreferenceNestedInput
  }

  export type TradePreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePreferenceCreateManyInput = {
    id?: string
    listingId: string
    userId: string
    title: string
    imageUrl: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type TradePreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestCreateInput = {
    id?: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutTradeRequestsSentInput
    toUser: UserCreateNestedOneWithoutTradeRequestsReceivedInput
    initiatorListings?: ListingCreateNestedManyWithoutTradeRequestsInitiatedInput
    targetListings?: ListingCreateNestedManyWithoutTradeRequestsReceivedInput
  }

  export type TradeRequestUncheckedCreateInput = {
    id?: string
    fromUserId: string
    toUserId: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    initiatorListings?: ListingUncheckedCreateNestedManyWithoutTradeRequestsInitiatedInput
    targetListings?: ListingUncheckedCreateNestedManyWithoutTradeRequestsReceivedInput
  }

  export type TradeRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutTradeRequestsSentNestedInput
    toUser?: UserUpdateOneRequiredWithoutTradeRequestsReceivedNestedInput
    initiatorListings?: ListingUpdateManyWithoutTradeRequestsInitiatedNestedInput
    targetListings?: ListingUpdateManyWithoutTradeRequestsReceivedNestedInput
  }

  export type TradeRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiatorListings?: ListingUncheckedUpdateManyWithoutTradeRequestsInitiatedNestedInput
    targetListings?: ListingUncheckedUpdateManyWithoutTradeRequestsReceivedNestedInput
  }

  export type TradeRequestCreateManyInput = {
    id?: string
    fromUserId: string
    toUserId: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    id?: string
    name: string
    listings?: ListingCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    listings?: ListingUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listings?: ListingUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listings?: ListingUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutFavoritesInput
    listing: ListingCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateInput = {
    id?: string
    userId: string
    listingId: string
  }

  export type FavoriteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
    listing?: ListingUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteCreateManyInput = {
    id?: string
    userId: string
    listingId: string
  }

  export type FavoriteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    timestamp?: Date | string
    updatedAt?: Date | string
    from: UserCreateNestedOneWithoutMessagesFromInput
    to: UserCreateNestedOneWithoutMessagesToInput
    listing?: ListingCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    fromId: string
    toId: string
    content: string
    listingId?: string | null
    timestamp?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: UserUpdateOneRequiredWithoutMessagesFromNestedInput
    to?: UserUpdateOneRequiredWithoutMessagesToNestedInput
    listing?: ListingUpdateOneWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    fromId: string
    toId: string
    content: string
    listingId?: string | null
    timestamp?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClosetNullableScalarRelationFilter = {
    is?: ClosetWhereInput | null
    isNot?: ClosetWhereInput | null
  }

  export type FavoriteListRelationFilter = {
    every?: FavoriteWhereInput
    some?: FavoriteWhereInput
    none?: FavoriteWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type TradeRequestListRelationFilter = {
    every?: TradeRequestWhereInput
    some?: TradeRequestWhereInput
    none?: TradeRequestWhereInput
  }

  export type ListingListRelationFilter = {
    every?: ListingWhereInput
    some?: ListingWhereInput
    none?: ListingWhereInput
  }

  export type TradePreferenceListRelationFilter = {
    every?: TradePreferenceWhereInput
    some?: TradePreferenceWhereInput
    none?: TradePreferenceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradePreferenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    clerkid?: SortOrder
    image?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    clerkid?: SortOrder
    image?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    clerkid?: SortOrder
    image?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ClosetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClosetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClosetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumListingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingStatus | EnumListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumListingStatusFilter<$PrismaModel> | $Enums.ListingStatus
  }

  export type ClosetScalarRelationFilter = {
    is?: ClosetWhereInput
    isNot?: ClosetWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListingCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrls?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    closetId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    closetId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isPrivate?: SortOrder
    userId?: SortOrder
    closetId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumListingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingStatus | EnumListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumListingStatusWithAggregatesFilter<$PrismaModel> | $Enums.ListingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumListingStatusFilter<$PrismaModel>
    _max?: NestedEnumListingStatusFilter<$PrismaModel>
  }

  export type ListingScalarRelationFilter = {
    is?: ListingWhereInput
    isNot?: ListingWhereInput
  }

  export type TradePreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type TradePreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type TradePreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTradeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeStatus | EnumTradeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TradeStatus[] | ListEnumTradeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TradeStatus[] | ListEnumTradeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTradeStatusFilter<$PrismaModel> | $Enums.TradeStatus
  }

  export type TradeRequestCountOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeRequestMinOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTradeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeStatus | EnumTradeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TradeStatus[] | ListEnumTradeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TradeStatus[] | ListEnumTradeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTradeStatusWithAggregatesFilter<$PrismaModel> | $Enums.TradeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTradeStatusFilter<$PrismaModel>
    _max?: NestedEnumTradeStatusFilter<$PrismaModel>
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type FavoriteUserIdListingIdCompoundUniqueInput = {
    userId: string
    listingId: string
  }

  export type FavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type FavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type FavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type ListingNullableScalarRelationFilter = {
    is?: ListingWhereInput | null
    isNot?: ListingWhereInput | null
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    content?: SortOrder
    listingId?: SortOrder
    timestamp?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    content?: SortOrder
    listingId?: SortOrder
    timestamp?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    content?: SortOrder
    listingId?: SortOrder
    timestamp?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ClosetCreateNestedOneWithoutUserInput = {
    create?: XOR<ClosetCreateWithoutUserInput, ClosetUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClosetCreateOrConnectWithoutUserInput
    connect?: ClosetWhereUniqueInput
  }

  export type FavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutToInput = {
    create?: XOR<MessageCreateWithoutToInput, MessageUncheckedCreateWithoutToInput> | MessageCreateWithoutToInput[] | MessageUncheckedCreateWithoutToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutToInput | MessageCreateOrConnectWithoutToInput[]
    createMany?: MessageCreateManyToInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutFromInput = {
    create?: XOR<MessageCreateWithoutFromInput, MessageUncheckedCreateWithoutFromInput> | MessageCreateWithoutFromInput[] | MessageUncheckedCreateWithoutFromInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutFromInput | MessageCreateOrConnectWithoutFromInput[]
    createMany?: MessageCreateManyFromInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TradeRequestCreateNestedManyWithoutFromUserInput = {
    create?: XOR<TradeRequestCreateWithoutFromUserInput, TradeRequestUncheckedCreateWithoutFromUserInput> | TradeRequestCreateWithoutFromUserInput[] | TradeRequestUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutFromUserInput | TradeRequestCreateOrConnectWithoutFromUserInput[]
    createMany?: TradeRequestCreateManyFromUserInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type TradeRequestCreateNestedManyWithoutToUserInput = {
    create?: XOR<TradeRequestCreateWithoutToUserInput, TradeRequestUncheckedCreateWithoutToUserInput> | TradeRequestCreateWithoutToUserInput[] | TradeRequestUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutToUserInput | TradeRequestCreateOrConnectWithoutToUserInput[]
    createMany?: TradeRequestCreateManyToUserInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type ListingCreateNestedManyWithoutUserInput = {
    create?: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput> | ListingCreateWithoutUserInput[] | ListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutUserInput | ListingCreateOrConnectWithoutUserInput[]
    createMany?: ListingCreateManyUserInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type TradePreferenceCreateNestedManyWithoutUserInput = {
    create?: XOR<TradePreferenceCreateWithoutUserInput, TradePreferenceUncheckedCreateWithoutUserInput> | TradePreferenceCreateWithoutUserInput[] | TradePreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradePreferenceCreateOrConnectWithoutUserInput | TradePreferenceCreateOrConnectWithoutUserInput[]
    createMany?: TradePreferenceCreateManyUserInputEnvelope
    connect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
  }

  export type ClosetUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ClosetCreateWithoutUserInput, ClosetUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClosetCreateOrConnectWithoutUserInput
    connect?: ClosetWhereUniqueInput
  }

  export type FavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutToInput = {
    create?: XOR<MessageCreateWithoutToInput, MessageUncheckedCreateWithoutToInput> | MessageCreateWithoutToInput[] | MessageUncheckedCreateWithoutToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutToInput | MessageCreateOrConnectWithoutToInput[]
    createMany?: MessageCreateManyToInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutFromInput = {
    create?: XOR<MessageCreateWithoutFromInput, MessageUncheckedCreateWithoutFromInput> | MessageCreateWithoutFromInput[] | MessageUncheckedCreateWithoutFromInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutFromInput | MessageCreateOrConnectWithoutFromInput[]
    createMany?: MessageCreateManyFromInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TradeRequestUncheckedCreateNestedManyWithoutFromUserInput = {
    create?: XOR<TradeRequestCreateWithoutFromUserInput, TradeRequestUncheckedCreateWithoutFromUserInput> | TradeRequestCreateWithoutFromUserInput[] | TradeRequestUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutFromUserInput | TradeRequestCreateOrConnectWithoutFromUserInput[]
    createMany?: TradeRequestCreateManyFromUserInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type TradeRequestUncheckedCreateNestedManyWithoutToUserInput = {
    create?: XOR<TradeRequestCreateWithoutToUserInput, TradeRequestUncheckedCreateWithoutToUserInput> | TradeRequestCreateWithoutToUserInput[] | TradeRequestUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutToUserInput | TradeRequestCreateOrConnectWithoutToUserInput[]
    createMany?: TradeRequestCreateManyToUserInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput> | ListingCreateWithoutUserInput[] | ListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutUserInput | ListingCreateOrConnectWithoutUserInput[]
    createMany?: ListingCreateManyUserInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type TradePreferenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TradePreferenceCreateWithoutUserInput, TradePreferenceUncheckedCreateWithoutUserInput> | TradePreferenceCreateWithoutUserInput[] | TradePreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradePreferenceCreateOrConnectWithoutUserInput | TradePreferenceCreateOrConnectWithoutUserInput[]
    createMany?: TradePreferenceCreateManyUserInputEnvelope
    connect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClosetUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClosetCreateWithoutUserInput, ClosetUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClosetCreateOrConnectWithoutUserInput
    upsert?: ClosetUpsertWithoutUserInput
    disconnect?: ClosetWhereInput | boolean
    delete?: ClosetWhereInput | boolean
    connect?: ClosetWhereUniqueInput
    update?: XOR<XOR<ClosetUpdateToOneWithWhereWithoutUserInput, ClosetUpdateWithoutUserInput>, ClosetUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutToNestedInput = {
    create?: XOR<MessageCreateWithoutToInput, MessageUncheckedCreateWithoutToInput> | MessageCreateWithoutToInput[] | MessageUncheckedCreateWithoutToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutToInput | MessageCreateOrConnectWithoutToInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutToInput | MessageUpsertWithWhereUniqueWithoutToInput[]
    createMany?: MessageCreateManyToInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutToInput | MessageUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutToInput | MessageUpdateManyWithWhereWithoutToInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutFromNestedInput = {
    create?: XOR<MessageCreateWithoutFromInput, MessageUncheckedCreateWithoutFromInput> | MessageCreateWithoutFromInput[] | MessageUncheckedCreateWithoutFromInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutFromInput | MessageCreateOrConnectWithoutFromInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutFromInput | MessageUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: MessageCreateManyFromInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutFromInput | MessageUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutFromInput | MessageUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TradeRequestUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<TradeRequestCreateWithoutFromUserInput, TradeRequestUncheckedCreateWithoutFromUserInput> | TradeRequestCreateWithoutFromUserInput[] | TradeRequestUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutFromUserInput | TradeRequestCreateOrConnectWithoutFromUserInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutFromUserInput | TradeRequestUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: TradeRequestCreateManyFromUserInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutFromUserInput | TradeRequestUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutFromUserInput | TradeRequestUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type TradeRequestUpdateManyWithoutToUserNestedInput = {
    create?: XOR<TradeRequestCreateWithoutToUserInput, TradeRequestUncheckedCreateWithoutToUserInput> | TradeRequestCreateWithoutToUserInput[] | TradeRequestUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutToUserInput | TradeRequestCreateOrConnectWithoutToUserInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutToUserInput | TradeRequestUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: TradeRequestCreateManyToUserInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutToUserInput | TradeRequestUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutToUserInput | TradeRequestUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type ListingUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput> | ListingCreateWithoutUserInput[] | ListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutUserInput | ListingCreateOrConnectWithoutUserInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutUserInput | ListingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListingCreateManyUserInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutUserInput | ListingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutUserInput | ListingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type TradePreferenceUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradePreferenceCreateWithoutUserInput, TradePreferenceUncheckedCreateWithoutUserInput> | TradePreferenceCreateWithoutUserInput[] | TradePreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradePreferenceCreateOrConnectWithoutUserInput | TradePreferenceCreateOrConnectWithoutUserInput[]
    upsert?: TradePreferenceUpsertWithWhereUniqueWithoutUserInput | TradePreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradePreferenceCreateManyUserInputEnvelope
    set?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    disconnect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    delete?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    connect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    update?: TradePreferenceUpdateWithWhereUniqueWithoutUserInput | TradePreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradePreferenceUpdateManyWithWhereWithoutUserInput | TradePreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradePreferenceScalarWhereInput | TradePreferenceScalarWhereInput[]
  }

  export type ClosetUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClosetCreateWithoutUserInput, ClosetUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClosetCreateOrConnectWithoutUserInput
    upsert?: ClosetUpsertWithoutUserInput
    disconnect?: ClosetWhereInput | boolean
    delete?: ClosetWhereInput | boolean
    connect?: ClosetWhereUniqueInput
    update?: XOR<XOR<ClosetUpdateToOneWithWhereWithoutUserInput, ClosetUpdateWithoutUserInput>, ClosetUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutToNestedInput = {
    create?: XOR<MessageCreateWithoutToInput, MessageUncheckedCreateWithoutToInput> | MessageCreateWithoutToInput[] | MessageUncheckedCreateWithoutToInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutToInput | MessageCreateOrConnectWithoutToInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutToInput | MessageUpsertWithWhereUniqueWithoutToInput[]
    createMany?: MessageCreateManyToInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutToInput | MessageUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutToInput | MessageUpdateManyWithWhereWithoutToInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutFromNestedInput = {
    create?: XOR<MessageCreateWithoutFromInput, MessageUncheckedCreateWithoutFromInput> | MessageCreateWithoutFromInput[] | MessageUncheckedCreateWithoutFromInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutFromInput | MessageCreateOrConnectWithoutFromInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutFromInput | MessageUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: MessageCreateManyFromInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutFromInput | MessageUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutFromInput | MessageUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TradeRequestUncheckedUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<TradeRequestCreateWithoutFromUserInput, TradeRequestUncheckedCreateWithoutFromUserInput> | TradeRequestCreateWithoutFromUserInput[] | TradeRequestUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutFromUserInput | TradeRequestCreateOrConnectWithoutFromUserInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutFromUserInput | TradeRequestUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: TradeRequestCreateManyFromUserInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutFromUserInput | TradeRequestUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutFromUserInput | TradeRequestUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type TradeRequestUncheckedUpdateManyWithoutToUserNestedInput = {
    create?: XOR<TradeRequestCreateWithoutToUserInput, TradeRequestUncheckedCreateWithoutToUserInput> | TradeRequestCreateWithoutToUserInput[] | TradeRequestUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutToUserInput | TradeRequestCreateOrConnectWithoutToUserInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutToUserInput | TradeRequestUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: TradeRequestCreateManyToUserInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutToUserInput | TradeRequestUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutToUserInput | TradeRequestUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput> | ListingCreateWithoutUserInput[] | ListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutUserInput | ListingCreateOrConnectWithoutUserInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutUserInput | ListingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListingCreateManyUserInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutUserInput | ListingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutUserInput | ListingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type TradePreferenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradePreferenceCreateWithoutUserInput, TradePreferenceUncheckedCreateWithoutUserInput> | TradePreferenceCreateWithoutUserInput[] | TradePreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradePreferenceCreateOrConnectWithoutUserInput | TradePreferenceCreateOrConnectWithoutUserInput[]
    upsert?: TradePreferenceUpsertWithWhereUniqueWithoutUserInput | TradePreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradePreferenceCreateManyUserInputEnvelope
    set?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    disconnect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    delete?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    connect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    update?: TradePreferenceUpdateWithWhereUniqueWithoutUserInput | TradePreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradePreferenceUpdateManyWithWhereWithoutUserInput | TradePreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradePreferenceScalarWhereInput | TradePreferenceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutClosetInput = {
    create?: XOR<UserCreateWithoutClosetInput, UserUncheckedCreateWithoutClosetInput>
    connectOrCreate?: UserCreateOrConnectWithoutClosetInput
    connect?: UserWhereUniqueInput
  }

  export type ListingCreateNestedManyWithoutClosetInput = {
    create?: XOR<ListingCreateWithoutClosetInput, ListingUncheckedCreateWithoutClosetInput> | ListingCreateWithoutClosetInput[] | ListingUncheckedCreateWithoutClosetInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutClosetInput | ListingCreateOrConnectWithoutClosetInput[]
    createMany?: ListingCreateManyClosetInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutClosetInput = {
    create?: XOR<ListingCreateWithoutClosetInput, ListingUncheckedCreateWithoutClosetInput> | ListingCreateWithoutClosetInput[] | ListingUncheckedCreateWithoutClosetInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutClosetInput | ListingCreateOrConnectWithoutClosetInput[]
    createMany?: ListingCreateManyClosetInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutClosetNestedInput = {
    create?: XOR<UserCreateWithoutClosetInput, UserUncheckedCreateWithoutClosetInput>
    connectOrCreate?: UserCreateOrConnectWithoutClosetInput
    upsert?: UserUpsertWithoutClosetInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClosetInput, UserUpdateWithoutClosetInput>, UserUncheckedUpdateWithoutClosetInput>
  }

  export type ListingUpdateManyWithoutClosetNestedInput = {
    create?: XOR<ListingCreateWithoutClosetInput, ListingUncheckedCreateWithoutClosetInput> | ListingCreateWithoutClosetInput[] | ListingUncheckedCreateWithoutClosetInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutClosetInput | ListingCreateOrConnectWithoutClosetInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutClosetInput | ListingUpsertWithWhereUniqueWithoutClosetInput[]
    createMany?: ListingCreateManyClosetInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutClosetInput | ListingUpdateWithWhereUniqueWithoutClosetInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutClosetInput | ListingUpdateManyWithWhereWithoutClosetInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutClosetNestedInput = {
    create?: XOR<ListingCreateWithoutClosetInput, ListingUncheckedCreateWithoutClosetInput> | ListingCreateWithoutClosetInput[] | ListingUncheckedCreateWithoutClosetInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutClosetInput | ListingCreateOrConnectWithoutClosetInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutClosetInput | ListingUpsertWithWhereUniqueWithoutClosetInput[]
    createMany?: ListingCreateManyClosetInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutClosetInput | ListingUpdateWithWhereUniqueWithoutClosetInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutClosetInput | ListingUpdateManyWithWhereWithoutClosetInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingCreateimageUrlsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutListingsInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    connect?: UserWhereUniqueInput
  }

  export type ClosetCreateNestedOneWithoutListingsInput = {
    create?: XOR<ClosetCreateWithoutListingsInput, ClosetUncheckedCreateWithoutListingsInput>
    connectOrCreate?: ClosetCreateOrConnectWithoutListingsInput
    connect?: ClosetWhereUniqueInput
  }

  export type TagCreateNestedManyWithoutListingsInput = {
    create?: XOR<TagCreateWithoutListingsInput, TagUncheckedCreateWithoutListingsInput> | TagCreateWithoutListingsInput[] | TagUncheckedCreateWithoutListingsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutListingsInput | TagCreateOrConnectWithoutListingsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type FavoriteCreateNestedManyWithoutListingInput = {
    create?: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput> | FavoriteCreateWithoutListingInput[] | FavoriteUncheckedCreateWithoutListingInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutListingInput | FavoriteCreateOrConnectWithoutListingInput[]
    createMany?: FavoriteCreateManyListingInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutListingInput = {
    create?: XOR<MessageCreateWithoutListingInput, MessageUncheckedCreateWithoutListingInput> | MessageCreateWithoutListingInput[] | MessageUncheckedCreateWithoutListingInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutListingInput | MessageCreateOrConnectWithoutListingInput[]
    createMany?: MessageCreateManyListingInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TradePreferenceCreateNestedManyWithoutListingInput = {
    create?: XOR<TradePreferenceCreateWithoutListingInput, TradePreferenceUncheckedCreateWithoutListingInput> | TradePreferenceCreateWithoutListingInput[] | TradePreferenceUncheckedCreateWithoutListingInput[]
    connectOrCreate?: TradePreferenceCreateOrConnectWithoutListingInput | TradePreferenceCreateOrConnectWithoutListingInput[]
    createMany?: TradePreferenceCreateManyListingInputEnvelope
    connect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
  }

  export type TradeRequestCreateNestedManyWithoutInitiatorListingsInput = {
    create?: XOR<TradeRequestCreateWithoutInitiatorListingsInput, TradeRequestUncheckedCreateWithoutInitiatorListingsInput> | TradeRequestCreateWithoutInitiatorListingsInput[] | TradeRequestUncheckedCreateWithoutInitiatorListingsInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutInitiatorListingsInput | TradeRequestCreateOrConnectWithoutInitiatorListingsInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type TradeRequestCreateNestedManyWithoutTargetListingsInput = {
    create?: XOR<TradeRequestCreateWithoutTargetListingsInput, TradeRequestUncheckedCreateWithoutTargetListingsInput> | TradeRequestCreateWithoutTargetListingsInput[] | TradeRequestUncheckedCreateWithoutTargetListingsInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutTargetListingsInput | TradeRequestCreateOrConnectWithoutTargetListingsInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutListingsInput = {
    create?: XOR<TagCreateWithoutListingsInput, TagUncheckedCreateWithoutListingsInput> | TagCreateWithoutListingsInput[] | TagUncheckedCreateWithoutListingsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutListingsInput | TagCreateOrConnectWithoutListingsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput> | FavoriteCreateWithoutListingInput[] | FavoriteUncheckedCreateWithoutListingInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutListingInput | FavoriteCreateOrConnectWithoutListingInput[]
    createMany?: FavoriteCreateManyListingInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<MessageCreateWithoutListingInput, MessageUncheckedCreateWithoutListingInput> | MessageCreateWithoutListingInput[] | MessageUncheckedCreateWithoutListingInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutListingInput | MessageCreateOrConnectWithoutListingInput[]
    createMany?: MessageCreateManyListingInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TradePreferenceUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<TradePreferenceCreateWithoutListingInput, TradePreferenceUncheckedCreateWithoutListingInput> | TradePreferenceCreateWithoutListingInput[] | TradePreferenceUncheckedCreateWithoutListingInput[]
    connectOrCreate?: TradePreferenceCreateOrConnectWithoutListingInput | TradePreferenceCreateOrConnectWithoutListingInput[]
    createMany?: TradePreferenceCreateManyListingInputEnvelope
    connect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
  }

  export type TradeRequestUncheckedCreateNestedManyWithoutInitiatorListingsInput = {
    create?: XOR<TradeRequestCreateWithoutInitiatorListingsInput, TradeRequestUncheckedCreateWithoutInitiatorListingsInput> | TradeRequestCreateWithoutInitiatorListingsInput[] | TradeRequestUncheckedCreateWithoutInitiatorListingsInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutInitiatorListingsInput | TradeRequestCreateOrConnectWithoutInitiatorListingsInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type TradeRequestUncheckedCreateNestedManyWithoutTargetListingsInput = {
    create?: XOR<TradeRequestCreateWithoutTargetListingsInput, TradeRequestUncheckedCreateWithoutTargetListingsInput> | TradeRequestCreateWithoutTargetListingsInput[] | TradeRequestUncheckedCreateWithoutTargetListingsInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutTargetListingsInput | TradeRequestCreateOrConnectWithoutTargetListingsInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type ListingUpdateimageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumListingStatusFieldUpdateOperationsInput = {
    set?: $Enums.ListingStatus
  }

  export type UserUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    upsert?: UserUpsertWithoutListingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListingsInput, UserUpdateWithoutListingsInput>, UserUncheckedUpdateWithoutListingsInput>
  }

  export type ClosetUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<ClosetCreateWithoutListingsInput, ClosetUncheckedCreateWithoutListingsInput>
    connectOrCreate?: ClosetCreateOrConnectWithoutListingsInput
    upsert?: ClosetUpsertWithoutListingsInput
    connect?: ClosetWhereUniqueInput
    update?: XOR<XOR<ClosetUpdateToOneWithWhereWithoutListingsInput, ClosetUpdateWithoutListingsInput>, ClosetUncheckedUpdateWithoutListingsInput>
  }

  export type TagUpdateManyWithoutListingsNestedInput = {
    create?: XOR<TagCreateWithoutListingsInput, TagUncheckedCreateWithoutListingsInput> | TagCreateWithoutListingsInput[] | TagUncheckedCreateWithoutListingsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutListingsInput | TagCreateOrConnectWithoutListingsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutListingsInput | TagUpsertWithWhereUniqueWithoutListingsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutListingsInput | TagUpdateWithWhereUniqueWithoutListingsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutListingsInput | TagUpdateManyWithWhereWithoutListingsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type FavoriteUpdateManyWithoutListingNestedInput = {
    create?: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput> | FavoriteCreateWithoutListingInput[] | FavoriteUncheckedCreateWithoutListingInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutListingInput | FavoriteCreateOrConnectWithoutListingInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutListingInput | FavoriteUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: FavoriteCreateManyListingInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutListingInput | FavoriteUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutListingInput | FavoriteUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutListingNestedInput = {
    create?: XOR<MessageCreateWithoutListingInput, MessageUncheckedCreateWithoutListingInput> | MessageCreateWithoutListingInput[] | MessageUncheckedCreateWithoutListingInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutListingInput | MessageCreateOrConnectWithoutListingInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutListingInput | MessageUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: MessageCreateManyListingInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutListingInput | MessageUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutListingInput | MessageUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TradePreferenceUpdateManyWithoutListingNestedInput = {
    create?: XOR<TradePreferenceCreateWithoutListingInput, TradePreferenceUncheckedCreateWithoutListingInput> | TradePreferenceCreateWithoutListingInput[] | TradePreferenceUncheckedCreateWithoutListingInput[]
    connectOrCreate?: TradePreferenceCreateOrConnectWithoutListingInput | TradePreferenceCreateOrConnectWithoutListingInput[]
    upsert?: TradePreferenceUpsertWithWhereUniqueWithoutListingInput | TradePreferenceUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: TradePreferenceCreateManyListingInputEnvelope
    set?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    disconnect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    delete?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    connect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    update?: TradePreferenceUpdateWithWhereUniqueWithoutListingInput | TradePreferenceUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: TradePreferenceUpdateManyWithWhereWithoutListingInput | TradePreferenceUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: TradePreferenceScalarWhereInput | TradePreferenceScalarWhereInput[]
  }

  export type TradeRequestUpdateManyWithoutInitiatorListingsNestedInput = {
    create?: XOR<TradeRequestCreateWithoutInitiatorListingsInput, TradeRequestUncheckedCreateWithoutInitiatorListingsInput> | TradeRequestCreateWithoutInitiatorListingsInput[] | TradeRequestUncheckedCreateWithoutInitiatorListingsInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutInitiatorListingsInput | TradeRequestCreateOrConnectWithoutInitiatorListingsInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutInitiatorListingsInput | TradeRequestUpsertWithWhereUniqueWithoutInitiatorListingsInput[]
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutInitiatorListingsInput | TradeRequestUpdateWithWhereUniqueWithoutInitiatorListingsInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutInitiatorListingsInput | TradeRequestUpdateManyWithWhereWithoutInitiatorListingsInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type TradeRequestUpdateManyWithoutTargetListingsNestedInput = {
    create?: XOR<TradeRequestCreateWithoutTargetListingsInput, TradeRequestUncheckedCreateWithoutTargetListingsInput> | TradeRequestCreateWithoutTargetListingsInput[] | TradeRequestUncheckedCreateWithoutTargetListingsInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutTargetListingsInput | TradeRequestCreateOrConnectWithoutTargetListingsInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutTargetListingsInput | TradeRequestUpsertWithWhereUniqueWithoutTargetListingsInput[]
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutTargetListingsInput | TradeRequestUpdateWithWhereUniqueWithoutTargetListingsInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutTargetListingsInput | TradeRequestUpdateManyWithWhereWithoutTargetListingsInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type TagUncheckedUpdateManyWithoutListingsNestedInput = {
    create?: XOR<TagCreateWithoutListingsInput, TagUncheckedCreateWithoutListingsInput> | TagCreateWithoutListingsInput[] | TagUncheckedCreateWithoutListingsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutListingsInput | TagCreateOrConnectWithoutListingsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutListingsInput | TagUpsertWithWhereUniqueWithoutListingsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutListingsInput | TagUpdateWithWhereUniqueWithoutListingsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutListingsInput | TagUpdateManyWithWhereWithoutListingsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type FavoriteUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput> | FavoriteCreateWithoutListingInput[] | FavoriteUncheckedCreateWithoutListingInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutListingInput | FavoriteCreateOrConnectWithoutListingInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutListingInput | FavoriteUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: FavoriteCreateManyListingInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutListingInput | FavoriteUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutListingInput | FavoriteUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<MessageCreateWithoutListingInput, MessageUncheckedCreateWithoutListingInput> | MessageCreateWithoutListingInput[] | MessageUncheckedCreateWithoutListingInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutListingInput | MessageCreateOrConnectWithoutListingInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutListingInput | MessageUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: MessageCreateManyListingInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutListingInput | MessageUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutListingInput | MessageUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TradePreferenceUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<TradePreferenceCreateWithoutListingInput, TradePreferenceUncheckedCreateWithoutListingInput> | TradePreferenceCreateWithoutListingInput[] | TradePreferenceUncheckedCreateWithoutListingInput[]
    connectOrCreate?: TradePreferenceCreateOrConnectWithoutListingInput | TradePreferenceCreateOrConnectWithoutListingInput[]
    upsert?: TradePreferenceUpsertWithWhereUniqueWithoutListingInput | TradePreferenceUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: TradePreferenceCreateManyListingInputEnvelope
    set?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    disconnect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    delete?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    connect?: TradePreferenceWhereUniqueInput | TradePreferenceWhereUniqueInput[]
    update?: TradePreferenceUpdateWithWhereUniqueWithoutListingInput | TradePreferenceUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: TradePreferenceUpdateManyWithWhereWithoutListingInput | TradePreferenceUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: TradePreferenceScalarWhereInput | TradePreferenceScalarWhereInput[]
  }

  export type TradeRequestUncheckedUpdateManyWithoutInitiatorListingsNestedInput = {
    create?: XOR<TradeRequestCreateWithoutInitiatorListingsInput, TradeRequestUncheckedCreateWithoutInitiatorListingsInput> | TradeRequestCreateWithoutInitiatorListingsInput[] | TradeRequestUncheckedCreateWithoutInitiatorListingsInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutInitiatorListingsInput | TradeRequestCreateOrConnectWithoutInitiatorListingsInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutInitiatorListingsInput | TradeRequestUpsertWithWhereUniqueWithoutInitiatorListingsInput[]
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutInitiatorListingsInput | TradeRequestUpdateWithWhereUniqueWithoutInitiatorListingsInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutInitiatorListingsInput | TradeRequestUpdateManyWithWhereWithoutInitiatorListingsInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type TradeRequestUncheckedUpdateManyWithoutTargetListingsNestedInput = {
    create?: XOR<TradeRequestCreateWithoutTargetListingsInput, TradeRequestUncheckedCreateWithoutTargetListingsInput> | TradeRequestCreateWithoutTargetListingsInput[] | TradeRequestUncheckedCreateWithoutTargetListingsInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutTargetListingsInput | TradeRequestCreateOrConnectWithoutTargetListingsInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutTargetListingsInput | TradeRequestUpsertWithWhereUniqueWithoutTargetListingsInput[]
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutTargetListingsInput | TradeRequestUpdateWithWhereUniqueWithoutTargetListingsInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutTargetListingsInput | TradeRequestUpdateManyWithWhereWithoutTargetListingsInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type ListingCreateNestedOneWithoutTradePreferencesInput = {
    create?: XOR<ListingCreateWithoutTradePreferencesInput, ListingUncheckedCreateWithoutTradePreferencesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutTradePreferencesInput
    connect?: ListingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTradePreferenceInput = {
    create?: XOR<UserCreateWithoutTradePreferenceInput, UserUncheckedCreateWithoutTradePreferenceInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradePreferenceInput
    connect?: UserWhereUniqueInput
  }

  export type ListingUpdateOneRequiredWithoutTradePreferencesNestedInput = {
    create?: XOR<ListingCreateWithoutTradePreferencesInput, ListingUncheckedCreateWithoutTradePreferencesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutTradePreferencesInput
    upsert?: ListingUpsertWithoutTradePreferencesInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutTradePreferencesInput, ListingUpdateWithoutTradePreferencesInput>, ListingUncheckedUpdateWithoutTradePreferencesInput>
  }

  export type UserUpdateOneRequiredWithoutTradePreferenceNestedInput = {
    create?: XOR<UserCreateWithoutTradePreferenceInput, UserUncheckedCreateWithoutTradePreferenceInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradePreferenceInput
    upsert?: UserUpsertWithoutTradePreferenceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTradePreferenceInput, UserUpdateWithoutTradePreferenceInput>, UserUncheckedUpdateWithoutTradePreferenceInput>
  }

  export type UserCreateNestedOneWithoutTradeRequestsSentInput = {
    create?: XOR<UserCreateWithoutTradeRequestsSentInput, UserUncheckedCreateWithoutTradeRequestsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradeRequestsSentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTradeRequestsReceivedInput = {
    create?: XOR<UserCreateWithoutTradeRequestsReceivedInput, UserUncheckedCreateWithoutTradeRequestsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradeRequestsReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type ListingCreateNestedManyWithoutTradeRequestsInitiatedInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsInitiatedInput, ListingUncheckedCreateWithoutTradeRequestsInitiatedInput> | ListingCreateWithoutTradeRequestsInitiatedInput[] | ListingUncheckedCreateWithoutTradeRequestsInitiatedInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsInitiatedInput | ListingCreateOrConnectWithoutTradeRequestsInitiatedInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ListingCreateNestedManyWithoutTradeRequestsReceivedInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsReceivedInput, ListingUncheckedCreateWithoutTradeRequestsReceivedInput> | ListingCreateWithoutTradeRequestsReceivedInput[] | ListingUncheckedCreateWithoutTradeRequestsReceivedInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsReceivedInput | ListingCreateOrConnectWithoutTradeRequestsReceivedInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutTradeRequestsInitiatedInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsInitiatedInput, ListingUncheckedCreateWithoutTradeRequestsInitiatedInput> | ListingCreateWithoutTradeRequestsInitiatedInput[] | ListingUncheckedCreateWithoutTradeRequestsInitiatedInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsInitiatedInput | ListingCreateOrConnectWithoutTradeRequestsInitiatedInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutTradeRequestsReceivedInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsReceivedInput, ListingUncheckedCreateWithoutTradeRequestsReceivedInput> | ListingCreateWithoutTradeRequestsReceivedInput[] | ListingUncheckedCreateWithoutTradeRequestsReceivedInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsReceivedInput | ListingCreateOrConnectWithoutTradeRequestsReceivedInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type EnumTradeStatusFieldUpdateOperationsInput = {
    set?: $Enums.TradeStatus
  }

  export type UserUpdateOneRequiredWithoutTradeRequestsSentNestedInput = {
    create?: XOR<UserCreateWithoutTradeRequestsSentInput, UserUncheckedCreateWithoutTradeRequestsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradeRequestsSentInput
    upsert?: UserUpsertWithoutTradeRequestsSentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTradeRequestsSentInput, UserUpdateWithoutTradeRequestsSentInput>, UserUncheckedUpdateWithoutTradeRequestsSentInput>
  }

  export type UserUpdateOneRequiredWithoutTradeRequestsReceivedNestedInput = {
    create?: XOR<UserCreateWithoutTradeRequestsReceivedInput, UserUncheckedCreateWithoutTradeRequestsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradeRequestsReceivedInput
    upsert?: UserUpsertWithoutTradeRequestsReceivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTradeRequestsReceivedInput, UserUpdateWithoutTradeRequestsReceivedInput>, UserUncheckedUpdateWithoutTradeRequestsReceivedInput>
  }

  export type ListingUpdateManyWithoutTradeRequestsInitiatedNestedInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsInitiatedInput, ListingUncheckedCreateWithoutTradeRequestsInitiatedInput> | ListingCreateWithoutTradeRequestsInitiatedInput[] | ListingUncheckedCreateWithoutTradeRequestsInitiatedInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsInitiatedInput | ListingCreateOrConnectWithoutTradeRequestsInitiatedInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutTradeRequestsInitiatedInput | ListingUpsertWithWhereUniqueWithoutTradeRequestsInitiatedInput[]
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutTradeRequestsInitiatedInput | ListingUpdateWithWhereUniqueWithoutTradeRequestsInitiatedInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutTradeRequestsInitiatedInput | ListingUpdateManyWithWhereWithoutTradeRequestsInitiatedInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingUpdateManyWithoutTradeRequestsReceivedNestedInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsReceivedInput, ListingUncheckedCreateWithoutTradeRequestsReceivedInput> | ListingCreateWithoutTradeRequestsReceivedInput[] | ListingUncheckedCreateWithoutTradeRequestsReceivedInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsReceivedInput | ListingCreateOrConnectWithoutTradeRequestsReceivedInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutTradeRequestsReceivedInput | ListingUpsertWithWhereUniqueWithoutTradeRequestsReceivedInput[]
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutTradeRequestsReceivedInput | ListingUpdateWithWhereUniqueWithoutTradeRequestsReceivedInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutTradeRequestsReceivedInput | ListingUpdateManyWithWhereWithoutTradeRequestsReceivedInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutTradeRequestsInitiatedNestedInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsInitiatedInput, ListingUncheckedCreateWithoutTradeRequestsInitiatedInput> | ListingCreateWithoutTradeRequestsInitiatedInput[] | ListingUncheckedCreateWithoutTradeRequestsInitiatedInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsInitiatedInput | ListingCreateOrConnectWithoutTradeRequestsInitiatedInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutTradeRequestsInitiatedInput | ListingUpsertWithWhereUniqueWithoutTradeRequestsInitiatedInput[]
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutTradeRequestsInitiatedInput | ListingUpdateWithWhereUniqueWithoutTradeRequestsInitiatedInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutTradeRequestsInitiatedInput | ListingUpdateManyWithWhereWithoutTradeRequestsInitiatedInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutTradeRequestsReceivedNestedInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsReceivedInput, ListingUncheckedCreateWithoutTradeRequestsReceivedInput> | ListingCreateWithoutTradeRequestsReceivedInput[] | ListingUncheckedCreateWithoutTradeRequestsReceivedInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsReceivedInput | ListingCreateOrConnectWithoutTradeRequestsReceivedInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutTradeRequestsReceivedInput | ListingUpsertWithWhereUniqueWithoutTradeRequestsReceivedInput[]
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutTradeRequestsReceivedInput | ListingUpdateWithWhereUniqueWithoutTradeRequestsReceivedInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutTradeRequestsReceivedInput | ListingUpdateManyWithWhereWithoutTradeRequestsReceivedInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingCreateNestedManyWithoutTagsInput = {
    create?: XOR<ListingCreateWithoutTagsInput, ListingUncheckedCreateWithoutTagsInput> | ListingCreateWithoutTagsInput[] | ListingUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTagsInput | ListingCreateOrConnectWithoutTagsInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<ListingCreateWithoutTagsInput, ListingUncheckedCreateWithoutTagsInput> | ListingCreateWithoutTagsInput[] | ListingUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTagsInput | ListingCreateOrConnectWithoutTagsInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ListingUpdateManyWithoutTagsNestedInput = {
    create?: XOR<ListingCreateWithoutTagsInput, ListingUncheckedCreateWithoutTagsInput> | ListingCreateWithoutTagsInput[] | ListingUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTagsInput | ListingCreateOrConnectWithoutTagsInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutTagsInput | ListingUpsertWithWhereUniqueWithoutTagsInput[]
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutTagsInput | ListingUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutTagsInput | ListingUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<ListingCreateWithoutTagsInput, ListingUncheckedCreateWithoutTagsInput> | ListingCreateWithoutTagsInput[] | ListingUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutTagsInput | ListingCreateOrConnectWithoutTagsInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutTagsInput | ListingUpsertWithWhereUniqueWithoutTagsInput[]
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutTagsInput | ListingUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutTagsInput | ListingUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type ListingCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<ListingCreateWithoutFavoritesInput, ListingUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutFavoritesInput
    connect?: ListingWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritesInput, UserUpdateWithoutFavoritesInput>, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type ListingUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<ListingCreateWithoutFavoritesInput, ListingUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutFavoritesInput
    upsert?: ListingUpsertWithoutFavoritesInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutFavoritesInput, ListingUpdateWithoutFavoritesInput>, ListingUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserCreateNestedOneWithoutMessagesFromInput = {
    create?: XOR<UserCreateWithoutMessagesFromInput, UserUncheckedCreateWithoutMessagesFromInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesFromInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMessagesToInput = {
    create?: XOR<UserCreateWithoutMessagesToInput, UserUncheckedCreateWithoutMessagesToInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesToInput
    connect?: UserWhereUniqueInput
  }

  export type ListingCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ListingCreateWithoutMessagesInput, ListingUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutMessagesInput
    connect?: ListingWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMessagesFromNestedInput = {
    create?: XOR<UserCreateWithoutMessagesFromInput, UserUncheckedCreateWithoutMessagesFromInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesFromInput
    upsert?: UserUpsertWithoutMessagesFromInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesFromInput, UserUpdateWithoutMessagesFromInput>, UserUncheckedUpdateWithoutMessagesFromInput>
  }

  export type UserUpdateOneRequiredWithoutMessagesToNestedInput = {
    create?: XOR<UserCreateWithoutMessagesToInput, UserUncheckedCreateWithoutMessagesToInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesToInput
    upsert?: UserUpsertWithoutMessagesToInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesToInput, UserUpdateWithoutMessagesToInput>, UserUncheckedUpdateWithoutMessagesToInput>
  }

  export type ListingUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<ListingCreateWithoutMessagesInput, ListingUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutMessagesInput
    upsert?: ListingUpsertWithoutMessagesInput
    disconnect?: ListingWhereInput | boolean
    delete?: ListingWhereInput | boolean
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutMessagesInput, ListingUpdateWithoutMessagesInput>, ListingUncheckedUpdateWithoutMessagesInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumListingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingStatus | EnumListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumListingStatusFilter<$PrismaModel> | $Enums.ListingStatus
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumListingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingStatus | EnumListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumListingStatusWithAggregatesFilter<$PrismaModel> | $Enums.ListingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumListingStatusFilter<$PrismaModel>
    _max?: NestedEnumListingStatusFilter<$PrismaModel>
  }

  export type NestedEnumTradeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeStatus | EnumTradeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TradeStatus[] | ListEnumTradeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TradeStatus[] | ListEnumTradeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTradeStatusFilter<$PrismaModel> | $Enums.TradeStatus
  }

  export type NestedEnumTradeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeStatus | EnumTradeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TradeStatus[] | ListEnumTradeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TradeStatus[] | ListEnumTradeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTradeStatusWithAggregatesFilter<$PrismaModel> | $Enums.TradeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTradeStatusFilter<$PrismaModel>
    _max?: NestedEnumTradeStatusFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ClosetCreateWithoutUserInput = {
    id?: string
    name?: string
    createdAt?: Date | string
    listings?: ListingCreateNestedManyWithoutClosetInput
  }

  export type ClosetUncheckedCreateWithoutUserInput = {
    id?: string
    name?: string
    createdAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutClosetInput
  }

  export type ClosetCreateOrConnectWithoutUserInput = {
    where: ClosetWhereUniqueInput
    create: XOR<ClosetCreateWithoutUserInput, ClosetUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateWithoutUserInput = {
    id?: string
    listing: ListingCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutUserInput = {
    id?: string
    listingId: string
  }

  export type FavoriteCreateOrConnectWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateManyUserInputEnvelope = {
    data: FavoriteCreateManyUserInput | FavoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutToInput = {
    id?: string
    content: string
    timestamp?: Date | string
    updatedAt?: Date | string
    from: UserCreateNestedOneWithoutMessagesFromInput
    listing?: ListingCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutToInput = {
    id?: string
    fromId: string
    content: string
    listingId?: string | null
    timestamp?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutToInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutToInput, MessageUncheckedCreateWithoutToInput>
  }

  export type MessageCreateManyToInputEnvelope = {
    data: MessageCreateManyToInput | MessageCreateManyToInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutFromInput = {
    id?: string
    content: string
    timestamp?: Date | string
    updatedAt?: Date | string
    to: UserCreateNestedOneWithoutMessagesToInput
    listing?: ListingCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutFromInput = {
    id?: string
    toId: string
    content: string
    listingId?: string | null
    timestamp?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutFromInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutFromInput, MessageUncheckedCreateWithoutFromInput>
  }

  export type MessageCreateManyFromInputEnvelope = {
    data: MessageCreateManyFromInput | MessageCreateManyFromInput[]
    skipDuplicates?: boolean
  }

  export type TradeRequestCreateWithoutFromUserInput = {
    id?: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    toUser: UserCreateNestedOneWithoutTradeRequestsReceivedInput
    initiatorListings?: ListingCreateNestedManyWithoutTradeRequestsInitiatedInput
    targetListings?: ListingCreateNestedManyWithoutTradeRequestsReceivedInput
  }

  export type TradeRequestUncheckedCreateWithoutFromUserInput = {
    id?: string
    toUserId: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    initiatorListings?: ListingUncheckedCreateNestedManyWithoutTradeRequestsInitiatedInput
    targetListings?: ListingUncheckedCreateNestedManyWithoutTradeRequestsReceivedInput
  }

  export type TradeRequestCreateOrConnectWithoutFromUserInput = {
    where: TradeRequestWhereUniqueInput
    create: XOR<TradeRequestCreateWithoutFromUserInput, TradeRequestUncheckedCreateWithoutFromUserInput>
  }

  export type TradeRequestCreateManyFromUserInputEnvelope = {
    data: TradeRequestCreateManyFromUserInput | TradeRequestCreateManyFromUserInput[]
    skipDuplicates?: boolean
  }

  export type TradeRequestCreateWithoutToUserInput = {
    id?: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutTradeRequestsSentInput
    initiatorListings?: ListingCreateNestedManyWithoutTradeRequestsInitiatedInput
    targetListings?: ListingCreateNestedManyWithoutTradeRequestsReceivedInput
  }

  export type TradeRequestUncheckedCreateWithoutToUserInput = {
    id?: string
    fromUserId: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    initiatorListings?: ListingUncheckedCreateNestedManyWithoutTradeRequestsInitiatedInput
    targetListings?: ListingUncheckedCreateNestedManyWithoutTradeRequestsReceivedInput
  }

  export type TradeRequestCreateOrConnectWithoutToUserInput = {
    where: TradeRequestWhereUniqueInput
    create: XOR<TradeRequestCreateWithoutToUserInput, TradeRequestUncheckedCreateWithoutToUserInput>
  }

  export type TradeRequestCreateManyToUserInputEnvelope = {
    data: TradeRequestCreateManyToUserInput | TradeRequestCreateManyToUserInput[]
    skipDuplicates?: boolean
  }

  export type ListingCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    closet: ClosetCreateNestedOneWithoutListingsInput
    tags?: TagCreateNestedManyWithoutListingsInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
    messages?: MessageCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutListingsInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
    messages?: MessageUncheckedCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceUncheckedCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestUncheckedCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingCreateOrConnectWithoutUserInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput>
  }

  export type ListingCreateManyUserInputEnvelope = {
    data: ListingCreateManyUserInput | ListingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TradePreferenceCreateWithoutUserInput = {
    id?: string
    title: string
    imageUrl: string
    notes?: string | null
    createdAt?: Date | string
    listing: ListingCreateNestedOneWithoutTradePreferencesInput
  }

  export type TradePreferenceUncheckedCreateWithoutUserInput = {
    id?: string
    listingId: string
    title: string
    imageUrl: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type TradePreferenceCreateOrConnectWithoutUserInput = {
    where: TradePreferenceWhereUniqueInput
    create: XOR<TradePreferenceCreateWithoutUserInput, TradePreferenceUncheckedCreateWithoutUserInput>
  }

  export type TradePreferenceCreateManyUserInputEnvelope = {
    data: TradePreferenceCreateManyUserInput | TradePreferenceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ClosetUpsertWithoutUserInput = {
    update: XOR<ClosetUpdateWithoutUserInput, ClosetUncheckedUpdateWithoutUserInput>
    create: XOR<ClosetCreateWithoutUserInput, ClosetUncheckedCreateWithoutUserInput>
    where?: ClosetWhereInput
  }

  export type ClosetUpdateToOneWithWhereWithoutUserInput = {
    where?: ClosetWhereInput
    data: XOR<ClosetUpdateWithoutUserInput, ClosetUncheckedUpdateWithoutUserInput>
  }

  export type ClosetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutClosetNestedInput
  }

  export type ClosetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutClosetNestedInput
  }

  export type FavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoriteScalarWhereInput = {
    AND?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    OR?: FavoriteScalarWhereInput[]
    NOT?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    id?: StringFilter<"Favorite"> | string
    userId?: UuidFilter<"Favorite"> | string
    listingId?: UuidFilter<"Favorite"> | string
  }

  export type MessageUpsertWithWhereUniqueWithoutToInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutToInput, MessageUncheckedUpdateWithoutToInput>
    create: XOR<MessageCreateWithoutToInput, MessageUncheckedCreateWithoutToInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutToInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutToInput, MessageUncheckedUpdateWithoutToInput>
  }

  export type MessageUpdateManyWithWhereWithoutToInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutToInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    fromId?: UuidFilter<"Message"> | string
    toId?: UuidFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    listingId?: UuidNullableFilter<"Message"> | string | null
    timestamp?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutFromInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutFromInput, MessageUncheckedUpdateWithoutFromInput>
    create: XOR<MessageCreateWithoutFromInput, MessageUncheckedCreateWithoutFromInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutFromInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutFromInput, MessageUncheckedUpdateWithoutFromInput>
  }

  export type MessageUpdateManyWithWhereWithoutFromInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutFromInput>
  }

  export type TradeRequestUpsertWithWhereUniqueWithoutFromUserInput = {
    where: TradeRequestWhereUniqueInput
    update: XOR<TradeRequestUpdateWithoutFromUserInput, TradeRequestUncheckedUpdateWithoutFromUserInput>
    create: XOR<TradeRequestCreateWithoutFromUserInput, TradeRequestUncheckedCreateWithoutFromUserInput>
  }

  export type TradeRequestUpdateWithWhereUniqueWithoutFromUserInput = {
    where: TradeRequestWhereUniqueInput
    data: XOR<TradeRequestUpdateWithoutFromUserInput, TradeRequestUncheckedUpdateWithoutFromUserInput>
  }

  export type TradeRequestUpdateManyWithWhereWithoutFromUserInput = {
    where: TradeRequestScalarWhereInput
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyWithoutFromUserInput>
  }

  export type TradeRequestScalarWhereInput = {
    AND?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
    OR?: TradeRequestScalarWhereInput[]
    NOT?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
    id?: StringFilter<"TradeRequest"> | string
    fromUserId?: UuidFilter<"TradeRequest"> | string
    toUserId?: UuidFilter<"TradeRequest"> | string
    status?: EnumTradeStatusFilter<"TradeRequest"> | $Enums.TradeStatus
    message?: StringNullableFilter<"TradeRequest"> | string | null
    createdAt?: DateTimeFilter<"TradeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TradeRequest"> | Date | string
  }

  export type TradeRequestUpsertWithWhereUniqueWithoutToUserInput = {
    where: TradeRequestWhereUniqueInput
    update: XOR<TradeRequestUpdateWithoutToUserInput, TradeRequestUncheckedUpdateWithoutToUserInput>
    create: XOR<TradeRequestCreateWithoutToUserInput, TradeRequestUncheckedCreateWithoutToUserInput>
  }

  export type TradeRequestUpdateWithWhereUniqueWithoutToUserInput = {
    where: TradeRequestWhereUniqueInput
    data: XOR<TradeRequestUpdateWithoutToUserInput, TradeRequestUncheckedUpdateWithoutToUserInput>
  }

  export type TradeRequestUpdateManyWithWhereWithoutToUserInput = {
    where: TradeRequestScalarWhereInput
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyWithoutToUserInput>
  }

  export type ListingUpsertWithWhereUniqueWithoutUserInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutUserInput, ListingUncheckedUpdateWithoutUserInput>
    create: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutUserInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutUserInput, ListingUncheckedUpdateWithoutUserInput>
  }

  export type ListingUpdateManyWithWhereWithoutUserInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutUserInput>
  }

  export type ListingScalarWhereInput = {
    AND?: ListingScalarWhereInput | ListingScalarWhereInput[]
    OR?: ListingScalarWhereInput[]
    NOT?: ListingScalarWhereInput | ListingScalarWhereInput[]
    id?: UuidFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    description?: StringFilter<"Listing"> | string
    imageUrls?: StringNullableListFilter<"Listing">
    isPrivate?: BoolFilter<"Listing"> | boolean
    userId?: UuidFilter<"Listing"> | string
    closetId?: UuidFilter<"Listing"> | string
    status?: EnumListingStatusFilter<"Listing"> | $Enums.ListingStatus
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
  }

  export type TradePreferenceUpsertWithWhereUniqueWithoutUserInput = {
    where: TradePreferenceWhereUniqueInput
    update: XOR<TradePreferenceUpdateWithoutUserInput, TradePreferenceUncheckedUpdateWithoutUserInput>
    create: XOR<TradePreferenceCreateWithoutUserInput, TradePreferenceUncheckedCreateWithoutUserInput>
  }

  export type TradePreferenceUpdateWithWhereUniqueWithoutUserInput = {
    where: TradePreferenceWhereUniqueInput
    data: XOR<TradePreferenceUpdateWithoutUserInput, TradePreferenceUncheckedUpdateWithoutUserInput>
  }

  export type TradePreferenceUpdateManyWithWhereWithoutUserInput = {
    where: TradePreferenceScalarWhereInput
    data: XOR<TradePreferenceUpdateManyMutationInput, TradePreferenceUncheckedUpdateManyWithoutUserInput>
  }

  export type TradePreferenceScalarWhereInput = {
    AND?: TradePreferenceScalarWhereInput | TradePreferenceScalarWhereInput[]
    OR?: TradePreferenceScalarWhereInput[]
    NOT?: TradePreferenceScalarWhereInput | TradePreferenceScalarWhereInput[]
    id?: StringFilter<"TradePreference"> | string
    listingId?: UuidFilter<"TradePreference"> | string
    userId?: UuidFilter<"TradePreference"> | string
    title?: StringFilter<"TradePreference"> | string
    imageUrl?: StringFilter<"TradePreference"> | string
    notes?: StringNullableFilter<"TradePreference"> | string | null
    createdAt?: DateTimeFilter<"TradePreference"> | Date | string
  }

  export type UserCreateWithoutClosetInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    messagesTo?: MessageCreateNestedManyWithoutToInput
    messagesFrom?: MessageCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutToUserInput
    listings?: ListingCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClosetInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    messagesTo?: MessageUncheckedCreateNestedManyWithoutToInput
    messagesFrom?: MessageUncheckedCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestUncheckedCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutToUserInput
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClosetInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClosetInput, UserUncheckedCreateWithoutClosetInput>
  }

  export type ListingCreateWithoutClosetInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    tags?: TagCreateNestedManyWithoutListingsInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
    messages?: MessageCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingUncheckedCreateWithoutClosetInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutListingsInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
    messages?: MessageUncheckedCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceUncheckedCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestUncheckedCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingCreateOrConnectWithoutClosetInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutClosetInput, ListingUncheckedCreateWithoutClosetInput>
  }

  export type ListingCreateManyClosetInputEnvelope = {
    data: ListingCreateManyClosetInput | ListingCreateManyClosetInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutClosetInput = {
    update: XOR<UserUpdateWithoutClosetInput, UserUncheckedUpdateWithoutClosetInput>
    create: XOR<UserCreateWithoutClosetInput, UserUncheckedCreateWithoutClosetInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClosetInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClosetInput, UserUncheckedUpdateWithoutClosetInput>
  }

  export type UserUpdateWithoutClosetInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutToUserNestedInput
    listings?: ListingUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClosetInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUncheckedUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUncheckedUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUncheckedUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutToUserNestedInput
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListingUpsertWithWhereUniqueWithoutClosetInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutClosetInput, ListingUncheckedUpdateWithoutClosetInput>
    create: XOR<ListingCreateWithoutClosetInput, ListingUncheckedCreateWithoutClosetInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutClosetInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutClosetInput, ListingUncheckedUpdateWithoutClosetInput>
  }

  export type ListingUpdateManyWithWhereWithoutClosetInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutClosetInput>
  }

  export type UserCreateWithoutListingsInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    messagesTo?: MessageCreateNestedManyWithoutToInput
    messagesFrom?: MessageCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutToUserInput
    TradePreference?: TradePreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutListingsInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    messagesTo?: MessageUncheckedCreateNestedManyWithoutToInput
    messagesFrom?: MessageUncheckedCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestUncheckedCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutToUserInput
    TradePreference?: TradePreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutListingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
  }

  export type ClosetCreateWithoutListingsInput = {
    id?: string
    name?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClosetInput
  }

  export type ClosetUncheckedCreateWithoutListingsInput = {
    id?: string
    name?: string
    userId: string
    createdAt?: Date | string
  }

  export type ClosetCreateOrConnectWithoutListingsInput = {
    where: ClosetWhereUniqueInput
    create: XOR<ClosetCreateWithoutListingsInput, ClosetUncheckedCreateWithoutListingsInput>
  }

  export type TagCreateWithoutListingsInput = {
    id?: string
    name: string
  }

  export type TagUncheckedCreateWithoutListingsInput = {
    id?: string
    name: string
  }

  export type TagCreateOrConnectWithoutListingsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutListingsInput, TagUncheckedCreateWithoutListingsInput>
  }

  export type FavoriteCreateWithoutListingInput = {
    id?: string
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutListingInput = {
    id?: string
    userId: string
  }

  export type FavoriteCreateOrConnectWithoutListingInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput>
  }

  export type FavoriteCreateManyListingInputEnvelope = {
    data: FavoriteCreateManyListingInput | FavoriteCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutListingInput = {
    id?: string
    content: string
    timestamp?: Date | string
    updatedAt?: Date | string
    from: UserCreateNestedOneWithoutMessagesFromInput
    to: UserCreateNestedOneWithoutMessagesToInput
  }

  export type MessageUncheckedCreateWithoutListingInput = {
    id?: string
    fromId: string
    toId: string
    content: string
    timestamp?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutListingInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutListingInput, MessageUncheckedCreateWithoutListingInput>
  }

  export type MessageCreateManyListingInputEnvelope = {
    data: MessageCreateManyListingInput | MessageCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type TradePreferenceCreateWithoutListingInput = {
    id?: string
    title: string
    imageUrl: string
    notes?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTradePreferenceInput
  }

  export type TradePreferenceUncheckedCreateWithoutListingInput = {
    id?: string
    userId: string
    title: string
    imageUrl: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type TradePreferenceCreateOrConnectWithoutListingInput = {
    where: TradePreferenceWhereUniqueInput
    create: XOR<TradePreferenceCreateWithoutListingInput, TradePreferenceUncheckedCreateWithoutListingInput>
  }

  export type TradePreferenceCreateManyListingInputEnvelope = {
    data: TradePreferenceCreateManyListingInput | TradePreferenceCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type TradeRequestCreateWithoutInitiatorListingsInput = {
    id?: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutTradeRequestsSentInput
    toUser: UserCreateNestedOneWithoutTradeRequestsReceivedInput
    targetListings?: ListingCreateNestedManyWithoutTradeRequestsReceivedInput
  }

  export type TradeRequestUncheckedCreateWithoutInitiatorListingsInput = {
    id?: string
    fromUserId: string
    toUserId: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    targetListings?: ListingUncheckedCreateNestedManyWithoutTradeRequestsReceivedInput
  }

  export type TradeRequestCreateOrConnectWithoutInitiatorListingsInput = {
    where: TradeRequestWhereUniqueInput
    create: XOR<TradeRequestCreateWithoutInitiatorListingsInput, TradeRequestUncheckedCreateWithoutInitiatorListingsInput>
  }

  export type TradeRequestCreateWithoutTargetListingsInput = {
    id?: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutTradeRequestsSentInput
    toUser: UserCreateNestedOneWithoutTradeRequestsReceivedInput
    initiatorListings?: ListingCreateNestedManyWithoutTradeRequestsInitiatedInput
  }

  export type TradeRequestUncheckedCreateWithoutTargetListingsInput = {
    id?: string
    fromUserId: string
    toUserId: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    initiatorListings?: ListingUncheckedCreateNestedManyWithoutTradeRequestsInitiatedInput
  }

  export type TradeRequestCreateOrConnectWithoutTargetListingsInput = {
    where: TradeRequestWhereUniqueInput
    create: XOR<TradeRequestCreateWithoutTargetListingsInput, TradeRequestUncheckedCreateWithoutTargetListingsInput>
  }

  export type UserUpsertWithoutListingsInput = {
    update: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
  }

  export type UserUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutToUserNestedInput
    TradePreference?: TradePreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUncheckedUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUncheckedUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUncheckedUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutToUserNestedInput
    TradePreference?: TradePreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClosetUpsertWithoutListingsInput = {
    update: XOR<ClosetUpdateWithoutListingsInput, ClosetUncheckedUpdateWithoutListingsInput>
    create: XOR<ClosetCreateWithoutListingsInput, ClosetUncheckedCreateWithoutListingsInput>
    where?: ClosetWhereInput
  }

  export type ClosetUpdateToOneWithWhereWithoutListingsInput = {
    where?: ClosetWhereInput
    data: XOR<ClosetUpdateWithoutListingsInput, ClosetUncheckedUpdateWithoutListingsInput>
  }

  export type ClosetUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClosetNestedInput
  }

  export type ClosetUncheckedUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpsertWithWhereUniqueWithoutListingsInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutListingsInput, TagUncheckedUpdateWithoutListingsInput>
    create: XOR<TagCreateWithoutListingsInput, TagUncheckedCreateWithoutListingsInput>
  }

  export type TagUpdateWithWhereUniqueWithoutListingsInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutListingsInput, TagUncheckedUpdateWithoutListingsInput>
  }

  export type TagUpdateManyWithWhereWithoutListingsInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutListingsInput>
  }

  export type TagScalarWhereInput = {
    AND?: TagScalarWhereInput | TagScalarWhereInput[]
    OR?: TagScalarWhereInput[]
    NOT?: TagScalarWhereInput | TagScalarWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
  }

  export type FavoriteUpsertWithWhereUniqueWithoutListingInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutListingInput, FavoriteUncheckedUpdateWithoutListingInput>
    create: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutListingInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutListingInput, FavoriteUncheckedUpdateWithoutListingInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutListingInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutListingInput>
  }

  export type MessageUpsertWithWhereUniqueWithoutListingInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutListingInput, MessageUncheckedUpdateWithoutListingInput>
    create: XOR<MessageCreateWithoutListingInput, MessageUncheckedCreateWithoutListingInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutListingInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutListingInput, MessageUncheckedUpdateWithoutListingInput>
  }

  export type MessageUpdateManyWithWhereWithoutListingInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutListingInput>
  }

  export type TradePreferenceUpsertWithWhereUniqueWithoutListingInput = {
    where: TradePreferenceWhereUniqueInput
    update: XOR<TradePreferenceUpdateWithoutListingInput, TradePreferenceUncheckedUpdateWithoutListingInput>
    create: XOR<TradePreferenceCreateWithoutListingInput, TradePreferenceUncheckedCreateWithoutListingInput>
  }

  export type TradePreferenceUpdateWithWhereUniqueWithoutListingInput = {
    where: TradePreferenceWhereUniqueInput
    data: XOR<TradePreferenceUpdateWithoutListingInput, TradePreferenceUncheckedUpdateWithoutListingInput>
  }

  export type TradePreferenceUpdateManyWithWhereWithoutListingInput = {
    where: TradePreferenceScalarWhereInput
    data: XOR<TradePreferenceUpdateManyMutationInput, TradePreferenceUncheckedUpdateManyWithoutListingInput>
  }

  export type TradeRequestUpsertWithWhereUniqueWithoutInitiatorListingsInput = {
    where: TradeRequestWhereUniqueInput
    update: XOR<TradeRequestUpdateWithoutInitiatorListingsInput, TradeRequestUncheckedUpdateWithoutInitiatorListingsInput>
    create: XOR<TradeRequestCreateWithoutInitiatorListingsInput, TradeRequestUncheckedCreateWithoutInitiatorListingsInput>
  }

  export type TradeRequestUpdateWithWhereUniqueWithoutInitiatorListingsInput = {
    where: TradeRequestWhereUniqueInput
    data: XOR<TradeRequestUpdateWithoutInitiatorListingsInput, TradeRequestUncheckedUpdateWithoutInitiatorListingsInput>
  }

  export type TradeRequestUpdateManyWithWhereWithoutInitiatorListingsInput = {
    where: TradeRequestScalarWhereInput
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyWithoutInitiatorListingsInput>
  }

  export type TradeRequestUpsertWithWhereUniqueWithoutTargetListingsInput = {
    where: TradeRequestWhereUniqueInput
    update: XOR<TradeRequestUpdateWithoutTargetListingsInput, TradeRequestUncheckedUpdateWithoutTargetListingsInput>
    create: XOR<TradeRequestCreateWithoutTargetListingsInput, TradeRequestUncheckedCreateWithoutTargetListingsInput>
  }

  export type TradeRequestUpdateWithWhereUniqueWithoutTargetListingsInput = {
    where: TradeRequestWhereUniqueInput
    data: XOR<TradeRequestUpdateWithoutTargetListingsInput, TradeRequestUncheckedUpdateWithoutTargetListingsInput>
  }

  export type TradeRequestUpdateManyWithWhereWithoutTargetListingsInput = {
    where: TradeRequestScalarWhereInput
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyWithoutTargetListingsInput>
  }

  export type ListingCreateWithoutTradePreferencesInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    closet: ClosetCreateNestedOneWithoutListingsInput
    tags?: TagCreateNestedManyWithoutListingsInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
    messages?: MessageCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingUncheckedCreateWithoutTradePreferencesInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutListingsInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
    messages?: MessageUncheckedCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestUncheckedCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingCreateOrConnectWithoutTradePreferencesInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutTradePreferencesInput, ListingUncheckedCreateWithoutTradePreferencesInput>
  }

  export type UserCreateWithoutTradePreferenceInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    messagesTo?: MessageCreateNestedManyWithoutToInput
    messagesFrom?: MessageCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutToUserInput
    listings?: ListingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTradePreferenceInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    messagesTo?: MessageUncheckedCreateNestedManyWithoutToInput
    messagesFrom?: MessageUncheckedCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestUncheckedCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutToUserInput
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTradePreferenceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTradePreferenceInput, UserUncheckedCreateWithoutTradePreferenceInput>
  }

  export type ListingUpsertWithoutTradePreferencesInput = {
    update: XOR<ListingUpdateWithoutTradePreferencesInput, ListingUncheckedUpdateWithoutTradePreferencesInput>
    create: XOR<ListingCreateWithoutTradePreferencesInput, ListingUncheckedCreateWithoutTradePreferencesInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutTradePreferencesInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutTradePreferencesInput, ListingUncheckedUpdateWithoutTradePreferencesInput>
  }

  export type ListingUpdateWithoutTradePreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    closet?: ClosetUpdateOneRequiredWithoutListingsNestedInput
    tags?: TagUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
    messages?: MessageUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateWithoutTradePreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
    messages?: MessageUncheckedUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUncheckedUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutTargetListingsNestedInput
  }

  export type UserUpsertWithoutTradePreferenceInput = {
    update: XOR<UserUpdateWithoutTradePreferenceInput, UserUncheckedUpdateWithoutTradePreferenceInput>
    create: XOR<UserCreateWithoutTradePreferenceInput, UserUncheckedCreateWithoutTradePreferenceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTradePreferenceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTradePreferenceInput, UserUncheckedUpdateWithoutTradePreferenceInput>
  }

  export type UserUpdateWithoutTradePreferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutToUserNestedInput
    listings?: ListingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTradePreferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUncheckedUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUncheckedUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUncheckedUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutToUserNestedInput
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTradeRequestsSentInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    messagesTo?: MessageCreateNestedManyWithoutToInput
    messagesFrom?: MessageCreateNestedManyWithoutFromInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutToUserInput
    listings?: ListingCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTradeRequestsSentInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    messagesTo?: MessageUncheckedCreateNestedManyWithoutToInput
    messagesFrom?: MessageUncheckedCreateNestedManyWithoutFromInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutToUserInput
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTradeRequestsSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTradeRequestsSentInput, UserUncheckedCreateWithoutTradeRequestsSentInput>
  }

  export type UserCreateWithoutTradeRequestsReceivedInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    messagesTo?: MessageCreateNestedManyWithoutToInput
    messagesFrom?: MessageCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestCreateNestedManyWithoutFromUserInput
    listings?: ListingCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTradeRequestsReceivedInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    messagesTo?: MessageUncheckedCreateNestedManyWithoutToInput
    messagesFrom?: MessageUncheckedCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestUncheckedCreateNestedManyWithoutFromUserInput
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTradeRequestsReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTradeRequestsReceivedInput, UserUncheckedCreateWithoutTradeRequestsReceivedInput>
  }

  export type ListingCreateWithoutTradeRequestsInitiatedInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    closet: ClosetCreateNestedOneWithoutListingsInput
    tags?: TagCreateNestedManyWithoutListingsInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
    messages?: MessageCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceCreateNestedManyWithoutListingInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingUncheckedCreateWithoutTradeRequestsInitiatedInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutListingsInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
    messages?: MessageUncheckedCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceUncheckedCreateNestedManyWithoutListingInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingCreateOrConnectWithoutTradeRequestsInitiatedInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutTradeRequestsInitiatedInput, ListingUncheckedCreateWithoutTradeRequestsInitiatedInput>
  }

  export type ListingCreateWithoutTradeRequestsReceivedInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    closet: ClosetCreateNestedOneWithoutListingsInput
    tags?: TagCreateNestedManyWithoutListingsInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
    messages?: MessageCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestCreateNestedManyWithoutInitiatorListingsInput
  }

  export type ListingUncheckedCreateWithoutTradeRequestsReceivedInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutListingsInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
    messages?: MessageUncheckedCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceUncheckedCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestUncheckedCreateNestedManyWithoutInitiatorListingsInput
  }

  export type ListingCreateOrConnectWithoutTradeRequestsReceivedInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutTradeRequestsReceivedInput, ListingUncheckedCreateWithoutTradeRequestsReceivedInput>
  }

  export type UserUpsertWithoutTradeRequestsSentInput = {
    update: XOR<UserUpdateWithoutTradeRequestsSentInput, UserUncheckedUpdateWithoutTradeRequestsSentInput>
    create: XOR<UserCreateWithoutTradeRequestsSentInput, UserUncheckedCreateWithoutTradeRequestsSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTradeRequestsSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTradeRequestsSentInput, UserUncheckedUpdateWithoutTradeRequestsSentInput>
  }

  export type UserUpdateWithoutTradeRequestsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUpdateManyWithoutFromNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutToUserNestedInput
    listings?: ListingUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTradeRequestsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUncheckedUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUncheckedUpdateManyWithoutFromNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutToUserNestedInput
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutTradeRequestsReceivedInput = {
    update: XOR<UserUpdateWithoutTradeRequestsReceivedInput, UserUncheckedUpdateWithoutTradeRequestsReceivedInput>
    create: XOR<UserCreateWithoutTradeRequestsReceivedInput, UserUncheckedCreateWithoutTradeRequestsReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTradeRequestsReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTradeRequestsReceivedInput, UserUncheckedUpdateWithoutTradeRequestsReceivedInput>
  }

  export type UserUpdateWithoutTradeRequestsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUpdateManyWithoutFromUserNestedInput
    listings?: ListingUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTradeRequestsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUncheckedUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUncheckedUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUncheckedUpdateManyWithoutFromUserNestedInput
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListingUpsertWithWhereUniqueWithoutTradeRequestsInitiatedInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutTradeRequestsInitiatedInput, ListingUncheckedUpdateWithoutTradeRequestsInitiatedInput>
    create: XOR<ListingCreateWithoutTradeRequestsInitiatedInput, ListingUncheckedCreateWithoutTradeRequestsInitiatedInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutTradeRequestsInitiatedInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutTradeRequestsInitiatedInput, ListingUncheckedUpdateWithoutTradeRequestsInitiatedInput>
  }

  export type ListingUpdateManyWithWhereWithoutTradeRequestsInitiatedInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutTradeRequestsInitiatedInput>
  }

  export type ListingUpsertWithWhereUniqueWithoutTradeRequestsReceivedInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutTradeRequestsReceivedInput, ListingUncheckedUpdateWithoutTradeRequestsReceivedInput>
    create: XOR<ListingCreateWithoutTradeRequestsReceivedInput, ListingUncheckedCreateWithoutTradeRequestsReceivedInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutTradeRequestsReceivedInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutTradeRequestsReceivedInput, ListingUncheckedUpdateWithoutTradeRequestsReceivedInput>
  }

  export type ListingUpdateManyWithWhereWithoutTradeRequestsReceivedInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutTradeRequestsReceivedInput>
  }

  export type ListingCreateWithoutTagsInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    closet: ClosetCreateNestedOneWithoutListingsInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
    messages?: MessageCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingUncheckedCreateWithoutTagsInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
    messages?: MessageUncheckedCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceUncheckedCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestUncheckedCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingCreateOrConnectWithoutTagsInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutTagsInput, ListingUncheckedCreateWithoutTagsInput>
  }

  export type ListingUpsertWithWhereUniqueWithoutTagsInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutTagsInput, ListingUncheckedUpdateWithoutTagsInput>
    create: XOR<ListingCreateWithoutTagsInput, ListingUncheckedCreateWithoutTagsInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutTagsInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutTagsInput, ListingUncheckedUpdateWithoutTagsInput>
  }

  export type ListingUpdateManyWithWhereWithoutTagsInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutTagsInput>
  }

  export type UserCreateWithoutFavoritesInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetCreateNestedOneWithoutUserInput
    messagesTo?: MessageCreateNestedManyWithoutToInput
    messagesFrom?: MessageCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutToUserInput
    listings?: ListingCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetUncheckedCreateNestedOneWithoutUserInput
    messagesTo?: MessageUncheckedCreateNestedManyWithoutToInput
    messagesFrom?: MessageUncheckedCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestUncheckedCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutToUserInput
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type ListingCreateWithoutFavoritesInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    closet: ClosetCreateNestedOneWithoutListingsInput
    tags?: TagCreateNestedManyWithoutListingsInput
    messages?: MessageCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingUncheckedCreateWithoutFavoritesInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutListingsInput
    messages?: MessageUncheckedCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceUncheckedCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestUncheckedCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingCreateOrConnectWithoutFavoritesInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutFavoritesInput, ListingUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUpdateOneWithoutUserNestedInput
    messagesTo?: MessageUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutToUserNestedInput
    listings?: ListingUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUncheckedUpdateOneWithoutUserNestedInput
    messagesTo?: MessageUncheckedUpdateManyWithoutToNestedInput
    messagesFrom?: MessageUncheckedUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUncheckedUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutToUserNestedInput
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListingUpsertWithoutFavoritesInput = {
    update: XOR<ListingUpdateWithoutFavoritesInput, ListingUncheckedUpdateWithoutFavoritesInput>
    create: XOR<ListingCreateWithoutFavoritesInput, ListingUncheckedCreateWithoutFavoritesInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutFavoritesInput, ListingUncheckedUpdateWithoutFavoritesInput>
  }

  export type ListingUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    closet?: ClosetUpdateOneRequiredWithoutListingsNestedInput
    tags?: TagUpdateManyWithoutListingsNestedInput
    messages?: MessageUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutListingsNestedInput
    messages?: MessageUncheckedUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUncheckedUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUncheckedUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutTargetListingsNestedInput
  }

  export type UserCreateWithoutMessagesFromInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    messagesTo?: MessageCreateNestedManyWithoutToInput
    tradeRequestsSent?: TradeRequestCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutToUserInput
    listings?: ListingCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesFromInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    messagesTo?: MessageUncheckedCreateNestedManyWithoutToInput
    tradeRequestsSent?: TradeRequestUncheckedCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutToUserInput
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesFromInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesFromInput, UserUncheckedCreateWithoutMessagesFromInput>
  }

  export type UserCreateWithoutMessagesToInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    messagesFrom?: MessageCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutToUserInput
    listings?: ListingCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesToInput = {
    id?: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    clerkid: string
    image?: string | null
    bio?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closet?: ClosetUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    messagesFrom?: MessageUncheckedCreateNestedManyWithoutFromInput
    tradeRequestsSent?: TradeRequestUncheckedCreateNestedManyWithoutFromUserInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutToUserInput
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    TradePreference?: TradePreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesToInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesToInput, UserUncheckedCreateWithoutMessagesToInput>
  }

  export type ListingCreateWithoutMessagesInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    closet: ClosetCreateNestedOneWithoutListingsInput
    tags?: TagCreateNestedManyWithoutListingsInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingUncheckedCreateWithoutMessagesInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutListingsInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
    tradePreferences?: TradePreferenceUncheckedCreateNestedManyWithoutListingInput
    tradeRequestsInitiated?: TradeRequestUncheckedCreateNestedManyWithoutInitiatorListingsInput
    tradeRequestsReceived?: TradeRequestUncheckedCreateNestedManyWithoutTargetListingsInput
  }

  export type ListingCreateOrConnectWithoutMessagesInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutMessagesInput, ListingUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpsertWithoutMessagesFromInput = {
    update: XOR<UserUpdateWithoutMessagesFromInput, UserUncheckedUpdateWithoutMessagesFromInput>
    create: XOR<UserCreateWithoutMessagesFromInput, UserUncheckedCreateWithoutMessagesFromInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesFromInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesFromInput, UserUncheckedUpdateWithoutMessagesFromInput>
  }

  export type UserUpdateWithoutMessagesFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUpdateManyWithoutToNestedInput
    tradeRequestsSent?: TradeRequestUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutToUserNestedInput
    listings?: ListingUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    messagesTo?: MessageUncheckedUpdateManyWithoutToNestedInput
    tradeRequestsSent?: TradeRequestUncheckedUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutToUserNestedInput
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutMessagesToInput = {
    update: XOR<UserUpdateWithoutMessagesToInput, UserUncheckedUpdateWithoutMessagesToInput>
    create: XOR<UserCreateWithoutMessagesToInput, UserUncheckedCreateWithoutMessagesToInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesToInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesToInput, UserUncheckedUpdateWithoutMessagesToInput>
  }

  export type UserUpdateWithoutMessagesToInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    messagesFrom?: MessageUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutToUserNestedInput
    listings?: ListingUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesToInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    clerkid?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    messagesFrom?: MessageUncheckedUpdateManyWithoutFromNestedInput
    tradeRequestsSent?: TradeRequestUncheckedUpdateManyWithoutFromUserNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutToUserNestedInput
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    TradePreference?: TradePreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListingUpsertWithoutMessagesInput = {
    update: XOR<ListingUpdateWithoutMessagesInput, ListingUncheckedUpdateWithoutMessagesInput>
    create: XOR<ListingCreateWithoutMessagesInput, ListingUncheckedCreateWithoutMessagesInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutMessagesInput, ListingUncheckedUpdateWithoutMessagesInput>
  }

  export type ListingUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    closet?: ClosetUpdateOneRequiredWithoutListingsNestedInput
    tags?: TagUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUncheckedUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUncheckedUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutTargetListingsNestedInput
  }

  export type FavoriteCreateManyUserInput = {
    id?: string
    listingId: string
  }

  export type MessageCreateManyToInput = {
    id?: string
    fromId: string
    content: string
    listingId?: string | null
    timestamp?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyFromInput = {
    id?: string
    toId: string
    content: string
    listingId?: string | null
    timestamp?: Date | string
    updatedAt?: Date | string
  }

  export type TradeRequestCreateManyFromUserInput = {
    id?: string
    toUserId: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeRequestCreateManyToUserInput = {
    id?: string
    fromUserId: string
    status?: $Enums.TradeStatus
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingCreateManyUserInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    closetId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradePreferenceCreateManyUserInput = {
    id?: string
    listingId: string
    title: string
    imageUrl: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type FavoriteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: ListingUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUpdateWithoutToInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: UserUpdateOneRequiredWithoutMessagesFromNestedInput
    listing?: ListingUpdateOneWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutToInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutToInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: UserUpdateOneRequiredWithoutMessagesToNestedInput
    listing?: ListingUpdateOneWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toUser?: UserUpdateOneRequiredWithoutTradeRequestsReceivedNestedInput
    initiatorListings?: ListingUpdateManyWithoutTradeRequestsInitiatedNestedInput
    targetListings?: ListingUpdateManyWithoutTradeRequestsReceivedNestedInput
  }

  export type TradeRequestUncheckedUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiatorListings?: ListingUncheckedUpdateManyWithoutTradeRequestsInitiatedNestedInput
    targetListings?: ListingUncheckedUpdateManyWithoutTradeRequestsReceivedNestedInput
  }

  export type TradeRequestUncheckedUpdateManyWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutTradeRequestsSentNestedInput
    initiatorListings?: ListingUpdateManyWithoutTradeRequestsInitiatedNestedInput
    targetListings?: ListingUpdateManyWithoutTradeRequestsReceivedNestedInput
  }

  export type TradeRequestUncheckedUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiatorListings?: ListingUncheckedUpdateManyWithoutTradeRequestsInitiatedNestedInput
    targetListings?: ListingUncheckedUpdateManyWithoutTradeRequestsReceivedNestedInput
  }

  export type TradeRequestUncheckedUpdateManyWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closet?: ClosetUpdateOneRequiredWithoutListingsNestedInput
    tags?: TagUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
    messages?: MessageUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
    messages?: MessageUncheckedUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUncheckedUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUncheckedUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePreferenceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutTradePreferencesNestedInput
  }

  export type TradePreferenceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePreferenceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingCreateManyClosetInput = {
    id?: string
    title: string
    description: string
    imageUrls?: ListingCreateimageUrlsInput | string[]
    isPrivate?: boolean
    userId: string
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingUpdateWithoutClosetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    tags?: TagUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
    messages?: MessageUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateWithoutClosetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
    messages?: MessageUncheckedUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUncheckedUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUncheckedUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutClosetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteCreateManyListingInput = {
    id?: string
    userId: string
  }

  export type MessageCreateManyListingInput = {
    id?: string
    fromId: string
    toId: string
    content: string
    timestamp?: Date | string
    updatedAt?: Date | string
  }

  export type TradePreferenceCreateManyListingInput = {
    id?: string
    userId: string
    title: string
    imageUrl: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type TagUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteUncheckedUpdateManyWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: UserUpdateOneRequiredWithoutMessagesFromNestedInput
    to?: UserUpdateOneRequiredWithoutMessagesToNestedInput
  }

  export type MessageUncheckedUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePreferenceUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTradePreferenceNestedInput
  }

  export type TradePreferenceUncheckedUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePreferenceUncheckedUpdateManyWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestUpdateWithoutInitiatorListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutTradeRequestsSentNestedInput
    toUser?: UserUpdateOneRequiredWithoutTradeRequestsReceivedNestedInput
    targetListings?: ListingUpdateManyWithoutTradeRequestsReceivedNestedInput
  }

  export type TradeRequestUncheckedUpdateWithoutInitiatorListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetListings?: ListingUncheckedUpdateManyWithoutTradeRequestsReceivedNestedInput
  }

  export type TradeRequestUncheckedUpdateManyWithoutInitiatorListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestUpdateWithoutTargetListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutTradeRequestsSentNestedInput
    toUser?: UserUpdateOneRequiredWithoutTradeRequestsReceivedNestedInput
    initiatorListings?: ListingUpdateManyWithoutTradeRequestsInitiatedNestedInput
  }

  export type TradeRequestUncheckedUpdateWithoutTargetListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiatorListings?: ListingUncheckedUpdateManyWithoutTradeRequestsInitiatedNestedInput
  }

  export type TradeRequestUncheckedUpdateManyWithoutTargetListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingUpdateWithoutTradeRequestsInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    closet?: ClosetUpdateOneRequiredWithoutListingsNestedInput
    tags?: TagUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
    messages?: MessageUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUpdateManyWithoutListingNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateWithoutTradeRequestsInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
    messages?: MessageUncheckedUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUncheckedUpdateManyWithoutListingNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutTradeRequestsInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingUpdateWithoutTradeRequestsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    closet?: ClosetUpdateOneRequiredWithoutListingsNestedInput
    tags?: TagUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
    messages?: MessageUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUpdateManyWithoutInitiatorListingsNestedInput
  }

  export type ListingUncheckedUpdateWithoutTradeRequestsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutListingsNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
    messages?: MessageUncheckedUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUncheckedUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUncheckedUpdateManyWithoutInitiatorListingsNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutTradeRequestsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    closet?: ClosetUpdateOneRequiredWithoutListingsNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
    messages?: MessageUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
    messages?: MessageUncheckedUpdateManyWithoutListingNestedInput
    tradePreferences?: TradePreferenceUncheckedUpdateManyWithoutListingNestedInput
    tradeRequestsInitiated?: TradeRequestUncheckedUpdateManyWithoutInitiatorListingsNestedInput
    tradeRequestsReceived?: TradeRequestUncheckedUpdateManyWithoutTargetListingsNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrls?: ListingUpdateimageUrlsInput | string[]
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    closetId?: StringFieldUpdateOperationsInput | string
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}