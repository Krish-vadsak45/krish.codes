import React from "react";
import { AnimatePresence } from "framer-motion";
import { useDesktop } from "../../context/DesktopContext";
import { TerminalApp } from "../apps/TerminalApp";
import { FinderApp } from "../apps/FinderApp";
import { SafariApp } from "../apps/SafariApp";
import { SettingsApp } from "../apps/SettingsApp";
import { NotesApp } from "../apps/NotesApp";
import { MailApp } from "../apps/MailApp";
import { SpotlightModal } from "../apps/SpotlightModal";

export const WindowManager: React.FC = () => {
  const { windows } = useDesktop();

  return (
    <>
      <AnimatePresence>
        {windows.terminal.isOpen && !windows.terminal.isMinimized && (
          <TerminalApp key="terminal" />
        )}
        {windows.finder.isOpen && !windows.finder.isMinimized && (
          <FinderApp key="finder" />
        )}
        {windows.safari.isOpen && !windows.safari.isMinimized && (
          <SafariApp key="safari" />
        )}
        {windows.settings.isOpen && !windows.settings.isMinimized && (
          <SettingsApp key="settings" />
        )}
        {windows.notes.isOpen && !windows.notes.isMinimized && (
          <NotesApp key="notes" />
        )}
        {windows.mail.isOpen && !windows.mail.isMinimized && (
          <MailApp key="mail" />
        )}
      </AnimatePresence>

      {/* Global Spotlight Search Modal */}
      <SpotlightModal />
    </>
  );
};
