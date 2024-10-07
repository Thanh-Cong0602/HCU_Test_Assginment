import { ToastContainer } from 'react-toastify'
import TodoPage from '~/page/todo'

function App() {
  return (
    <div className='min-h-screen bg-yellow-100'>
      <TodoPage />
      <ToastContainer newestOnTop className='toast-position' position='top-center' />
    </div>
  )
}

export default App
