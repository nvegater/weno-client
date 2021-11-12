import {
  Amenity,
  Grape,
  OtherServices,
  ProductionType,
  ServiceLanguage,
  TypeWine,
  Valley,
} from "../../graphql/generated/graphql";

export const removeNonStringsFromArray = (array: any[]) => {
  return array.filter((item) => typeof item === "string");
};

export const productionTypeReverseMapping = (value: ProductionType) => {
  switch (value) {
    case ProductionType.Comercial:
      return "Commercial production";
    case ProductionType.OrgBioNat:
      return "Organic production";
    case ProductionType.TradArtesanal:
      return "Traditional production";
  }
};

export const supportedLanguagesReverseMapping = (value: ServiceLanguage) => {
  switch (value) {
    case ServiceLanguage.Ingles:
      return "english";
    case ServiceLanguage.Espanol:
      return "spanish";
    case ServiceLanguage.SenasMexicanas:
      return "signLanguage";
    case ServiceLanguage.Frances:
      return "french";
    case ServiceLanguage.Italiano:
      return "italian";
    case ServiceLanguage.Portugues:
      return "portuguese";
    case ServiceLanguage.Japones:
      return "japanese";
    case ServiceLanguage.Mandarin:
      return "mandarin";
    case ServiceLanguage.Aleman:
      return "german";
  }
};
export const amenitiesReverseMapping = (value: Amenity) => {
  switch (value) {
    case Amenity.Terraza:
      return "terrace";
    case Amenity.Degustacion:
      return "tasting";
    case Amenity.RecorridoVinedos:
      return "wineyardTour";
    case Amenity.RecorridoBodega:
      return "wineryTour";
    case Amenity.PaseoCarreta:
      return "wagonRide";
    case Amenity.VisitaCavaBarricas:
      return "cellarBarrels";
    case Amenity.CataBarricas:
      return "barrelTasting";
    case Amenity.CreaTuMezcla:
      return "wineMix";
    case Amenity.TalleresDidacticos:
      return "didacticWorkshop";
    case Amenity.CatasMaridajes:
      return "tastingAndPairing";
    case Amenity.CatasPrivadas:
      return "privateTasting";
    case Amenity.ActividadesEnVinedo:
      return "vineyardActivities";
    default:
      return "";
  }
};

export const wineTypeReverseMapping = (value: TypeWine) => {
  switch (value) {
    case TypeWine.BlancoJoven:
      return "whiteYoung";
    case TypeWine.BlancoConBarrica:
      return "barrelAgedWhite";
    case TypeWine.Rosado:
      return "roseWine";
    case TypeWine.TintoJoven:
      return "wineRed";
    case TypeWine.TintoCrianzaBarrica:
      return "agedBarrelRed";
    case TypeWine.GenerosoFortificado:
      return "fortifiedWine";
    case TypeWine.Espumoso:
      return "sparklingWine";
    case TypeWine.Naranja:
      return "orangeWine";
    case TypeWine.Dulce:
      return "sweetWine";
    case TypeWine.Cosecha:
      return "lateHarvestWine";
    case TypeWine.ConmemorativoEdiLimitada:
      return "commemorativeWine";
    case TypeWine.ExclusivoVentaLocal:
      return "exclusiveWine";
    case TypeWine.Organico:
      return "organicWine";
    case TypeWine.Biodinamico:
      return "biodynamicWine";
    case TypeWine.Natural:
      return "naturalWine";
    default:
      return "";
  }
};

export const valleyReverseMapping = (value: Valley) => {
  switch (value) {
    case Valley.Ensenada:
      return "Ensenada";
    case Valley.Grulla:
      return "La Grulla";
    case Valley.Guadalupe:
      return "Guadalupe";
    case Valley.OjosNegros:
      return "Ojos Negros";
    case Valley.SanAntMinas:
      return "San Antonio de las Minas";
    case Valley.SanQuintin:
      return "San Quintín";
    case Valley.SantoTomas:
      return "Santo Tomas";
    case Valley.SanVicente:
      return "San Vicente";
    case Valley.Calafia:
      return "Calafia";
    default:
      return "";
  }
};

export const otherServicesReverseMapping = (otherService: OtherServices) => {
  switch (otherService) {
    case OtherServices.BarraDeAlimentos:
      return "foodBar";
    case OtherServices.Hospedaje:
      return "lodging";
    case OtherServices.Restaurante:
      return "restaurant";
  }
};

export const weekdaysReverseMapping = (weekday: string) => {
  switch (weekday) {
    case "MO":
      return "Monday";
    case "TU":
      return "Tuesday";
    case "WE":
      return "Wednesday";
    case "TH":
      return "Thursday";
    case "FR":
      return "Friday";
    case "SA":
      return "Saturday";
    case "SU":
      return "Sunday";
    default:
      return "";
  }
};

export const grapeReverseMapping = (grape: Grape) => {
  switch (grape) {
    case Grape.Aglianico:
      return "aglianico";
    case Grape.Barbera:
      return "barbera";
    case Grape.Brunello:
      return "brunello";
    case Grape.CabernetFranc:
      return "cabernetFranc";
    case Grape.CabernetSauvignon:
      return "cabernetSauvignon";
    case Grape.Carignan:
      return "carignan";
    case Grape.Chardonnay:
      return "chardonnay";
    case Grape.CheninBlanc:
      return "cheninBlanc";
    case Grape.Cinsaul:
      return "cinsaul";
    case Grape.Colombard:
      return "colombard";
    case Grape.Gewurztraminer:
      return "gewurztraminer";
    case Grape.Grenache:
      return "grenache";
    case Grape.GrenacheBlanc:
      return "grenacheBlanc";
    case Grape.Malbec:
      return "malbec";
    case Grape.MalvasiaBlanca:
      return "malvasiaBlanca";
    case Grape.MalvasiaTinta:
      return "malvasiaTinta";
    case Grape.Merlot:
      return "merlot";
    case Grape.Mision:
      return "mision";
    case Grape.Montepulciano:
      return "montepulciano";
    case Grape.Moscatel:
      return "moscatel";
    case Grape.Mourvedre:
      return "mourvedre";
    case Grape.Nebbiolo:
      return "nebbiolo";
    case Grape.Palomino:
      return "palomino";
    case Grape.PetiteVerdot:
      return "petiteVerdot";
    case Grape.PinotBlanc:
      return "pinotBlanc";
    case Grape.PinotGris:
      return "pinotGris";
    case Grape.PinotNoir:
      return "pinotNoir";
    case Grape.Riesling:
      return "riesling";
    case Grape.RubiCabernet:
      return "rubiCabernet";
    case Grape.Sangiovese:
      return "sangiovese";
    case Grape.SauvignonBlanc:
      return "sauvignonBlanc";
    case Grape.Semillon:
      return "semillon";
    case Grape.Sinsault:
      return "sinsault";
    case Grape.Syrah:
      return "syrah";
    case Grape.Tempranillo:
      return "tempranillo";
    case Grape.Viognier:
      return "viognier";
    case Grape.Zinfandel:
      return "zinfandel";
    case Grape.Otra:
      return "other";
  }
};
