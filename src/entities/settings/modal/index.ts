import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface HealthSetting {
  id: string
  name: string
  field_name: string
  sign: '>' | '<'
  threshold: number
}

export interface SettingsState {
  settings: HealthSetting[]
  addSetting: (setting: HealthSetting) => void
  removeSetting: (id: string) => void
}

// Zustand store с persist
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: [],
      addSetting: (setting) =>
        set((state) => ({ settings: [...state.settings, setting] })),
      removeSetting: (id) =>
        set((state) => ({
          settings: state.settings.filter((setting) => setting.id !== id),
        })),
    }),
    { name: 'sprint-health-settings' } // ключ для localStorage
  )
)
