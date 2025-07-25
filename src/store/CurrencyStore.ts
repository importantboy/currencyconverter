import { create } from "zustand";

interface Icr {
  code: string;
  value: number | string;
}

interface CrState {
  base_cr: Icr;
  target_cr: Icr;
  selectbase_cr: (selected_cr: string) => void;
  selecttarget_cr: (selected_cr: string) => void;
  setbasecr_value: (value: string) => void;
  settargetcr_value: (value: string) => void;
}

export const useCrStore = create<CrState>((set) => ({
  base_cr: { code: "USD", value: ''},
  target_cr: { code: "INR", value: ''},
 
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
