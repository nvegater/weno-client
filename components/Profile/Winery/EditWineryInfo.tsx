import React, { FC } from "react";
import {
  useEditWineryInfoMutation,
  WineryFragmentFragment,
} from "../../../graphql/generated/graphql";
import { ContextHeader } from "../../Authentication/useAuth";
import { Button } from "@chakra-ui/react";

interface EditWineryInfoProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

export const EditWineryInfo: FC<EditWineryInfoProps> = ({
  contextHeader,
  winery,
}) => {
  const [, editWinery] = useEditWineryInfoMutation();
  return (
    <Button
      onClick={() => {
        editWinery(
          {
            editWineryInputs: {
              wineryId: winery.id,
              description: "Hola from the code",
            },
          },
          { ...contextHeader, requestPolicy: "network-only" }
        );
      }}
    >
      Edit winery
    </Button>
  );
};
