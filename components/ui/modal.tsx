"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
} from "@heroui/react";
import { useRouter } from "next/navigation";

interface LocationModalProps {
  children?: React.ReactNode;
}

export default function LocationModal({children}: LocationModalProps) {
    const router = useRouter();
    const handleOpenChange = () => {
        router.back();
    }; 

  return (
    <Modal defaultOpen isOpen onOpenChange={handleOpenChange}>
      <ModalContent>
        {(onClose) => ( 
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
