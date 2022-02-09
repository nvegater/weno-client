import * as React from "react";
import { FC, useState } from "react";
import { NavItem } from "../ProfileShell/NavItem";
import {
  BiCreditCard,
  BiEnvelope,
  BiHome,
  BiNews,
  BiPurchaseTagAlt,
  BiRecycle,
  BiUserCircle,
} from "react-icons/bi";
import { NavGroup } from "../ProfileShell/NavGroup";
import { WineryOwnerInfo } from "./WineryOwnerInfo";
import { WineryFragmentFragment } from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { CreateExperienceForm } from "../Experiences/CreateExperienceForm";
import { EditableExperiences } from "../Experiences/EditableExperiences";
import { AllExperiences } from "./AllExperiences";
import { Gallery } from "../Images/Gallery";
import { EditWineryInfo } from "./EditWineryInfo";
import { ShellLayout } from "../ProfileShell/ShellLayout";

export enum WineryProfileSubpage {
  WINERY_INFO,
  EDIT_INFO,
  ALL_EXPERIENCES,
  SCHEDULE,
  GALLERY,
  NEW_EXPERIENCE,
  EDIT_EXPERIENCE,
  PAST_EXPERIENCES,
  DASHBOARD_ANALYTICS,
  HELP,
}

export interface GeneratorLayoutProps {
  winery: WineryFragmentFragment;
  logoUrl?: string | undefined | null;
  logoutFn: () => void;
  contextHeader: ContextHeader;
}

export const WineryProfileLayout: FC<GeneratorLayoutProps> = ({
  winery,
  logoutFn,
  contextHeader,
}) => {
  const [subPage, setSubPage] = useState<WineryProfileSubpage>(
    WineryProfileSubpage.WINERY_INFO
  );

  const subpages = (
    <>
      {subPage === WineryProfileSubpage.WINERY_INFO && (
        <WineryOwnerInfo winery={winery} contextHeader={contextHeader} />
      )}
      {subPage === WineryProfileSubpage.EDIT_INFO && (
        <EditWineryInfo winery={winery} contextHeader={contextHeader} />
      )}
      {subPage === WineryProfileSubpage.ALL_EXPERIENCES && <AllExperiences />}
      {subPage === WineryProfileSubpage.SCHEDULE && (
        <div>Experiences Calendar</div>
      )}
      {subPage === WineryProfileSubpage.GALLERY && (
        <Gallery
          wineryAlias={winery.urlAlias}
          wineryId={winery.id}
          contextHeader={contextHeader}
        />
      )}
      {subPage === WineryProfileSubpage.NEW_EXPERIENCE && (
        <CreateExperienceForm winery={winery} contextHeader={contextHeader} />
      )}
      {subPage === WineryProfileSubpage.EDIT_EXPERIENCE && (
        <EditableExperiences winery={winery} contextHeader={contextHeader} />
      )}
      {subPage === WineryProfileSubpage.PAST_EXPERIENCES && (
        <div>Past experiences</div>
      )}
      {subPage === WineryProfileSubpage.DASHBOARD_ANALYTICS && (
        <div>Analytics</div>
      )}
      {subPage === WineryProfileSubpage.HELP && <>Help</>}
    </>
  );

  const navgroups = (
    <>
      <NavGroup label="Your profile">
        <NavItem
          icon={<BiUserCircle />}
          label="Winery information"
          subPage={WineryProfileSubpage.WINERY_INFO}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.WINERY_INFO}
        />
        <NavItem
          icon={<BiCreditCard />}
          label="Edit information"
          subPage={WineryProfileSubpage.EDIT_INFO}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.EDIT_INFO}
        />
      </NavGroup>

      <NavGroup label="Experiences">
        <NavItem
          icon={<BiNews />}
          label="All experiences"
          subPage={WineryProfileSubpage.ALL_EXPERIENCES}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.ALL_EXPERIENCES}
        />
        <NavItem
          icon={<BiEnvelope />}
          label="Schedule"
          subPage={WineryProfileSubpage.SCHEDULE}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.SCHEDULE}
        />
        <NavItem
          icon={<BiEnvelope />}
          label="Gallery"
          subPage={WineryProfileSubpage.GALLERY}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.GALLERY}
        />
        <NavItem
          icon={<BiPurchaseTagAlt />}
          label="New experience"
          subPage={WineryProfileSubpage.NEW_EXPERIENCE}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.NEW_EXPERIENCE}
        />
        <NavItem
          icon={<BiRecycle />}
          label="Edit experience"
          subPage={WineryProfileSubpage.EDIT_EXPERIENCE}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.EDIT_EXPERIENCE}
        />
        <NavItem
          icon={<BiNews />}
          label="Past Experiences"
          subPage={WineryProfileSubpage.PAST_EXPERIENCES}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.PAST_EXPERIENCES}
        />
      </NavGroup>

      <NavGroup label="Analytics">
        <NavItem
          icon={<BiNews />}
          label="Analytics Dashboard"
          subPage={WineryProfileSubpage.DASHBOARD_ANALYTICS}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.DASHBOARD_ANALYTICS}
        />
      </NavGroup>
      <NavItem
        icon={<BiHome />}
        label="Help"
        subPage={WineryProfileSubpage.HELP}
        setSubPage={setSubPage}
        active={subPage === WineryProfileSubpage.HELP}
      />
    </>
  );

  return (
    <ShellLayout
      navGroupes={navgroups}
      subpages={subpages}
      logoutFn={logoutFn}
      email={winery.creatorEmail}
      name={winery.creatorUsername}
      winery={winery}
    />
  );
};
