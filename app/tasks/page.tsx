"use client"

import React from 'react'
import Task from '../components/task/task';
import Filter from '../components/filter/filter';
import Link from 'next/link';
import { ITask } from '../validation-schemas';

const TasksPage = async () => {

const [filter, setFilter] = React.useState("all");
const [tasks, setTasks] = React.useState<ITask[]>([]);

const response = await fetch('http://localhost:3000/api/tasks');
const data = await response.json();
setTasks(data);

const editCompleted = (id: number) => {
  const issue = tasks.find((item) => item.id === id);

  if (!issue) return;

  fetch(`http://localhost:3000/api/issues/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !issue.completed,
      title: issue.title,
      description: issue.description,
    }),
  }).then(() => {
    const index = tasks.findIndex((item) => item.id === id);
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  });
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
    <div>
    <div className="flex gap-4 justify-between border-y border-neutral-700 py-4 items-center my-6">
      <Filter filter={filter} setFilter={setFilter} />
      <Link className="btn btn-outline btn-md" href="/issues/new">
        Добавить задачу
      </Link>
    </div>

    <div className="flex flex-col gap-4">
    {filteredTasks.map((item: ITask) => (
      <Task
        key={item.id + item.title + item.description}
        item={item}
        editCompleted={editCompleted}
      />
    ))}
    </div>
  </div>
  );
}

export default TasksPage;