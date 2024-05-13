// import { useContext } from 'react';
// import ApplicationContext from '../context';
import Task from './task';
// import { useSelector } from 'react-redux';
// import { ApplicationState } from '../lib/store';
import {
  // useAppSelector,
  useTasks,
} from '../hooks';
import Loading from './loading';

const TaskList = () => {
  // const { tasks } = useContext(ApplicationContext);

  // one option...
  // however, you don't want to import ApplicationState everytime you use useSelector
  // const tasks = useSelector((state: ApplicationState) => state.tasks.entities);

  // custom hook wrapping useAppSelector which wraps useSelector
  const [tasks, loading] = useTasks();

  return (
    <section className="task-list">
      <Loading loading={loading} />
      {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
    </section>
  );
};

export default TaskList;
