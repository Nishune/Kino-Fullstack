"use client";
import { useState } from "react";
import HandicapInfoModal from "./DisableModal";

type Props = {
  children: React.ReactNode;
};

const HandicapSeatHandler = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <HandicapInfoModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HandicapSeatHandler;
