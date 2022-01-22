import React, { FC, useMemo, useState } from "react";
import { Box, Flex, Heading, Icon, Img } from "@chakra-ui/react";
import {
  ExperienceImageFragmentFragment,
  ExperienceInfoFragment,
  ExperienceWineryInfoFragment,
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
import { CreateReservation } from "./CreateReservation";

interface ExperienceModalLayoutProps {
  experienceWineryInfo: ExperienceWineryInfoFragment;
  slots: SlotFragmentFragment[];
  images?: ExperienceImageFragmentFragment[];
  startDateTime: string;
  experienceInfo: ExperienceInfoFragment;
}

const placeHolderImage =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const Reservation: FC<ExperienceModalLayoutProps> = ({
  images,
  startDateTime,
  slots,
  experienceWineryInfo,
  experienceInfo,
}) => {
  const coverImage = images ? images.find((i) => i.coverPage) : null;

  const [date, setDate] = useState<string>(startDateTime);

  const [totalPrice, setTotalPrice] = useState<number>(
    experienceInfo.pricePerPersonInDollars
  );

  const slotsFromDate: SlotFragmentFragment[] = useMemo(() => {
    const unsortedSlotsFromDate = getSlotsFromDate(slots, date);
    unsortedSlotsFromDate.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (
        new Date(parseISO(a.startDateTime)).getTime() -
        new Date(parseISO(b.startDateTime)).getTime()
      );
    });
    return unsortedSlotsFromDate;
  }, [date, slots]);

  const [selectedSlot, setSelectedSlot] = useState<SlotFragmentFragment>(
    slotsFromDate[0]
  );

  return (
    <Box>
      <Img
        src={coverImage ? coverImage.imageUrl : placeHolderImage}
        alt={"any"}
      />

      <Heading as="h1" color="brand.200" fontWeight="700" size="2xl" mt={8}>
        {experienceInfo.title}
      </Heading>
      <FavoriteExperience text={experienceWineryInfo.name} />
      <Flex justifyContent="center">
        <Heading as="h3" fontSize="sm" fontWeight="600" color="brand.600">
          {valleyReverseMapping(experienceWineryInfo.valley)} {"Valley"}
        </Heading>
        <Icon as={GrMap} color="brand.300" boxSize="1.1rem" ml={1} mb={1} />
      </Flex>
      <Heading fontSize="md" as="h4" fontWeight="500" my={5}>
        Select a date:
      </Heading>
      <DateTimePickerWeno
        removeTimeZone={true}
        onlyDate={true}
        initialDate={parseISO(startDateTime)}
        onDateTimeSelection={(date) => {
          setDate(date as string);
        }}
      />

      <Box my={4}>
        {slotsFromDate.length > 0 && (
          <SlotRadioGroup
            name="rating"
            slots={slotsFromDate}
            onChange={(slotStartDate) => {
              const slot = slotsFromDate.find(
                (slot) => slot.startDateTime === slotStartDate
              );
              setSelectedSlot(slot);
            }}
          />
        )}
      </Box>

      <Flex justifyContent="space-around">
        <InputNumberBox
          onValueUpdate={(val) => {
            setTotalPrice(experienceInfo.pricePerPersonInDollars * val);
          }}
        />
        <Heading fontSize="md" as="h4" fontWeight="600" my={5}>
          Total: {totalPrice}$MXN
        </Heading>
      </Flex>

      <CreateReservation
        experienceInfo={experienceInfo}
        slot={selectedSlot}
        totalPrice={totalPrice}
      />
    </Box>
  );
};