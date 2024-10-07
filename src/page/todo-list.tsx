import TodoItem from '~/page/todo-item'
import { TodoItems } from '~/types/todo.type'

interface TodoListProps {
  todos: TodoItems[]
  setTodos: React.Dispatch<React.SetStateAction<TodoItems[]>>
}
const TodoList = ({ todos, setTodos }: TodoListProps) => {
  return (
    <>
      {todos.map((item, index) => (
        <div key={index}>
          <TodoItem item={item} todos={todos} setTodos={setTodos} />
        </div>
      ))}
    </>
  )
}

export default TodoList
