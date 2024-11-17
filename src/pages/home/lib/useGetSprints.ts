import { useFiltresStore } from 'entities/filters/modal'
import { getResultSprints, getSprint } from 'entities/sprint/api'
import { Sprint, SprintData } from 'entities/sprint/types/Sprint'
import { useState, useMemo, useEffect } from 'react'
import { DataRow } from 'widgets/SprintTableCard'

function transformDataToDataRow(sprints: SprintData[]): DataRow[] {
  return sprints.map((sprint) => {
    const row: DataRow = { Спринты: sprint.name }

    sprint.created_tasks_points.forEach((value, index) => {
      const excludedValue = sprint.excluded_tasks_points[index] ?? 0
      row[String(index + 1)] = `${value}/${excludedValue}`
    })

    return row
  })
}

function transformDataToTooltip(sprints: SprintData[]): DataRow[] {
  return sprints.map((sprint) => {
    const row: DataRow = { Спринты: sprint.name }

    sprint.created_tasks_amount.forEach((value, index) => {
      const excludedValue = sprint.excluded_tasks_amount[index] ?? 0
      row[String(index + 1)] = `${value}/${excludedValue}`
    })

    return row
  })
}

export const useGetSprints = () => {
  const [sprints, setSprints] = useState<Sprint[]>()
  const [result, setResult] = useState<SprintData[]>()
  const { selectedSprints, maxRange, minRange } = useFiltresStore()

  useEffect(() => {
    getSprint()
      .then(({ data }) => {
        setSprints(data)
        data &&
          getResultSprints(
            selectedSprints.length > 0
              ? selectedSprints
              : data.map((sprint) => sprint.id)
          ).then(({ data }) => {
            setResult(data)
          })
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSprints])

  const data = useMemo(() => {
    if (!sprints) return undefined

    return sprints.map((sprint) => ({
      label: sprint.name,
      value: String(sprint.id),
    }))
  }, [sprints])

  const dataBacklog = result
    ?.map((stat) => stat.backlog_update)
    .reduce(function (a, b) {
      return a + b
    }, 0)

  const dataBlockedSum =
    result
      ?.map((stat) =>
        stat.blocked_tasks_points.reduce(function (a, b) {
          return a + b
        }, 0)
      )
      .reduce(function (a, b) {
        return a + b
      }, 0) || 0

  const dataEstimationsSum =
    result
      ?.map((stat) => stat.all_tasks_estimation)
      .reduce(function (a, b) {
        return a + b
      }, 0) || 1

  const dataBlockedPersent = Number(
    ((dataBlockedSum / dataEstimationsSum) * 100).toFixed(2)
  )

  const dataHistogarm = {
    labels: result?.map((stat) => stat.name) as Array<string>,
    datasets: [
      {
        label: 'К выполнению',
        data: result?.map((stat) =>
          stat.to_do_estimation_points
            .slice(minRange - 1, maxRange + 1)
            .reduce(function (a, b) {
              return a + b
            }, 0)
        ) as number[],
        backgroundColor: '#8AF179',
        borderRadius: 100,
      },
      {
        label: 'В работе',
        data: result?.map((stat) =>
          stat.processed_estimation_points
            .slice(minRange - 1, maxRange + 1)
            .reduce(function (a, b) {
              return a + b
            }, 0)
        ) as number[],
        backgroundColor: '#7984F1',
        borderRadius: 100,
      },
      {
        label: 'Сделано',
        data: result?.map((stat) =>
          stat.done_estimation_points
            .slice(minRange - 1, maxRange + 1)
            .reduce(function (a, b) {
              return a + b
            }, 0)
        ) as number[],
        backgroundColor: '#F179C1',
        borderRadius: 100,
      },
      {
        label: 'Снято',
        data: result?.map((stat) =>
          stat.removed_estimation_points
            .slice(minRange - 1, maxRange + 1)
            .reduce(function (a, b) {
              return a + b
            }, 0)
        ) as number[],
        backgroundColor: '#61C6FF',
        borderRadius: 100,
      },
    ],
  }
  const dataTable = result ? transformDataToDataRow(result) : ([] as DataRow[])
  const dataTooltip = result
    ? transformDataToTooltip(result)
    : ([] as DataRow[])

  return {
    data,
    dataHistogarm,
    dataBacklog,
    dataBlockedSum,
    dataBlockedPersent,
    dataTable,
    dataTooltip,
  }
}
