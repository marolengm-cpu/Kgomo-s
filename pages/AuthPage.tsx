
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-rustic-cream pt-32 pb-24 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-[0.03] -translate-y-1/4 translate-x-1/4">
        <LogoHorns className="w-[800px] h-[800px]" color="#3d2b1f" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10 animate-slideUp">
          <div className="flex justify-center mb-6">
            <LogoHorns className="w-16 h-16" color="#d78258" />
          </div>
          <h1 className="text-4xl font-bold italic text-rustic-dark mb-2">
            {isLogin ? 'Welcome Back' : 'Join the Family'}
          </h1>
          <p className="text-rustic-green font-medium">
            {isLogin 
              ? 'Login to manage your orders and loyalty points.' 
              : 'Sign up for exclusive perks and faster ordering.'}
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl border border-rustic-mint/20 animate-fadeIn">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fadeIn">
              <AlertCircle size={20} className="shrink-0" />
              <span className="text-xs font-semibold leading-relaxed">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-600 animate-fadeIn">
              <ShieldCheck size={20} className="shrink-0" />
              <span className="text-xs font-semibold leading-relaxed">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <Mail size={12} /> Email Address
              </label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange focus:bg-white outline-none transition-all" 
                placeholder="info@kgomos.co.za"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <Lock size={12} /> Password
              </label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange focus:bg-white outline-none transition-all" 
                placeholder="••••••••"
              />
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-rustic-orange text-white py-4 rounded-2xl font-bold text-lg hover:bg-rustic-tan transition-all shadow-xl shadow-rustic-orange/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (
                <>
                  {isLogin ? 'Login Now' : 'Create Account'} 
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">
              {isLogin ? "Don't have an account?" : "Already a member?"}
            </p>
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(null); setSuccess(null); }}
              className="text-rustic-orange font-bold hover:underline italic"
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
