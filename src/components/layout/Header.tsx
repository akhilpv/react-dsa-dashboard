import { BellIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import NotificationDropdown from '../organisms/NotificationDropdown';
import { useState } from 'react';

const Header = () => {
    const notifications = useSelector(
        (state: RootState) => state.notification.notifications
    );
    const unreadCount = notifications.filter(n => !n.read).length;
    const [open, setOpen] = useState(false);

    return (
        <header className="flex justify-between items-center px-6 py-4 shadow bg-white">
            <h1 className="text-xl font-bold">🧾 Product Dashboard</h1>

            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="relative p-2 rounded hover:bg-gray-100 transition"
                >
                    <BellIcon className="w-6 h-6 text-gray-600" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </button>
                {open && <NotificationDropdown onClose={() => setOpen(false)} />}
            </div>
        </header>
    );
};

export default Header;