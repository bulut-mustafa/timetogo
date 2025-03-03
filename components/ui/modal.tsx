import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
  } from "@heroui/react";
  
  export default function HeroModal({ isOpen, onOpenChange, size, children }: { isOpen: boolean, onOpenChange: (open: boolean) => void, size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined, children: React.ReactNode }) {
    return (
      <Modal size={size} isOpen={isOpen} onOpenChange={onOpenChange} className="min-h-[100%] h-[100dvh] my-0 mx-0 rounded-none sm:my-0 sm:mx-0 sm:rounded-none md:rounded-lg md:h-auto md:w-auto md:max-w-[90%] md:my-8 md:min-h-0">
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
  