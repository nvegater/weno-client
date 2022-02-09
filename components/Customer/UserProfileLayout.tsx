import React, { FC, useState } from "react";
import { ShellLayout } from "../ProfileShell/ShellLayout";
import { ContextHeader } from "../Authentication/useAuth";
import { NavGroup } from "../ProfileShell/NavGroup";
import { NavItem } from "../ProfileShell/NavItem";
import {
  BiEnvelope,
  BiHome,
  BiPurchaseTagAlt,
  BiUserCircle,
} from "react-icons/bi";

export enum UserProfileSubpage {
  PROFILE_INFO,
  RESERVATIONS,
  HELP,
  FAVORITES,
}

interface UserProfileLayoutProps {
  logoutFn: () => void;
  contextHeader: ContextHeader;
  email: string;
  username: string;
}

export const UserProfileLayout: FC<UserProfileLayoutProps> = ({
  logoutFn,
  contextHeader,
  email,
  username,
}) => {
  const [subPage, setSubPage] = useState<UserProfileSubpage>(
    UserProfileSubpage.PROFILE_INFO
  );

  const navgroups = (
    <>
      {subPage === UserProfileSubpage.PROFILE_INFO && (
        <div>Your profile info</div>
      )}
      {subPage === UserProfileSubpage.RESERVATIONS && (
        <div>Your reservations</div>
      )}
      {subPage === UserProfileSubpage.FAVORITES && <div>Your favorites</div>}
      {subPage === UserProfileSubpage.HELP && <div>Help</div>}
    </>
  );

  const subpages = (
    <>
      <NavGroup label="Your profile">
        <NavItem
          icon={<BiUserCircle />}
          label="User information"
          subPage={UserProfileSubpage.PROFILE_INFO}
          setSubPage={setSubPage}
          active={subPage === UserProfileSubpage.PROFILE_INFO}
        />
      </NavGroup>
      <NavGroup label="Your Experiences">
        <NavItem
          icon={<BiPurchaseTagAlt />}
          label="Reservations"
          subPage={UserProfileSubpage.RESERVATIONS}
          setSubPage={setSubPage}
          active={subPage === UserProfileSubpage.RESERVATIONS}
        />
        <NavItem
          icon={<BiEnvelope />}
          label="Favorites"
          subPage={UserProfileSubpage.FAVORITES}
          setSubPage={setSubPage}
          active={subPage === UserProfileSubpage.FAVORITES}
        />
      </NavGroup>
      <NavItem
        icon={<BiHome />}
        label="Help"
        subPage={UserProfileSubpage.HELP}
        setSubPage={setSubPage}
        active={subPage === UserProfileSubpage.HELP}
      />
    </>
  );

  return (
    <ShellLayout
      navGroupes={subpages}
      subpages={navgroups}
      logoutFn={logoutFn}
      email={email}
      name={username}
    />
  );
};
