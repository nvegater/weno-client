import React, { FC } from "react";
//import { useExperiencesQuery } from "../../graphql/generated/graphql";
import { useWineryQuery } from "../../graphql/generated/graphql";
import { useTranslation } from "react-i18next";

interface ExperiencesGridProps {}

export const ExperiencesGrid: FC<ExperiencesGridProps> = ({}) => {
  // TODO for now only show experiences when user is logged in.

  const [t] = useTranslation("global");

  const [{ data, error, fetching }] = useWineryQuery({
    variables: {
      getWineryInputs: {},
    },
    pause: true,
  });
  return (
    <div>
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>{JSON.stringify(error)}</div>}
      {fetching && <div>{t("loading")}</div>}
    </div>
  );
};
