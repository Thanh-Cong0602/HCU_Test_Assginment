import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { todoApi } from '~/api/service/todos'
import CreateTodo from '~/page/create-todo'
import FilterTodo from '~/page/filter-todo'
import TodoList from '~/page/todo-list'
import { TodoItems } from '~/types/todo.type'
import { FilterType } from '~/utils/enum.utils'

const TodoPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [todos, setTodos] = useState<TodoItems[]>([])
  const [filter, setFilter] = useState<string>(FilterType.ALL)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const resData = await todoApi.getAllTodos()
      setTodos(resData.data)
    } catch (err) {
      toast.error('Error fetching todos: ' + err, { autoClose: 2000 })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterType.COMPLETED) return todo.isDone
    if (filter === FilterType.INCOMPLETED) return !todo.isDone
    return true
  })

  if (isLoading)
    return <div className='flex items-center justify-center h-[100vh] text-[40px]'>Loading...</div>

  return (
    <div className='text-black w-full sm:w-[480px] px-2 sm:px-0 mx-auto py-10 overflow-y-auto'>
      <div>
        <div className='flex items-center justify-center gap-4 mb-5'>
          <p className=' font-bold text-center text-[40px]'>Todo list</p>
          <FaEdit className=' h-10 w-10' />
        </div>
        <CreateTodo todos={filteredTodos} setTodos={setTodos} />

        <FilterTodo filter={filter} setFilter={setFilter} />

        <TodoList todos={filteredTodos} setTodos={setTodos} />
      </div>
    </div>
  )
}

export default TodoPage
