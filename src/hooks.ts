import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { ApplicationDispatch, ApplicationState } from './lib/store';

// const useAppSelect = (selector: (state: ApplicationState) => ) => useSelector(state);

// essentially wrapping useSelector to use the typings you've created in ApplicationState
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;

// why is this a function?
export const useAppDispatch: () => ApplicationDispatch = useDispatch;
