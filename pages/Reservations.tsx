
import React, { useState } from 'react';
// Added missing Link import from react-router-dom
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, MessageSquare, Info, CheckCircle2 } from 'lucide-react';

const Reservations: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch('https://formspree.io/f/xeeowazp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-40 flex flex-col items-center justify-center container mx-auto px-4 text-center animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-4xl font-bold mb-4 italic text-rustic-dark">Reservation Requested!</h1>
        <p className="text-rustic-green max-w-md mx-auto mb-8 text-lg">
          Thank you for choosing Kgomo's. We've received your request and our host will confirm your booking shortly. See you soon!
        </p>
        <button onClick={() => setSubmitted(false)} className="text-rustic-orange font-bold underline hover:text-rustic-tan transition-colors">
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-[#fdfbf7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Form Section */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
                <h1 className="text-4xl font-bold mb-2 italic text-rustic-dark">Book a Table</h1>
                <p className="text-rustic-green mb-10">Join us for a premium-casual dining experience.</p>
                
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
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Number of Guests</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select name="guests" required className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-rustic-orange appearance-none bg-white">
                          {[1, 2, 3, 4, 5, 6, 7, 8, '9+ (Large Group)'].map(n => <option key={n} value={n}>{n} Guests</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select name="time" required className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-rustic-orange appearance-none bg-white">
                          {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Full Name</label>
                      <input name="name" type="text" required placeholder="John Doe" className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-rustic-orange" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Email Address</label>
                      <input name="email" type="email" required placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-rustic-orange" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Phone Number</label>
                      <input name="phone" type="tel" required placeholder="+27 82 123 4567" className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-rustic-orange" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest text-[10px]">Special Requests</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 text-gray-400" size={18} />
                      <textarea name="requests" rows={4} placeholder="Let us know about dietary requirements or special occasions..." className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-rustic-orange resize-none"></textarea>
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full bg-rustic-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-rustic-tan transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Requesting...' : 'Confirm Reservation Request'}
                  </button>
                </form>
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-rustic-dark text-white p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-6 italic text-rustic-orange">Large Groups & Events</h3>
                <p className="text-rustic-mint/70 mb-6 leading-relaxed">
                  Planning a celebration? We accommodate groups of up to 40 guests for birthdays, anniversaries, or corporate events.
                </p>
                <Link to="/events" className="text-rustic-orange font-bold underline hover:text-white transition-colors">
                  Inquire about private events
                </Link>
              </div>

              <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                <div className="flex items-center gap-2 text-[#b45309] font-bold mb-4 uppercase text-xs tracking-widest">
                  <Info size={16} /> Important Info
                </div>
                <ul className="space-y-4 text-sm text-amber-900/70">
                  <li>• Please arrive within 15 minutes of your booking.</li>
                  <li>• We hold tables for a maximum of 2 hours during peak times.</li>
                  <li>• Play area supervision is included with your dining experience.</li>
                  <li>• For parties larger than 12, please call us directly.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
