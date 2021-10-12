import { Box, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface NewCardProps {}

const NewCard = (props: NewCardProps) => {
  return (
    <Box>
      <Box bg="brand.100" borderWidth="1px" borderRadius="lg" maxW="sm">
        <Box p="4">Experience Name</Box>
        <Image src="https://bit.ly/2Z4KKcF" alt="ex" />
        <Box p="4">
          Place <StarIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default NewCard;

//maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden"
