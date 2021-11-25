import { Box, Flex, Stack } from "@chakra-ui/react";
import * as React from "react";
import { FC, useState } from "react";
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

export const GeneratorLayout: FC<GeneratorLayoutProps> = ({
  winery,
  logoutFn,
  contextHeader,
}) => {
  const { isOpen, toggle } = useMobileMenuState();
  const [subPage, setSubPage] = useState(GeneratorSubpage.WINERY_INFO);

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
              <NavGroup label="Your profile">
                <NavItem
                  icon={<BiUserCircle />}
                  label="Winery information"
                  subPage={GeneratorSubpage.WINERY_INFO}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.WINERY_INFO}
                />
                <NavItem
                  icon={<BiCreditCard />}
                  label="Edit information"
                  subPage={GeneratorSubpage.EDIT_INFO}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.EDIT_INFO}
                />
              </NavGroup>

              <NavGroup label="Experiences">
                <NavItem
                  icon={<BiNews />}
                  label="All experiences"
                  subPage={GeneratorSubpage.ALL_EXPERIENCES}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.ALL_EXPERIENCES}
                />
                <NavItem
                  icon={<BiEnvelope />}
                  label="Schedule"
                  subPage={GeneratorSubpage.SCHEDULE}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.SCHEDULE}
                />
                <NavItem
                  icon={<BiPurchaseTagAlt />}
                  label="New experience"
                  subPage={GeneratorSubpage.NEW_EXPERIENCE}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.NEW_EXPERIENCE}
                />
                <NavItem
                  icon={<BiRecycle />}
                  label="Edit experience"
                  subPage={GeneratorSubpage.EDIT_EXPERIENCE}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.EDIT_EXPERIENCE}
                />
                <NavItem
                  icon={<BiNews />}
                  label="Past Experiences"
                  subPage={GeneratorSubpage.PAST_EXPERIENCES}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.PAST_EXPERIENCES}
                />
              </NavGroup>

              <NavGroup label="Analytics">
                <NavItem
                  icon={<BiNews />}
                  label="Analytics Dashboard"
                  subPage={GeneratorSubpage.DASHBOARD_ANALYTICS}
                  setSubPage={setSubPage}
                  active={subPage === GeneratorSubpage.DASHBOARD_ANALYTICS}
                />
              </NavGroup>
              <NavItem
                icon={<BiHome />}
                label="Help"
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
            <Flex direction="column" flex="1" overflow="auto" px="10">
              {subPage === GeneratorSubpage.WINERY_INFO && (
                <WineryOwnerInfo
                  winery={winery}
                  contextHeader={contextHeader}
                />
              )}
              {subPage === GeneratorSubpage.EDIT_INFO && <div>Edit Winery</div>}
              {subPage === GeneratorSubpage.ALL_EXPERIENCES && (
                <div>All experiences</div>
              )}
              {subPage === GeneratorSubpage.SCHEDULE && (
                <div>Experiences Calendar</div>
              )}
              {subPage === GeneratorSubpage.NEW_EXPERIENCE && (
                <div>Create new experience</div>
              )}
              {subPage === GeneratorSubpage.EDIT_EXPERIENCE && (
                <div>Edit experience</div>
              )}
              {subPage === GeneratorSubpage.PAST_EXPERIENCES && (
                <div>Past experiences</div>
              )}
              {subPage === GeneratorSubpage.DASHBOARD_ANALYTICS && (
                <div>Analytics</div>
              )}
              {subPage === GeneratorSubpage.HELP && <>Help</>}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};