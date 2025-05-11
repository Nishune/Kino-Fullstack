"use client";
import { useState } from "react";
import DisableModal from "./DisableModal";

type Props = {
  children: React.ReactNode;
};

const HandicapSeatHandler = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <DisableModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HandicapSeatHandler;
