import { create } from 'zustand';

const useLanguageStore = create((set) => ({
  isFrench: localStorage.getItem('isFrench') === 'true',
  toggleLanguage: () => set((state) => {
    const newState = !state.isFrench;
    localStorage.setItem('isFrench', newState);
    return { isFrench: newState };
  }),
}));

export default useLanguageStore; 