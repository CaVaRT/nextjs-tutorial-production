'use client';
import { editTask, getTask } from '@/utils/actions';
import { useFormStatus, useFormState } from 'react-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-sm btn-primary btn-block"
      disabled={pending}
    >
      {pending ? 'editing' : 'EDIT'}
    </button>
  );
};

const initialState = {
  message: null,
};
const EditForm = async ({ task }) => {
  const { id, completed, content } = task;

  const [state, formAction] = useFormState(editTask, initialState);

  useEffect(() => {
    if (state.message === 'success') {
      toast.success('edited successfully');
      redirect('/tasks')
      
    } else if (state.message === 'error') {
      toast.error('there was an error, please try again!');
      return;
    }
    return;
  }, [state]);

  return (
    <form
      action={formAction}
      className="max-w-sm p-12 border border-base-300 rounded-lg "
    >
      <input type="hidden" value={id} name="id" />
      {/* content */}
      <input
        type="text"
        defaultValue={content}
        className="input input-bordered w-full"
        name="content"
        required
      />
      {/* completed */}
      <div className="form-control my-4">
        <label htmlFor="completed" className="label cursor-pointer">
          <span className="label-text">completed</span>
          <input
            type="checkbox"
            defaultChecked={completed}
            id="completed"
            name="completed"
            className="checkbox checkbox-primary checkbox-sm"
          />
        </label>
      </div>
      <SubmitBtn />
    </form>
  );
};
export default EditForm;
