import * as React from "react";
import { FC, useState } from "react";
import { NavItem } from "../ProfileShell/NavItem";
import { BiAnalyse } from "react-icons/bi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { RiGalleryLine } from "react-icons/ri";
import { AiOutlineFileAdd } from "react-icons/ai";
import { NavGroup } from "../ProfileShell/NavGroup";
import { WineryOwnerInfo } from "./WineryOwnerInfo";
import { WineryFragmentFragment } from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { CreateExperienceForm } from "../Experiences/CreateExperienceForm";
import { EditableExperiences } from "../Experiences/EditableExperiences";
import { Gallery } from "../Images/Gallery";
import { EditWineryInfo } from "./EditWineryInfo";
import { ShellLayout } from "../ProfileShell/ShellLayout";
import { WineryCalendar } from "./WineryCalendar";

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
      {subPage === WineryProfileSubpage.SCHEDULE && (
        <WineryCalendar winery={winery} contextHeader={contextHeader} />
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
      {subPage === WineryProfileSubpage.DASHBOARD_ANALYTICS && (
        <div>Coming soon...</div>
      )}
    </>
  );

  const navgroups = (
    <>
      <NavGroup label="Your profile">
        <NavItem
          icon={<IoMdInformationCircleOutline />}
          label="Winery information"
          subPage={WineryProfileSubpage.WINERY_INFO}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.WINERY_INFO}
        />
        <NavItem
          icon={<FaRegEdit />}
          label="Edit information"
          subPage={WineryProfileSubpage.EDIT_INFO}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.EDIT_INFO}
        />
        <NavItem
          icon={<RiGalleryLine />}
          label="Gallery"
          subPage={WineryProfileSubpage.GALLERY}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.GALLERY}
        />
      </NavGroup>

      <NavGroup label="Experiences">
        <NavItem
          icon={<BsFillCalendar2WeekFill />}
          label="Schedule"
          subPage={WineryProfileSubpage.SCHEDULE}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.SCHEDULE}
        />

        <NavItem
          icon={<AiOutlineFileAdd />}
          label="New experience"
          subPage={WineryProfileSubpage.NEW_EXPERIENCE}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.NEW_EXPERIENCE}
        />
        <NavItem
          icon={<FaRegEdit />}
          label="Edit experience"
          subPage={WineryProfileSubpage.EDIT_EXPERIENCE}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.EDIT_EXPERIENCE}
        />
      </NavGroup>

      <NavGroup label="Analytics">
        <NavItem
          icon={<BiAnalyse />}
          label="Analytics Dashboard"
          subPage={WineryProfileSubpage.DASHBOARD_ANALYTICS}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.DASHBOARD_ANALYTICS}
        />
      </NavGroup>
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
