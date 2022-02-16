import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import {
  ExperiencesFilters,
  ExperienceType,
  Valley,
} from "../../graphql/generated/graphql";
import {
  experienceTypeReverseMapping,
  valleyReverseMapping,
} from "../utils/enum-utils";
import DatePicker from "react-datepicker";
import CreatableSelect from "react-select/creatable";

import { AiOutlineSearch } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { MdWineBar } from "react-icons/md";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { MdDinnerDining } from "react-icons/md";
import { isoDateWithoutTimeZone } from "../DateTimePicker/DateTimePickerWeno";

interface ValleyOption {
  label: string;
  value: Valley;
}

interface ExperienceTypeOption {
  label: string;
  value: ExperienceType;
}

interface FiltersProps {
  setExperiencesFilters: Dispatch<SetStateAction<ExperiencesFilters>>;
  initialFilters: ExperiencesFilters;
  resetExperiencesOnNewSearch: () => void;
}

const differentArrays = (array1: any, array2: any): boolean => {
  if (array1 == null || array2 == null) {
    return false;
  }
  const sameArrays =
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index]);
  return !sameArrays;
};

function isFilterChanges(
  localExpFilters: ExperiencesFilters,
  initialFilters: ExperiencesFilters
): boolean {
  const differentValleys = differentArrays(
    localExpFilters.valley,
    initialFilters.valley
  );
  const differentExperienceTypes = differentArrays(
    localExpFilters.experienceType,
    initialFilters.experienceType
  );
  const differentFromDates =
    localExpFilters.fromDateTime?.toString() !==
    initialFilters.fromDateTime?.toString();

  const differentUntilDates =
    localExpFilters.untilDateTime?.toString() !==
    initialFilters.untilDateTime?.toString();
  return (
    differentValleys ||
    differentExperienceTypes ||
    differentFromDates ||
    differentUntilDates
  );
}

export const Filters: FC<FiltersProps> = ({
  initialFilters,
  setExperiencesFilters,
  resetExperiencesOnNewSearch,
}) => {
  const now = new Date();

  const [localExpFilters, setLocalExpFilters] =
    useState<ExperiencesFilters>(initialFilters);

  const [fromDate, setFromDate] = useState(now);
  const [untilDate, setUntilDate] = useState(null);
  const [t] = useTranslation("global");

  const updateValleys = async (data: ValleyOption[]) => {
    setLocalExpFilters((oldFilters) => ({
      ...oldFilters,
      valley: data.length > 0 ? data.map((vO) => vO.value) : null,
    }));
  };

  const updateExperienceTypes = async (data: ExperienceTypeOption[]) => {
    setLocalExpFilters((oldFilters) => ({
      ...oldFilters,
      experienceType: data.length > 0 ? data.map((eT) => eT.value) : null,
    }));
  };

  const updateDates = (dates: [Date, Date | null]) => {
    const [fromDate, untilDate] = dates;
    setFromDate(fromDate);
    setUntilDate(untilDate);
    setLocalExpFilters((oldFilters) => ({
      ...oldFilters,
      fromDateTime: fromDate ? isoDateWithoutTimeZone(fromDate) : null,
      untilDateTime: untilDate ? isoDateWithoutTimeZone(untilDate) : null,
    }));
  };

  const updateAllFilters = () => {
    setExperiencesFilters(localExpFilters);
    const isFilterChange = isFilterChanges(localExpFilters, initialFilters);
    if (isFilterChange) {
      resetExperiencesOnNewSearch();
    }
  };
  return (
    <Flex mx={10} mb={10} flexDirection="column">
      <FormControl my={3} mx={[null, null, 5]}>
        <FormLabel htmlFor="range">{t("dates")}</FormLabel>
        <DatePicker
          minDate={new Date()}
          selected={fromDate}
          onChange={updateDates}
          startDate={fromDate}
          endDate={untilDate}
          dateFormat="dd MMM"
          selectsRange
          isClearable
        />
      </FormControl>

      <FormControl my={3} mx={[null, null, 5]}>
        <FormLabel htmlFor="valleys">{t("ensenadaValleys")}</FormLabel>
        <CreatableSelect
          isMulti
          options={Object.values(Valley).map((valley) => ({
            label: valleyReverseMapping(valley),
            value: valley,
          }))}
          onChange={(e: any) => updateValleys(e)}
        />
      </FormControl>

      <FormControl my={3} mx={[null, null, 5]}>
        <FormLabel htmlFor="experienceTypes">{t("experienceType")}</FormLabel>
        <CreatableSelect
          isMulti
          options={Object.values(ExperienceType).map((expType) => {
            let icon;
            if (expType === ExperienceType.Degustation) {
              icon = <MdWineBar />;
            } else if (expType === ExperienceType.Concert) {
              icon = <BsMusicNoteBeamed />;
            } else if (expType === ExperienceType.WineDinnerPairing) {
              icon = <MdDinnerDining />;
            }
            return {
              label: (
                <Flex justifyContent="center" alignItems="center">
                  <Box mr={2}>{icon}</Box>
                  <Box>{experienceTypeReverseMapping(expType)}</Box>
                </Flex>
              ),
              value: expType,
            };
          })}
          onChange={(e: any) => updateExperienceTypes(e)}
        />
      </FormControl>

      <Flex justifyContent={["center", null, "flex-end"]} mx={[null, null, 5]}>
        <Button
          size="heroWeno"
          variant="cta"
          rightIcon={<AiOutlineSearch />}
          mt={5}
          onClick={updateAllFilters}
        >
          {t("search")}
        </Button>
      </Flex>
    </Flex>
  );
};
