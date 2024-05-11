import { useContext } from 'react';
import ApplicationContext from '../context';
import Task from './task';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../lib/store';
import { useAppSelector } from '../hooks';

const TaskList = () => {
  // const { tasks } = useContext(ApplicationContext);

  // one option...
  // however, you don't want to import ApplicationState everytime you use useSelector
  // const tasks = useSelector((state: ApplicationState) => state.tasks.entities);
  const tasks = useAppSelector(
    (state: ApplicationState) => state.tasks.entities,
  );

  return (
    <section className="task-list">
      {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
    </section>
  );
};

export default TaskList;
