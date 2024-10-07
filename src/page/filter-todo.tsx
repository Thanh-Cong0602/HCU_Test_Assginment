import React from 'react'
import { FilterType } from '~/utils/enum.utils'

interface FilterTodoProps {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const FilterTodo: React.FC<FilterTodoProps> = ({ filter, setFilter }) => {
  return (
    <div className='my-3 p-2 bg-white rounded-lg shadow-lg'>
      <p className='font-bold'>Filter:</p>
      <div className='w-full h-10  flex items-center'>
        <div className='flex gap-3 items-center'>
          <label>
            <input
              type='radio'
              value={FilterType.ALL}
              checked={filter === FilterType.ALL}
              onChange={() => setFilter(FilterType.ALL)}
            />
            All
          </label>
          <label>
            <input
              type='radio'
              value={FilterType.COMPLETED}
              checked={filter === FilterType.COMPLETED}
              onChange={() => setFilter(FilterType.COMPLETED)}
            />
            Completed
          </label>
          <label>
            <input
              type='radio'
              value={FilterType.INCOMPLETED}
              checked={filter === FilterType.INCOMPLETED}
              onChange={() => setFilter(FilterType.INCOMPLETED)}
            />
            Incompleted
          </label>
        </div>
      </div>
    </div>
  )
}

export default FilterTodo
