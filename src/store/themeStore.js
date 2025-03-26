import { create } from 'zustand';

const useThemeStore = create((set) => ({
  isDarkMode: localStorage.getItem('isDarkMode') === 'true',
  toggleDarkMode: () => set((state) => {
    const newState = !state.isDarkMode;
    localStorage.setItem('isDarkMode', newState);
    return { isDarkMode: newState };
  }),
}));

export default useThemeStore; 