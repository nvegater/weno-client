import React, { FC, useState } from "react";
import { ShellLayout } from "../ProfileShell/ShellLayout";
import { ContextHeader } from "../Authentication/useAuth";
import { NavGroup } from "../ProfileShell/NavGroup";
import { NavItem } from "../ProfileShell/NavItem";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiReservedLine } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";

import { UserReservations } from "./UserReservations";
import { UserInformation } from "./UserInformation";
import { CustomerFragment } from "../../graphql/generated/graphql";
import { useTranslation } from "react-i18next";

export enum UserProfileSubpage {
  PROFILE_INFO,
  RESERVATIONS,
  HELP,
  FAVORITES,
}

interface UserProfileLayoutProps {
  logoutFn: () => void;
  contextHeader: ContextHeader;
  customer: CustomerFragment;
}

export const UserProfileLayout: FC<UserProfileLayoutProps> = ({
  logoutFn,
  contextHeader,
  customer,
}) => {
  const [subPage, setSubPage] = useState<UserProfileSubpage>(
    UserProfileSubpage.PROFILE_INFO
  );
  const [t] = useTranslation("global");

  const navgroups = (
    <>
      {subPage === UserProfileSubpage.PROFILE_INFO && (
        <UserInformation customer={customer} />
      )}
      {subPage === UserProfileSubpage.RESERVATIONS && (
        <UserReservations
          email={customer.email}
          contextHeader={contextHeader}
        />
      )}
      {subPage === UserProfileSubpage.FAVORITES && <div>{t("coming")}</div>}
      {subPage === UserProfileSubpage.HELP && <div>{t("help")}</div>}
    </>
  );

  const subpages = (
    <>
      <NavGroup label={t("yourProfile")}>
        <NavItem
          icon={<IoMdInformationCircleOutline />}
          label={t("userInformation")}
          subPage={UserProfileSubpage.PROFILE_INFO}
          setSubPage={setSubPage}
          active={subPage === UserProfileSubpage.PROFILE_INFO}
        />
      </NavGroup>
      <NavGroup label={t("yourExperiences")}>
        <NavItem
          icon={<RiReservedLine />}
          label={t("reservations")}
          subPage={UserProfileSubpage.RESERVATIONS}
          setSubPage={setSubPage}
          active={subPage === UserProfileSubpage.RESERVATIONS}
        />
        <NavItem
          icon={<MdFavoriteBorder />}
          label={t("favorites")}
          subPage={UserProfileSubpage.FAVORITES}
          setSubPage={setSubPage}
          active={subPage === UserProfileSubpage.FAVORITES}
        />
      </NavGroup>
    </>
  );

  return (
    <ShellLayout
      navGroupes={subpages}
      subpages={navgroups}
      logoutFn={logoutFn}
      email={customer.email}
      name={customer.username}
    />
  );
};
