"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Opening } from "./Opening";

interface InvitationShellProps {
  children: ReactNode;
  onOpenInvitation?: () => void;
}

/** Gates the story behind the envelope and locks scrolling until it has opened. */
export function InvitationShell({ children, onOpenInvitation }: InvitationShellProps) {
  const [opened, setOpened] = useState(false);
  
  const handleOpened = useCallback(() => {
    setOpened(true);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      {!opened && (
        <Opening 
          onOpened={handleOpened} 
          onOpenMusic={onOpenInvitation} 
        />
      )}
      {children}
    </>
  );
}