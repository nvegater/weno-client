import React, { FC, useMemo, useState } from "react";
import { Box, Flex, Heading, Icon, Img } from "@chakra-ui/react";
import {
  PaginatedExperienceFragment,
  SlotFragmentFragment,
  Valley,
} from "../../graphql/generated/graphql";
import { FavoriteExperience } from "../Experiences/FavoriteExperience";
import { valleyReverseMapping } from "../utils/enum-utils";
import { GrMap } from "react-icons/gr";
import { DateTimePickerWeno } from "../DateTimePicker/DateTimePickerWeno";
import { parseISO } from "date-fns";
import { SlotRadioGroup } from "../Radio/SlotRadioGroup/SlotRadioGroup";
import { InputNumberBox } from "../InputFields/InputNumberBox";
import { CreateReservationForm } from "./CreateReservationForm";
import { getSlotsFromDate } from "../utils/dateTime-utils";

interface ExperienceModalLayoutProps {
  experience: PaginatedExperienceFragment;
}

const placeHolderImage =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const ReserveExperience: FC<ExperienceModalLayoutProps> = ({
  experience,
}) => {
  const { images, pricePerPersonInDollars, slots, title, wineryName, valley } =
    experience;
  const coverImage = images ? images[0] : null;

  const initialDate = slots[0].startDateTime;
  const [date, setDate] = useState<string>(initialDate);

  const [totalPrice, setTotalPrice] = useState<number>(pricePerPersonInDollars);

  const slotsFromDate: SlotFragmentFragment[] = useMemo(() => {
    return getSlotsFromDate(slots, date);
  }, [date, slots]);

  const [selectedSlot, setSelectedSlot] = useState<SlotFragmentFragment>(
    slotsFromDate[0]
  );

  return (
    <Box>
      <Img
        src={coverImage ? coverImage.getUrl : placeHolderImage}
        alt={`image from ${title}`}
      />

      <Heading as="h1" color="brand.200" fontWeight="700" size="2xl" mt={8}>
        {title}
      </Heading>
      <FavoriteExperience text={wineryName} />
      <Flex justifyContent="center">
        <Heading as="h3" fontSize="sm" fontWeight="600" color="brand.600">
          {valleyReverseMapping(valley)} {"Valley"}
        </Heading>
        <Icon as={GrMap} color="brand.300" boxSize="1.1rem" ml={1} mb={1} />
      </Flex>
      <Heading fontSize="md" as="h4" fontWeight="500" my={5}>
        Select a date:
      </Heading>
      <DateTimePickerWeno
        removeTimeZone={true}
        onlyDate={true}
        initialDate={parseISO(date)}
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
            setTotalPrice(pricePerPersonInDollars * val);
          }}
        />
        <Heading fontSize="md" as="h4" fontWeight="600" my={5}>
          Total: {totalPrice}$MXN
        </Heading>
      </Flex>

      <CreateReservationForm
        pricePerPerson={pricePerPersonInDollars}
        slot={selectedSlot}
        totalPrice={totalPrice}
      />
    </Box>
  );
};
