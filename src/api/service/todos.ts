import { ENDPOINTS } from '~/api/endpoints'
import API from '~/api/instance'
import { TodoItems } from '~/types/todo.type'

export const todoApi = {
  getAllTodos() {
    return API.get(ENDPOINTS.TODO)
  },
  updateTodoById(id: string, body: TodoItems) {
    return API.put(`${ENDPOINTS.TODO}/${id}`, body)
  },
  createTodo(body: TodoItems) {
    return API.post(ENDPOINTS.TODO, body)
  }
}
