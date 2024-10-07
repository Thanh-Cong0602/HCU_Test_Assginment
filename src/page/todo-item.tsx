import { toast } from 'react-toastify'
import { todoApi } from '~/api/service/todos'
import { TodoItems } from '~/types/todo.type'

interface TodoItemProps {
  item: TodoItems
  todos: TodoItems[]
  setTodos: React.Dispatch<React.SetStateAction<TodoItems[]>>
}

const TodoItem = ({ item, setTodos }: TodoItemProps) => {
  const updateChecked = async (id: string) => {
    setTodos(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, isDone: !item.isDone } : item))
    )

    try {
      const body = { ...item, isDone: !item.isDone }
      await todoApi.updateTodoById(id, body)
    } catch (error) {
      toast.error('Error updating todo:' + error, { autoClose: 2000 })
      setTodos(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, isDone: !item.isDone } : item))
      )
    }
  }

  return (
    <div className='h-10 w-full bg-white my-3 rounded-lg flex items-center px-3 shadow-lg gap-3'>
      <input
        checked={item.isDone}
        onChange={() => updateChecked(item.id as string)}
        type='checkbox'
        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer'
      ></input>
      <p className={`${item.isDone ? 'line-through' : ''}`}> {item.content}</p>
    </div>
  )
}

export default TodoItem
