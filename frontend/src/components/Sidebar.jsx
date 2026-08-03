import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ items, title, subtitle, collapsed }) => (
  <motion.aside
    initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
    className={`sidebar fixed left-0 top-0 z-30 flex h-full flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}
  >
    <div className="border-b border-slate-200 px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="relative grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/25">
          <AcademicCapIcon className="h-5 w-5 text-white" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
        </div>
        {!collapsed && <div className="min-w-0"><h2 className="truncate text-sm font-bold tracking-tight text-slate-900">{title || 'ORION MIS'}</h2><p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-wider text-indigo-600">{subtitle || 'University portal'}</p></div>}
      </div>
    </div>

    {!collapsed && <div className="mx-3 mt-4 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2"><span className="text-[11px] font-medium text-slate-500">Academic term</span><span className="text-[11px] font-bold text-indigo-700">2025–26</span></div>}

    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {items.map((item) => <NavLink key={item.path} to={item.path} className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`} id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`} title={collapsed ? item.label : undefined}>
        {item.icon && <item.icon className="h-5 w-5 flex-none" />}
        {!collapsed && <span>{item.label}</span>}
      </NavLink>)}
    </nav>

    {!collapsed && <div className="border-t border-slate-200 px-5 py-4"><p className="text-[11px] font-medium text-slate-400">ORION MIS Portal</p><p className="mt-0.5 text-[10px] text-slate-400">University management, unified.</p></div>}
  </motion.aside>
);

export default Sidebar;
