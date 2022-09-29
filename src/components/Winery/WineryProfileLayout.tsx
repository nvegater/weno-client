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
import { CreateExperienceForm } from "../Experiences/CreateExperienceForm";
import { EditableExperiences } from "../Experiences/EditableExperiences";
import { Gallery } from "../Images/Gallery";
import { EditWineryInfo } from "./EditWineryInfo";
import { ShellLayout } from "../ProfileShell/ShellLayout";
import { WineryCalendar } from "./WineryCalendar";
import { useTranslation } from "react-i18next";

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
}

export const WineryProfileLayout: FC<GeneratorLayoutProps> = ({
  winery,
  logoutFn,
}) => {
  const [subPage, setSubPage] = useState<WineryProfileSubpage>(
    WineryProfileSubpage.WINERY_INFO
  );
  const [t] = useTranslation("global");

  const subpages = (
    <>
      {subPage === WineryProfileSubpage.WINERY_INFO && (
        <WineryOwnerInfo winery={winery} />
      )}
      {subPage === WineryProfileSubpage.EDIT_INFO && (
        <EditWineryInfo winery={winery} />
      )}
      {subPage === WineryProfileSubpage.SCHEDULE && (
        <WineryCalendar winery={winery} />
      )}
      {subPage === WineryProfileSubpage.GALLERY && (
        <Gallery wineryAlias={winery.urlAlias} wineryId={winery.id} />
      )}
      {subPage === WineryProfileSubpage.NEW_EXPERIENCE && (
        <CreateExperienceForm winery={winery} />
      )}
      {subPage === WineryProfileSubpage.EDIT_EXPERIENCE && (
        <EditableExperiences winery={winery} />
      )}
      {subPage === WineryProfileSubpage.DASHBOARD_ANALYTICS && (
        <div>{t("comming")}</div>
      )}
    </>
  );

  const navgroups = (
    <>
      <NavGroup label={t("yourProfile")}>
        <NavItem
          icon={<IoMdInformationCircleOutline />}
          label={t("wineryInformation")}
          subPage={WineryProfileSubpage.WINERY_INFO}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.WINERY_INFO}
        />
        <NavItem
          icon={<FaRegEdit />}
          label={t("editInformation")}
          subPage={WineryProfileSubpage.EDIT_INFO}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.EDIT_INFO}
        />
        <NavItem
          icon={<RiGalleryLine />}
          label={t("gallery")}
          subPage={WineryProfileSubpage.GALLERY}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.GALLERY}
        />
      </NavGroup>

      <NavGroup label={t("experiences")}>
        <NavItem
          icon={<BsFillCalendar2WeekFill />}
          label={t("schedule")}
          subPage={WineryProfileSubpage.SCHEDULE}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.SCHEDULE}
        />

        <NavItem
          icon={<AiOutlineFileAdd />}
          label={t("newExperience")}
          subPage={WineryProfileSubpage.NEW_EXPERIENCE}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.NEW_EXPERIENCE}
        />
        <NavItem
          icon={<FaRegEdit />}
          label={t("editExperience")}
          subPage={WineryProfileSubpage.EDIT_EXPERIENCE}
          setSubPage={setSubPage}
          active={subPage === WineryProfileSubpage.EDIT_EXPERIENCE}
        />
      </NavGroup>

      <NavGroup label={t("analytics")}>
        <NavItem
          icon={<BiAnalyse />}
          label={t("analyticsDashboard")}
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
