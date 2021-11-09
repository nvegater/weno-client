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

export type BookServiceResponse = {
  errors?: Maybe<Array<FieldError>>;
  service?: Maybe<Service>;
};

export type ChangePasswordInputs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type CreatePostInputs = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type CreateServiceInputs = {
  wineryId: Scalars['Float'];
  limitOfAttendees: Scalars['Float'];
  duration: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  eventType: EventType;
  pricePerPersonInDollars: Scalars['Float'];
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
  rRules?: Maybe<Array<Scalars['String']>>;
};

export type CreateServiceResponse = {
  errors?: Maybe<Array<FieldError>>;
  service?: Maybe<Service>;
};

/** Type of service */
export enum EventType {
  ComidaCenaMaridaje = 'COMIDA_CENA_MARIDAJE',
  Degustacion = 'DEGUSTACION',
  Concierto = 'CONCIERTO'
}

export type FieldError = {
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FindExperienceResponse = {
  errors?: Maybe<Array<FieldError>>;
  service: Service;
  winery: Winery;
};

export type GetPreSignedUrlResponse = {
  errors?: Maybe<Array<FieldError>>;
  arrayUrl?: Maybe<Array<PresignedResponse>>;
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

export type LoginInputs = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  vote: Scalars['Boolean'];
  postCreation: PostResponse;
  postUpdate: PostResponse;
  postDeletion: PostDeletion;
  register: UserResponse;
  validateUser: UserResponse;
  sendUserValidation?: Maybe<SendUserValidationResponse>;
  registerWinery: WineryResponse;
  login: UserResponse;
  changePassword: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: UserResponse;
  updateUser: UserResponse;
  insertImageWinery: WineryServicesResponse;
  deleteImageWinery: WineryDeleteImageResponse;
  changeCoverPageImageWinery: WineryChangeResponse;
  updateWinery: WineryServicesResponse;
  reserve: BookServiceResponse;
  createService: CreateServiceResponse;
  updateService: CreateServiceResponse;
  insertImageService: ServiceImageResponse;
  deleteImageService: ServiceImageResponse;
  changeCoverPageImageService: ServiceCoverImageChangeResponse;
  createDefaultImageToEvent: ServiceImageResponse;
  updateDefaultImageToEvent: ServiceImageResponse;
  deleteDefaultImageToEvent: ServiceImageResponse;
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationPostCreationArgs = {
  options: CreatePostInputs;
};


export type MutationPostUpdateArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationPostDeletionArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: RegisterInputs;
};


export type MutationValidateUserArgs = {
  token: Scalars['String'];
};


export type MutationRegisterWineryArgs = {
  wineryDataInputs: WineryDataInputs;
  options: RegisterInputs;
};


export type MutationLoginArgs = {
  options: LoginInputs;
};


export type MutationChangePasswordArgs = {
  options: ChangePasswordInputs;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  user: UserToEdit;
};


export type MutationInsertImageWineryArgs = {
  urlImage: Array<Scalars['String']>;
  wineryId: Scalars['Int'];
};


export type MutationDeleteImageWineryArgs = {
  imageId: Scalars['Int'];
};


export type MutationChangeCoverPageImageWineryArgs = {
  wineryImageId: Scalars['Int'];
  wineryId: Scalars['Int'];
};


export type MutationUpdateWineryArgs = {
  wineryData: UpdateWineryInputs;
};


export type MutationReserveArgs = {
  reserveServiceInputs: ReserveServiceInputs;
};


export type MutationCreateServiceArgs = {
  createServiceInputs: CreateServiceInputs;
};


export type MutationUpdateServiceArgs = {
  updateServiceInputs: UpdateServiceInputs;
};


export type MutationInsertImageServiceArgs = {
  urlImage: Array<Scalars['String']>;
  serviceId: Scalars['Int'];
};


export type MutationDeleteImageServiceArgs = {
  serviceImageId: Scalars['Int'];
};


export type MutationChangeCoverPageImageServiceArgs = {
  serviceImageId: Scalars['Int'];
  serviceId: Scalars['Int'];
};


export type MutationCreateDefaultImageToEventArgs = {
  urlImage: Scalars['String'];
  eventType: EventType;
};


export type MutationUpdateDefaultImageToEventArgs = {
  urlImage: Scalars['String'];
  eventType: EventType;
};


export type MutationDeleteDefaultImageToEventArgs = {
  eventType: EventType;
};

/** differents kind of services */
export enum OtherServices {
  Hospedaje = 'HOSPEDAJE',
  Restaurante = 'RESTAURANTE',
  BarraDeAlimentos = 'BARRA_DE_ALIMENTOS'
}

export type PaginatedExperiences = {
  errors?: Maybe<Array<FieldError>>;
  experiences?: Maybe<Array<Service>>;
  moreExperiencesAvailable: Scalars['Boolean'];
  totalExperiences: Scalars['Float'];
};

export type PaginatedPosts = {
  paginatedPosts: Array<Post>;
  morePostsAvailable: Scalars['Boolean'];
};

export type Post = {
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  textSnippet: Scalars['String'];
};

export type PostResponse = {
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type PresignedResponse = {
  getUrl?: Maybe<Scalars['String']>;
  putUrl?: Maybe<Scalars['String']>;
};

/** Types of wine production */
export enum ProductionType {
  Comercial = 'COMERCIAL',
  TradArtesanal = 'TRAD_ARTESANAL',
  OrgBioNat = 'ORG_BIO_NAT'
}

export type Query = {
  PaginatedPosts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<UserResponse>;
  allWineries: WineriesResponse;
  wineryServices: WineryServicesResponse;
  allServices: PaginatedExperiences;
  servicesUser: ServiceResponse;
  salesConcentrate: SalesConcentrate;
  findExperienceById: FindExperienceResponse;
  preSignedUrl: GetPreSignedUrlResponse;
  allReservations: ReservationResponse;
  userReservations: Array<ServiceReservation>;
  wineryReservations: Array<ServiceReservation>;
};


export type QueryPaginatedPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryAllWineriesArgs = {
  limit: Scalars['Int'];
};


export type QueryWineryServicesArgs = {
  wineryId: Scalars['Int'];
};


export type QueryAllServicesArgs = {
  state?: Maybe<Scalars['String']>;
  valley?: Maybe<Array<Valley>>;
  eventType?: Maybe<Array<EventType>>;
  experienceName?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryServicesUserArgs = {
  serviceIds: Array<Scalars['Int']>;
};


export type QuerySalesConcentrateArgs = {
  paypalTransaccionId?: Maybe<Scalars['String']>;
};


export type QueryFindExperienceByIdArgs = {
  experienceId: Scalars['Int'];
};


export type QueryPreSignedUrlArgs = {
  userId?: Maybe<Scalars['Int']>;
  serviceId?: Maybe<Scalars['Int']>;
  wineryId?: Maybe<Scalars['Int']>;
  uploadType: UploadType;
  fileName: Array<Scalars['String']>;
};


export type QueryAllReservationsArgs = {
  limit: Scalars['Int'];
};


export type QueryWineryReservationsArgs = {
  wineryId: Scalars['Int'];
};

export type RegisterInputs = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  userType: UserType;
};

export type ReservationDetails = {
  userId: Scalars['Int'];
  serviceId: Scalars['Int'];
  noOfAttendees?: Maybe<Scalars['Int']>;
  paypalOrderId: Scalars['String'];
  status: Scalars['String'];
  paymentCreationDateTime: Scalars['String'];
  pricePerPersonInDollars: Scalars['Float'];
  userInfo: User;
  experienceInfo: Service;
  userFromReservation: UserFromReservation;
  serviceFromReservation: ServiceFromReservation;
};

export type ReservationResponse = {
  errors?: Maybe<Array<FieldError>>;
  reservations?: Maybe<Array<ReservationDetails>>;
  moreReservationsAvailable: Scalars['Boolean'];
};

export type ReserveServiceInputs = {
  serviceId: Scalars['Float'];
  noOfAttendees: Scalars['Float'];
  startDateTime: Scalars['DateTime'];
  paypalOrderId: Scalars['String'];
  status: Scalars['String'];
  paymentCreationDateTime: Scalars['String'];
  pricePerPersonInDollars: Scalars['Float'];
  getTimezoneOffset: Scalars['Float'];
};

export type SalesConcentrate = {
  errors?: Maybe<Array<FieldError>>;
  url?: Maybe<Scalars['String']>;
};

export type SendUserValidationResponse = {
  errors?: Maybe<Array<FieldError>>;
  send?: Maybe<Scalars['Boolean']>;
};

export type Service = {
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  urlImageCover?: Maybe<Scalars['String']>;
  gallery: Array<ServiceImageGallery>;
  eventType: EventType;
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
  rRules?: Maybe<Array<Scalars['String']>>;
  wineryId: Scalars['Int'];
  winery: Winery;
  creatorId: Scalars['Float'];
  parentServiceId?: Maybe<Scalars['Int']>;
  creator: User;
  duration: Scalars['Int'];
  limitOfAttendees?: Maybe<Scalars['Int']>;
  noOfAttendees?: Maybe<Scalars['Int']>;
  pricePerPersonInDollars: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ServiceCoverImageChangeResponse = {
  errors?: Maybe<Array<FieldError>>;
  changed: Scalars['Boolean'];
};

export type ServiceFromReservation = {
  id: Scalars['Float'];
  noOfAttendees: Scalars['Float'];
  pricePerPersonInDollars: Scalars['Float'];
  startDateTime: Scalars['String'];
};

export type ServiceImageGallery = {
  id?: Maybe<Scalars['Float']>;
  serviceId?: Maybe<Scalars['Float']>;
  imageUrl?: Maybe<Scalars['String']>;
  coverPage: Scalars['Boolean'];
};

export type ServiceImageResponse = {
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
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

export type ServiceReservation = {
  userId: Scalars['Int'];
  serviceId: Scalars['Int'];
  noOfAttendees?: Maybe<Scalars['Int']>;
  paypalOrderId: Scalars['String'];
  status: Scalars['String'];
  paymentCreationDateTime: Scalars['String'];
  pricePerPersonInDollars: Scalars['Float'];
  userInfo: User;
  experienceInfo: Service;
};

export type ServiceResponse = {
  errors?: Maybe<Array<FieldError>>;
  paginatedServices?: Maybe<Array<Service>>;
  moreServicesAvailable: Scalars['Boolean'];
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

export type UpdateServiceInputs = {
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  eventType: EventType;
  pricePerPersonInDollars: Scalars['Float'];
  startDateTime: Scalars['DateTime'];
  endDateTime?: Maybe<Scalars['DateTime']>;
  limitOfAttendees: Scalars['Float'];
  rRules?: Maybe<Array<Scalars['String']>>;
};

export type UpdateWineryInputs = {
  /** opcional */
  id?: Maybe<Scalars['Float']>;
  /** opcional */
  name?: Maybe<Scalars['String']>;
  /** opcional */
  description?: Maybe<Scalars['String']>;
  /** opcional */
  foundationYear?: Maybe<Scalars['Float']>;
  /** opcional */
  googleMapsUrl?: Maybe<Scalars['String']>;
  /** opcional */
  yearlyWineProduction?: Maybe<Scalars['Float']>;
  /** opcional */
  contactEmail?: Maybe<Scalars['String']>;
  /** opcional */
  contactPhoneNumber?: Maybe<Scalars['String']>;
  /** opcional */
  covidLabel?: Maybe<Scalars['Boolean']>;
  /** opcional */
  logo?: Maybe<Scalars['String']>;
  /** opcional */
  contactName?: Maybe<Scalars['String']>;
  /** opcional */
  productRegion?: Maybe<Scalars['String']>;
  /** opcional */
  postalAddress?: Maybe<Scalars['String']>;
  /** opcional */
  architecturalReferences?: Maybe<Scalars['Boolean']>;
  /** opcional */
  enologoName?: Maybe<Scalars['String']>;
  /** opcional */
  younerFriendly?: Maybe<Scalars['Boolean']>;
  /** opcional */
  petFriendly?: Maybe<Scalars['Boolean']>;
  /** opcional */
  handicappedFriendly?: Maybe<Scalars['Boolean']>;
  wineGrapesProduction: Array<Grape>;
  othersServices: Array<OtherServices>;
  /** opcional */
  valley?: Maybe<Valley>;
  productionType: Array<ProductionType>;
  wineType: Array<TypeWine>;
  supportedLanguages: Array<ServiceLanguage>;
  amenities: Array<Amenity>;
};

/** Se pueden cargar imagenes para distintos elementos, usuarios, galerias de viñeros etc, etc */
export enum UploadType {
  Wineryalbum = 'WINERYALBUM',
  Userprofilepicture = 'USERPROFILEPICTURE',
  Servicealbum = 'SERVICEALBUM',
  Winerylogo = 'WINERYLOGO'
}

export type User = {
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  urlImage?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  reservedServices?: Maybe<Array<ServiceReservation>>;
  reservedServicesIds?: Maybe<Array<Scalars['Int']>>;
  wineryId?: Maybe<Scalars['Int']>;
  userType: UserType;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserFromReservation = {
  id: Scalars['Float'];
  username: Scalars['String'];
  userType: UserType;
};

export type UserResponse = {
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserToEdit = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  urlImage?: Maybe<Scalars['String']>;
  visitorOrOwner?: Maybe<Scalars['Boolean']>;
  userType?: Maybe<UserType>;
  verified?: Maybe<Scalars['Boolean']>;
};

/** Al registrarse los visitantes seleccionan una de las siguientes categoriasDistinciones virtuales para afinar sugerencias y para proporcionar la informacion a la vinicola */
export enum UserType {
  WineryOwner = 'WINERY_OWNER',
  WineTourist = 'WINE_TOURIST',
  Hotel = 'HOTEL',
  Transportation = 'TRANSPORTATION',
  Concierge = 'CONCIERGE',
  Tour = 'TOUR',
  Distributor = 'DISTRIBUTOR',
  Press = 'PRESS',
  Sommelier = 'SOMMELIER',
  Guide = 'GUIDE',
  Driver = 'DRIVER',
  Agency = 'AGENCY',
  Dmc = 'DMC',
  Ocv = 'OCV',
  Planner = 'PLANNER'
}

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

export type WineriesResponse = {
  errors?: Maybe<Array<FieldError>>;
  paginatedWineries?: Maybe<Array<Winery>>;
  moreWineriesAvailable: Scalars['Boolean'];
};

export type Winery = {
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  foundationYear?: Maybe<Scalars['Int']>;
  services?: Maybe<Array<Service>>;
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

export type WineryChangeResponse = {
  errors?: Maybe<Array<FieldError>>;
  changed: Scalars['Boolean'];
};

export type WineryDataInputs = {
  name: Scalars['String'];
  description: Scalars['String'];
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

export type WineryDeleteImageResponse = {
  errors?: Maybe<Array<FieldError>>;
  deleted: Scalars['Boolean'];
};

export type WineryImageGallery = {
  id?: Maybe<Scalars['Float']>;
  wineryId?: Maybe<Scalars['Float']>;
  imageUrl?: Maybe<Scalars['String']>;
  coverPage: Scalars['Boolean'];
};

export type WineryResponse = {
  errors?: Maybe<Array<FieldError>>;
  winery?: Maybe<User>;
};

export type WineryServicesResponse = {
  errors?: Maybe<Array<FieldError>>;
  winery: Winery;
  images: Array<WineryImageGallery>;
  services: Array<Service>;
};

export type PostDeletion = {
  errors?: Maybe<Array<FieldError>>;
  deleted: Scalars['Boolean'];
};

export type ErrorFragmentFragment = { field: string, message: string };

export type ServiceFragmentFragment = { id: number, title: string, description: string, eventType: EventType, startDateTime: any, endDateTime: any, rRules?: Array<string> | null | undefined, wineryId: number, creatorId: number, duration: number, pricePerPersonInDollars: number, limitOfAttendees?: number | null | undefined, parentServiceId?: number | null | undefined, noOfAttendees?: number | null | undefined, urlImageCover?: string | null | undefined, createdAt: any };

export type ExperiencesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  experienceName?: Maybe<Scalars['String']>;
  eventType?: Maybe<Array<EventType> | EventType>;
  valley?: Maybe<Array<Valley> | Valley>;
  state?: Maybe<Scalars['String']>;
}>;


export type ExperiencesQuery = { allServices: { moreExperiencesAvailable: boolean, totalExperiences: number, experiences?: Array<{ id: number, title: string, description: string, eventType: EventType, startDateTime: any, endDateTime: any, rRules?: Array<string> | null | undefined, wineryId: number, creatorId: number, duration: number, pricePerPersonInDollars: number, limitOfAttendees?: number | null | undefined, parentServiceId?: number | null | undefined, noOfAttendees?: number | null | undefined, urlImageCover?: string | null | undefined, createdAt: any, winery: { name: string, valley: Valley } }> | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: { errors?: Array<{ field: string, message: string }> | null | undefined, user?: { id: number, username: string, email: string, userType: UserType, wineryId?: number | null | undefined, urlImage?: string | null | undefined } | null | undefined } | null | undefined };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
export const ServiceFragmentFragmentDoc = gql`
    fragment ServiceFragment on Service {
  id
  title
  description
  eventType
  startDateTime
  endDateTime
  rRules
  wineryId
  creatorId
  duration
  pricePerPersonInDollars
  rRules
  limitOfAttendees
  parentServiceId
  noOfAttendees
  urlImageCover
  createdAt
}
    `;
export const ExperiencesDocument = gql`
    query experiences($limit: Int!, $cursor: String, $experienceName: String, $eventType: [EventType!], $valley: [Valley!], $state: String) {
  allServices(
    limit: $limit
    cursor: $cursor
    experienceName: $experienceName
    eventType: $eventType
    valley: $valley
    state: $state
  ) {
    moreExperiencesAvailable
    totalExperiences
    experiences {
      ...ServiceFragment
      winery {
        name
        valley
      }
    }
    errors {
      field
      message
    }
  }
}
    ${ServiceFragmentFragmentDoc}`;

export function useExperiencesQuery(options: Omit<Urql.UseQueryArgs<ExperiencesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ExperiencesQuery>({ query: ExperiencesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    errors {
      ...ErrorFragment
    }
    user {
      id
      username
      email
      userType
      wineryId
      urlImage
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};