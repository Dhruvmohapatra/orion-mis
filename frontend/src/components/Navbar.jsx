import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  CheckCircleIcon,
  CalendarIcon,
  MegaphoneIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const defaultNotifications = [
  {
    id: 1,
    title: 'Mid-Term Examinations Announced',
    message: 'Mid-Term exams for CS201, CS301, and CS302 scheduled from Sept 15, 2025.',
    time: '10m ago',
    type: 'exam',
    unread: true
  },
  {
    id: 2,
    title: 'End-Term Schedule Published',
    message: 'End-Term examinations schedule is now published in your Exam Schedule tab.',
    time: '1h ago',
    type: 'schedule',
    unread: true
  },
  {
    id: 3,
    title: 'Section A & B Course Enrollments Active',
    message: 'All 100 students have been enrolled across Section A & B for Semester 3.',
    time: '3h ago',
    type: 'info',
    unread: true
  }
];

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(defaultNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/85">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            id="menu-toggle-btn"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {user?.role} Dashboard
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <label className="relative hidden lg:block">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input aria-label="Search Orion MIS" className="h-9 w-56 rounded-xl border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-800" placeholder="Search Orion MIS" />
          </label>
          <button onClick={toggleDarkMode} className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} id="theme-toggle-btn">
            {darkMode ? <SunIcon className="h-5 w-5 text-amber-400" /> : <MoonIcon className="h-5 w-5 text-slate-500" />}
          </button>
          {/* Notifications Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              id="notification-bell-btn"
            >
              <BellIcon className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-ping"></span>
              )}
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-xl sm:w-96"
                >
                  <div className="p-4 border-b border-gray-100 dark:border-dark-border flex items-center justify-between bg-primary-50/50 dark:bg-primary-900/10">
                    <div className="flex items-center gap-2">
                      <BellIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="badge-info text-xs">{unreadCount} new</span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-dark-border">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-gray-400 dark:text-dark-muted">
                        No notifications right now
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3.5 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-dark-border/40 transition-colors ${
                            n.unread ? 'bg-primary-50/20 dark:bg-primary-900/10' : ''
                          }`}
                        >
                          <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5">
                            {n.type === 'exam' ? (
                              <CalendarIcon className="w-4 h-4" />
                            ) : n.type === 'schedule' ? (
                              <CheckCircleIcon className="w-4 h-4" />
                            ) : (
                              <MegaphoneIcon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white">{n.title}</h4>
                              <span className="text-[10px] text-gray-400">{n.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-dark-muted mt-1 leading-snug">{n.message}</p>
                          </div>
                          <button
                            onClick={() => clearNotification(n.id)}
                            className="text-gray-400 hover:text-gray-600 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2.5 border-t border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg/50 text-center">
                    <p className="text-[11px] text-gray-400">Notifications auto-sync with university schedule</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={handleLogout} className="rounded-xl p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 sm:hidden" id="logout-btn" aria-label="Sign out"><ArrowRightOnRectangleIcon className="h-5 w-5" /></button><div className="relative hidden border-l border-slate-200 pl-3 sm:block" ref={profileRef}><button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50"><div className="hidden text-right md:block"><p className="text-sm font-semibold text-slate-700">{user?.username}</p><p className="text-xs text-slate-400">{user?.role}</p></div><div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600"><span className="text-sm font-bold text-white">{user?.username?.charAt(0)}</span></div><ChevronDownIcon className="h-4 w-4 text-slate-400" /></button>{showProfile && <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><div className="border-b border-slate-100 px-3 py-2"><p className="text-sm font-semibold text-slate-800">{user?.username}</p><p className="truncate text-xs text-slate-500">{user?.email}</p></div><button onClick={handleLogout} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50" id="logout-dropdown-btn"><ArrowRightOnRectangleIcon className="h-4 w-4" />Sign out</button></div>}</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
