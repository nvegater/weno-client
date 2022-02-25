import React, { FC } from "react";
import {
  Amenity,
  EditWineryInputs,
  ProductionType,
  ServiceLanguage,
  TypeWine,
  useEditWineryInfoMutation,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Step, VerticalSteps } from "../VerticalSteps/VerticalSteps";
import { ErrorSummary } from "./CreateWineryForm";
import { useForm } from "react-hook-form";
import { getToastMessage } from "../utils/chakra-utils";
import {
  amenitiesReverseMapping,
  productionTypeReverseMapping,
  removeNonStringsFromArray,
  supportedLanguagesReverseMapping,
  wineTypeReverseMapping,
} from "../utils/enum-utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface EditWineryInputsForm extends EditWineryInputs {
  winery: string;
}

interface EditWineryInfoProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

export const EditWineryInfo: FC<EditWineryInfoProps> = ({
  contextHeader,
  winery,
}) => {
  const toast = useToast();
  const router = useRouter();
  const [t] = useTranslation("global");

  const preSelectedProductionTypes = winery.productionType;
  const preSelectedWineTypes = winery.wineType;
  const preSelectedLanguages = winery.supportedLanguages;
  const preSelectedAmenities = winery.amenities;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditWineryInputsForm>({
    mode: "onTouched",
    defaultValues: {
      description: winery.description,
      yearlyWineProduction: winery.yearlyWineProduction,
      foundationYear: winery.foundationYear,
      googleMapsUrl: winery.googleMapsUrl ?? "",
      productionType: preSelectedProductionTypes,
      wineType: preSelectedWineTypes,
      supportedLanguages: preSelectedLanguages,
      amenities: preSelectedAmenities,
    },
  });
  const [, editWinery] = useEditWineryInfoMutation();

  const onSubmit = async (data: EditWineryInputs) => {
    const editWineryInputs = {
      wineryId: winery.id,
      description: data.description,
      yearlyWineProduction: data.yearlyWineProduction,
      foundationYear: data.foundationYear,
      googleMapsUrl: data.googleMapsUrl,
      productionType: removeNonStringsFromArray(data.productionType),
      wineType: removeNonStringsFromArray(data.wineType),
      supportedLanguages: removeNonStringsFromArray(data.supportedLanguages),
      amenities: removeNonStringsFromArray(data.amenities),
    };
    const { data: editWineryResponse, error } = await editWinery(
      {
        editWineryInputs: editWineryInputs,
      },
      { ...contextHeader, requestPolicy: "network-only" }
    );
    if (error) {
      setError("winery", {
        type: error.name,
        message: error.message,
      });
    }
    if (editWineryResponse?.editWinery.errors !== null) {
      setError("winery", {
        type: "Field error",
        message: editWineryResponse?.editWinery.errors[0].message ?? "Error",
      });
    }
    if (editWineryResponse?.editWinery.winery) {
      toast(getToastMessage("saved"));
      router.reload();
    }
  };

  const formSteps: Step[] = [
    {
      title: t("general"),
      content: (
        <VStack spacing="24px" mt={4} mb={8}>
          <FormControl isInvalid={Boolean(errors.description)}>
            <Textarea
              type="text"
              placeholder={t("wineryDescription")}
              {...register("description", {
                required: { value: true, message: t("descriptionText") },
                value: winery.description,
                minLength: {
                  value: 20,
                  message: t("minAlias"),
                },
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.yearlyWineProduction)}>
            <FormLabel htmlFor="yearlyWineProduction">
              {t("yearlyProduction")}
            </FormLabel>
            <Input
              type="number"
              placeholder={t("litersPerYear")}
              {...register("yearlyWineProduction", {
                valueAsNumber: true,
                max: { value: 1000000, message: t("yearlyProductionMessage") },
              })}
            />
            <FormErrorMessage>
              {errors.yearlyWineProduction &&
                errors.yearlyWineProduction.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.foundationYear)}>
            <FormLabel htmlFor="foundationYear">
              {t("foundationYear")}
            </FormLabel>
            <Input
              type="number"
              placeholder="e.g. 1992"
              {...register("foundationYear", {
                valueAsNumber: true,
                max: { value: 2022, message: t("lateDate") },
                min: { value: 0, message: t("earlyDate") },
              })}
            />
            <FormErrorMessage>
              {errors.foundationYear && errors.foundationYear.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
      ),
    },
    {
      title: t("location"),
      content: (
        <VStack spacing="24px" mt={4} mb={8}>
          <FormControl>
            <FormLabel htmlFor="googleMapsUrl" visibility="hidden">
              Google maps url
            </FormLabel>
            <Input
              type="text"
              placeholder="Google maps link"
              {...register("googleMapsUrl")}
            />
          </FormControl>
        </VStack>
      ),
    },
    {
      title: t("productionType"),
      content: (
        <VStack spacing="24px" mb={8}>
          <FormControl>
            <FormLabel htmlFor="productionType" visibility="hidden">
              {t("productionType")}
            </FormLabel>
            <VStack justifyContent="start" alignItems="start">
              {Object.values(ProductionType).map((pt, index) => (
                <Checkbox
                  key={`productionType.${index}`}
                  defaultChecked={preSelectedProductionTypes.includes(pt)}
                  value={pt}
                  {...register(`productionType.${index}`)}
                >
                  {t(productionTypeReverseMapping(pt))}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
        </VStack>
      ),
    },
    {
      title: t("wineType"),
      content: (
        <VStack spacing="24px" mb={8}>
          <FormControl>
            <FormLabel htmlFor="wineType" visibility="hidden">
              {t("wineType")}
            </FormLabel>
            <VStack justifyContent="start" alignItems="start">
              {Object.values(TypeWine).map((tw, index) => (
                <Checkbox
                  key={`wineType.${index}`}
                  defaultChecked={preSelectedWineTypes.includes(tw)}
                  value={tw}
                  {...register(`wineType.${index}`)}
                >
                  {t(wineTypeReverseMapping(tw))}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
        </VStack>
      ),
    },
    {
      title: t("supportedLanguages"),
      content: (
        <VStack spacing="24px" mb={8}>
          <FormControl>
            <FormLabel htmlFor="supportedLanguages" visibility="hidden">
              {t("supportedLanguages")}
            </FormLabel>
            <VStack justifyContent="start" alignItems="start">
              {Object.values(ServiceLanguage).map((language, index) => (
                <Checkbox
                  key={`supportedLanguages.${index}`}
                  defaultChecked={preSelectedLanguages.includes(language)}
                  value={language}
                  {...register(`supportedLanguages.${index}`)}
                >
                  {t(supportedLanguagesReverseMapping(language))}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
        </VStack>
      ),
    },
    {
      title: t("amenities"),
      content: (
        <VStack spacing="24px" mb={8}>
          <FormControl>
            <FormLabel htmlFor="amenities" visibility="hidden">
              {t("amenities")}
            </FormLabel>
            <VStack justifyContent="start" alignItems="start">
              {Object.values(Amenity).map((amenity, index) => (
                <Checkbox
                  key={`amenities.${index}`}
                  defaultChecked={preSelectedAmenities.includes(amenity)}
                  value={amenity}
                  {...register(`amenities.${index}`)}
                >
                  {t(amenitiesReverseMapping(amenity))}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
        </VStack>
      ),
    },
  ];
  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading mb={8}>{t("editYourWinery")}</Heading>
      <Box mb={"3em"}>
        <VerticalSteps steps={formSteps} isLoading={false} />
      </Box>
      <Flex justifyContent="center" alignItems="center" flexDir="column">
        <Box>
          <FormControl isInvalid={Boolean(errors)}>
            <FormErrorMessage>
              <ErrorSummary errors={errors} />
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Button
          variant="secondaryWeno"
          size="navBarCTA"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {t("save")}
        </Button>
      </Flex>
    </VStack>
  );
};
