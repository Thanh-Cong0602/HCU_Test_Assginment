import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { todoApi } from '~/api/service/todos'
import FilterTodo from '~/page/filter-todo'
import TodoList from '~/page/todo-list'
import { TodoItems } from '~/types/todo.type'
import { FilterType } from '~/utils/enum.utils'

const formSchema = z.object({
  content: z.string().trim().min(1, 'Please enter your todo!'),
  isDone: z.boolean()
})

const TodoPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      isDone: false
    }
  })

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await todoApi.createTodo(values)
      if (res.status === 200 || res.status === 201) {
        setTodos([...todos, values])
      }
    } catch (error) {
      toast.error('Error creating todo: ' + error, { autoClose: 2000 })
    } finally {
      reset()
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
    <div className='text-black w-[480px] mx-auto py-10 overflow-y-auto'>
      <div>
        <div className='flex items-center justify-center gap-4 mb-5'>
          <p className=' font-bold text-center text-[40px]'>Todo list</p>
          <FaEdit className=' h-10 w-10' />
        </div>
        <form className='flex items-center gap-3' onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='Add your text here'
            {...register('content', { required: true })}
          />
          <button
            className='bg-blue-500 w-[120px] text-white rounded-lg px-5 py-2 text-sm'
            type='submit'
            disabled={isSubmitting}
          >
            Add Task
          </button>
        </form>
        {errors.content && <p className=' text-red-500'>{errors.content.message}</p>}

        <FilterTodo filter={filter} setFilter={setFilter} />

        <TodoList todos={filteredTodos} setTodos={setTodos} />
      </div>
    </div>
  )
}

export default TodoPage
