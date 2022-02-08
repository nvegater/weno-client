import {
  Amenity,
  ExperienceType,
  Grape,
  OtherServices,
  ProductionType,
  ServiceLanguage,
  SlotType,
  TypeWine,
  Valley,
} from "../../graphql/generated/graphql";
import {
  allDay,
  concert,
  degustation,
  oneTime,
  pairing,
  recurrent,
} from "../Experiences/CreateExperienceForm";
import { RadioElement } from "../Radio/RadioGroup";

export const removeNonStringsFromArray = (array: any[]) => {
  return array.filter((item) => typeof item === "string");
};

export const mapSlotType = (formSlotType: string): SlotType => {
  switch (formSlotType) {
    case oneTime:
      return SlotType.OneTime;
    case recurrent:
      return SlotType.Recurrent;
    case allDay:
      return SlotType.AllDay;
  }
};

export const mapEventType = (formExperienceType: string): ExperienceType => {
  switch (formExperienceType) {
    case degustation:
      return ExperienceType.Degustation;
    case pairing:
      return ExperienceType.WineDinnerPairing;
    case concert:
      return ExperienceType.Concert;
  }
};

export const expTypeToRadioElement = (
  expType: ExperienceType
): RadioElement => {
  switch (expType) {
    case ExperienceType.Degustation:
      return { name: degustation };
    case ExperienceType.WineDinnerPairing:
      return { name: pairing };
    case ExperienceType.Concert:
      return { name: concert };
  }
};

export const experienceTypeReverseMapping = (
  formExperienceType: ExperienceType
): string => {
  switch (formExperienceType) {
    case ExperienceType.Degustation:
      return "Degustation";
    case ExperienceType.WineDinnerPairing:
      return "Pairing";
    case ExperienceType.Concert:
      return "Concert";
  }
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
    case TypeWine.Blanco:
      return "White-young";
    case TypeWine.BlancoConBarrica:
      return "Barrel aged white";
    case TypeWine.Rosado:
      return "Rose";
    case TypeWine.TintoCrianza:
      return "Red";
    case TypeWine.TintoReserva:
      return "Red (Reserve)";
    case TypeWine.TintoGranReserva:
      return "Red (Gran Reserve)";
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
    case TypeWine.Conmemorativo:
      return "Commemorative";
    case TypeWine.ExclusivoVentaLocal:
      return "Exclusive";
    case TypeWine.Organico:
      return "Organic";
    case TypeWine.Biodinamico:
      return "Biodynamic";
    case TypeWine.Natural:
      return "Natural";
    case TypeWine.Otro:
      return "Other";
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
