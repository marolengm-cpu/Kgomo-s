
import React, { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { ClipboardList, Package, Clock, MapPin, ChevronRight, ShoppingBag, ReceiptText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MyOrdersProps {
  session: any;
}

const MyOrders: React.FC<MyOrdersProps> = ({ session }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [session]);

  const fetchOrders = async () => {
    try {
      // Logic for Xneelo DB: 16ueg_u4t4d
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
      <div className="pt-40 pb-40 flex items-center justify-center min-h-screen bg-rustic-cream/20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rustic-orange"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-rustic-cream/20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-12 animate-fadeIn flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-rustic-dark italic">My Shopping History</h1>
            <p className="text-rustic-green italic font-medium">Revisit your favorite wood-fired feasts.</p>
          </div>
          <Link to="/menu" className="bg-rustic-orange text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-rustic-tan transition-all">
            Order Again
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-rustic-mint animate-slideUp">
            <div className="w-20 h-20 bg-rustic-cream rounded-full flex items-center justify-center mx-auto mb-6">
               <ShoppingBag className="text-rustic-tan" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-rustic-dark italic mb-2">No orders found yet</h3>
            <p className="text-rustic-green max-w-xs mx-auto mb-8">
              Once you place your first order, it will appear here for tracking and easy re-ordering.
            </p>
            <Link to="/menu" className="bg-rustic-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-rustic-tan transition-all">
              Go to Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden animate-slideUp">
                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-rustic-orange text-white rounded-2xl">
                      <Package size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Status</div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-rustic-dark uppercase text-sm tracking-wider">{order.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Placed On</span>
                    <span className="font-bold text-rustic-dark">{new Date(order.order_date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-rustic-green text-sm">
                        <MapPin size={16} />
                        <span className="font-medium line-clamp-1">{order.delivery_address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-rustic-green text-sm">
                        <ReceiptText size={16} />
                        <span className="font-medium">Paid via {order.payment_method}</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end justify-center">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid</div>
                      <div className="text-3xl font-black text-rustic-orange italic">R {parseFloat(order.total_amount).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
