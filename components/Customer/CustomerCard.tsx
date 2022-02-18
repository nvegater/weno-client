import React, { FC } from "react";
import { useTranslation } from "react-i18next";

interface CustomerCardProps {}

export const CustomerCard: FC<CustomerCardProps> = ({}) => {
  const [t] = useTranslation("global");
  return <div>{t("publicProfile")}</div>;
};
