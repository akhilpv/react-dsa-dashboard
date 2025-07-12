import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '../../features/notifications/slices/notificationSlice';
import type { RootState } from '../../app/store';
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Toast = () => {
  const dispatch = useDispatch();
  const queue = useSelector((state: RootState) => state.notification.queue);

  useEffect(() => {
    if (queue.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [queue, dispatch]);

  if (queue.length === 0) return null;

  const toast = queue[0];

  const config = {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <CheckCircleIcon className="h-5 w-5 text-green-600" />,
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: <XCircleIcon className="h-5 w-5 text-red-600" />,
    },
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: <InformationCircleIcon className="h-5 w-5 text-blue-600" />,
    },
  };

  const style = config[toast.type || 'info'];

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in-down">
      <div
        className={`flex items-start gap-3 max-w-sm px-4 py-3 rounded-lg shadow-md ${style.bg}`}
      >
        <div className="pt-1">{style.icon}</div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${style.text}`}>{toast.message}</p>
        </div>
        <button onClick={() => dispatch(removeToast())}>
          <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default Toast;