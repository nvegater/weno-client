import { Box, Flex, Stack } from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { MobileMenuButton } from "./MobileMenuButton";
import { ScrollArea } from "./ScrollArea";
import { useMobileMenuState } from "./useMobileMenuState";
import { AccountSwitcher } from "./AccountSwitcher";
import { NavItem } from "./NavItem";
import {
  BiCreditCard,
  BiEnvelope,
  BiHome,
  BiNews,
  BiPurchaseTagAlt,
  BiRecycle,
  BiUserCircle,
} from "react-icons/bi";
import { NavGroup } from "./NavGroup";
import { WineryOwnerInfo } from "../WineryOwnerInfo";
import { WineryFragmentFragment } from "../../../../graphql/generated/graphql";
import { ContextHeader } from "../../../Authentication/useAuth";
import { CreateExperience } from "../../../Experiences/CreateExperience";
import { useTranslation } from "react-i18next";
import { atom, useRecoilState } from "recoil";
import { EditableExperiences } from "../../../Settings/Experiences/EditableExperiences";
import { AllExperiences } from "./AllExperiences";

export enum GeneratorSubpage {
  WINERY_INFO,
  EDIT_INFO,
  ALL_EXPERIENCES,
  SCHEDULE,
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

export const generatorNavigationState = atom<GeneratorSubpage>({
  key: "generatorNavigation",
  default: GeneratorSubpage.WINERY_INFO,
});

export const GeneratorLayout: FC<GeneratorLayoutProps> = ({
  winery,
  logoutFn,
  contextHeader,
}) => {
  const { isOpen, toggle } = useMobileMenuState();
  const [t] = useTranslation("global");
  const [subPage, setSubPage] = useRecoilState(generatorNavigationState);

  return (
    <Flex
      height="100vh"
      bg="brand.600"
      overflow="hidden"
      sx={{ "--sidebar-width": "16rem" }}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="brand.100"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <AccountSwitcher
            email={winery.creatorEmail}
            username={winery.creatorUsername}
            logoutFn={logoutFn}
            wineryName={winery.name}
          />
          <ScrollArea pt="5" pb="6">
            <Stack spacing="8" flex="1" overflow="auto" pt="8">
              <NavGroup label={t("yourProfile")}>
                <NavItem
                  icon={<BiUserCircle />}
                  label={t("wineryInformation")}
                  subPage={GeneratorSubpage.WINERY_INFO}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.WINERY_INFO}
                />
                <NavItem
                  icon={<BiCreditCard />}
                  label={t("editInformation")}
                  subPage={GeneratorSubpage.EDIT_INFO}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.EDIT_INFO}
                />
              </NavGroup>

              <NavGroup label={t("experiences")}>
                <NavItem
                  icon={<BiNews />}
                  label={t("allExperiences")}
                  subPage={GeneratorSubpage.ALL_EXPERIENCES}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.ALL_EXPERIENCES}
                />
                <NavItem
                  icon={<BiEnvelope />}
                  label={t("schedule")}
                  subPage={GeneratorSubpage.SCHEDULE}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.SCHEDULE}
                />
                <NavItem
                  icon={<BiPurchaseTagAlt />}
                  label={t("newExperience")}
                  subPage={GeneratorSubpage.NEW_EXPERIENCE}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.NEW_EXPERIENCE}
                />
                <NavItem
                  icon={<BiRecycle />}
                  label={t("editExperience")}
                  subPage={GeneratorSubpage.EDIT_EXPERIENCE}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.EDIT_EXPERIENCE}
                />
                <NavItem
                  icon={<BiNews />}
                  label={t("pastExperience")}
                  subPage={GeneratorSubpage.PAST_EXPERIENCES}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.PAST_EXPERIENCES}
                />
              </NavGroup>

              <NavGroup label={t("analytics")}>
                <NavItem
                  icon={<BiNews />}
                  label={t("dashboard")}
                  subPage={GeneratorSubpage.DASHBOARD_ANALYTICS}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.DASHBOARD_ANALYTICS}
                />
              </NavGroup>
              <NavItem
                icon={<BiHome />}
                label={t("help")}
                subPage={GeneratorSubpage.HELP}
                setSubPage={setSubPage}
                active={subPage === GeneratorSubpage.HELP}
              />
            </Stack>
          </ScrollArea>
        </Box>
      </Box>
      <Box
        flex="1"
        p={{ base: "0", md: "6" }}
        marginStart={{ md: "var(--sidebar-width)" }}
        position="relative"
        left={isOpen ? "var(--sidebar-width)" : "0"}
        transition="left 0.2s"
      >
        <Box
          maxW="2560px"
          bg="brand.100"
          height="100%"
          pb="6"
          rounded={{ md: "lg" }}
        >
          <Flex direction="column" height="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
              </Flex>
            </Flex>
            <Flex direction="column" flex="1" overflow="auto" px="5">
              {subPage === GeneratorSubpage.WINERY_INFO && (
                <WineryOwnerInfo
                  winery={winery}
                  contextHeader={contextHeader}
                />
              )}
              {subPage === GeneratorSubpage.EDIT_INFO && <div>Edit Winery</div>}
              {subPage === GeneratorSubpage.ALL_EXPERIENCES && (
                <AllExperiences />
              )}
              {subPage === GeneratorSubpage.SCHEDULE && (
                <div>{t("experiencesCalendar")}</div>
              )}
              {subPage === GeneratorSubpage.NEW_EXPERIENCE && (
                <CreateExperience
                  winery={winery}
                  contextHeader={contextHeader}
                />
              )}
              {subPage === GeneratorSubpage.EDIT_EXPERIENCE && (
                <EditableExperiences
                  contextHeader={contextHeader}
                  wineryId={winery.id}
                />
              )}
              {subPage === GeneratorSubpage.PAST_EXPERIENCES && (
                <div>{t("pastExperiences")}</div>
              )}
              {subPage === GeneratorSubpage.DASHBOARD_ANALYTICS && (
                <div>{t("analytics")}</div>
              )}
              {subPage === GeneratorSubpage.HELP && <>{t("help")}</>}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
