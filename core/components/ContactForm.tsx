import React, { useState, useRef } from "react";
import Status from "./Status";

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const ideaRef = useRef<HTMLTextAreaElement>(null);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    const idea = ideaRef.current!.value;

    if (name === "") {
      setError("Please enter a valid name");
      nameRef.current?.focus();
      return;
    }

    if (email === "" || !validateEmail(email)) {
      setError("Please enter a valid email");
      emailRef.current?.focus();
      return;
    }

    if (!validateIdea(idea)) {
      setError("Please enter minimum 4 words and maximum 100 words");
      ideaRef.current?.focus();
      return;
    }

    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        idea,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    nameRef.current!.value = "";
    emailRef.current!.value = "";
    ideaRef.current!.value = "";
  }

  function reset() {
    setError(null);
  }

  return (
    <>
      {error !== "" && error && (
        <div className='flex flex-col gap-1 relative top-0 min-h-10 h-fit py-1 text-center font-semibold text-slate-100 mt-4 bg-red-500'>
          {error}
        </div>
      )}
      <form
        onSubmit={submitHandler}
        className='flex w-full mt-4 flex-col gap-1'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='name'>Name</label>
          <input
            onChange={() => {
              reset();
            }}
            ref={nameRef}
            type='text'
            id='name'
            name='name'
            className='outline-none py-1 px-2'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Email</label>
          <input
            onChange={() => {
              reset();
            }}
            ref={emailRef}
            type='email'
            name='email'
            id='email'
            className='outline-none py-1 px-2'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='idea'>Ide Aplikasi</label>
          <textarea
            onChange={() => {
              reset();
            }}
            ref={ideaRef}
            name='idea'
            id='idea'
            className='h-72 outline-none px-2 py-1'
          ></textarea>
        </div>
        <button
          disabled={error === ""}
          type='submit'
          className='disable:bg-slate-100 disabled:hover:bg-slate-100 disabled:text-black disabled:cursor-not-allowed hover:bg-slate-500 hover:text-white  font-medium bg-slate-300 mt-4 py-1'
        >
          Submit
        </button>
      </form>
    </>
  );
}

function validateIdea(idea: string) {
  // minimum 4 words
  // maximum 200 words
  const words = idea.split(" ");
  if (words.length < 4) return false;
  if (words.length > 200) return false;
  return true;
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
