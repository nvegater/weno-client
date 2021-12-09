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
  ProductionType,
  TypeWine,
  useCreateWineryMutation,
  Valley,
} from "../../graphql/generated/graphql";
import {
  productionTypeReverseMapping,
  removeNonStringsFromArray,
  valleyReverseMapping,
  wineTypeReverseMapping,
} from "./utils";
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
    const correctedValues = {
      ...data,
      productionType: removeNonStringsFromArray(data.productionType),
      wineType: removeNonStringsFromArray(data.wineType),
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
    if (error || (res && res.createWinery.errors !== null)) {
      setError("submit", {
        type: res.createWinery.errors[0].field || error.name,
        message: res.createWinery.errors[0].message || error.message,
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
          <FormControl isInvalid={errors.name}>
            <Input
              type="text"
              placeholder={t("wineryName")}
              {...register("name", {
                required: "Please enter the name of your winery",
                minLength: 3,
                maxLength: 50,
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description}>
            <Textarea
              type="text"
              placeholder={t("wineryDescription")}
              {...register("description", {
                required: "Please enter a description",
                minLength: {
                  value: 20,
                  message: "Please enter at least 20 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.urlAlias}>
            <FormLabel for="urlAlias">Alias</FormLabel>
            <InputGroup size="sm">
              <InputLeftAddon>weno-mx.com/winery/</InputLeftAddon>
              <Input
                type="text"
                placeholder="url alias"
                {...register("urlAlias", {
                  required: "Please enter an alias",
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
                  {productionTypeReverseMapping(pt)}
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
                  {wineTypeReverseMapping(tw)}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
        </VStack>
      ),
    },
    {
      title: t("covid19"),
      content: (
        <FormControl mb={8}>
          <FormLabel htmlFor="covidLabel" visibility="hidden">
            {t("covid19")}
          </FormLabel>
          <Checkbox {...register(`covidLabel`)}>
            {t("covid19Checkbox")}
          </Checkbox>
          <Text>
            Read more{" "}
            <ChakraLink
              href="https://www.who.int/water_sanitation_health/hygiene/settings/hvchap8.pdf"
              color="teal.500"
              target="_blank"
            >
              {" "}
              here
            </ChakraLink>
          </Text>
        </FormControl>
      ),
    },
    {
      title: t("subscription"),
      content: (
        <RadioGroup
          control={control}
          name="subscription"
          label={t("subscription")}
          elements={[
            { name: t("basicSubscription") },
            { name: t("intermediateSubscription") },
            { name: t("premiumSubscription") },
          ]}
          isRequired
        />
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
