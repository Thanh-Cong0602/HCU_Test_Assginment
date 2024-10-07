import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { todoApi } from '~/api/service/todos'
import { TodoItems } from '~/types/todo.type'

const formSchema = z.object({
  content: z.string().trim().min(1, 'Please enter your todo!'),
  isDone: z.boolean()
})

interface CreateTodoProps {
  todos: TodoItems[]
  setTodos: React.Dispatch<React.SetStateAction<TodoItems[]>>
}

const CreateTodo = ({ todos, setTodos }: CreateTodoProps) => {
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

  return (
    <>
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
    </>
  )
}

export default CreateTodo
