import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FC, ReactNode } from "react";
import { Step } from "./Step";
import { StepContent } from "./StepContent";
import { Steps } from "./Steps";
import { useSteps } from "./useSteps";
import { useTranslation } from "react-i18next";

export interface Step {
  title: string;
  content: ReactNode;
}

interface VerticalStepsProps {
  steps: Step[];
  isLoading: boolean;
  withSave?: boolean;
  finalStepText?: string;
}

export const VerticalSteps: FC<VerticalStepsProps> = ({
  steps,
  isLoading,
  withSave = false,
  finalStepText = "You completed the form",
}) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [t] = useTranslation("global");

  return (
    <Box minH="300px" minW="400px">
      <Steps activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.title} title={step.title}>
            <StepContent>
              <Stack shouldWrapChildren spacing="4">
                {step.content}
                <HStack>
                  {withSave && (
                    <Button
                      size="sm"
                      verticalAlign="baseline"
                      variant="outline"
                      type="submit"
                      isLoading={isLoading}
                      mr={5}
                    >
                      {t("save")}
                    </Button>
                  )}
                  {index !== 0 && (
                    <Button size="sm" variant="ghost" onClick={prevStep}>
                      {t("back")}
                    </Button>
                  )}
                  <Button size="sm" onClick={nextStep}>
                    {t("next")}
                  </Button>
                </HStack>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Steps>
      <HStack
        display={activeStep === steps.length ? "flex" : "none"}
        mt="10"
        spacing="4"
        shouldWrapChildren
      >
        <Text>{t("completedSteps")}</Text>
        <Button
          size="sm"
          onClick={reset}
          variant="outline"
          verticalAlign="baseline"
        >
          {t("reset")}
        </Button>
        {withSave && (
          <Button
            size="sm"
            verticalAlign="baseline"
            variant="outline"
            type="submit"
            isLoading={isLoading}
            mr={5}
          >
            {t("save")}
          </Button>
        )}
      </HStack>
    </Box>
  );
};
