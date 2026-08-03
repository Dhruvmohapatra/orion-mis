import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon, EnvelopeIcon, LockClosedIcon, SparklesIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const particles = [[8, 24, 3], [18, 78, 2], [37, 15, 2], [73, 18, 3], [88, 64, 2], [65, 87, 2], [92, 36, 1]];

const OrionMark = ({ className = 'h-6 w-6' }) => <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true"><path d="M16 3.5 27 10v12L16 28.5 5 22V10l11-6.5Z" stroke="currentColor" strokeWidth="2" /><path d="m10 13 6 3.5 6-3.5M16 16.5V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="m10 13 6-3.5 6 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => { setLoading(true); try { const user = await login(data.email, data.password); navigate({ Admin: '/admin/dashboard', Faculty: '/faculty/dashboard', Student: '/student/dashboard' }[user.role] || '/login'); } catch (_) {} finally { setLoading(false); } };
  const onPointerMove = (event) => { const box = event.currentTarget.getBoundingClientRect(); setParallax({ x: (event.clientX - box.left) / box.width - .5, y: (event.clientY - box.top) / box.height - .5 }); };

  return <div className="min-h-screen bg-[#f8fafc] lg:grid lg:grid-cols-[1.12fr_1fr]">
    <section onPointerMove={onPointerMove} onPointerLeave={() => setParallax({ x: 0, y: 0 })} className="relative hidden isolate overflow-hidden bg-[#2563eb] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_19%_18%,rgba(191,219,254,.48),transparent_30%),radial-gradient(ellipse_at_77%_73%,rgba(56,189,248,.78),transparent_38%),radial-gradient(ellipse_at_94%_5%,rgba(255,255,255,.28),transparent_24%),linear-gradient(138deg,#1d4ed8_0%,#2563eb_44%,#0ea5e9_125%)]" />
      <div className="absolute inset-0 opacity-[.13] [background-image:radial-gradient(rgba(255,255,255,.95)_1px,transparent_1px)] [background-size:23px_23px]" />
      <div className="absolute inset-0 opacity-[.035] [background-image:linear-gradient(120deg,transparent_0%,#fff_48%,transparent_52%)] [background-size:7px_7px]" />
      <div className="absolute -left-24 bottom-12 h-80 w-80 rounded-full bg-sky-200/35 blur-3xl" /><div className="absolute right-[-8rem] top-1/4 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="relative flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/35 bg-white/15 shadow-[0_14px_30px_rgba(8,47,140,.22),inset_0_1px_rgba(255,255,255,.4)] backdrop-blur-xl"><OrionMark /></div><div><p className="text-sm font-bold tracking-[.14em]">ORION</p><p className="mt-0.5 text-[10px] font-medium tracking-[.12em] text-blue-100/90">UNIVERSITY MANAGEMENT SYSTEM</p></div>
      </motion.div>

      <div className="relative max-w-xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide shadow-sm backdrop-blur-xl"><SparklesIcon className="h-4 w-4" /> CONNECTED CAMPUS INTELLIGENCE</div>
        <h1 className="max-w-lg text-5xl font-bold leading-[1.05] tracking-[-.055em] xl:text-6xl">University Management,<br /><span className="text-sky-100">Reimagined.</span></h1>
        <p className="mt-6 max-w-md text-base leading-7 text-blue-50/95">A calm, secure workspace designed around every academic moment—from the first lecture to graduation.</p>

        <div className="relative mt-9 h-72 max-w-lg" aria-label="Orion connected campus network">
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [.58, .95, .58] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/45 blur-3xl" />
          <motion.div animate={{ rotate: [-1.2, 1.2, -1.2] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} style={{ x: parallax.x * 13, y: parallax.y * 11 }} className="absolute inset-x-0 top-2 h-[260px]">
            <svg viewBox="0 0 440 260" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
              <defs><linearGradient id="orionNetworkLine" x1="0" x2="1"><stop stopColor="#38BDF8" stopOpacity=".18" /><stop offset=".5" stopColor="#E0F2FE" stopOpacity=".92" /><stop offset="1" stopColor="#38BDF8" stopOpacity=".18" /></linearGradient><filter id="orionNetworkGlow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
              {[[220,130,65,46], [220,130,150,46], [220,130,286,46], [220,130,65,214], [220,130,150,214], [220,130,286,214]].map(([x1, y1, x2, y2], index) => <g key={index}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#orionNetworkLine)" strokeWidth="1.5" strokeLinecap="round" /><motion.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#BAE6FD" strokeWidth="2.2" strokeLinecap="round" filter="url(#orionNetworkGlow)" strokeDasharray="12 130" animate={{ strokeDashoffset: [0, -142] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'linear', delay: index * .28 }} /></g>)}
              <line x1="65" y1="46" x2="150" y2="46" stroke="rgba(224,242,254,.35)" strokeWidth="1" /><line x1="150" y1="46" x2="286" y2="46" stroke="rgba(224,242,254,.35)" strokeWidth="1" /><line x1="65" y1="214" x2="150" y2="214" stroke="rgba(224,242,254,.35)" strokeWidth="1" /><line x1="150" y1="214" x2="286" y2="214" stroke="rgba(224,242,254,.35)" strokeWidth="1" />
            </svg>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[9.5%] top-[8%] h-10 w-10 rounded-full border border-white/60 bg-white/15 shadow-[inset_5px_5px_10px_rgba(255,255,255,.28),0_0_24px_rgba(96,165,250,.42)] backdrop-blur-xl"><span className="absolute left-2 top-1.5 h-2 w-3 rounded-full bg-white/65 blur-[1px]" /></motion.div>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: .4 }} className="absolute left-[29%] top-[6%] h-8 w-8 rounded-full border border-white/60 bg-white/15 shadow-[inset_4px_4px_9px_rgba(255,255,255,.28),0_0_22px_rgba(96,165,250,.4)] backdrop-blur-xl"><span className="absolute left-1.5 top-1 h-2 w-2 rounded-full bg-white/65 blur-[1px]" /></motion.div>
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute left-[60%] top-[7%] h-12 w-12 rounded-full border border-white/60 bg-white/15 shadow-[inset_5px_5px_10px_rgba(255,255,255,.28),0_0_26px_rgba(96,165,250,.44)] backdrop-blur-xl"><span className="absolute left-2.5 top-2 h-2.5 w-4 rounded-full bg-white/65 blur-[1px]" /></motion.div>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: .6 }} className="absolute bottom-[7%] left-[9.5%] h-9 w-9 rounded-full border border-white/60 bg-white/15 shadow-[inset_4px_4px_9px_rgba(255,255,255,.28),0_0_22px_rgba(96,165,250,.4)] backdrop-blur-xl"><span className="absolute left-1.5 top-1 h-2 w-3 rounded-full bg-white/65 blur-[1px]" /></motion.div>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: .8 }} className="absolute bottom-[5%] left-[29%] h-11 w-11 rounded-full border border-white/60 bg-white/15 shadow-[inset_5px_5px_10px_rgba(255,255,255,.28),0_0_25px_rgba(96,165,250,.43)] backdrop-blur-xl"><span className="absolute left-2 top-1.5 h-2 w-3.5 rounded-full bg-white/65 blur-[1px]" /></motion.div>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }} className="absolute bottom-[7%] left-[60%] h-8 w-8 rounded-full border border-white/60 bg-white/15 shadow-[inset_4px_4px_9px_rgba(255,255,255,.28),0_0_21px_rgba(96,165,250,.4)] backdrop-blur-xl"><span className="absolute left-1.5 top-1 h-2 w-2 rounded-full bg-white/65 blur-[1px]" /></motion.div>
            <motion.div animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[42.2%] top-[35%] grid h-[76px] w-[76px] place-items-center rounded-full border border-white/70 bg-white/20 shadow-[inset_8px_8px_18px_rgba(255,255,255,.36),0_0_0_8px_rgba(186,230,253,.08),0_0_42px_rgba(96,165,250,.64)] backdrop-blur-xl"><span className="absolute left-4 top-3 h-4 w-7 rounded-full bg-white/60 blur-[2px]" /><OrionMark className="relative h-9 w-9 text-white drop-shadow" /></motion.div>
          </motion.div>
          {particles.map(([left, top, size], index) => <motion.i key={index} animate={{ y: [0, index % 2 ? -8 : 7, 0], opacity: [.3, 1, .3] }} transition={{ duration: 6 + index * 1.2, repeat: Infinity, ease: 'easeInOut', delay: index * .35 }} style={{ left: `${left}%`, top: `${top}%`, width: size * 3, height: size * 3 }} className="absolute rounded-full bg-white shadow-[0_0_16px_5px_rgba(255,255,255,.35)]" />)}
        </div>
      </div>
      <p className="relative text-xs text-blue-100/85">© 2026 Orion University · Secure academic identity</p>
    </section>

    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sky-200/55 blur-3xl" /><div className="absolute -bottom-32 -left-28 h-96 w-96 rounded-full bg-blue-200/45 blur-3xl" /><div className="absolute inset-0 opacity-[.22] [background-image:radial-gradient(#cbd5e1_.7px,transparent_.7px)] [background-size:20px_20px]" />
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: 'easeOut' }} className="relative w-full max-w-[29rem]">
        <div className="mb-8 text-center lg:text-left"><div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#38bdf8] shadow-lg shadow-blue-500/25 lg:hidden"><OrionMark /></div><p className="mb-2 text-xs font-bold tracking-[.16em] text-[#2563eb]">ORION MIS</p><h2 className="text-3xl font-bold tracking-[-.04em] text-[#0f172a]">Welcome back</h2><p className="mt-2 text-sm text-slate-500">Sign in with your institutional account.</p></div>
        <div className="rounded-[32px] border border-white/90 bg-white/72 p-7 shadow-[0_30px_70px_rgba(15,23,42,.12),0_2px_12px_rgba(15,23,42,.04),inset_0_1px_rgba(255,255,255,.9)] backdrop-blur-2xl transition-shadow duration-300 hover:shadow-[0_34px_80px_rgba(15,23,42,.14),0_2px_12px_rgba(15,23,42,.04)] sm:p-9">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative pt-2"><EnvelopeIcon className="absolute left-4 top-6 h-5 w-5 text-slate-400" /><label htmlFor="email" className="absolute left-11 top-0 z-10 rounded bg-white/80 px-1 text-xs font-medium text-slate-500">Institutional email</label><input id="email" type="email" placeholder="you@orion.edu" className={`form-input border-slate-200/90 bg-white/70 pl-11 shadow-[0_3px_12px_rgba(15,23,42,.03)] transition-all focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/15 ${errors.email ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10' : ''}`} {...register('email', { required: 'Email address is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' } })} />{errors.email && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.email.message}</p>}</div>
            <div className="relative pt-2"><LockClosedIcon className="absolute left-4 top-6 h-5 w-5 text-slate-400" /><label htmlFor="password" className="absolute left-11 top-0 z-10 rounded bg-white/80 px-1 text-xs font-medium text-slate-500">Password</label><input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className={`form-input border-slate-200/90 bg-white/70 px-11 shadow-[0_3px_12px_rgba(15,23,42,.03)] transition-all focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/15 ${errors.password ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10' : ''}`} {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-4 rounded-xl p-2 text-slate-400 transition hover:bg-blue-50 hover:text-[#2563eb]" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}</button>{errors.password && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.password.message}</p>}</div>
            <button type="submit" disabled={loading} className="btn-primary group relative w-full overflow-hidden bg-gradient-to-r from-[#2563eb] to-[#38bdf8] py-3.5 shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/35" id="login-submit-btn"><span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" /> <span className="relative">{loading ? <><span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />Signing in...</> : <><ShieldCheckIcon className="h-5 w-5" />Sign in securely</>}</span></button>
          </form>
          <div className="mt-7 border-t border-slate-200/70 pt-5"><button type="button" onClick={() => setDemoOpen(!demoOpen)} className="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-white/55 px-4 py-3 text-left text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50/60"><span>Show demo credentials</span><ChevronDownIcon className={`h-4 w-4 text-[#2563eb] transition-transform ${demoOpen ? 'rotate-180' : ''}`} /></button>{demoOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 overflow-hidden rounded-2xl border border-white/70 bg-white/50 px-4 py-3 text-xs leading-6 text-slate-600"><p><b className="text-[#2563eb]">Admin</b> · admin@oit.edu / Admin@123</p><p><b className="text-[#2563eb]">Faculty</b> · anita.sharmaFAC@oit.edu / Faculty@123</p><p><b className="text-[#2563eb]">Student</b> · aarav.sharma@oit.edu / Student@123</p></motion.div>}</div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">Protected by Orion’s secure identity system.</p>
      </motion.div>
    </main>
  </div>;
};
export default LoginPage;
