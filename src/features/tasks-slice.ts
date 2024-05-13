// const initialState = []; // why is this array of never?
// this object key must just hold onto nothing forever and ever...
// ^ why this is bad
// typescript does not know what this array is out of the box
// why array is bad
// is list currently loading??
// indexable??
// starting with "oh I just need this" is bad, gotta rewrite

// import data from '../api/data.json';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';
import { removeUser } from './users-slice';
// this is better;
// more extendable down the line
// loading state; pagination metadata;
type TasksState = {
  entities: Task[];
  loading?: boolean; // ? just to have initial tests passing; a bit lazy sure
};

// wow! Partial<X> means take all the types in X and make them optional
// end goal: it's weird to put in an ID when creating a Task
// type DraftTask = Partial<Task>;

// just pick title from the Task type
// RequireOnly: made in global.d.ts
// Big Picture: DraftTask just needs to take in title from Task,
// everything else is optional
// Pick isn't great because it says it only takes in title
// Partial isn't great, because it makes everything optional, but title should be required
// The typing for RequireOnly is too complex, but not point of exercise rn;
type DraftTask = RequireOnly<Task, 'title'>;

export const createTask = (draftTask: DraftTask): Task => {
  return { id: nanoid(), ...draftTask }; // nanoid comes straight from redux toolkit!
};

const initialState: TasksState = {
  // entities: data.tasks,
  entities: [],
  loading: false,
};

// everything can live inside of here
// NOT Flux Standard Actions meaning:
// { type: 'what happened', payload: {  }}
// no indirection anymore!
// no folder for actions
// no folder for reducers
// no types to declare
// no need for spread operators!

// brilliantly easier way to handle fetching
// handles fulfilled, rejected, pending all in one function
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (): Promise<Task[]> => {
    const response = await fetch('/api/tasks').then((response) =>
      response.json(),
    );

    return response.tasks;
  },
);

// reducers, action, initialState, it's all just right here!
// This, I totally see its magic
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      // entities come from initialState and type
      const task = createTask(action.payload);
      state.entities.unshift(task); // no need for spread operators
      // [action.payload, ...state.entities]
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      const index = state.entities.findIndex(
        (task) => task.id === action.payload,
      );

      // why splicing instead of filtering?
      // old redux: definitely filter cause that returns a new array
      // new redux-toolkit: splice, because the api mutates the array
      // or at least makes it look like you're mutating
      state.entities.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    // when you remove a user (an action for a different slice)
    // you should unassign him from all of the tasks he's involved in
    // i.e. when an employee quits, you should assign him from
    // all the JIRA tickets

    // removing a user is still just one action
    // think of it as an action with side effects sort of...
    builder.addCase(removeUser, (state, action) => {
      const userId = action.payload;
      for (const task of state.entities) {
        if (task.user === userId) {
          task.user = undefined;
        }
      }
    });

    // tasks/fetchTasks/pending
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.loading = true;
    });

    // tasks/fetchTasks/fulfilled
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });

    // his case for why he doesn't like useReducer
    // let's do work after the component is mounted?
    // let's get data then mount component makes more sense < Kinney
  },
});

// tasksSlice.actions.addTask();
// tasksSlice.actions.addTask(); // with greate typescript and autocomplete support out of the box!

export const tasksReducer = tasksSlice.reducer; // normal reducer
export const { addTask, removeTask } = tasksSlice.actions;

export default tasksSlice;
