import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FilterState = {
  minRange: number
  maxRange: number
  setMinRange: (value: number) => void
  setMaxRange: (value: number) => void
  selectedSprints: number[]
  toggleSprintSelection: (sprint: string) => void
  clearSprints: () => void
}

export const useFiltresStore = create<FilterState>()(
  persist(
    (set) => ({
      minRange: 0,
      maxRange: 14,
      setMinRange: (value: number) =>
        set((state) => ({
          minRange: Math.min(value, state.maxRange),
        })),
      setMaxRange: (value: number) =>
        set((state) => ({
          maxRange: Math.max(value, state.minRange),
        })),

      selectedSprints: [],
      toggleSprintSelection: (sprint: string) =>
        set((state) => ({
          selectedSprints: state.selectedSprints.includes(Number(sprint))
            ? state.selectedSprints.filter((s) => s !== Number(sprint))
            : [...state.selectedSprints, Number(sprint)],
        })),
      clearSprints: () => set({ selectedSprints: [] }),
    }),
    {
      name: 'filters',
    }
  )
)
