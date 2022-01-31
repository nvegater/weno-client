import React, { FC, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { ExperienceType, Valley } from "../../graphql/generated/graphql";
import {
  experienceTypeReverseMapping,
  valleyReverseMapping,
} from "../utils/enum-utils";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { AiOutlineSearch } from "react-icons/ai";
import { useTranslation } from "react-i18next";

interface FiltersSubmitForm {
  valley: Valley;
  startDate: Date;
  endDate: Date;
  experienceType: ExperienceType[];
}

interface FiltersProps {}

export const Filters: FC<FiltersProps> = ({}) => {
  const now = new Date();

  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(null);
  const [t] = useTranslation("global");

  const {
    handleSubmit,
    register: registerFormField,
    setValue: setFormValue,
  } = useForm<FiltersSubmitForm>();
  const onSubmit = async (data: FiltersSubmitForm) => {
    console.log(data);
  };

  const onDateChange = (dates: [Date, Date]) => {
    console.log(dates);
    const [start, end] = dates;
    setStartDate(start);
    setFormValue("startDate", start);
    setEndDate(end);
    setFormValue("endDate", end);
  };

  return (
    <Flex
      mx={10}
      mb={10}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      flexDirection="column"
    >
      <Flex flexDirection={["column", null, "row"]}>
        <FormControl my={3} mx={[null, null, 5]}>
          <Select selected={Valley.Ensenada} {...registerFormField("valley")}>
            {Object.values(Valley).map((valley) => (
              <option key={valley} value={valley}>
                {valleyReverseMapping(valley)}
              </option>
            ))}
          </Select>
          <FormHelperText>{t("ensenadaValleys")}</FormHelperText>
        </FormControl>

        <FormControl my={3} mx={[null, null, 5]}>
          <DatePicker
            minDate={new Date()}
            selected={startDate}
            onChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd MMM"
            selectsRange
          />
          <FormHelperText>{t("selectDates")}</FormHelperText>
        </FormControl>
      </Flex>

      <Flex
        flexDirection={["column", null, "row"]}
        justifyContent={["start", null, "center"]}
        alignItems="start"
        mt={5}
      >
        {Object.values(ExperienceType).map((expType, index) => (
          <Checkbox
            key={`experienceType.${index}`}
            value={expType}
            {...registerFormField(`experienceType.${index}`)}
            mx={[null, null, 5]}
          >
            {experienceTypeReverseMapping(expType)}
          </Checkbox>
        ))}
      </Flex>

      <Flex justifyContent={["center", null, "flex-end"]} mx={[null, null, 5]}>
        <Button
          type="submit"
          size="heroWeno"
          variant="cta"
          rightIcon={<AiOutlineSearch />}
          mt={5}
        >
          {t("search")}
        </Button>
      </Flex>
    </Flex>
  );
};
