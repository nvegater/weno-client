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

export type CreateWineryInputs = {
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

export type Experience = {
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  eventType: ExperienceType;
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
  rRules?: Maybe<Array<Scalars['String']>>;
  extraDates?: Maybe<Array<Scalars['String']>>;
  limitOfAttendees: Scalars['Int'];
  noOfAttendees?: Maybe<Scalars['Int']>;
  pricePerPersonInDollars: Scalars['Float'];
  pictures: Array<Picture>;
  wineryId: Scalars['Int'];
  winery: Winery;
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

export type FieldError = {
  field: Scalars['String'];
  message: Scalars['String'];
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
  createWinery: WineryResponse;
};


export type MutationCreateWineryArgs = {
  createWineryInputs: CreateWineryInputs;
  userInputs: UserInputs;
};

/** differents kind of services */
export enum OtherServices {
  Hospedaje = 'HOSPEDAJE',
  Restaurante = 'RESTAURANTE',
  BarraDeAlimentos = 'BARRA_DE_ALIMENTOS'
}

export type Picture = {
  id?: Maybe<Scalars['Float']>;
  experienceId: Scalars['Int'];
  experience: Experience;
  imageUrl?: Maybe<Scalars['String']>;
  coverPage: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

/** Types of wine production */
export enum ProductionType {
  Comercial = 'COMERCIAL',
  TradArtesanal = 'TRAD_ARTESANAL',
  OrgBioNat = 'ORG_BIO_NAT'
}

export type Query = {
  allExperiences: Scalars['Int'];
  allPictures: Scalars['Int'];
  allReservations: Scalars['Int'];
  allWineries: Scalars['Int'];
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
  creatorUsername: Scalars['String'];
  creatorEmail: Scalars['String'];
  description: Scalars['String'];
  foundationYear?: Maybe<Scalars['Int']>;
  experiences?: Maybe<Array<Experience>>;
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

export type WineryResponse = {
  errors?: Maybe<Array<FieldError>>;
  winery?: Maybe<Winery>;
};

export type ErrorFragmentFragment = { field: string, message: string };

export type ExperienceFragmentFragment = { createdAt: any, description: string, endDateTime: any, eventType: ExperienceType, extraDates?: Array<string> | null | undefined, id: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, pricePerPersonInDollars: number, rRules?: Array<string> | null | undefined, startDateTime: any, title: string, updatedAt: any, wineryId: number };

export type WineryFragmentFragment = { amenities?: Array<Amenity> | null | undefined, architecturalReferences?: boolean | null | undefined, contactEmail?: string | null | undefined, contactName?: string | null | undefined, contactPhoneNumber?: string | null | undefined, covidLabel?: boolean | null | undefined, createdAt: any, creatorEmail: string, creatorUsername: string, description: string, enologoName?: string | null | undefined, foundationYear?: number | null | undefined, googleMapsUrl?: string | null | undefined, handicappedFriendly?: boolean | null | undefined, id: number, logo?: string | null | undefined, name: string, othersServices?: Array<OtherServices> | null | undefined, petFriendly?: boolean | null | undefined, postalAddress?: string | null | undefined, productRegion?: string | null | undefined, productionType?: Array<ProductionType> | null | undefined, supportedLanguages?: Array<ServiceLanguage> | null | undefined, updatedAt: any, urlImageCover?: string | null | undefined, valley: Valley, verified?: boolean | null | undefined, wineGrapesProduction?: Array<Grape> | null | undefined, wineType?: Array<TypeWine> | null | undefined, yearlyWineProduction?: number | null | undefined, younerFriendly?: boolean | null | undefined, experiences?: Array<{ createdAt: any, description: string, endDateTime: any, eventType: ExperienceType, extraDates?: Array<string> | null | undefined, id: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, pricePerPersonInDollars: number, rRules?: Array<string> | null | undefined, startDateTime: any, title: string, updatedAt: any, wineryId: number }> | null | undefined };

export type CreateWineryMutationVariables = Exact<{
  userInputs: UserInputs;
  createWineryInputs: CreateWineryInputs;
}>;


export type CreateWineryMutation = { createWinery: { errors?: Array<{ field: string, message: string }> | null | undefined, winery?: { amenities?: Array<Amenity> | null | undefined, architecturalReferences?: boolean | null | undefined, contactEmail?: string | null | undefined, contactName?: string | null | undefined, contactPhoneNumber?: string | null | undefined, covidLabel?: boolean | null | undefined, createdAt: any, creatorEmail: string, creatorUsername: string, description: string, enologoName?: string | null | undefined, foundationYear?: number | null | undefined, googleMapsUrl?: string | null | undefined, handicappedFriendly?: boolean | null | undefined, id: number, logo?: string | null | undefined, name: string, othersServices?: Array<OtherServices> | null | undefined, petFriendly?: boolean | null | undefined, postalAddress?: string | null | undefined, productRegion?: string | null | undefined, productionType?: Array<ProductionType> | null | undefined, supportedLanguages?: Array<ServiceLanguage> | null | undefined, updatedAt: any, urlImageCover?: string | null | undefined, valley: Valley, verified?: boolean | null | undefined, wineGrapesProduction?: Array<Grape> | null | undefined, wineType?: Array<TypeWine> | null | undefined, yearlyWineProduction?: number | null | undefined, younerFriendly?: boolean | null | undefined, experiences?: Array<{ createdAt: any, description: string, endDateTime: any, eventType: ExperienceType, extraDates?: Array<string> | null | undefined, id: number, limitOfAttendees: number, noOfAttendees?: number | null | undefined, pricePerPersonInDollars: number, rRules?: Array<string> | null | undefined, startDateTime: any, title: string, updatedAt: any, wineryId: number }> | null | undefined } | null | undefined } };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
export const ExperienceFragmentFragmentDoc = gql`
    fragment ExperienceFragment on Experience {
  createdAt
  description
  endDateTime
  eventType
  extraDates
  id
  limitOfAttendees
  noOfAttendees
  pricePerPersonInDollars
  rRules
  startDateTime
  title
  updatedAt
  wineryId
}
    `;
export const WineryFragmentFragmentDoc = gql`
    fragment WineryFragment on Winery {
  amenities
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
}
    ${ExperienceFragmentFragmentDoc}`;
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
  }
}
    ${WineryFragmentFragmentDoc}`;

export function useCreateWineryMutation() {
  return Urql.useMutation<CreateWineryMutation, CreateWineryMutationVariables>(CreateWineryDocument);
};