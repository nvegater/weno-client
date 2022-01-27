import React, { FC, useMemo, useState } from "react";
import { Box, Flex, Heading, Icon, Img } from "@chakra-ui/react";
import {
  ExperienceImageFragmentFragment,
  SlotFragmentFragment,
  Valley,
} from "../../graphql/generated/graphql";
import { FavoriteExperience } from "../Experiences/FavoriteExperience";
import { valleyReverseMapping } from "../utils/enum-utils";
import { GrMap } from "react-icons/gr";
import { DateTimePickerWeno } from "../DateTimePicker/DateTimePickerWeno";
import { parseISO } from "date-fns";
import { SlotRadioGroup } from "../Radio/SlotRadioGroup/SlotRadioGroup";
import { getSlotsFromDate } from "./EditExperienceModal";
import { InputNumberBox } from "../InputFields/InputNumberBox";
import { useTranslation } from "react-i18next";

interface ExperienceModalLayoutProps {
  experienceTitle: string;
  wineryName: string;
  wineryValley: Valley;
  slots: SlotFragmentFragment[];
  startDateTime: string;
  images?: ExperienceImageFragmentFragment[];
  price: number;
}

const placeHolderImage =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const ExperienceModalLayout: FC<ExperienceModalLayoutProps> = ({
  experienceTitle,
  images,
  wineryName,
  wineryValley,
  startDateTime,
  slots,
  price,
}) => {
  const coverImage = images ? images.find((i) => i.coverPage) : null;

  const [date, setDate] = useState<string>(startDateTime);

  const [totalPrice, setTotalPrice] = useState<number>(price);
  const [t] = useTranslation("global");

  const slotsFromDate: SlotFragmentFragment[] = useMemo(() => {
    return getSlotsFromDate(slots, date);
  }, [date, slots]);

  return (
    <Box>
      <Img
        src={coverImage ? coverImage.imageUrl : placeHolderImage}
        alt={"any"}
      />

      <Heading as="h1" color="brand.200" fontWeight="700" size="2xl" mt={8}>
        {experienceTitle}
      </Heading>
      <FavoriteExperience text={wineryName} />
      <Flex justifyContent="center">
        <Heading as="h3" fontSize="sm" fontWeight="600" color="brand.600">
          {valleyReverseMapping(wineryValley)} {"Valley"}
        </Heading>
        <Icon as={GrMap} color="brand.300" boxSize="1.1rem" ml={1} mb={1} />
      </Flex>
      <Heading fontSize="md" as="h4" fontWeight="500" my={5}>
        {t("selectDate")}
      </Heading>
      <DateTimePickerWeno
        removeTimeZone={true}
        onlyDate={true}
        initialDate={parseISO(startDateTime)}
        onDateTimeSelection={(date) => {
          setDate(date as string);
        }}
      />

      {slotsFromDate.length > 0 && (
        <SlotRadioGroup
          name="rating"
          slots={slotsFromDate}
          onChange={(slotDateTimeStart) => console.log(slotDateTimeStart)}
        />
      )}

      <Flex mt={8} justifyContent="space-around">
        <InputNumberBox
          onValueUpdate={(val) => {
            setTotalPrice(price * val);
          }}
        />
        <Heading fontSize="md" as="h4" fontWeight="500" my={5}>
          {t("total")} {totalPrice}$
        </Heading>
      </Flex>
    </Box>
  );
};
