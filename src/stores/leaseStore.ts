import { create } from "zustand"

type leaseStore = {
  startMonth: string
  setStartMonth: (query: string) => void
  durationMonths: string
  setDurationMonths: (query: string) => void
}

export const useLeaseStore = create<leaseStore>((set) => ({
  startMonth: "2026-10",
  setStartMonth: (query) => set({ startMonth: query }),
  durationMonths: "3",
  setDurationMonths: (query) => set({ durationMonths: query }),
}))
