
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, MessageSquare, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '../lib/db';

const Reservations: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const reservationData = {
      date: formData.get('date'),
      guests: formData.get('guests'),
      time: formData.get('time'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      requests: formData.get('requests'),
      status: 'pending'
    };

    try {
      const { error: dbError } = await db.from('reservations').insert(reservationData);
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: any) {
      console.error('Reservation failed:', err);
      setError('We were unable to process your booking via the Xneelo database. Please try calling us instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-40 flex flex-col items-center justify-center container mx-auto px-4 text-center animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"><CheckCircle2 size={40} /></div>
        <h1 className="text-4xl font-bold mb-4 italic text-rustic-dark">Reservation Requested!</h1>
        <p className="text-rustic-green max-w-md mx-auto mb-8 text-lg">Thank you for choosing Kgomo's. See you soon!</p>
        <button onClick={() => setSubmitted(false)} className="text-rustic-orange font-bold underline hover:text-rustic-tan transition-colors">Make another booking</button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-[#fdfbf7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fadeIn">
              <AlertCircle size={20} />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
                <h1 className="text-4xl font-bold mb-2 italic text-rustic-dark">Book a Table</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input name="date" type="date" required className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-rustic-orange" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Guests</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select name="guests" required className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl appearance-none bg-white">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} Guests</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full bg-rustic-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-rustic-tan transition-all disabled:opacity-50">
                    {isSubmitting ? 'Requesting...' : 'Confirm Reservation Request'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
