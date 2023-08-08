"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React, { type ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

function ModalContent({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0  z-20 bg-black/50" />
      <Dialog.Content
        className={
          "fixed left-1/2 top-1/2 z-30 h-3/4 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-primary "
        }
      >
        <div className="flex w-full items-center justify-between p-6">
          <Dialog.Title className={"mx-auto  text-xl text-slate-400"}>
            {title}
          </Dialog.Title>
          <Dialog.Close className="hover:text-gray-400">
            <AiOutlineClose size={35} />
          </Dialog.Close>
        </div>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;
