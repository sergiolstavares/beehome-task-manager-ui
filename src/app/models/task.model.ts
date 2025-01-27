export interface Task {
  id?: String
  title?: String
  description?: String
  status: "PENDING" | "INPROGRESS" | "COMPLETED"
  deadline?: Date
  assignedTo: String
}
