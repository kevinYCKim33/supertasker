import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks-slice';
import { useAppDispatch } from '../hooks';

const CreateTask = () => {
  const [newTaskTitle, setnewTaskTitle] = useState('');
  // const dispatch = useDispatch(); // this dispatches any action
  const dispatch = useAppDispatch(); // this is actually wired up with the actions you've written

  return (
    <form
      className="create-task"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addTask({ title: newTaskTitle }));
      }}
    >
      <label htmlFor="new-task-title">
        Title
        <input
          id="new-task-title"
          type="text"
          value={newTaskTitle}
          placeholder="Title"
          required
          onChange={(e) => setnewTaskTitle(e.target.value)}
        />
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
