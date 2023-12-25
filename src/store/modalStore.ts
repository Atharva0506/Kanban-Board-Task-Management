import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  isUpdate: boolean;
  selectedTask: Todo | null;  // Added selectedTask property
  openModal: () => void;
  updateModal: (selectedTask: Todo) => void;  // Pass selectedTask when updating
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  isUpdate: false,
  selectedTask: null,
  openModal: () => set({ isOpen: true }),
  updateModal: (selectedTask) => set({ isUpdate: true, selectedTask }),
  closeModal: () => set({ isOpen: false, isUpdate: false, selectedTask: null }),
}));
