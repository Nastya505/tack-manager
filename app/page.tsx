import TasksPage from "./tasks/page";
import Link from "next/link";
export default function Home() {
  return (
    <>
    <div className="flex flex-col w-full justify-center align-center mt-4">
      <Link href="/tasks/new" className="btn w-96 btn-primary">New Task</Link>
    </div>
    <TasksPage/>
    </>
  );
}
