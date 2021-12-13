import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

/** Types of wine production */
export enum Amenity {
  Terraza = 'TERRAZA',
  Degustacion = 'DEGUSTACION',
  RecorridoVinedos = 'RECORRIDO_VINEDOS',
  RecorridoBodega = 'RECORRIDO_BODEGA',
  PaseoCarreta = 'PASEO_CARRETA',
  VisitaCavaBarricas = 'VISITA_CAVA_BARRICAS',
  CataBarricas = 'CATA_BARRICAS',
  CreaTuMezcla = 'CREA_TU_MEZCLA',
  TalleresDidacticos = 'TALLERES_DIDACTICOS',
  CatasMaridajes = 'CATAS_MARIDAJES',
  CatasPrivadas = 'CATAS_PRIVADAS',
  ActividadesEnVinedo = 'ACTIVIDADES_EN_VINEDO'
}

export type CheckoutSessionResponse = {
  errors?: Maybe<Array<FieldError>>;
  sessionStatus?: Maybe<Scalars['String']>;
  sessionUrl?: Maybe<Scalars['String']>;
};

export type CreateCustomerInputs = {
  email: Scalars['String'];
  paymentMetadata: PaymentMetadataInputs;
};

export type CreateExperienceInputs = {
  wineryId: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  limitOfAttendees: Scalars['Float'];
  typeOfEvent: ExperienceType;
  pricePerPersonInDollars: Scalars['Float'];
};

export type CreateRecurrentDatesInputs = {
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  durationInMinutes: Scalars['Float'];
  slotType: SlotType;
  customDates?: Maybe<Array<Scalars['DateTime']>>;
  exceptions?: Maybe<Array<Scalars['DateTime']>>;
  exceptionDays?: Maybe<Array<Scalars['String']>>;
};

export type CreateWineryInputs = {
  name: Scalars['String'];
  description: Scalars['String'];
  urlAlias: Scalars['String'];
  subscription: Scalars['String'];
  valley: Valley;
  productionType: Array<ProductionType>;
  wineType: Array<TypeWine>;
  supportedLanguages?: Maybe<Array<ServiceLanguage>>;
  amenities?: Maybe<Array<Amenity>>;
  yearlyWineProduction?: Maybe<Scalars['Int']>;
  foundationYear?: Maybe<Scalars['Int']>;
  googleMapsUrl?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  covidLabel: Scalars['Boolean'];
};

export type Customer = {
  email: Scalars['String'];
  paymentMetadata: PaymentMetadata;
  name?: Maybe<Scalars['String']>;
};

export type CustomerResponse = {
  errors?: Maybe<Array<FieldError>>;
  customer?: Maybe<Customer>;
};

export type DateWithTimes = {
  date: Scalars['DateTime'];
  times: Array<Scalars['DateTime']>;
  durationInMinutes: Scalars['Float'];
};

export type Experience = {
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  experienceType: ExperienceType;
  allAttendeesAllSlots?: Maybe<Scalars['Int']>;
  pricePerPersonInDollars: Scalars['Float'];
  slots: Array<ExperienceSlot>;
  images?: Maybe<Array<ExperienceImage>>;
  wineryId: Scalars['Int'];
  winery: Winery;
  reservations?: Maybe<Array<Reservation>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ExperienceImage = {
  id: Scalars['Float'];
  experienceId: Scalars['Float'];
  experience: Experience;
  imageUrl: Scalars['String'];
  coverPage?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ExperienceResponse = {
  errors?: Maybe<Array<FieldError>>;
  experience?: Maybe<Experience>;
  dateWithTimes?: Maybe<Array<DateWithTimes>>;
};

export type ExperienceSlot = {
  id: Scalars['Int'];
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
  slotType: SlotType;
  durationInMinutes: Scalars['Int'];
  noOfAttendees?: Maybe<Scalars['Int']>;
  limitOfAttendees: Scalars['Int'];
  experienceId: Scalars['Float'];
  experience: Experience;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

/** Type of experience */
export enum ExperienceType {
  WineDinnerPairing = 'WINE_DINNER_PAIRING',
  Degustation = 'DEGUSTATION',
  Concert = 'CONCERT'
}

export type FieldError = {
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetWineryInputs = {
  urlAlias?: Maybe<Scalars['String']>;
  creatorUsername?: Maybe<Scalars['String']>;
};

/** A winery can have one o more kind of grape */
export enum Grape {
  Aglianico = 'AGLIANICO',
  Barbera = 'BARBERA',
  Brunello = 'BRUNELLO',
  CabernetFranc = 'CABERNET_FRANC',
  CabernetSauvignon = 'CABERNET_SAUVIGNON',
  Carignan = 'CARIGNAN',
  Chardonnay = 'CHARDONNAY',
  CheninBlanc = 'CHENIN_BLANC',
  Cinsaul = 'CINSAUL',
  Colombard = 'COLOMBARD',
  Gewurztraminer = 'GEWURZTRAMINER',
  Grenache = 'GRENACHE',
  GrenacheBlanc = 'GRENACHE_BLANC',
  Malbec = 'MALBEC',
  MalvasiaBlanca = 'MALVASIA_BLANCA',
  MalvasiaTinta = 'MALVASIA_TINTA',
  Merlot = 'MERLOT',
  Mision = 'MISION',
  Montepulciano = 'MONTEPULCIANO',
  Moscatel = 'MOSCATEL',
  Mourvedre = 'MOURVEDRE',
  Nebbiolo = 'NEBBIOLO',
  Palomino = 'PALOMINO',
  PetiteVerdot = 'PETITE_VERDOT',
  PinotBlanc = 'PINOT_BLANC',
  PinotGris = 'PINOT_GRIS',
  PinotNoir = 'PINOT_NOIR',
  Riesling = 'RIESLING',
  RubiCabernet = 'RUBI_CABERNET',
  Sangiovese = 'SANGIOVESE',
  SauvignonBlanc = 'SAUVIGNON_BLANC',
  Semillon = 'SEMILLON',
  Sinsault = 'SINSAULT',
  Syrah = 'SYRAH',
  Tempranillo = 'TEMPRANILLO',
  Viognier = 'VIOGNIER',
  Zinfandel = 'ZINFANDEL',
  Otra = 'OTRA'
}

export type Mutation = {
  createExperience: ExperienceResponse;
  createWinery: WineryResponse;
  createCustomer: CustomerResponse;
  wineryOnboarding: OnboardingResponse;
};


export type MutationCreateExperienceArgs = {
  createRecurrentDatesInputs: CreateRecurrentDatesInputs;
  createExperienceInputs: CreateExperienceInputs;
};


export type MutationCreateWineryArgs = {
  createWineryInputs: CreateWineryInputs;
  userInputs: UserInputs;
};


export type MutationCreateCustomerArgs = {
  createCustomerInputs: CreateCustomerInputs;
};


export type MutationWineryOnboardingArgs = {
  wineryAlias: Scalars['String'];
};

export type OnboardingResponse = {
  errors?: Maybe<Array<FieldError>>;
  accountLinkUrl?: Maybe<Scalars['String']>;
};

/** differents kind of services */
export enum OtherServices {
  Hospedaje = 'HOSPEDAJE',
  Restaurante = 'RESTAURANTE',
  BarraDeAlimentos = 'BARRA_DE_ALIMENTOS'
}

export type PaymentMetadata = {
  username: Scalars['String'];
};

export type PaymentMetadataInputs = {
  username: Scalars['String'];
};

export type Price = {
  id: Scalars['String'];
  type: Scalars['String'];
  currency: Scalars['String'];
  tiersMode?: Maybe<Scalars['String']>;
  unitAmount?: Maybe<Scalars['Float']>;
  unitAmountDecimal?: Maybe<Scalars['String']>;
  tiers?: Maybe<Array<Tier>>;
};

export type Product = {
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  unit_label: Scalars['String'];
  price: Array<Price>;
};

/** Types of wine production */
export enum ProductionType {
  Comercial = 'COMERCIAL',
  TradArtesanal = 'TRAD_ARTESANAL',
  OrgBioNat = 'ORG_BIO_NAT'
}

export type ProductsResponse = {
  errors?: Maybe<Array<FieldError>>;
  products?: Maybe<Array<Product>>;
};

export type Query = {
  recurrentDates: RecurrenceResponse;
  allPictures: Scalars['Int'];
  allReservations: Scalars['Int'];
  allWineries: Scalars['Int'];
  winery: WineryResponse;
  getSubscriptionProducts: ProductsResponse;
  getCheckoutSessionStatus: CheckoutSessionResponse;
  getSubscriptionStatus: Scalars['String'];
};


export type QueryRecurrentDatesArgs = {
  createRecurrentDatesInputs: CreateRecurrentDatesInputs;
};


export type QueryWineryArgs = {
  getWineryInputs: GetWineryInputs;
};


export type QueryGetCheckoutSessionStatusArgs = {
  sessionId: Scalars['String'];
};


export type QueryGetSubscriptionStatusArgs = {
  customerId: Scalars['String'];
};

export type RecurrenceResponse = {
  errors?: Maybe<Array<FieldError>>;
  dateWithTimes?: Maybe<Array<DateWithTimes>>;
};

export type Reservation = {
  id: Scalars['Int'];
  title: Scalars['String'];
  userId: Scalars['String'];
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
  noOfAttendees: Scalars['Int'];
  pricePerPersonInDollars: Scalars['Float'];
  orderId: Scalars['String'];
  paymentCreationDateTime: Scalars['String'];
  paymentUpdateDateTime: Scalars['String'];
  status: Scalars['String'];
  experienceId: Scalars['Int'];
  experience: Experience;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

/** Languages supported by the Wineries */
export enum ServiceLanguage {
  Ingles = 'INGLES',
  Espanol = 'ESPANOL',
  SenasMexicanas = 'SENAS_MEXICANAS',
  Frances = 'FRANCES',
  Aleman = 'ALEMAN',
  Italiano = 'ITALIANO',
  Portugues = 'PORTUGUES',
  Japones = 'JAPONES',
  Mandarin = 'MANDARIN'
}

/** Type of slot */
export enum SlotType {
  OneTime = 'ONE_TIME',
  Recurrent = 'RECURRENT',
  AllDay = 'ALL_DAY'
}

export type Tier = {
  flat_amount?: Maybe<Scalars['Float']>;
  flat_amount_decimal?: Maybe<Scalars['String']>;
  unit_amount?: Maybe<Scalars['Float']>;
  unit_amount_decimal?: Maybe<Scalars['String']>;
  up_to?: Maybe<Scalars['Float']>;
};

/** Types of wine produced by a winery */
export enum TypeWine {
  BlancoJoven = 'BLANCO_JOVEN',
  BlancoConBarrica = 'BLANCO_CON_BARRICA',
  Rosado = 'ROSADO',
  TintoJoven = 'TINTO_JOVEN',
  TintoCrianzaBarrica = 'TINTO_CRIANZA_BARRICA',
  GenerosoFortificado = 'GENEROSO_FORTIFICADO',
  Espumoso = 'ESPUMOSO',
  Naranja = 'NARANJA',
  Dulce = 'DULCE',
  Cosecha = 'COSECHA',
  ConmemorativoEdiLimitada = 'CONMEMORATIVO_EDI_LIMITADA',
  ExclusivoVentaLocal = 'EXCLUSIVO_VENTA_LOCAL',
  Organico = 'ORGANICO',
  Biodinamico = 'BIODINAMICO',
  Natural = 'NATURAL'
}

export type UserInputs = {
  username: Scalars['String'];
  email: Scalars['String'];
  successUrl: Scalars['String'];
  cancelUrl: Scalars['String'];
};

/** A winery is in an unique valley, valleys are not identifiable through addresses */
export enum Valley {
  Guadalupe = 'GUADALUPE',
  SanAntMinas = 'SAN_ANT_MINAS',
  Ensenada = 'ENSENADA',
  SantoTomas = 'SANTO_TOMAS',
  OjosNegros = 'OJOS_NEGROS',
  Grulla = 'GRULLA',
  SanVicente = 'SAN_VICENTE',
  SanQuintin = 'SAN_QUINTIN',
  Calafia = 'CALAFIA'
}

export type Winery = {
  id: Scalars['Int'];
  name: Scalars['String'];
  urlAlias: Scalars['String'];
  stripe_customerId?: Maybe<Scalars['String']>;
  subscription?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  creatorUsername: Scalars['String'];
  creatorEmail: Scalars['String'];
  description: Scalars['String'];
  foundationYear?: Maybe<Scalars['Int']>;
  experiences?: Maybe<Array<Experience>>;
  images?: Maybe<Array<WineryImage>>;
  googleMapsUrl?: Maybe<Scalars['String']>;
  yearlyWineProduction?: Maybe<Scalars['Int']>;
  contactEmail?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  covidLabel?: Maybe<Scalars['Boolean']>;
  urlImageCover?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  contactName?: Maybe<Scalars['String']>;
  productRegion?: Maybe<Scalars['String']>;
  postalAddress?: Maybe<Scalars['String']>;
  architecturalReferences?: Maybe<Scalars['Boolean']>;
  younerFriendly?: Maybe<Scalars['Boolean']>;
  petFriendly?: Maybe<Scalars['Boolean']>;
  enologoName?: Maybe<Scalars['String']>;
  handicappedFriendly?: Maybe<Scalars['Boolean']>;
  wineGrapesProduction?: Maybe<Array<Grape>>;
  productionType?: Maybe<Array<ProductionType>>;
  othersServices?: Maybe<Array<OtherServices>>;
  valley: Valley;
  wineType?: Maybe<Array<TypeWine>>;
  supportedLanguages?: Maybe<Array<ServiceLanguage>>;
  amenities?: Maybe<Array<Amenity>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type WineryImage = {
  id: Scalars['Float'];
  wineryId: Scalars['Float'];
  winery: Winery;
  imageUrl: Scalars['String'];
  coverPage?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type WineryResponse = {
  errors?: Maybe<Array<FieldError>>;
  winery?: Maybe<Winery>;
  sessionUrl?: Maybe<Scalars['String']>;
};

export type DateWithTimesFragment = { date: any, times: Array<any> };

export type ErrorFragmentFragment = { field: string, message: string };

export type ExperienceFragmentFragment = { createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType, images?: Array<{ id: number, imageUrl: string, coverPage?: boolean | null | undefined }> | null | undefined, slots: Array<{ id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any }> };

export type ExperienceImageFragmentFragment = { id: number, imageUrl: string, coverPage?: boolean | null | undefined };

export type PriceFragmentFragment = { id: string, type: string, currency: string, tiers?: Array<{ flat_amount?: number | null | undefined, flat_amount_decimal?: string | null | undefined, unit_amount?: number | null | undefined, unit_amount_decimal?: string | null | undefined, up_to?: number | null | undefined }> | null | undefined };

export type ProductFragmentFragment = { id: string, name: string, description: string, images: Array<string>, unit_label: string, price: Array<{ id: string, type: string, currency: string, tiers?: Array<{ flat_amount?: number | null | undefined, flat_amount_decimal?: string | null | undefined, unit_amount?: number | null | undefined, unit_amount_decimal?: string | null | undefined, up_to?: number | null | undefined }> | null | undefined }> };

export type SlotFragmentFragment = { id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any };

export type TiersFragmentFragment = { flat_amount?: number | null | undefined, flat_amount_decimal?: string | null | undefined, unit_amount?: number | null | undefined, unit_amount_decimal?: string | null | undefined, up_to?: number | null | undefined };

export type WineryFragmentFragment = { amenities?: Array<Amenity> | null | undefined, urlAlias: string, stripe_customerId?: string | null | undefined, architecturalReferences?: boolean | null | undefined, contactEmail?: string | null | undefined, contactName?: string | null | undefined, contactPhoneNumber?: string | null | undefined, covidLabel?: boolean | null | undefined, createdAt: any, creatorEmail: string, creatorUsername: string, description: string, enologoName?: string | null | undefined, foundationYear?: number | null | undefined, googleMapsUrl?: string | null | undefined, handicappedFriendly?: boolean | null | undefined, id: number, logo?: string | null | undefined, name: string, othersServices?: Array<OtherServices> | null | undefined, petFriendly?: boolean | null | undefined, postalAddress?: string | null | undefined, productRegion?: string | null | undefined, productionType?: Array<ProductionType> | null | undefined, supportedLanguages?: Array<ServiceLanguage> | null | undefined, updatedAt: any, urlImageCover?: string | null | undefined, valley: Valley, verified?: boolean | null | undefined, wineGrapesProduction?: Array<Grape> | null | undefined, wineType?: Array<TypeWine> | null | undefined, yearlyWineProduction?: number | null | undefined, younerFriendly?: boolean | null | undefined, subscription?: string | null | undefined, experiences?: Array<{ createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType, images?: Array<{ id: number, imageUrl: string, coverPage?: boolean | null | undefined }> | null | undefined, slots: Array<{ id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any }> }> | null | undefined };

export type CreateExperienceMutationVariables = Exact<{
  createExperienceInputs: CreateExperienceInputs;
  createRecurrentDatesInputs: CreateRecurrentDatesInputs;
}>;


export type CreateExperienceMutation = { createExperience: { errors?: Array<{ field: string, message: string }> | null | undefined, experience?: { createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType, images?: Array<{ id: number, imageUrl: string, coverPage?: boolean | null | undefined }> | null | undefined, slots: Array<{ id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any }> } | null | undefined, dateWithTimes?: Array<{ date: any, durationInMinutes: number, times: Array<any> }> | null | undefined } };

export type CreateWineryMutationVariables = Exact<{
  userInputs: UserInputs;
  createWineryInputs: CreateWineryInputs;
}>;


export type CreateWineryMutation = { createWinery: { sessionUrl?: string | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined, winery?: { amenities?: Array<Amenity> | null | undefined, urlAlias: string, stripe_customerId?: string | null | undefined, architecturalReferences?: boolean | null | undefined, contactEmail?: string | null | undefined, contactName?: string | null | undefined, contactPhoneNumber?: string | null | undefined, covidLabel?: boolean | null | undefined, createdAt: any, creatorEmail: string, creatorUsername: string, description: string, enologoName?: string | null | undefined, foundationYear?: number | null | undefined, googleMapsUrl?: string | null | undefined, handicappedFriendly?: boolean | null | undefined, id: number, logo?: string | null | undefined, name: string, othersServices?: Array<OtherServices> | null | undefined, petFriendly?: boolean | null | undefined, postalAddress?: string | null | undefined, productRegion?: string | null | undefined, productionType?: Array<ProductionType> | null | undefined, supportedLanguages?: Array<ServiceLanguage> | null | undefined, updatedAt: any, urlImageCover?: string | null | undefined, valley: Valley, verified?: boolean | null | undefined, wineGrapesProduction?: Array<Grape> | null | undefined, wineType?: Array<TypeWine> | null | undefined, yearlyWineProduction?: number | null | undefined, younerFriendly?: boolean | null | undefined, subscription?: string | null | undefined, experiences?: Array<{ createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType, images?: Array<{ id: number, imageUrl: string, coverPage?: boolean | null | undefined }> | null | undefined, slots: Array<{ id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any }> }> | null | undefined } | null | undefined } };

export type WineryOnboardingMutationVariables = Exact<{
  wineryAlias: Scalars['String'];
}>;


export type WineryOnboardingMutation = { wineryOnboarding: { accountLinkUrl?: string | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type RecurrentDatesQueryVariables = Exact<{
  createRecurrentDatesInputs: CreateRecurrentDatesInputs;
}>;


export type RecurrentDatesQuery = { recurrentDates: { dateWithTimes?: Array<{ date: any, times: Array<any> }> | null | undefined, errors?: Array<{ field: string }> | null | undefined } };

export type GetSubscriptionStatusQueryVariables = Exact<{
  customerId: Scalars['String'];
}>;


export type GetSubscriptionStatusQuery = { getSubscriptionStatus: string };

export type SubscriptionProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionProductsQuery = { getSubscriptionProducts: { errors?: Array<{ field: string, message: string }> | null | undefined, products?: Array<{ id: string, name: string, description: string, images: Array<string>, unit_label: string, price: Array<{ id: string, type: string, currency: string, unitAmount?: number | null | undefined, unitAmountDecimal?: string | null | undefined, tiers?: Array<{ flat_amount?: number | null | undefined, flat_amount_decimal?: string | null | undefined, unit_amount?: number | null | undefined, unit_amount_decimal?: string | null | undefined, up_to?: number | null | undefined }> | null | undefined }> }> | null | undefined } };

export type GetCheckoutSessionStatusQueryVariables = Exact<{
  sessionId: Scalars['String'];
}>;


export type GetCheckoutSessionStatusQuery = { getCheckoutSessionStatus: { sessionStatus?: string | null | undefined, sessionUrl?: string | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type WineryQueryVariables = Exact<{
  getWineryInputs: GetWineryInputs;
}>;


export type WineryQuery = { winery: { errors?: Array<{ field: string, message: string }> | null | undefined, winery?: { amenities?: Array<Amenity> | null | undefined, urlAlias: string, stripe_customerId?: string | null | undefined, architecturalReferences?: boolean | null | undefined, contactEmail?: string | null | undefined, contactName?: string | null | undefined, contactPhoneNumber?: string | null | undefined, covidLabel?: boolean | null | undefined, createdAt: any, creatorEmail: string, creatorUsername: string, description: string, enologoName?: string | null | undefined, foundationYear?: number | null | undefined, googleMapsUrl?: string | null | undefined, handicappedFriendly?: boolean | null | undefined, id: number, logo?: string | null | undefined, name: string, othersServices?: Array<OtherServices> | null | undefined, petFriendly?: boolean | null | undefined, postalAddress?: string | null | undefined, productRegion?: string | null | undefined, productionType?: Array<ProductionType> | null | undefined, supportedLanguages?: Array<ServiceLanguage> | null | undefined, updatedAt: any, urlImageCover?: string | null | undefined, valley: Valley, verified?: boolean | null | undefined, wineGrapesProduction?: Array<Grape> | null | undefined, wineType?: Array<TypeWine> | null | undefined, yearlyWineProduction?: number | null | undefined, younerFriendly?: boolean | null | undefined, subscription?: string | null | undefined, experiences?: Array<{ createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType, images?: Array<{ id: number, imageUrl: string, coverPage?: boolean | null | undefined }> | null | undefined, slots: Array<{ id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any }> }> | null | undefined } | null | undefined } };

export const DateWithTimesFragmentDoc = gql`
    fragment DateWithTimes on DateWithTimes {
  date
  times
}
    `;
export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
export const TiersFragmentFragmentDoc = gql`
    fragment TiersFragment on Tier {
  flat_amount
  flat_amount_decimal
  unit_amount
  unit_amount_decimal
  up_to
}
    `;
export const PriceFragmentFragmentDoc = gql`
    fragment PriceFragment on Price {
  id
  type
  currency
  tiers {
    ...TiersFragment
  }
}
    ${TiersFragmentFragmentDoc}`;
export const ProductFragmentFragmentDoc = gql`
    fragment ProductFragment on Product {
  id
  name
  description
  images
  unit_label
  price {
    ...PriceFragment
  }
}
    ${PriceFragmentFragmentDoc}`;
export const ExperienceImageFragmentFragmentDoc = gql`
    fragment ExperienceImageFragment on ExperienceImage {
  id
  imageUrl
  coverPage
}
    `;
export const SlotFragmentFragmentDoc = gql`
    fragment SlotFragment on ExperienceSlot {
  id
  startDateTime
  endDateTime
  durationInMinutes
  limitOfAttendees
  noOfAttendees
  slotType
  createdAt
  updatedAt
}
    `;
export const ExperienceFragmentFragmentDoc = gql`
    fragment ExperienceFragment on Experience {
  createdAt
  id
  title
  description
  pricePerPersonInDollars
  wineryId
  images {
    ...ExperienceImageFragment
  }
  allAttendeesAllSlots
  experienceType
  slots {
    ...SlotFragment
  }
}
    ${ExperienceImageFragmentFragmentDoc}
${SlotFragmentFragmentDoc}`;
export const WineryFragmentFragmentDoc = gql`
    fragment WineryFragment on Winery {
  amenities
  urlAlias
  stripe_customerId
  architecturalReferences
  contactEmail
  contactName
  contactPhoneNumber
  covidLabel
  createdAt
  creatorEmail
  creatorUsername
  description
  enologoName
  experiences {
    ...ExperienceFragment
  }
  foundationYear
  googleMapsUrl
  handicappedFriendly
  id
  logo
  name
  othersServices
  petFriendly
  postalAddress
  productRegion
  productionType
  supportedLanguages
  updatedAt
  urlImageCover
  valley
  verified
  wineGrapesProduction
  wineType
  yearlyWineProduction
  younerFriendly
  subscription
}
    ${ExperienceFragmentFragmentDoc}`;
export const CreateExperienceDocument = gql`
    mutation CreateExperience($createExperienceInputs: CreateExperienceInputs!, $createRecurrentDatesInputs: CreateRecurrentDatesInputs!) {
  createExperience(
    createExperienceInputs: $createExperienceInputs
    createRecurrentDatesInputs: $createRecurrentDatesInputs
  ) {
    errors {
      field
      message
    }
    experience {
      ...ExperienceFragment
    }
    dateWithTimes {
      date
      durationInMinutes
      times
    }
  }
}
    ${ExperienceFragmentFragmentDoc}`;

export function useCreateExperienceMutation() {
  return Urql.useMutation<CreateExperienceMutation, CreateExperienceMutationVariables>(CreateExperienceDocument);
};
export const CreateWineryDocument = gql`
    mutation CreateWinery($userInputs: UserInputs!, $createWineryInputs: CreateWineryInputs!) {
  createWinery(createWineryInputs: $createWineryInputs, userInputs: $userInputs) {
    errors {
      field
      message
    }
    winery {
      ...WineryFragment
    }
    sessionUrl
  }
}
    ${WineryFragmentFragmentDoc}`;

export function useCreateWineryMutation() {
  return Urql.useMutation<CreateWineryMutation, CreateWineryMutationVariables>(CreateWineryDocument);
};
export const WineryOnboardingDocument = gql`
    mutation WineryOnboarding($wineryAlias: String!) {
  wineryOnboarding(wineryAlias: $wineryAlias) {
    errors {
      field
      message
    }
    accountLinkUrl
  }
}
    `;

export function useWineryOnboardingMutation() {
  return Urql.useMutation<WineryOnboardingMutation, WineryOnboardingMutationVariables>(WineryOnboardingDocument);
};
export const RecurrentDatesDocument = gql`
    query RecurrentDates($createRecurrentDatesInputs: CreateRecurrentDatesInputs!) {
  recurrentDates(createRecurrentDatesInputs: $createRecurrentDatesInputs) {
    dateWithTimes {
      ...DateWithTimes
    }
    errors {
      field
    }
  }
}
    ${DateWithTimesFragmentDoc}`;

export function useRecurrentDatesQuery(options: Omit<Urql.UseQueryArgs<RecurrentDatesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RecurrentDatesQuery>({ query: RecurrentDatesDocument, ...options });
};
export const GetSubscriptionStatusDocument = gql`
    query GetSubscriptionStatus($customerId: String!) {
  getSubscriptionStatus(customerId: $customerId)
}
    `;

export function useGetSubscriptionStatusQuery(options: Omit<Urql.UseQueryArgs<GetSubscriptionStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSubscriptionStatusQuery>({ query: GetSubscriptionStatusDocument, ...options });
};
export const SubscriptionProductsDocument = gql`
    query SubscriptionProducts {
  getSubscriptionProducts {
    errors {
      field
      message
    }
    products {
      id
      name
      description
      images
      unit_label
      price {
        id
        type
        currency
        unitAmount
        unitAmountDecimal
        tiers {
          flat_amount
          flat_amount_decimal
          unit_amount
          unit_amount_decimal
          up_to
        }
      }
    }
  }
}
    `;

export function useSubscriptionProductsQuery(options: Omit<Urql.UseQueryArgs<SubscriptionProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SubscriptionProductsQuery>({ query: SubscriptionProductsDocument, ...options });
};
export const GetCheckoutSessionStatusDocument = gql`
    query GetCheckoutSessionStatus($sessionId: String!) {
  getCheckoutSessionStatus(sessionId: $sessionId) {
    errors {
      field
      message
    }
    sessionStatus
    sessionUrl
  }
}
    `;

export function useGetCheckoutSessionStatusQuery(options: Omit<Urql.UseQueryArgs<GetCheckoutSessionStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCheckoutSessionStatusQuery>({ query: GetCheckoutSessionStatusDocument, ...options });
};
export const WineryDocument = gql`
    query Winery($getWineryInputs: GetWineryInputs!) {
  winery(getWineryInputs: $getWineryInputs) {
    errors {
      field
      message
    }
    winery {
      ...WineryFragment
    }
  }
}
    ${WineryFragmentFragmentDoc}`;

export function useWineryQuery(options: Omit<Urql.UseQueryArgs<WineryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<WineryQuery>({ query: WineryDocument, ...options });
};