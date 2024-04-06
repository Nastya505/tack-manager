import React from 'react'
import { ITask } from '../../validation-schemas';

interface IProps {
  item: ITask; 
  editCompleted: (id: number, completed: boolean) => void;
}

const Task = ({ item: task, editCompleted }: IProps ) => {
  return (
    <div key={task.id} className="card w-96 gap-2 bg-base-200 p-4 shadow-xl">
  <input
      type="checkbox"
      defaultChecked={task.completed}
      onChange={() => editCompleted(task.id, !task.completed)}
      className="checkbox checkbox-sm z-50"
    />
      <h2 className="card-title">{task.title}</h2>
      <p>{task.description}</p>
    </div>

  )
}

export default Task