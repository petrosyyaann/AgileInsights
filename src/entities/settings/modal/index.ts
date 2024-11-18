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
      settings: [
        {
          id: '1731888047523',
          name: 'Дефолтное значение 1',
          field_name: 'Средний процент изменения беклога',
          sign: '<',
          threshold: 50,
        },
        {
          id: '1731888065425',
          name: 'Дефолтное значение 2',
          field_name: 'Средний процент изменения беклога',
          sign: '<',
          threshold: 20,
        },
      ],
      addSetting: (setting) =>
        set((state) => ({ settings: [...state.settings, setting] })),
      removeSetting: (id) =>
        set((state) => ({
          settings: state.settings.filter((setting) => setting.id !== id),
        })),
    }),
    { name: 'sprint-health-settings' } 
  )
)
