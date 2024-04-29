// const initialState = []; // why is this array of never?
// this object key must just hold onto nothing forever and ever...
// ^ why this is bad
// typescript does not know what this array is out of the box
// why array is bad
// is list currently loading??
// indexable??
// starting with "oh I just need this" is bad, gotta rewrite

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// this is better;
// more extendable down the line
// loading state; pagination metadata;
type TasksState = {
  entities: Task[];
};

const initialState: TasksState = {
  entities: [],
};

// everything can live inside of here
// NOT Flux Standard Actions meaning:
// { type: 'what happened', payload: {  }}
// no indirection anymore!
// no folder for actions
// no folder for reducers
// no types to declare
// no need for spread operators!

// reducers, action, initialState, it's all just right here!
// This, I totally see its magic
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.entities.unshift(action.payload); // no need for spread operators
      // [action.payload, ...state.entities]
    },
    removeTask: (state) => state,
  },
});

// tasksSlice.actions.addTask();
// tasksSlice.actions.addTask(); // with greate typescript and autocomplete support out of the box!
