import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FC, ReactNode } from "react";
import { Step } from "./Step";
import { StepContent } from "./StepContent";
import { Steps } from "./Steps";
import { useSteps } from "./useSteps";

export interface Step {
  title: string;
  content: ReactNode;
}

interface VerticalStepsProps {
  steps: Step[];
  isLoading: boolean;
  withSave?: boolean;
}

export const VerticalSteps: FC<VerticalStepsProps> = ({
  steps,
  isLoading,
  withSave = false,
}) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Box minH="400px" minW="400px">
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
                      Save
                    </Button>
                  )}
                  {index !== 0 && (
                    <Button size="sm" variant="ghost" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  <Button size="sm" onClick={nextStep}>
                    Next
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
        <Text>Completed steps</Text>
        <Button
          size="sm"
          onClick={reset}
          variant="outline"
          verticalAlign="baseline"
        >
          Reset
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
            Save
          </Button>
        )}
      </HStack>
    </Box>
  );
};
