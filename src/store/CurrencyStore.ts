import { create } from "zustand";

interface Icr {
  code: string;
  value: number;
}

interface CrState {
  base_cr: Icr;
  target_cr: Icr;
  selectbase_cr: (selected_cr: string) => void;
  selecttarget_cr: (selected_cr: string) => void;
  setbasecr_value: (value: number) => void;
  settargetcr_value: (value: number) => void;
}

export const useCrStore = create<CrState>((set) => ({
  base_cr: { code: "USD", value: 0},
  target_cr: { code: "INR", value: 0},
 
  selectbase_cr: (selected_code) =>
    set((state) => ({
      base_cr: { ...state.base_cr, code: selected_code },
    })),
  selecttarget_cr: (selected_cr) =>
    set((state) => ({ target_cr: { ...state.target_cr, code: selected_cr } })),

  setbasecr_value: (value) =>
    set((state) => ({
      base_cr: { ...state.base_cr, value: value },
    })),

  settargetcr_value: (value) =>
    set((state) => ({
      target_cr: { ...state.target_cr, value: value },
    })),
}));
