import React, { FC, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { WineryFragmentFragment } from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { WineryExperiencesListModal } from "../Images/WineryExperiencesListModal";

interface WineryCalendarProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

export const WineryCalendar: FC<WineryCalendarProps> = ({
  winery,
  contextHeader,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [experienceId, setExperienceId] = useState<number | null>(null);
  const [experienceTitle, setExperienceTitle] = useState<string | null>(null);

  console.log(experienceId, experienceTitle);

  return (
    <div>
      <WineryExperiencesListModal
        isOpen={isOpen}
        onClose={onClose}
        wineryId={winery.id}
        contextHeader={contextHeader}
        handleSelection={(experienceId, experienceTitle) => {
          setExperienceId(experienceId);
          setExperienceTitle(experienceTitle);
          onClose();
        }}
      />
      <Flex>
        <Heading as="h1" size="xl" mb={5}>
          Upcoming Events
        </Heading>
      </Flex>
      <Box mb="3em">
        <p>Select an experience to see the slots in the calendar</p>
        <Button onClick={() => onOpen()} size="heroWeno" variant="cta" mt={2}>
          Experiences
        </Button>
      </Box>
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
        editable
        selectable
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          right: "today,prev,next",
        }}
        initialView="timeGridWeek"
        nowIndicator={true}
        height="1000px"
        timeZone="UTC"
        scrollTime={"06:00:00"}
      />
    </div>
  );
};
