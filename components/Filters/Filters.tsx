import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";
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

export const Filters: FC<FiltersProps> = ({
  initialFilters,
  setExperiencesFilters,
  resetExperiencesOnNewSearch,
}) => {
  const now = new Date();

  const [localExpFilters, setLocalExpFilters] =
    useState<ExperiencesFilters>(initialFilters);

  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(null);
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

  const updateDates = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const updateAllFilters = () => {
    setExperiencesFilters(localExpFilters);
    resetExperiencesOnNewSearch();
  };
  return (
    <Flex mx={10} mb={10} flexDirection="column">
      <FormControl my={3} mx={[null, null, 5]}>
        <FormLabel htmlFor="range">{t("dates")}</FormLabel>
        <DatePicker
          minDate={new Date()}
          selected={startDate}
          onChange={updateDates}
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd MMM"
          selectsRange
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
          options={Object.values(ExperienceType).map((expType) => ({
            label: experienceTypeReverseMapping(expType),
            value: expType,
          }))}
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
