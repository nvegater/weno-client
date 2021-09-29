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
  ActividadesEnVinedo = 'ACTIVIDADES_EN_VINEDO',
  CatasMaridajes = 'CATAS_MARIDAJES',
  CatasPrivadas = 'CATAS_PRIVADAS',
  CataBarricas = 'CATA_BARRICAS',
  CreaTuMezcla = 'CREA_TU_MEZCLA',
  Degustacion = 'DEGUSTACION',
  PaseoCarreta = 'PASEO_CARRETA',
  RecorridoBodega = 'RECORRIDO_BODEGA',
  RecorridoVinedos = 'RECORRIDO_VINEDOS',
  TalleresDidacticos = 'TALLERES_DIDACTICOS',
  Terraza = 'TERRAZA',
  VisitaCavaBarricas = 'VISITA_CAVA_BARRICAS'
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
  text: Scalars['String'];
  title: Scalars['String'];
};

export type CreateServiceInputs = {
  description: Scalars['String'];
  duration: Scalars['Float'];
  endDateTime: Scalars['DateTime'];
  eventType: EventType;
  limitOfAttendees: Scalars['Float'];
  pricePerPersonInDollars: Scalars['Float'];
  rRules?: Maybe<Array<Scalars['String']>>;
  startDateTime: Scalars['DateTime'];
  title: Scalars['String'];
  wineryId: Scalars['Float'];
};

export type CreateServiceResponse = {
  errors?: Maybe<Array<FieldError>>;
  service?: Maybe<Service>;
};

/** Type of service */
export enum EventType {
  ComidaCenaMaridaje = 'COMIDA_CENA_MARIDAJE',
  Concierto = 'CONCIERTO',
  Degustacion = 'DEGUSTACION'
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
  arrayUrl?: Maybe<Array<PresignedResponse>>;
  errors?: Maybe<Array<FieldError>>;
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
  Otra = 'OTRA',
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
  Zinfandel = 'ZINFANDEL'
}

export type LoginInputs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  changeCoverPageImageService: ServiceCoverImageChangeResponse;
  changeCoverPageImageWinery: WineryChangeResponse;
  changePassword: UserResponse;
  createDefaultImageToEvent: ServiceImageResponse;
  createService: CreateServiceResponse;
  deleteDefaultImageToEvent: ServiceImageResponse;
  deleteImageService: ServiceImageResponse;
  deleteImageWinery: WineryDeleteImageResponse;
  forgotPassword: UserResponse;
  insertImageService: ServiceImageResponse;
  insertImageWinery: WineryServicesResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  postCreation: PostResponse;
  postDeletion: PostDeletion;
  postUpdate: PostResponse;
  register: UserResponse;
  registerWinery: WineryResponse;
  reserve: BookServiceResponse;
  sendUserValidation?: Maybe<SendUserValidationResponse>;
  updateDefaultImageToEvent: ServiceImageResponse;
  updateService: CreateServiceResponse;
  updateUser: UserResponse;
  updateWinery: WineryServicesResponse;
  validateUser: UserResponse;
  vote: Scalars['Boolean'];
};


export type MutationChangeCoverPageImageServiceArgs = {
  serviceId: Scalars['Int'];
  serviceImageId: Scalars['Int'];
};


export type MutationChangeCoverPageImageWineryArgs = {
  wineryId: Scalars['Int'];
  wineryImageId: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  options: ChangePasswordInputs;
};


export type MutationCreateDefaultImageToEventArgs = {
  eventType: EventType;
  urlImage: Scalars['String'];
};


export type MutationCreateServiceArgs = {
  createServiceInputs: CreateServiceInputs;
};


export type MutationDeleteDefaultImageToEventArgs = {
  eventType: EventType;
};


export type MutationDeleteImageServiceArgs = {
  serviceImageId: Scalars['Int'];
};


export type MutationDeleteImageWineryArgs = {
  imageId: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationInsertImageServiceArgs = {
  serviceId: Scalars['Int'];
  urlImage: Array<Scalars['String']>;
};


export type MutationInsertImageWineryArgs = {
  urlImage: Array<Scalars['String']>;
  wineryId: Scalars['Int'];
};


export type MutationLoginArgs = {
  options: LoginInputs;
};


export type MutationPostCreationArgs = {
  options: CreatePostInputs;
};


export type MutationPostDeletionArgs = {
  id: Scalars['Int'];
};


export type MutationPostUpdateArgs = {
  id: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInputs;
};


export type MutationRegisterWineryArgs = {
  options: RegisterInputs;
  wineryDataInputs: WineryDataInputs;
};


export type MutationReserveArgs = {
  reserveServiceInputs: ReserveServiceInputs;
};


export type MutationUpdateDefaultImageToEventArgs = {
  eventType: EventType;
  urlImage: Scalars['String'];
};


export type MutationUpdateServiceArgs = {
  updateServiceInputs: UpdateServiceInputs;
};


export type MutationUpdateUserArgs = {
  user: UserToEdit;
};


export type MutationUpdateWineryArgs = {
  wineryData: UpdateWineryInputs;
};


export type MutationValidateUserArgs = {
  token: Scalars['String'];
};


export type MutationVoteArgs = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

/** differents kind of services */
export enum OtherServices {
  BarraDeAlimentos = 'BARRA_DE_ALIMENTOS',
  Hospedaje = 'HOSPEDAJE',
  Restaurante = 'RESTAURANTE'
}

export type PaginatedExperiences = {
  errors?: Maybe<Array<FieldError>>;
  experiences?: Maybe<Array<Service>>;
  moreExperiencesAvailable: Scalars['Boolean'];
  totalExperiences: Scalars['Float'];
};

export type PaginatedPosts = {
  morePostsAvailable: Scalars['Boolean'];
  paginatedPosts: Array<Post>;
};

export type Post = {
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Int'];
  points: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  voteStatus?: Maybe<Scalars['Int']>;
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
  OrgBioNat = 'ORG_BIO_NAT',
  TradArtesanal = 'TRAD_ARTESANAL'
}

export type Query = {
  PaginatedPosts: PaginatedPosts;
  allReservations: ReservationResponse;
  allServices: PaginatedExperiences;
  allWineries: WineriesResponse;
  findExperienceById: FindExperienceResponse;
  me?: Maybe<UserResponse>;
  post?: Maybe<Post>;
  preSignedUrl: GetPreSignedUrlResponse;
  salesConcentrate: SalesConcentrate;
  servicesUser: ServiceResponse;
  userReservations: Array<ServiceReservation>;
  wineryReservations: Array<ServiceReservation>;
  wineryServices: WineryServicesResponse;
};


export type QueryPaginatedPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryAllReservationsArgs = {
  limit: Scalars['Int'];
};


export type QueryAllServicesArgs = {
  cursor?: Maybe<Scalars['String']>;
  eventType?: Maybe<Array<EventType>>;
  experienceName?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  state?: Maybe<Scalars['String']>;
  valley?: Maybe<Array<Valley>>;
};


export type QueryAllWineriesArgs = {
  limit: Scalars['Int'];
};


export type QueryFindExperienceByIdArgs = {
  experienceId: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPreSignedUrlArgs = {
  fileName: Array<Scalars['String']>;
  serviceId?: Maybe<Scalars['Int']>;
  uploadType: UploadType;
  userId?: Maybe<Scalars['Int']>;
  wineryId?: Maybe<Scalars['Int']>;
};


export type QuerySalesConcentrateArgs = {
  paypalTransaccionId?: Maybe<Scalars['String']>;
};


export type QueryServicesUserArgs = {
  serviceIds: Array<Scalars['Int']>;
};


export type QueryWineryReservationsArgs = {
  wineryId: Scalars['Int'];
};


export type QueryWineryServicesArgs = {
  wineryId: Scalars['Int'];
};

export type RegisterInputs = {
  email: Scalars['String'];
  password: Scalars['String'];
  userType: UserType;
  username: Scalars['String'];
};

export type ReservationDetails = {
  experienceInfo: Service;
  noOfAttendees?: Maybe<Scalars['Int']>;
  paymentCreationDateTime: Scalars['String'];
  paypalOrderId: Scalars['String'];
  pricePerPersonInDollars: Scalars['Float'];
  serviceFromReservation: ServiceFromReservation;
  serviceId: Scalars['Int'];
  status: Scalars['String'];
  userFromReservation: UserFromReservation;
  userId: Scalars['Int'];
  userInfo: User;
};

export type ReservationResponse = {
  errors?: Maybe<Array<FieldError>>;
  moreReservationsAvailable: Scalars['Boolean'];
  reservations?: Maybe<Array<ReservationDetails>>;
};

export type ReserveServiceInputs = {
  getTimezoneOffset: Scalars['Float'];
  noOfAttendees: Scalars['Float'];
  paymentCreationDateTime: Scalars['String'];
  paypalOrderId: Scalars['String'];
  pricePerPersonInDollars: Scalars['Float'];
  serviceId: Scalars['Float'];
  startDateTime: Scalars['DateTime'];
  status: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['Float'];
  description: Scalars['String'];
  duration: Scalars['Int'];
  endDateTime: Scalars['DateTime'];
  eventType: EventType;
  gallery: Array<ServiceImageGallery>;
  id: Scalars['Int'];
  limitOfAttendees?: Maybe<Scalars['Int']>;
  noOfAttendees?: Maybe<Scalars['Int']>;
  parentServiceId?: Maybe<Scalars['Int']>;
  pricePerPersonInDollars: Scalars['Float'];
  rRules?: Maybe<Array<Scalars['String']>>;
  startDateTime: Scalars['DateTime'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  urlImageCover?: Maybe<Scalars['String']>;
  winery: Winery;
  wineryId: Scalars['Int'];
};

export type ServiceCoverImageChangeResponse = {
  changed: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type ServiceFromReservation = {
  id: Scalars['Float'];
  noOfAttendees: Scalars['Float'];
  pricePerPersonInDollars: Scalars['Float'];
  startDateTime: Scalars['String'];
};

export type ServiceImageGallery = {
  coverPage: Scalars['Boolean'];
  id?: Maybe<Scalars['Float']>;
  imageUrl?: Maybe<Scalars['String']>;
  serviceId?: Maybe<Scalars['Float']>;
};

export type ServiceImageResponse = {
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
};

/** Languages supported by the Wineries */
export enum ServiceLanguage {
  Aleman = 'ALEMAN',
  Espanol = 'ESPANOL',
  Frances = 'FRANCES',
  Ingles = 'INGLES',
  Italiano = 'ITALIANO',
  Japones = 'JAPONES',
  Mandarin = 'MANDARIN',
  Portugues = 'PORTUGUES',
  SenasMexicanas = 'SENAS_MEXICANAS'
}

export type ServiceReservation = {
  experienceInfo: Service;
  noOfAttendees?: Maybe<Scalars['Int']>;
  paymentCreationDateTime: Scalars['String'];
  paypalOrderId: Scalars['String'];
  pricePerPersonInDollars: Scalars['Float'];
  serviceId: Scalars['Int'];
  status: Scalars['String'];
  userId: Scalars['Int'];
  userInfo: User;
};

export type ServiceResponse = {
  errors?: Maybe<Array<FieldError>>;
  moreServicesAvailable: Scalars['Boolean'];
  paginatedServices?: Maybe<Array<Service>>;
};

/** Types of wine produced by a winery */
export enum TypeWine {
  Biodinamico = 'BIODINAMICO',
  BlancoConBarrica = 'BLANCO_CON_BARRICA',
  BlancoJoven = 'BLANCO_JOVEN',
  ConmemorativoEdiLimitada = 'CONMEMORATIVO_EDI_LIMITADA',
  Cosecha = 'COSECHA',
  Dulce = 'DULCE',
  Espumoso = 'ESPUMOSO',
  ExclusivoVentaLocal = 'EXCLUSIVO_VENTA_LOCAL',
  GenerosoFortificado = 'GENEROSO_FORTIFICADO',
  Naranja = 'NARANJA',
  Natural = 'NATURAL',
  Organico = 'ORGANICO',
  Rosado = 'ROSADO',
  TintoCrianzaBarrica = 'TINTO_CRIANZA_BARRICA',
  TintoJoven = 'TINTO_JOVEN'
}

export type UpdateServiceInputs = {
  description: Scalars['String'];
  endDateTime?: Maybe<Scalars['DateTime']>;
  eventType: EventType;
  id: Scalars['Float'];
  limitOfAttendees: Scalars['Float'];
  pricePerPersonInDollars: Scalars['Float'];
  rRules?: Maybe<Array<Scalars['String']>>;
  startDateTime: Scalars['DateTime'];
  title: Scalars['String'];
};

export type UpdateWineryInputs = {
  amenities: Array<Amenity>;
  /** opcional */
  architecturalReferences?: Maybe<Scalars['Boolean']>;
  /** opcional */
  contactEmail?: Maybe<Scalars['String']>;
  /** opcional */
  contactName?: Maybe<Scalars['String']>;
  /** opcional */
  contactPhoneNumber?: Maybe<Scalars['String']>;
  /** opcional */
  covidLabel?: Maybe<Scalars['Boolean']>;
  /** opcional */
  description?: Maybe<Scalars['String']>;
  /** opcional */
  enologoName?: Maybe<Scalars['String']>;
  /** opcional */
  foundationYear?: Maybe<Scalars['Float']>;
  /** opcional */
  googleMapsUrl?: Maybe<Scalars['String']>;
  /** opcional */
  handicappedFriendly?: Maybe<Scalars['Boolean']>;
  /** opcional */
  id?: Maybe<Scalars['Float']>;
  /** opcional */
  logo?: Maybe<Scalars['String']>;
  /** opcional */
  name?: Maybe<Scalars['String']>;
  othersServices: Array<OtherServices>;
  /** opcional */
  petFriendly?: Maybe<Scalars['Boolean']>;
  /** opcional */
  postalAddress?: Maybe<Scalars['String']>;
  /** opcional */
  productRegion?: Maybe<Scalars['String']>;
  productionType: Array<ProductionType>;
  supportedLanguages: Array<ServiceLanguage>;
  /** opcional */
  valley?: Maybe<Valley>;
  wineGrapesProduction: Array<Grape>;
  wineType: Array<TypeWine>;
  /** opcional */
  yearlyWineProduction?: Maybe<Scalars['Float']>;
  /** opcional */
  younerFriendly?: Maybe<Scalars['Boolean']>;
};

/** Se pueden cargar imagenes para distintos elementos, usuarios, galerias de viñeros etc, etc */
export enum UploadType {
  Servicealbum = 'SERVICEALBUM',
  Userprofilepicture = 'USERPROFILEPICTURE',
  Wineryalbum = 'WINERYALBUM',
  Winerylogo = 'WINERYLOGO'
}

export type User = {
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  reservedServices?: Maybe<Array<ServiceReservation>>;
  reservedServicesIds?: Maybe<Array<Scalars['Int']>>;
  updatedAt: Scalars['DateTime'];
  urlImage?: Maybe<Scalars['String']>;
  userType: UserType;
  username: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
  wineryId?: Maybe<Scalars['Int']>;
};

export type UserFromReservation = {
  id: Scalars['Float'];
  userType: UserType;
  username: Scalars['String'];
};

export type UserResponse = {
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserToEdit = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  urlImage?: Maybe<Scalars['String']>;
  userType?: Maybe<UserType>;
  username?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  visitorOrOwner?: Maybe<Scalars['Boolean']>;
};

/** Al registrarse los visitantes seleccionan una de las siguientes categoriasDistinciones virtuales para afinar sugerencias y para proporcionar la informacion a la vinicola */
export enum UserType {
  Agency = 'AGENCY',
  Concierge = 'CONCIERGE',
  Distributor = 'DISTRIBUTOR',
  Dmc = 'DMC',
  Driver = 'DRIVER',
  Guide = 'GUIDE',
  Hotel = 'HOTEL',
  Ocv = 'OCV',
  Planner = 'PLANNER',
  Press = 'PRESS',
  Sommelier = 'SOMMELIER',
  Tour = 'TOUR',
  Transportation = 'TRANSPORTATION',
  WineryOwner = 'WINERY_OWNER',
  WineTourist = 'WINE_TOURIST'
}

/** A winery is in an unique valley, valleys are not identifiable through addresses */
export enum Valley {
  Calafia = 'CALAFIA',
  Ensenada = 'ENSENADA',
  Grulla = 'GRULLA',
  Guadalupe = 'GUADALUPE',
  OjosNegros = 'OJOS_NEGROS',
  SantoTomas = 'SANTO_TOMAS',
  SanAntMinas = 'SAN_ANT_MINAS',
  SanQuintin = 'SAN_QUINTIN',
  SanVicente = 'SAN_VICENTE'
}

export type WineriesResponse = {
  errors?: Maybe<Array<FieldError>>;
  moreWineriesAvailable: Scalars['Boolean'];
  paginatedWineries?: Maybe<Array<Winery>>;
};

export type Winery = {
  amenities?: Maybe<Array<Amenity>>;
  architecturalReferences?: Maybe<Scalars['Boolean']>;
  contactEmail?: Maybe<Scalars['String']>;
  contactName?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  covidLabel?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  enologoName?: Maybe<Scalars['String']>;
  foundationYear?: Maybe<Scalars['Int']>;
  googleMapsUrl?: Maybe<Scalars['String']>;
  handicappedFriendly?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  othersServices?: Maybe<Array<OtherServices>>;
  petFriendly?: Maybe<Scalars['Boolean']>;
  postalAddress?: Maybe<Scalars['String']>;
  productRegion?: Maybe<Scalars['String']>;
  productionType?: Maybe<Array<ProductionType>>;
  services?: Maybe<Array<Service>>;
  supportedLanguages?: Maybe<Array<ServiceLanguage>>;
  updatedAt: Scalars['DateTime'];
  urlImageCover?: Maybe<Scalars['String']>;
  valley: Valley;
  verified?: Maybe<Scalars['Boolean']>;
  wineGrapesProduction?: Maybe<Array<Grape>>;
  wineType?: Maybe<Array<TypeWine>>;
  yearlyWineProduction?: Maybe<Scalars['Int']>;
  younerFriendly?: Maybe<Scalars['Boolean']>;
};

export type WineryChangeResponse = {
  changed: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type WineryDataInputs = {
  amenities?: Maybe<Array<Amenity>>;
  contactEmail?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  covidLabel: Scalars['Boolean'];
  description: Scalars['String'];
  foundationYear?: Maybe<Scalars['Int']>;
  googleMapsUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  productionType: Array<ProductionType>;
  supportedLanguages?: Maybe<Array<ServiceLanguage>>;
  valley: Valley;
  wineType: Array<TypeWine>;
  yearlyWineProduction?: Maybe<Scalars['Int']>;
};

export type WineryDeleteImageResponse = {
  deleted: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type WineryImageGallery = {
  coverPage: Scalars['Boolean'];
  id?: Maybe<Scalars['Float']>;
  imageUrl?: Maybe<Scalars['String']>;
  wineryId?: Maybe<Scalars['Float']>;
};

export type WineryResponse = {
  errors?: Maybe<Array<FieldError>>;
  winery?: Maybe<User>;
};

export type WineryServicesResponse = {
  errors?: Maybe<Array<FieldError>>;
  images: Array<WineryImageGallery>;
  services: Array<Service>;
  winery: Winery;
};

export type PostDeletion = {
  deleted: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type ErrorFragmentFragment = { field: string, message: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: Maybe<{ errors?: Maybe<Array<{ field: string, message: string }>>, user?: Maybe<{ id: number, username: string, email: string, userType: UserType, wineryId?: Maybe<number>, urlImage?: Maybe<string> }> }> };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
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