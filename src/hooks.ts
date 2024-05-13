import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { ApplicationDispatch, ApplicationState } from './lib/store';
import { useMemo } from 'react';

// const useAppSelect = (selector: (state: ApplicationState) => ) => useSelector(state);

// essentially wrapping useSelector to use the typings you've created in ApplicationState
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;

// why is this a function?
export const useAppDispatch: () => ApplicationDispatch = useDispatch;

export const useTasks = () => {
  const tasks = useAppSelector((state) => state.tasks.entities);
  const loading = useAppSelector((state) => !!state.tasks.loading);

  // he seemed iffy on justifying useMemo...
  // unless tasks, and loading change, do not recalculate the values of loading
  return useMemo(() => [tasks, loading] as const, [tasks, loading]);
};
