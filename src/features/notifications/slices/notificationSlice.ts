import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface Notification extends Toast {
  timestamp: string;
  source?: string; 
  read: boolean;
}

interface ToastState {
  queue: Toast[];
  notifications: Notification[];
}

const initialState: ToastState = {
  queue: [],
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<{ message: string; type?: Toast['type']; source?: string }>) {
      const toast: Toast = {
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
      };

      state.queue.push(toast);
      state.notifications.unshift({
        ...toast,
        source: action.payload.source,
        timestamp: new Date().toLocaleString(),
        read: false,
      });
    },
    removeToast(state) {
      state.queue.shift();
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    markNotificationAsRead(state, action: PayloadAction<number>) {
        const index = state.notifications.findIndex(n => n.id === action.payload);
        if (index !== -1) {
            state.notifications[index].read = true;
        }
    },
  },
});

export const { addToast, removeToast, clearNotifications, markNotificationAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;