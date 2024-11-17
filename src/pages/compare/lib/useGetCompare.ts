import { useFiltresStore } from 'entities/filters/modal'
import { getCompare } from 'entities/sprint/api'
import { Compare } from 'entities/sprint/types/Sprint'
import { useState, useMemo, useEffect } from 'react'

export const useGetCompare = () => {
  const [sprints, setSprints] = useState<Compare>()
  const { selectedSprints } = useFiltresStore()

  useEffect(() => {
    getCompare(selectedSprints[0])
      .then(({ data }) => {
        setSprints(data)
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSprints])

  const dataCompare = useMemo(() => {
    if (!sprints) return {} as Compare

    return sprints
  }, [sprints])

  return {
    dataCompare,
  }
}
