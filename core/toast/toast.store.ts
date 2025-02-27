import { create } from 'zustand';

type Severity = 'success' | 'error' | 'info' | 'warning' | undefined;

export interface ToastState {
  isToastVisible: boolean;
  text: string;
  severity: Severity;
  openToast: (text: string, severity: string) => void;
  closeToast: () => void;
}

export const useToastStore = create<ToastState>(set => ({
  isToastVisible: false,
  text: '',
  severity: undefined,
  openToast: (text: string, severity: Severity) => {
    set({ isToastVisible: true, text, severity });
  },
  closeToast: () => {
    set({ isToastVisible: false, text: '', severity: undefined });
  },
}));
