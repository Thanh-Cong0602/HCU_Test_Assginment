import React from 'react'

interface FilterTodoProps {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const FilterTodo: React.FC<FilterTodoProps> = ({ filter, setFilter }) => {
  return (
    <div className='my-3 p-2 bg-white rounded-lg shadow-lg'>
      <p>Filter Result:</p>
      <div className='w-full h-10  flex items-center'>
        <div className='flex gap-3 items-center'>
          <label>
            <input
              type='radio'
              value='all'
              checked={filter === 'all'}
              onChange={() => setFilter('all')}
            />
            All
          </label>
          <label>
            <input
              type='radio'
              value='completed'
              checked={filter === 'completed'}
              onChange={() => setFilter('completed')}
            />
            Completed
          </label>
          <label>
            <input
              type='radio'
              value='incompleted'
              checked={filter === 'incompleted'}
              onChange={() => setFilter('incompleted')}
            />
            Incompleted
          </label>
        </div>
      </div>
    </div>
  )
}

export default FilterTodo
