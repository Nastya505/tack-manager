"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";

import { TaskForm } from "@/app/validation-schemas";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/validation-schemas";
import Link from "next/link";

import ErrorMessage from "@/app/components/error-message/error-message";

const NewTaskPage = () => {
      const {
        register,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<TaskForm>({
        resolver: zodResolver(createTaskSchema),
      });
    
      const [error, setError] = useState<string | null>(null);
    
      const mdeOptions = useMemo(() => {
        return {
          autofocus: true,
          spellChecker: false,
        };
      }, []);
    
      const router = useRouter();
    
      return (
        <>
          <Link href="/" className="btn btn-neutral mt-4">Back</Link>
          <div className="flex mt-10 items-center justify-center h-full">
            <form
              className="max-w-xl space-y-5"
              onSubmit={handleSubmit(async (data) => {
                try {
                  await axios.post("/api/tasks", data);
                  router.push("/");
                } catch (error) {
                  setError("Unaxpected error. Please try again later.");
                }
              })}
            >
              <h1 className="text-3xl text-center text-zinc-600 font-bold">
                New task
              </h1>
    
              <input
                type="text"
                {...register("title")}
                placeholder="Title"
                className="input input-bordered w-full"
              />
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
    
              <input
                type="text"
                {...register("description")}
                placeholder="Description"
                className="input input-bordered w-full"
              />
           
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            
              {error && (
                <div role="alert" className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6 display-flex justify-end items-end"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              <button type="submit" className="btn btn-neutral w-full">
                Submit
              </button>
            </form>
          </div>
        </>
      );
    };
    
export default NewTaskPage