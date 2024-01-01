'use client';
import { createTaskCustom } from '@/utils/actions';
import { useEffect } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import toast from 'react-hot-toast';

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary join-item"
      disabled={pending}
    >
      {pending ? 'please wait' : 'create task'}
      
    </button>
  );
};

const initialState = {
  message: null,
};

const TaskFormCustom = () => {
  const [state, formAction] = useFormState(createTaskCustom, initialState);
  useEffect(() => {
    if (state.message === 'error') {
      toast.error('there was an error!');
      return;
    }
    if (state.message === 'success') {
      toast.success('the task has been added');
      return;
    }
  }, [state]);
  return (
    <form action={formAction} className="w-full">
      {/* {state ? <p className="mb-2">{state.message}</p> : null} */}
      <div className="join w-full">
        <input
          type="text"
          name="content"
          className="input input-bordered w-full join-item rounded"
          required
          placeholder="type here..."
        />
        <SubmitBtn />
      </div>
    </form>
  );
};
export default TaskFormCustom;
