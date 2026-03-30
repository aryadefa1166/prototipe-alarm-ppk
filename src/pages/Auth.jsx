import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ArrowRight, User, Lock, Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const { login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('civitas'); // civitas atau satgas
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nim: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ ...formData, id: formData.nim || '12345' }, role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Kiri: Sisi Visual & Branding */}
        <div className="md:w-5/12 bg-slate-900 p-10 text-white flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/20 to-slate-900 z-0"></div>
          
          <div className="relative z-10 flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/30">
              <Shield size={24} className="text-white" />
            </div>
            <span className="font-bold tracking-widest text-sm text-slate-300">PROTOTIPE RISET</span>
          </div>

          <div className="relative z-10 mt-auto">
            <h1 className="text-4xl font-black mb-4 leading-tight">
              ALARM <span className="text-red-500">PPKS.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Sistem Pelaporan Kekerasan Seksual Berbasis Alarm Digital Real-Time untuk Perguruan Tinggi.
            </p>
            
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Aman</span>
              <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
              <span>Rahasia</span>
              <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
              <span>Real-Time</span>
            </div>
          </div>
        </div>

        {/* Kanan: Sisi Form */}
        <div className="md:w-7/12 p-10 md:p-14 bg-white flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {isLogin ? 'Selamat Datang' : 'Buat Akun'}
            </h2>
            <p className="text-slate-500 text-sm">
              Silakan masuk ke sistem terintegrasi PPKS.
            </p>
          </div>

          {/* Toggle Role */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button 
              onClick={() => setRole('civitas')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${role === 'civitas' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Civitas Akademika
            </button>
            <button 
              onClick={() => setRole('satgas')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${role === 'satgas' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Admin Satgas
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {role === 'satgas' ? 'NIP / ID Petugas' : 'NIM / NIP'}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  placeholder={role === 'satgas' ? "Masukkan ID Petugas" : "Masukkan NIM/NIP"}
                  value={formData.nim} onChange={e => setFormData({...formData, nim: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  placeholder="••••••••"
                  value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group mt-4 shadow-lg shadow-slate-900/20">
              {isLogin ? 'Masuk ke Sistem' : 'Daftar Akun'} 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-red-600 hover:underline">
              {isLogin ? 'Daftar sekarang' : 'Masuk di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}