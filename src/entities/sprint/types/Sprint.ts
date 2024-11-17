export interface Sprint {
  id: number
  name: string
  status: string
  from_date: string
  to_date: string
  tasks_in_sprint: number
}

export interface SprintData {
  all_tasks_estimation: number
  name: string
  sprint_id: number
  from_date: string
  to_date: string
  backlog_update: number
  to_do_estimation_points: number[]
  done_estimation_points: number[]
  processed_estimation_points: number[]
  removed_estimation_points: number[]
  blocked_tasks_points: number[]
  created_tasks_points: number[]
  excluded_tasks_points: number[]
  created_tasks_amount: number[]
  excluded_tasks_amount: number[]
  tasks_in_sprint: number
}

export interface Compare {
  sprint_id: number;
  to_do_estimation_top: number;
  done_estimation_top: number;
  processed_estimation_top: number;
  removed_estimation_top: number;
  blocked_tasks_top: number;
  created_tasks_top: number;
  excluded_tasks_top: number;
  to_do_estimation_points: number;
  done_estimation_points: number;
  processed_estimation_points: number;
  removed_estimation_points: number;
  blocked_tasks_points: number;
  created_tasks_points: number;
  excluded_tasks_points: number;
  result: number;
}

