import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  fetchManagers,
  fetchManagerById,
  createManager,
  updateManager,
  deleteManager,
  IManager,
} from '../features/managerSlice';
import { useEffect } from 'react';

export const useManagers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { managers, manager, loading, error } = useSelector((state: RootState) => state?.manager);

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

  const getManager = (id: number) => dispatch(fetchManagerById(id));
  const addManager = (newManager: Partial<IManager>) => dispatch(createManager(newManager));
  const editManager = (updatedManager: IManager) => dispatch(updateManager(updatedManager));
  const removeManager = (id: number) => dispatch(deleteManager(id));

  return { managers, manager, loading, error, getManager, addManager, editManager, removeManager };
};
