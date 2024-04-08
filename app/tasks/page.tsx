'use client'

import React from 'react'
import Task from '../components/task/task';
import Filter from '../components/filter/filter';
import Link from 'next/link';
import { ITask } from '../validation-schemas';

const TasksPage =  () => {

const [filter, setFilter] = React.useState("all");
const [tasks, setTasks] = React.useState<ITask[]>([]);


const getTasks = () => {
  fetch("http://localhost:3000/api/tasks")
    .then((res) => res.json())
    .then((tasks) => setTasks(tasks));
};

React.useEffect(() => {
  getTasks();
}, []);

const editCompleted = (id: number, completed: boolean) => {
  fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  })

  const newTasks = tasks.map((item) => {
    if (item.id === id) {
      return { ...item, completed };
    }
    return item;
  });
  setTasks(newTasks);
};

const filteredTasks: ITask[]  = React.useMemo(() => {
  if (filter === "all") {
    const completedIssues = tasks.filter((item) => item.completed);
    const uncompletedIssues = tasks.filter((item) => !item.completed);
    return [...uncompletedIssues, ...completedIssues];
  }
  if (filter === "completed") return tasks.filter((item) => item.completed);
  if (filter === "uncompleted")
    return tasks.filter((item) => !item.completed);
  return tasks;
}, [tasks, filter]);


  return (
    <>
    <div className="flex gap-4 w-full justify-between border-y border-neutral-700 py-4 px-4 items-center my-6">
      <Filter filter={filter} setFilter={setFilter} />
      <Link href="/tasks/new" className="btn w-96 btn-primary">New Task</Link>
    </div>

    <div className="flex flex-col gap-4 w-3/4 mx-auto" >
    {filteredTasks.map((item: ITask) => (
      <Task
        key={item.id}
        item={item}
        editCompleted={editCompleted}
      />
    ))}
    </div>
  </>
  )
}

export default TasksPage;