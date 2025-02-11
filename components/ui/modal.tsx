import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
  } from "@heroui/react";
  
  export default function HeroModal({ isOpen, onOpenChange, size, children }: { isOpen: boolean, onOpenChange: (open: boolean) => void, size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined, children: React.ReactNode }) {
    return (
      <Modal size={size} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
  