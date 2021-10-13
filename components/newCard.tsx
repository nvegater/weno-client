import { Box, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface NewCardProps {
  experienceName: String;
  location: String;
}

const NewCard = (props: NewCardProps) => {
  const { experienceName, location } = props;
  return (
    <Box>
      <Box bg="brand.100" borderWidth="1px" borderRadius="lg" maxW="sm">
        <Box p="4">experience Name: {experienceName}</Box>
        <Image src="https://bit.ly/2Z4KKcF" alt="ex" />
        <Box p="4">
          location {location} <StarIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default NewCard;
