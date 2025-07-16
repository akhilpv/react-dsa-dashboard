import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../../features/notifications/slices/notificationSlice';
import type { RootState } from '../../app/store';
import { markNotificationAsRead } from '../../features/notifications/slices/notificationSlice';
import { useNavigate } from 'react-router-dom';

const NotificationDropdown = ({ onClose }: { onClose: () => void }) => {
    const notifications = useSelector((state: RootState) => state.notification.notifications);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md border z-50">
            <div className="flex justify-between items-center px-4 py-2 border-b">
                <span className="font-semibold text-gray-700">Notifications</span>
                <button
                    onClick={() => {
                        dispatch(clearNotifications());
                        onClose();
                    }}
                    className="text-sm text-red-600 hover:underline"
                >
                    Clear All
                </button>
            </div>
            <ul className="max-h-64 overflow-y-auto">
                {notifications.map((note) => (
                    <li
                        key={note.id}
                        onClick={() => {
                            dispatch(markNotificationAsRead(note.id));

                            if (note.type === 'success' && note.message.includes('"')) {
                                const match = note.message.match(/"(.+?)"/);
                                const productName = match?.[1];
                                if (productName) {
                                    navigate(`/products/${encodeURIComponent(productName)}`);
                                }
                            }
                        }}
                        className={`px-4 py-2 border-b cursor-pointer hover:bg-gray-50 ${!note.read ? 'bg-blue-50' : ''
                            }`}
                    >
                        <p className="text-sm font-medium text-gray-800">{note.message}</p>
                        {note.source && (
                            <p className="text-xs text-gray-500">
                                {note.source} · {note.timestamp}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationDropdown;