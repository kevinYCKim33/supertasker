import { addTask, createTask, tasksReducer } from './tasks-slice';

// npm run test
describe('tasksSlice', () => {
  const initialState = {
    entities: [
      // creates a task; aka generates id and makes a Task object
      createTask({ title: 'Write tests' }),
      createTask({ title: 'Make them pass' }),
    ],
  };

  it(`should add a task when the ${addTask}`, () => {
    // only difference btw. createTask, and addTask
    // createTask generates an id for the task for addTask to add
    const task = createTask({ title: 'Profit' });
    const action = addTask(task);
    // const action: {
    //     payload: DraftTask;
    //     type: "tasks/addTask";
    // }

    // reducer: in the end it's just a function
    // takes in a given state,
    // takes in an action
    // and returns a new state

    // TLDR of redux: if you submit an action to a reducer with a state, you get new state
    const newState = tasksReducer(initialState, action);

    // since we're unshifting
    expect(newState.entities).toEqual([task, ...initialState.entities]);
  });
});

// typical reducer format
// export const classicReducer = (state: CounterState, action: CounterAction) => {
//   if (action.type === increment.type) {
//     return { count: state.count + action.payload };
//   }

//   if (action.type === decrement.type) {
//     return { count: state.count - action.payload };
//   }

//   if (action.type === reset.type) {
//     return { count: 0 };
//   }

//   return state;
// };
