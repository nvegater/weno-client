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

export type CheckoutLinkResponse = {
  errors?: Maybe<Array<FieldError>>;
  link?: Maybe<Scalars['String']>;
};

export type CheckoutSessionResponse = {
  errors?: Maybe<Array<FieldError>>;
  sessionUrl?: Maybe<Scalars['String']>;
  reservations?: Maybe<Array<ReservationDts>>;
  payment_status?: Maybe<Scalars['String']>;
};

/** If customer has metadata, it means it is a registered user and It has an username.But Customers dont need to be registered. They can book events as guests, thats why the metadata prop is nullable */
export type CreateCustomerInputs = {
  email: Scalars['String'];
  paymentMetadata?: Maybe<PaymentMetadataInputs>;
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

/** BefCur:null & AftCur:null => First Page N Results (N=limit) + AftCur:Y (if more results exist).BefCur:null & AftCur:Y => Page with N Results + BefCurY + AftCur:X (if more exist)BefCur:X & AftCur:null => End of the list.BefCur:X & AftCur:Y => Ignores X. */
export type CursorPaginationInput = {
  afterCursor?: Maybe<Scalars['String']>;
  beforeCursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

/** BefCur:null & AftCur:null => First Page N Results (N=limit) + AftCur:Y (if more results exist).BefCur:null & AftCur:Y => Page with N Results + BefCurY + AftCur:X (if more exist)BefCur:X & AftCur:null => End of the list.BefCur:X & AftCur:Y => Ignores X. */
export type CursorPaginationResult = {
  afterCursor?: Maybe<Scalars['String']>;
  beforeCursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type CustomerDts = {
  id: Scalars['String'];
  stripeCustomerId: Scalars['String'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CustomerResponse = {
  errors?: Maybe<Array<FieldError>>;
  customer?: Maybe<CustomerDts>;
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

export type ExperienceImageResponse = {
  errors?: Maybe<Array<FieldError>>;
  experienceImages: Array<ExperienceImageUpload>;
};

export type ExperienceImageUpload = {
  imageUrl: Scalars['String'];
  coverPage: Scalars['Boolean'];
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
  pricePerPersonInDollars: Scalars['Float'];
  experienceId: Scalars['Float'];
  experience: Experience;
  reservations?: Maybe<Array<Reservation>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

/** Type of experience */
export enum ExperienceType {
  WineDinnerPairing = 'WINE_DINNER_PAIRING',
  Degustation = 'DEGUSTATION',
  Concert = 'CONCERT'
}

export type ExperiencesFilters = {
  valley?: Maybe<Array<Valley>>;
  experienceType?: Maybe<Array<ExperienceType>>;
  experienceName?: Maybe<Scalars['String']>;
};

export type FieldError = {
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetPreSignedUrlResponse = {
  errors?: Maybe<Array<FieldError>>;
  arrayUrl?: Maybe<Array<PresignedResponse>>;
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
  createReservation: Scalars['Boolean'];
  createWinery: WineryResponse;
  /** Trigger: winery information Page. If called for the first time, updates the winery connected account creation dateOtherwise simply return the winery */
  confirmConnectedAccount: WineryResponse;
  createCustomer: CustomerResponse;
  getCheckoutLink: CheckoutLinkResponse;
  wineryOnboarding: OnboardingResponse;
  saveExperienceImagesUrls: ExperienceImageResponse;
};


export type MutationCreateExperienceArgs = {
  createRecurrentDatesInputs: CreateRecurrentDatesInputs;
  createExperienceInputs: CreateExperienceInputs;
};


export type MutationCreateWineryArgs = {
  createWineryInputs: CreateWineryInputs;
  userInputs: UserInputs;
};


export type MutationConfirmConnectedAccountArgs = {
  wineryAlias: Scalars['String'];
};


export type MutationCreateCustomerArgs = {
  createCustomerInputs: CreateCustomerInputs;
};


export type MutationGetCheckoutLinkArgs = {
  cancelUrl: Scalars['String'];
  successUrl: Scalars['String'];
  noOfVisitors: Scalars['Float'];
  slotIds: Array<Scalars['Int']>;
  createCustomerInputs: CreateCustomerInputs;
};


export type MutationWineryOnboardingArgs = {
  wineryAlias: Scalars['String'];
};


export type MutationSaveExperienceImagesUrlsArgs = {
  preSignedUrls: Array<Scalars['String']>;
  experienceId: Scalars['Int'];
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

export type PaginatedExperience = {
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  experienceType: ExperienceType;
  allAttendeesAllSlots?: Maybe<Scalars['Int']>;
  pricePerPersonInDollars: Scalars['Float'];
  wineryId: Scalars['Int'];
  wineryName: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type PaginatedExperienceWithSlots = {
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  experienceType: ExperienceType;
  allAttendeesAllSlots?: Maybe<Scalars['Int']>;
  pricePerPersonInDollars: Scalars['Float'];
  wineryId: Scalars['Int'];
  wineryName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  slots: Array<ExperienceSlot>;
};

export type PaginatedExperiences = {
  errors?: Maybe<Array<FieldError>>;
  experiences?: Maybe<Array<PaginatedExperience>>;
  totalExperiences: Scalars['Float'];
  paginationConfig: CursorPaginationResult;
};

/**
 * Default:
 * Sort from Newest to Oldest all the Table.
 * It never exceeds the limit
 *
 * Optional:
 * The cursor is a timestamp.
 * Returns all the experiences after the given timestamp (with limit)
 * If no cursor is provided, it will return all experiences newest First (with limit)
 *
 * Filters:
 * If experience name is provided search without exact match (LIKE)
 * ExperienceType: if null, All the experience Types. Otherwise ONLY the selected ones.
 * Valleys: if null, All the Valleys. Otherwise ONLY the selected ones.
 */
export type PaginatedExperiencesInputs = {
  paginationConfig: CursorPaginationInput;
  experiencesFilters: ExperiencesFilters;
  getUpcomingSlots?: Maybe<Scalars['Boolean']>;
  onlyWithAvailableSeats?: Maybe<Scalars['Boolean']>;
};

export type PaginatedExperiencesWithSlots = {
  errors?: Maybe<Array<FieldError>>;
  experiences?: Maybe<Array<PaginatedExperienceWithSlots>>;
  totalExperiences: Scalars['Float'];
  paginationConfig: CursorPaginationResult;
};

export type PaymentMetadataInputs = {
  username: Scalars['String'];
};

export type PresignedResponse = {
  getUrl?: Maybe<Scalars['String']>;
  putUrl?: Maybe<Scalars['String']>;
};

export type PresignedUrlInput = {
  fileNames: Array<Scalars['String']>;
  uploadType: UploadType;
  /** opcional */
  wineryId?: Maybe<Scalars['Float']>;
  /** opcional */
  experienceId?: Maybe<Scalars['Float']>;
  /** opcional */
  creatorUsername?: Maybe<Scalars['String']>;
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
  experienceWithSlots: ExperienceResponse;
  recurrentDates: RecurrenceResponse;
  experiences: PaginatedExperiences;
  editableExperiences: PaginatedExperiencesWithSlots;
  bookableExperiences: PaginatedExperiences;
  allReservations: Scalars['Int'];
  allWineries: Scalars['Int'];
  winery: WineryResponse;
  getSubscriptionProducts: ProductsResponse;
  getCheckoutSessionStatus: CheckoutSessionResponse;
  getSubscriptionStatus: Scalars['String'];
  preSignedUrl: GetPreSignedUrlResponse;
};


export type QueryExperienceWithSlotsArgs = {
  onlyBookableSlots: Scalars['Boolean'];
  experienceId: Scalars['Float'];
};


export type QueryRecurrentDatesArgs = {
  createRecurrentDatesInputs: CreateRecurrentDatesInputs;
};


export type QueryExperiencesArgs = {
  paginatedExperiencesInputs: PaginatedExperiencesInputs;
};


export type QueryEditableExperiencesArgs = {
  paginatedExperiencesInputs: PaginatedExperiencesInputs;
  wineryId: Scalars['Float'];
};


export type QueryBookableExperiencesArgs = {
  paginatedExperiencesInputs: PaginatedExperiencesInputs;
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


export type QueryPreSignedUrlArgs = {
  presignedUrlInputs: PresignedUrlInput;
};

export type RecurrenceResponse = {
  errors?: Maybe<Array<FieldError>>;
  dateWithTimes?: Maybe<Array<DateWithTimes>>;
};

export type Reservation = {
  id: Scalars['Int'];
  title: Scalars['String'];
  email: Scalars['String'];
  wineryName: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  noOfAttendees: Scalars['Int'];
  pricePerPersonInDollars: Scalars['Float'];
  paymentStatus: Scalars['String'];
  slotId: Scalars['Int'];
  slot: ExperienceSlot;
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ReservationDts = {
  id: Scalars['Int'];
  title: Scalars['String'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  noOfAttendees: Scalars['Int'];
  pricePerPersonInDollars: Scalars['Float'];
  paymentStatus: Scalars['String'];
  slotId: Scalars['Int'];
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  wineryName: Scalars['String'];
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

/** Se pueden cargar imagenes para distintos elementos, usuarios, galerias de viñeros etc, etc */
export enum UploadType {
  Wineryalbum = 'WINERYALBUM',
  Userprofilepicture = 'USERPROFILEPICTURE',
  Experiencealbum = 'EXPERIENCEALBUM',
  Winerylogo = 'WINERYLOGO'
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
  /** Time at which the connected account was created. Measured in seconds since the Unix epoch. The default -1 Means that the account is not created Yet */
  accountCreatedTime?: Maybe<Scalars['Float']>;
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

export type ExperienceInfoFragment = { createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, experienceType: ExperienceType };

export type ExperienceWineryInfoFragment = { name: string, valley: Valley };

export type PaginatedExperienceFragment = { createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, wineryName: string, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType };

export type PaginatedExperienceWithSlotFragment = { createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, wineryName: string, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType, slots: Array<{ id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any }> };

export type PaginationResultFragmentFragment = { beforeCursor?: string | null | undefined, afterCursor?: string | null | undefined, limit?: number | null | undefined };

export type PreSignedUrlFragment = { getUrl?: string | null | undefined, putUrl?: string | null | undefined };

export type PriceFragmentFragment = { id: string, type: string, currency: string, tiers?: Array<{ flat_amount?: number | null | undefined, flat_amount_decimal?: string | null | undefined, unit_amount?: number | null | undefined, unit_amount_decimal?: string | null | undefined, up_to?: number | null | undefined }> | null | undefined };

export type ProductFragmentFragment = { id: string, name: string, description: string, images: Array<string>, unit_label: string, price: Array<{ id: string, type: string, currency: string, tiers?: Array<{ flat_amount?: number | null | undefined, flat_amount_decimal?: string | null | undefined, unit_amount?: number | null | undefined, unit_amount_decimal?: string | null | undefined, up_to?: number | null | undefined }> | null | undefined }> };

export type ReservationFragment = { createdAt: any, email: string, endDateTime: any, id: number, noOfAttendees: number, paymentStatus: string, pricePerPersonInDollars: number, slotId: number, startDateTime: any, title: string, updatedAt: any, username?: string | null | undefined, wineryName: string };

export type SlotFragmentFragment = { id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any };

export type TiersFragmentFragment = { flat_amount?: number | null | undefined, flat_amount_decimal?: string | null | undefined, unit_amount?: number | null | undefined, unit_amount_decimal?: string | null | undefined, up_to?: number | null | undefined };

export type WineryFragmentFragment = { amenities?: Array<Amenity> | null | undefined, urlAlias: string, stripe_customerId?: string | null | undefined, architecturalReferences?: boolean | null | undefined, contactEmail?: string | null | undefined, contactName?: string | null | undefined, contactPhoneNumber?: string | null | undefined, covidLabel?: boolean | null | undefined, createdAt: any, creatorEmail: string, creatorUsername: string, description: string, enologoName?: string | null | undefined, foundationYear?: number | null | undefined, googleMapsUrl?: string | null | undefined, handicappedFriendly?: boolean | null | undefined, id: number, logo?: string | null | undefined, name: string, othersServices?: Array<OtherServices> | null | undefined, petFriendly?: boolean | null | undefined, postalAddress?: string | null | undefined, productRegion?: string | null | undefined, productionType?: Array<ProductionType> | null | undefined, supportedLanguages?: Array<ServiceLanguage> | null | undefined, updatedAt: any, urlImageCover?: string | null | undefined, valley: Valley, verified?: boolean | null | undefined, wineGrapesProduction?: Array<Grape> | null | undefined, wineType?: Array<TypeWine> | null | undefined, yearlyWineProduction?: number | null | undefined, younerFriendly?: boolean | null | undefined, subscription?: string | null | undefined, experiences?: Array<{ createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType, images?: Array<{ id: number, imageUrl: string, coverPage?: boolean | null | undefined }> | null | undefined, slots: Array<{ id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any }> }> | null | undefined };

export type WineryConfirmationFragmentFragment = { id: number, name: string, urlAlias: string, creatorEmail: string, subscription?: string | null | undefined, stripe_customerId?: string | null | undefined, accountId?: string | null | undefined, accountCreatedTime?: number | null | undefined, updatedAt: any };

export type ConfirmConnectedAccountMutationVariables = Exact<{
  wineryAlias: Scalars['String'];
}>;


export type ConfirmConnectedAccountMutation = { confirmConnectedAccount: { errors?: Array<{ field: string, message: string }> | null | undefined, winery?: { id: number, name: string, urlAlias: string, creatorEmail: string, subscription?: string | null | undefined, stripe_customerId?: string | null | undefined, accountId?: string | null | undefined, accountCreatedTime?: number | null | undefined, updatedAt: any } | null | undefined } };

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

export type GetCheckoutLinkMutationVariables = Exact<{
  createCustomerInputs: CreateCustomerInputs;
  slotIds: Array<Scalars['Int']> | Scalars['Int'];
  cancelUrl: Scalars['String'];
  successUrl: Scalars['String'];
  noOfVisitors: Scalars['Float'];
}>;


export type GetCheckoutLinkMutation = { getCheckoutLink: { link?: string | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type SaveExperienceImagesUrlsMutationVariables = Exact<{
  preSignedUrls: Array<Scalars['String']> | Scalars['String'];
  experienceId: Scalars['Int'];
}>;


export type SaveExperienceImagesUrlsMutation = { saveExperienceImagesUrls: { errors?: Array<{ field: string, message: string }> | null | undefined, experienceImages: Array<{ imageUrl: string, coverPage: boolean }> } };

export type WineryOnboardingMutationVariables = Exact<{
  wineryAlias: Scalars['String'];
}>;


export type WineryOnboardingMutation = { wineryOnboarding: { accountLinkUrl?: string | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type RecurrentDatesQueryVariables = Exact<{
  createRecurrentDatesInputs: CreateRecurrentDatesInputs;
}>;


export type RecurrentDatesQuery = { recurrentDates: { dateWithTimes?: Array<{ date: any, times: Array<any> }> | null | undefined, errors?: Array<{ field: string }> | null | undefined } };

export type BookableExperiencesQueryVariables = Exact<{
  paginatedExperiencesInputs: PaginatedExperiencesInputs;
}>;


export type BookableExperiencesQuery = { bookableExperiences: { totalExperiences: number, errors?: Array<{ field: string, message: string }> | null | undefined, experiences?: Array<{ createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, wineryName: string, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType }> | null | undefined, paginationConfig: { beforeCursor?: string | null | undefined, afterCursor?: string | null | undefined, limit?: number | null | undefined } } };

export type EditableExperiencesQueryVariables = Exact<{
  wineryId: Scalars['Float'];
  paginatedExperiencesInputs: PaginatedExperiencesInputs;
}>;


export type EditableExperiencesQuery = { editableExperiences: { totalExperiences: number, errors?: Array<{ field: string, message: string }> | null | undefined, experiences?: Array<{ createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, wineryName: string, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType, slots: Array<{ id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any }> }> | null | undefined, paginationConfig: { beforeCursor?: string | null | undefined, afterCursor?: string | null | undefined, limit?: number | null | undefined } } };

export type ExperienceWithSlotsQueryVariables = Exact<{
  experienceId: Scalars['Float'];
  onlyBookableSlots: Scalars['Boolean'];
}>;


export type ExperienceWithSlotsQuery = { experienceWithSlots: { experience?: { createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, experienceType: ExperienceType, images?: Array<{ id: number, imageUrl: string, coverPage?: boolean | null | undefined }> | null | undefined, winery: { name: string, valley: Valley }, slots: Array<{ id: number, startDateTime: any, endDateTime: any, durationInMinutes: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, slotType: SlotType, createdAt: any, updatedAt: any }> } | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type ExperiencesQueryVariables = Exact<{
  paginatedExperiencesInputs: PaginatedExperiencesInputs;
}>;


export type ExperiencesQuery = { experiences: { totalExperiences: number, errors?: Array<{ field: string, message: string }> | null | undefined, experiences?: Array<{ createdAt: any, id: number, title: string, description: string, pricePerPersonInDollars: number, wineryId: number, wineryName: string, allAttendeesAllSlots?: number | null | undefined, experienceType: ExperienceType }> | null | undefined, paginationConfig: { beforeCursor?: string | null | undefined, afterCursor?: string | null | undefined, limit?: number | null | undefined } } };

export type GetSubscriptionStatusQueryVariables = Exact<{
  customerId: Scalars['String'];
}>;


export type GetSubscriptionStatusQuery = { getSubscriptionStatus: string };

export type PreSignedUrlQueryVariables = Exact<{
  presignedUrlInputs: PresignedUrlInput;
}>;


export type PreSignedUrlQuery = { preSignedUrl: { errors?: Array<{ field: string, message: string }> | null | undefined, arrayUrl?: Array<{ getUrl?: string | null | undefined, putUrl?: string | null | undefined }> | null | undefined } };

export type SubscriptionProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionProductsQuery = { getSubscriptionProducts: { errors?: Array<{ field: string, message: string }> | null | undefined, products?: Array<{ id: string, name: string, description: string, images: Array<string>, unit_label: string, price: Array<{ id: string, type: string, currency: string, unitAmount?: number | null | undefined, unitAmountDecimal?: string | null | undefined, tiers?: Array<{ flat_amount?: number | null | undefined, flat_amount_decimal?: string | null | undefined, unit_amount?: number | null | undefined, unit_amount_decimal?: string | null | undefined, up_to?: number | null | undefined }> | null | undefined }> }> | null | undefined } };

export type GetCheckoutSessionStatusQueryVariables = Exact<{
  sessionId: Scalars['String'];
}>;


export type GetCheckoutSessionStatusQuery = { getCheckoutSessionStatus: { payment_status?: string | null | undefined, sessionUrl?: string | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined, reservations?: Array<{ createdAt: any, email: string, endDateTime: any, id: number, noOfAttendees: number, paymentStatus: string, pricePerPersonInDollars: number, slotId: number, startDateTime: any, title: string, updatedAt: any, username?: string | null | undefined, wineryName: string }> | null | undefined } };

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
export const ExperienceInfoFragmentDoc = gql`
    fragment ExperienceInfo on Experience {
  createdAt
  id
  title
  description
  pricePerPersonInDollars
  experienceType
}
    `;
export const ExperienceWineryInfoFragmentDoc = gql`
    fragment ExperienceWineryInfo on Winery {
  name
  valley
}
    `;
export const PaginatedExperienceFragmentDoc = gql`
    fragment PaginatedExperience on PaginatedExperience {
  createdAt
  id
  title
  description
  pricePerPersonInDollars
  wineryId
  wineryName
  allAttendeesAllSlots
  experienceType
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
export const PaginatedExperienceWithSlotFragmentDoc = gql`
    fragment PaginatedExperienceWithSlot on PaginatedExperienceWithSlots {
  createdAt
  id
  title
  description
  pricePerPersonInDollars
  wineryId
  wineryName
  allAttendeesAllSlots
  experienceType
  slots {
    ...SlotFragment
  }
}
    ${SlotFragmentFragmentDoc}`;
export const PaginationResultFragmentFragmentDoc = gql`
    fragment PaginationResultFragment on CursorPaginationResult {
  beforeCursor
  afterCursor
  limit
}
    `;
export const PreSignedUrlFragmentDoc = gql`
    fragment PreSignedUrl on PresignedResponse {
  getUrl
  putUrl
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
export const ReservationFragmentDoc = gql`
    fragment Reservation on ReservationDts {
  createdAt
  email
  endDateTime
  id
  noOfAttendees
  paymentStatus
  pricePerPersonInDollars
  slotId
  startDateTime
  title
  updatedAt
  username
  wineryName
}
    `;
export const ExperienceImageFragmentFragmentDoc = gql`
    fragment ExperienceImageFragment on ExperienceImage {
  id
  imageUrl
  coverPage
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
export const WineryConfirmationFragmentFragmentDoc = gql`
    fragment WineryConfirmationFragment on Winery {
  id
  name
  urlAlias
  creatorEmail
  subscription
  stripe_customerId
  accountId
  accountCreatedTime
  updatedAt
}
    `;
export const ConfirmConnectedAccountDocument = gql`
    mutation ConfirmConnectedAccount($wineryAlias: String!) {
  confirmConnectedAccount(wineryAlias: $wineryAlias) {
    errors {
      field
      message
    }
    winery {
      ...WineryConfirmationFragment
    }
  }
}
    ${WineryConfirmationFragmentFragmentDoc}`;

export function useConfirmConnectedAccountMutation() {
  return Urql.useMutation<ConfirmConnectedAccountMutation, ConfirmConnectedAccountMutationVariables>(ConfirmConnectedAccountDocument);
};
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
export const GetCheckoutLinkDocument = gql`
    mutation GetCheckoutLink($createCustomerInputs: CreateCustomerInputs!, $slotIds: [Int!]!, $cancelUrl: String!, $successUrl: String!, $noOfVisitors: Float!) {
  getCheckoutLink(
    createCustomerInputs: $createCustomerInputs
    slotIds: $slotIds
    cancelUrl: $cancelUrl
    successUrl: $successUrl
    noOfVisitors: $noOfVisitors
  ) {
    errors {
      ...ErrorFragment
    }
    link
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useGetCheckoutLinkMutation() {
  return Urql.useMutation<GetCheckoutLinkMutation, GetCheckoutLinkMutationVariables>(GetCheckoutLinkDocument);
};
export const SaveExperienceImagesUrlsDocument = gql`
    mutation SaveExperienceImagesUrls($preSignedUrls: [String!]!, $experienceId: Int!) {
  saveExperienceImagesUrls(
    preSignedUrls: $preSignedUrls
    experienceId: $experienceId
  ) {
    errors {
      field
      message
    }
    experienceImages {
      imageUrl
      coverPage
    }
  }
}
    `;

export function useSaveExperienceImagesUrlsMutation() {
  return Urql.useMutation<SaveExperienceImagesUrlsMutation, SaveExperienceImagesUrlsMutationVariables>(SaveExperienceImagesUrlsDocument);
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
export const BookableExperiencesDocument = gql`
    query BookableExperiences($paginatedExperiencesInputs: PaginatedExperiencesInputs!) {
  bookableExperiences(paginatedExperiencesInputs: $paginatedExperiencesInputs) {
    errors {
      ...ErrorFragment
    }
    experiences {
      ...PaginatedExperience
    }
    totalExperiences
    paginationConfig {
      ...PaginationResultFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${PaginatedExperienceFragmentDoc}
${PaginationResultFragmentFragmentDoc}`;

export function useBookableExperiencesQuery(options: Omit<Urql.UseQueryArgs<BookableExperiencesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BookableExperiencesQuery>({ query: BookableExperiencesDocument, ...options });
};
export const EditableExperiencesDocument = gql`
    query EditableExperiences($wineryId: Float!, $paginatedExperiencesInputs: PaginatedExperiencesInputs!) {
  editableExperiences(
    wineryId: $wineryId
    paginatedExperiencesInputs: $paginatedExperiencesInputs
  ) {
    errors {
      field
      message
    }
    experiences {
      ...PaginatedExperienceWithSlot
    }
    totalExperiences
    paginationConfig {
      ...PaginationResultFragment
    }
  }
}
    ${PaginatedExperienceWithSlotFragmentDoc}
${PaginationResultFragmentFragmentDoc}`;

export function useEditableExperiencesQuery(options: Omit<Urql.UseQueryArgs<EditableExperiencesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EditableExperiencesQuery>({ query: EditableExperiencesDocument, ...options });
};
export const ExperienceWithSlotsDocument = gql`
    query ExperienceWithSlots($experienceId: Float!, $onlyBookableSlots: Boolean!) {
  experienceWithSlots(
    experienceId: $experienceId
    onlyBookableSlots: $onlyBookableSlots
  ) {
    experience {
      ...ExperienceInfo
      images {
        ...ExperienceImageFragment
      }
      winery {
        ...ExperienceWineryInfo
      }
      slots {
        ...SlotFragment
      }
    }
    errors {
      ...ErrorFragment
    }
  }
}
    ${ExperienceInfoFragmentDoc}
${ExperienceImageFragmentFragmentDoc}
${ExperienceWineryInfoFragmentDoc}
${SlotFragmentFragmentDoc}
${ErrorFragmentFragmentDoc}`;

export function useExperienceWithSlotsQuery(options: Omit<Urql.UseQueryArgs<ExperienceWithSlotsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ExperienceWithSlotsQuery>({ query: ExperienceWithSlotsDocument, ...options });
};
export const ExperiencesDocument = gql`
    query Experiences($paginatedExperiencesInputs: PaginatedExperiencesInputs!) {
  experiences(paginatedExperiencesInputs: $paginatedExperiencesInputs) {
    errors {
      ...ErrorFragment
    }
    experiences {
      ...PaginatedExperience
    }
    totalExperiences
    paginationConfig {
      ...PaginationResultFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${PaginatedExperienceFragmentDoc}
${PaginationResultFragmentFragmentDoc}`;

export function useExperiencesQuery(options: Omit<Urql.UseQueryArgs<ExperiencesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ExperiencesQuery>({ query: ExperiencesDocument, ...options });
};
export const GetSubscriptionStatusDocument = gql`
    query GetSubscriptionStatus($customerId: String!) {
  getSubscriptionStatus(customerId: $customerId)
}
    `;

export function useGetSubscriptionStatusQuery(options: Omit<Urql.UseQueryArgs<GetSubscriptionStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSubscriptionStatusQuery>({ query: GetSubscriptionStatusDocument, ...options });
};
export const PreSignedUrlDocument = gql`
    query PreSignedUrl($presignedUrlInputs: PresignedUrlInput!) {
  preSignedUrl(presignedUrlInputs: $presignedUrlInputs) {
    errors {
      ...ErrorFragment
    }
    arrayUrl {
      ...PreSignedUrl
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${PreSignedUrlFragmentDoc}`;

export function usePreSignedUrlQuery(options: Omit<Urql.UseQueryArgs<PreSignedUrlQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PreSignedUrlQuery>({ query: PreSignedUrlDocument, ...options });
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
    reservations {
      ...Reservation
    }
    payment_status
    sessionUrl
  }
}
    ${ReservationFragmentDoc}`;

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