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
      return "English";
    case ServiceLanguage.Espanol:
      return "Spanish";
    case ServiceLanguage.SenasMexicanas:
      return "Sign Language";
    case ServiceLanguage.Frances:
      return "French";
    case ServiceLanguage.Italiano:
      return "Italian";
    case ServiceLanguage.Portugues:
      return "Portuguese";
    case ServiceLanguage.Japones:
      return "Japanese";
    case ServiceLanguage.Mandarin:
      return "Mandarin";
    case ServiceLanguage.Aleman:
      return "German";
  }
};
export const amenitiesReverseMapping = (value: Amenity) => {
  switch (value) {
    case Amenity.Terraza:
      return "Terrace";
    case Amenity.Degustacion:
      return "Tasting";
    case Amenity.RecorridoVinedos:
      return "Wineyard Tour";
    case Amenity.RecorridoBodega:
      return "Winery Tour";
    case Amenity.PaseoCarreta:
      return "Wagon Ride";
    case Amenity.VisitaCavaBarricas:
      return "Cellar Barrels";
    case Amenity.CataBarricas:
      return "Barrel Tasting";
    case Amenity.CreaTuMezcla:
      return "Wine Mix";
    case Amenity.TalleresDidacticos:
      return "Didactic Workshop";
    case Amenity.CatasMaridajes:
      return "Tasting and Pairing";
    case Amenity.CatasPrivadas:
      return "Private Tasting";
    case Amenity.ActividadesEnVinedo:
      return "Vineyard Activities";
    default:
      return "";
  }
};

export const wineTypeReverseMapping = (value: TypeWine) => {
  switch (value) {
    case TypeWine.BlancoJoven:
      return "White-young";
    case TypeWine.BlancoConBarrica:
      return "Barrel aged white";
    case TypeWine.Rosado:
      return "Rose";
    case TypeWine.TintoJoven:
      return "Red";
    case TypeWine.TintoCrianzaBarrica:
      return "Barrel aged red";
    case TypeWine.GenerosoFortificado:
      return "Fortified";
    case TypeWine.Espumoso:
      return "Sparkling";
    case TypeWine.Naranja:
      return "Orange";
    case TypeWine.Dulce:
      return "Sweet";
    case TypeWine.Cosecha:
      return "Late harvest";
    case TypeWine.ConmemorativoEdiLimitada:
      return "Commemorative";
    case TypeWine.ExclusivoVentaLocal:
      return "Exclusive";
    case TypeWine.Organico:
      return "Organic";
    case TypeWine.Biodinamico:
      return "Biodynamic";
    case TypeWine.Natural:
      return "Natural";
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
      return "Food Bar";
    case OtherServices.Hospedaje:
      return "Lodging";
    case OtherServices.Restaurante:
      return "Restaurant";
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
