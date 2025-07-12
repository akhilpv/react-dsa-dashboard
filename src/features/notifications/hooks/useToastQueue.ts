import { useDispatch } from 'react-redux';
import { addToast } from '../slices/notificationSlice';

export const useToastQueue = () => {
  const dispatch = useDispatch();

  return (message: string, type: 'success' | 'error' | 'info' = 'info', source?: string) => {
    dispatch(addToast({ message, type, source }));
  };
};
