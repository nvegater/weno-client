import { Box, Button } from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import { Property } from "./Property";

export interface CardProperty {
  name: string;
  value: string;
}

interface CardWithUserDetailsProps {
  properties: CardProperty[];
  title: string;
  editable?: boolean;
}

export const CardWithUserDetails: FC<CardWithUserDetailsProps> = ({
  properties,
  title,
  editable = false,
}) => (
  <Box as="section" py="8" px={{ md: "8" }}>
    <Card maxW="3xl" mx="auto">
      <CardHeader
        title={title}
        action={
          editable ? (
            <Button variant="outline" minW="20" leftIcon={<HiPencilAlt />}>
              Edit
            </Button>
          ) : undefined
        }
      />
      <Box>
        {properties.map((cardProp) => (
          <Property
            key={cardProp.name}
            label={cardProp.name}
            value={cardProp.value}
          />
        ))}
      </Box>
    </Card>
  </Box>
);
