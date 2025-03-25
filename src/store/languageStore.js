import { create } from 'zustand';

const useLanguageStore = create((set) => ({
  isFrench: false,
  toggleLanguage: () => set((state) => ({ isFrench: !state.isFrench })),
}));

export default useLanguageStore; 