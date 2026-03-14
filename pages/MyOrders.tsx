import React, { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { Package, MapPin, ShoppingBag, ReceiptText, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MyOrdersProps {
  session: any;
}

const MyOrders: React.FC<MyOrdersProps> = ({ session }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await db
        .from('orders')
        .select(`*`)
        .eq('user_id', session.user.id);

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 pb-40 flex items-center justify-center min-h-screen bg-cream">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="mb-16 animate-fadeIn flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Account History</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-dark font-serif italic">My <em className="text-gold font-normal">Shopping History</em></h1>
            <p className="text-muted font-medium text-lg">Revisit your favorite wood-fired feasts.</p>
          </div>
          <Link 
            to="/menu" 
            className="bg-dark text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-gold hover:text-dark transition-all group flex items-center gap-3"
          >
            Order Again <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-gold/5 shadow-2xl animate-slideUp">
            <div className="w-24 h-24 bg-gold/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-bounceIn">
               <ShoppingBag className="text-gold" size={40} />
            </div>
            <h3 className="text-3xl font-bold text-dark font-serif italic mb-4">No orders found yet</h3>
            <p className="text-muted max-w-xs mx-auto mb-10 font-medium">
              Once you place your first order, it will appear here for tracking and easy re-ordering.
            </p>
            <Link 
              to="/menu" 
              className="bg-gold text-dark px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-dark hover:text-white transition-all shadow-2xl"
            >
              Go to Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-[2.5rem] border border-gold/5 shadow-xl overflow-hidden animate-slideUp hover:shadow-2xl transition-all group">
                <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-cream/30 border-b border-gold/10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-dark text-gold rounded-2xl flex items-center justify-center group-hover:bg-gold group-hover:text-dark transition-colors shadow-lg">
                      <Package size={28} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Order Status</div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-dark uppercase text-[10px] tracking-widest">{order.status}</span>
                        <span className={`w-2 h-2 rounded-full ${order.status === 'completed' ? 'bg-green' : 'bg-gold animate-pulse'}`}></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <span className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Placed On</span>
                    <span className="font-bold text-dark font-serif italic text-xl">
                      {new Date(order.created_at || order.order_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <MapPin size={20} className="text-gold shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Delivery Address</p>
                          <p className="text-dark font-medium leading-relaxed">{order.address || order.delivery_address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <ReceiptText size={20} className="text-gold shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Payment Details</p>
                          <p className="text-dark font-medium">Paid via {order.payment_method}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end justify-center">
                      <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Total Investment</div>
                      <div className="text-5xl font-black text-gold font-serif italic">R {parseFloat(order.total || order.total_amount).toFixed(2)}</div>
                    </div>
                  </div>
                  
                  {/* Order Items Preview */}
                  {order.items && Array.isArray(order.items) && (
                    <div className="mt-10 pt-10 border-t border-gold/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-6">Order Items</p>
                      <div className="flex flex-wrap gap-4">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="bg-cream/50 px-4 py-2 rounded-xl border border-gold/5 flex items-center gap-3">
                            <span className="text-gold font-black text-xs">{item.quantity}x</span>
                            <span className="text-dark font-bold text-xs">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <Link to="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted hover:text-gold transition-colors flex items-center justify-center gap-3">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
