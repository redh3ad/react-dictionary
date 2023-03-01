import { RootState, AppDispatch } from './store';
import {
  useDispatch,
  useSelector,
  typeTypedUseSelectorHook,
} from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: typeTypedUseSelectorHook<RootState> = useSelector;
