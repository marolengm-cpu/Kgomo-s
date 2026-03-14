import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { db } from '../lib/db';
import { LogoHorns } from '../App';

interface AuthPageProps {
  setSession: (session: any) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setSession }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        const { data, error } = await db.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSession(data.session);
      } else {
        const { data, error } = await db.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess('Account created! Welcome to Kgomo\'s.');
        setSession(data.session);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 opacity-[0.03] -translate-y-1/4 translate-x-1/4 pointer-events-none">
        <LogoHorns className="w-[800px] h-[800px]" color="#C4963A" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-[0.03] translate-y-1/4 -translate-x-1/4 pointer-events-none">
        <LogoHorns className="w-[600px] h-[600px]" color="#C4963A" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-12 animate-slideUp">
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center border border-gold/10">
              <LogoHorns className="w-12 h-12" color="#C4963A" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-serif italic">
            {isLogin ? 'Welcome Back' : 'Join the Family'}
          </h1>
          <p className="text-muted font-medium italic text-sm">
            {isLogin 
              ? 'Login to manage your orders and loyalty points.' 
              : 'Sign up for exclusive perks and faster ordering.'}
          </p>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-8"></div>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gold/5 animate-fadeIn relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold opacity-[0.02] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          {error && (
            <div className="mb-8 p-5 bg-rust/5 border border-rust/10 rounded-2xl flex items-center gap-4 text-rust animate-shake">
              <AlertCircle size={20} className="shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-8 p-5 bg-green/5 border border-green/10 rounded-2xl flex items-center gap-4 text-green animate-fadeIn">
              <ShieldCheck size={20} className="shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2 ml-1">
                <Mail size={12} className="text-gold" /> Email Address
              </label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl border-0 bg-cream/30 focus:ring-2 focus:ring-gold outline-none transition-all text-sm font-medium" 
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2 ml-1">
                <Lock size={12} className="text-gold" /> Password
              </label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl border-0 bg-cream/30 focus:ring-2 focus:ring-gold outline-none transition-all text-sm font-medium" 
                placeholder="••••••••"
              />
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-dark text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gold hover:text-dark transition-all shadow-2xl shadow-gold/10 flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Login Now' : 'Create Account'} 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-gold/10 text-center relative z-10">
            <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-6">
              {isLogin ? "Don't have an account?" : "Already a member?"}
            </p>
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(null); setSuccess(null); }}
              className="text-gold font-black uppercase tracking-[0.2em] text-[10px] hover:text-dark transition-all italic border-b-2 border-gold/20 pb-2"
            >
              {isLogin ? 'Join the Inner Circle' : 'Login to your profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
