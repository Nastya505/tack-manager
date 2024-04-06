import React from 'react'
import { ITask } from '../../validation-schemas';
import Checkbox from '../checkbox/checkdox';

interface IProps {
  item: ITask; 
  editCompleted: (id: number, completed: boolean) => void;
}

const Task = ({ item, editCompleted }: IProps ) => {
  return (
    <div key={item.id} className="card w-96 gap-2 bg-base-200 p-4 shadow-xl">
      <Checkbox
        id={item.id}
        completed={item.completed}
        editCompleted={editCompleted}
      />
      <h2 className="card-title">{item.title}</h2>
      <p>{item.description}</p>
    </div>

  )
}

export default Task