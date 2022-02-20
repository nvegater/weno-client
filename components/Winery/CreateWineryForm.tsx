import React, { FC } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Link as ChakraLink,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  Amenity,
  CreateWineryInputs,
  ProductionType,
  ServiceLanguage,
  TypeWine,
  useCreateWineryMutation,
  Valley,
} from "../../graphql/generated/graphql";
import {
  amenitiesReverseMapping,
  productionTypeReverseMapping,
  removeNonStringsFromArray,
  supportedLanguagesReverseMapping,
  valleyReverseMapping,
  wineTypeReverseMapping,
} from "../utils/enum-utils";
import { ContextHeader } from "../Authentication/useAuth";
import { Step, VerticalSteps } from "../VerticalSteps/VerticalSteps";
import { ErrorMessage } from "@hookform/error-message";
import RadioGroup from "../Radio/RadioGroup";
import { useTranslation } from "react-i18next";

interface CreateWineryFormProps {
  username: string;
  email: string;
  contextHeader: ContextHeader;
}
type ErrorSummaryProps<T> = {
  errors: FieldErrors<T>;
};

export function ErrorSummary<T>({ errors }: ErrorSummaryProps<T>) {
  if (Object.keys(errors).length === 0) {
    return null;
  }
  return (
    <div className="error-summary">
      {Object.keys(errors).map((fieldName) => (
        <ErrorMessage
          errors={errors}
          name={fieldName as any}
          as="div"
          key={fieldName}
        />
      ))}
    </div>
  );
}

export const CreateWineryForm: FC<CreateWineryFormProps> = ({
  username,
  email,
  contextHeader,
}) => {
  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const [, createWinery] = useCreateWineryMutation();
  const [t] = useTranslation("global");

  const onSubmit = async (data) => {
    const correctedValues: CreateWineryInputs = {
      ...data,
      productionType: removeNonStringsFromArray(data.productionType),
      wineType: removeNonStringsFromArray(data.wineType),
      supportedLanguages: removeNonStringsFromArray(data.supportedLanguages),
      amenities: removeNonStringsFromArray(data.amenities),
    };

    const baseURL = window.location.protocol + "//" + window.location.host;
    const successUrl = baseURL + `/winery/${data.urlAlias}`;
    const cancelUrl = baseURL + "/error";
    const { data: res, error } = await createWinery(
      {
        userInputs: {
          email,
          username,
          successUrl: successUrl,
          cancelUrl: cancelUrl,
        },
        createWineryInputs: { ...correctedValues },
      },
      { ...contextHeader, requestPolicy: "network-only" }
    );
    if (error) {
      setError("submit", {
        type: error?.name,
        message: error?.message,
      });
    } else {
      window.location.href = res.createWinery.sessionUrl;
    }
  };

  const formSteps: Step[] = [
    {
      title: t("general"),
      content: (
        <VStack spacing="24px" mt={4} mb={8}>
          <FormControl isInvalid={errors.name} isRequired={true}>
            <FormLabel for="name">{t("wineryName")}</FormLabel>
            <Input
              type="text"
              {...register("name", {
                required: { value: true, message: t("wineryNameMessage") },
                minLength: 3,
                maxLength: 50,
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description} isRequired={true}>
            <FormLabel for="description">{t("wineryDescription")}</FormLabel>
            <Textarea
              type="text"
              {...register("description", {
                required: { value: true, message: t("descriptionText") },
                minLength: {
                  value: 20,
                  message: t("descriptionMessage"),
                },
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.urlAlias} isRequired={true}>
            <FormLabel for="urlAlias">Alias</FormLabel>
            <InputGroup size="sm">
              <InputLeftAddon>weno-mx.com/winery/</InputLeftAddon>
              <Input
                type="text"
                placeholder="url alias"
                {...register("urlAlias", {
                  required: { value: true, message: t("aliasText") },
                  minLength: {
                    value: 6,
                    message: t("minAlias"),
                  },
                  maxLength: {
                    value: 12,
                    message: t("maxAlias"),
                  },
                })}
              />
            </InputGroup>
            <Text my={2}>{t("wineryAliasDescription")}</Text>
            <FormErrorMessage>
              {errors.alias && errors.alias.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.yearlyWineProduction}>
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
          <FormControl isInvalid={errors.foundationYear}>
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
            <FormLabel htmlFor="googleMapsUrl">{t("location")}</FormLabel>
            <Input
              type="text"
              placeholder={t("urlMapBox")}
              {...register("googleMapsUrl")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="valley">{t("valley")}</FormLabel>
            <Select selected={Valley.Ensenada} {...register("valley")}>
              {Object.values(Valley).map((valley) => (
                <option key={valley} value={valley}>
                  {valleyReverseMapping(valley)}
                </option>
              ))}
            </Select>
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
      title: t("languages"),
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
    {
      title: "COVID-19",
      content: (
        <FormControl mb={8}>
          <FormLabel htmlFor="covidLabel" visibility="hidden">
            {t("covid19")}
          </FormLabel>
          <Checkbox {...register(`covidLabel`)}>
            {t("covid19Checkbox")}
          </Checkbox>
          <Text>
            {t("read+")}{" "}
            <ChakraLink
              href="https://www.who.int/water_sanitation_health/hygiene/settings/hvchap8.pdf"
              color="teal.500"
              target="_blank"
            >
              {" "}
              {t("here")}
            </ChakraLink>
          </Text>
        </FormControl>
      ),
    },
    {
      title: t("subscriptions"),
      content: (
        <>
          <RadioGroup
            control={control}
            name="subscription"
            label={t("requiredField")}
            elements={[
              { name: "Basic" },
              { name: "Intermediate" },
              { name: "Premium" },
            ]}
            isRequired
          />
          <Text>
            {t("notSure?")}
            <ChakraLink href="/subscriptions" color="teal.500" target="_blank">
              {" "}
              {t("subscriptionPlans")}
            </ChakraLink>
          </Text>
        </>
      ),
    },
  ];

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading mb={8}>{t("yourWinery")}</Heading>
      <Box mb={"3em"}>
        <VerticalSteps steps={formSteps} isLoading={false} />
      </Box>

      <FormControl isInvalid={Boolean(errors)}>
        <FormErrorMessage>
          <ErrorSummary errors={errors} />
        </FormErrorMessage>
      </FormControl>

      <Button
        variant="secondaryWeno"
        type="submit"
        isLoading={isSubmitting}
        mt={"3em"}
        disabled={isSubmitting}
      >
        {t("submit")}
      </Button>
    </VStack>
  );
};
