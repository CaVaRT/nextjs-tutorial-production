'use client';
import { deleteTask } from '@/utils/actions';
import { useFormStatus, useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { revalidatePath } from 'next/cache';

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-error btn-xs" disabled={pending}>
      {pending ? 'deleting...' : 'DELETE'}
    </button>
  );
};

const initialState = {
  message: null,
};

const DeleteForm = ({ id }) => {
  const [state, formAction] = useFormState(deleteTask, initialState);
  useEffect(() => {
    if (state.message === 'success') {
      toast.success('woohoo!');
      return;
    } else if (state.message === 'error') {
      toast.error('there was an error');
      return;
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <SubmitBtn />
    </form>
  );
};
export default DeleteForm;
