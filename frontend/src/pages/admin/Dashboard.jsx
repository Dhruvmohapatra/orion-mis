import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import StatsCard from '../../components/StatsCard';
import ChartWidget from '../../components/ChartWidget';
import { AcademicCapIcon, UserGroupIcon, BuildingOfficeIcon, BookOpenIcon, ClipboardDocumentCheckIcon, UsersIcon, PlusIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [deptStudents, setDeptStudents] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const [gradeDistribution, setGradeDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, deptRes, attendRes, gradeRes] = await Promise.all([
        api.get('/reports/dashboard'),
        api.get('/reports/department-students'),
        api.get('/reports/attendance-summary'),
        api.get('/reports/grade-distribution')
      ]);
      setStats(statsRes.data.data);
      setDeptStudents(deptRes.data.data);
      setAttendanceSummary(attendRes.data.data);
      setGradeDistribution(gradeRes.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-6"><div className="shimmer h-20 rounded-xl"></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="academic-hero">
        <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold text-sky-100">ORION UNIVERSITY · ADMIN PORTAL</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Good morning, Aarav <span aria-hidden="true">👋</span></h1>
            <p className="mt-2 text-sm text-blue-50/90">Welcome back to Orion MIS. Here is today’s university overview.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/students" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-transform hover:-translate-y-0.5"><PlusIcon className="h-4 w-4" /> Add Student</Link>
            <Link to="/admin/faculty" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"><PlusIcon className="h-4 w-4" /> Add Faculty</Link>
            <Link to="/admin/reports" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"><DocumentChartBarIcon className="h-4 w-4" /> Generate Report</Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard title="Total Students" value={stats?.totalStudents || 0} icon={AcademicCapIcon} color="primary" trend="up" trendValue="12.4% this term" />
        <StatsCard title="Total Faculty" value={stats?.totalFaculty || 0} icon={UserGroupIcon} color="emerald" trend="up" trendValue="4.8% this term" />
        <StatsCard title="Departments" value={stats?.totalDepartments || 0} icon={BuildingOfficeIcon} color="amber" trend="up" trendValue="2 added recently" />
        <StatsCard title="Total Courses" value={stats?.totalCourses || 0} icon={BookOpenIcon} color="violet" />
        <StatsCard title="Total Enrollments" value={stats?.totalEnrollments || 0} icon={ClipboardDocumentCheckIcon} color="cyan" />
        <StatsCard title="Active Users" value={stats?.activeUsers || 0} icon={UsersIcon} color="rose" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          type="bar"
          title="Students by Department"
          labels={deptStudents.map(d => d.department_name)}
          datasets={[{ label: 'Students', data: deptStudents.map(d => d.student_count) }]}
        />
        <ChartWidget
          type="doughnut"
          title="Attendance Distribution"
          labels={attendanceSummary.map(a => a.status)}
          datasets={[{ data: attendanceSummary.map(a => a.count) }]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          type="pie"
          title="Grade Distribution"
          labels={gradeDistribution.map(g => g.grade || 'N/A')}
          datasets={[{ data: gradeDistribution.map(g => g.count) }]}
        />
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Info</h3>
          <div className="space-y-4">
            {deptStudents.map((dept, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-dark-bg/50">
                <span className="text-sm font-medium text-gray-700 dark:text-dark-text">{dept.department_name}</span>
                <span className="badge-info">{dept.student_count} students</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
