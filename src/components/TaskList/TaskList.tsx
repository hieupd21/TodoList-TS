import { Todo } from '../../@types/todo.type'
import styles from './style.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
  currentTodo: Todo | null
}

const TaskList = (props: TaskListProps) => {
  const {
    doneTaskList,
    todos,
    handleDoneTodo,
    startEditTodo,
    deleteTodo,
    currentTodo
  } = props

  const onChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (handleDoneTodo) handleDoneTodo(id, event.target.checked)
  }

  return (
    <div>
      <h2 className={styles.title}>
        {doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}
      </h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div key={todo.id} className={styles.task}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={(event) => onChangeCheckbox(event, todo.id)}
            />
            <h2
              className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}
            >
              {todo.name}
            </h2>
            <div className={styles.taskActions}>
              <button
                className={styles.taskBtn}
                onClick={() => startEditTodo(todo.id)}
              >
                😉
              </button>
              <button
                className={styles.taskBtn}
                onClick={() => deleteTodo(todo.id)}
                disabled={!!currentTodo}
              >
                😒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
