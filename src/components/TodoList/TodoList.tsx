import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './style.module.scss'

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done
          }
        }
        return todo
      })
    )
  }

  const startEditTodo = (id: string) => {
    const finededTodo = todos.find((todo) => todo.id === id)
    if (finededTodo) {
      setCurrentTodo(finededTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEditTodo = () => {
    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
  }

  const deleteTodo = (id: string) => {
    const handler = (todosObj: Todo[]) =>
      todosObj.filter((todo) => todo.id !== id)
    setTodos(handler)
  }

  return (
    <div className={styles.TodoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTodo={addTodo}
          currentTodo={currentTodo}
          editTodo={editTodo}
          finishEditTodo={finishEditTodo}
        />
        <TaskList
          todos={notDoneTodos}
          doneTaskList={false}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
          currentTodo={currentTodo}
        />
        <TaskList
          todos={doneTodos}
          doneTaskList
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
          currentTodo={currentTodo}
        />
      </div>
    </div>
  )
}

export default TodoList
