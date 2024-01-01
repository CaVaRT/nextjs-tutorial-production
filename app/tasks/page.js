import { TaskForm, TaskList } from '../components';
import TaskFormCustom from '../components/TaskFormCustom';
export const dynamic = 'force-dynamic';

const Tasks = () => {
  return (
    <div className="max-w-lg">
      <TaskFormCustom />
      <TaskList />
    </div>
  );
};
export default Tasks;
