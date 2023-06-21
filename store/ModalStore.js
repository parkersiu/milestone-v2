import { create } from "zustand";

export const useModalStore = create((set) => ({
  isOpen: false,
  settingsIsOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  openSettingsModal: () => set({ settingsIsOpen: true }),
  closeSettingsModal: () => set({ settingsIsOpen: false }),
}));
