import React from 'react';
import { MoreVertical, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const OrdersTable = ({
  orders = [],
  onActionClick = () => {},
  onPageChange = () => {},
  currentPage = 1,
  totalPages = 5,
  totalItems = 42,
  startIndex = 1,
  endIndex = 10,
}) => {
  return (
    <div className="w-full bg-pulse-card rounded-xl border border-pulse-border overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-white">
          <thead className="text-xs text-pulse-text-muted uppercase tracking-wider border-b border-pulse-border bg-[#1a1c24]/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Time</th>
              <th className="px-6 py-4 font-semibold text-center w-16">Type</th>
              <th className="px-6 py-4 font-semibold">Instrument</th>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold text-right">Qty</th>
              <th className="px-6 py-4 font-semibold text-right">Price</th>
              <th className="px-6 py-4 font-semibold text-center text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-center w-16">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pulse-border">
            {orders.map((order, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors group">
                {/* Time */}
                <td className="px-6 py-4 font-mono font-medium">{order.time}</td>
                
                {/* Type */}
                <td className="px-6 py-4 text-center">
                  <div className={`inline-flex items-center justify-center w-6 h-6 rounded ${
                    order.type === 'B' 
                      ? 'bg-pulse-green/10 border border-pulse-green/20 text-pulse-green' 
                      : 'bg-red-500/10 border border-red-500/20 text-red-500'
                  }`}>
                    <span className="text-xs font-bold">{order.type}</span>
                  </div>
                </td>

                {/* Instrument */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold">{order.instrumentTitle}</span>
                    <span className="text-xs text-pulse-text-muted">{order.instrumentDesc}</span>
                  </div>
                </td>

                {/* Product */}
                <td className="px-6 py-4 text-pulse-text-muted font-medium">
                  {order.product}
                </td>

                {/* Qty */}
                <td className="px-6 py-4 text-right font-mono font-medium">
                  {order.qty}
                </td>

                {/* Price */}
                <td className="px-6 py-4 text-right font-mono font-medium">
                  {order.price}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      order.status === 'COMPLETED'
                        ? 'bg-pulse-green/10 border-pulse-green/20 text-pulse-green'
                        : 'bg-red-500/10 border-red-500/20 text-red-500'
                    }`}>
                      {order.status === 'COMPLETED' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{order.status}</span>
                    </div>
                  </div>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => onActionClick(order)}
                      className="text-pulse-text-muted hover:text-white transition-colors"
                      aria-label="Order actions"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-6 py-4 text-xs font-medium border-t border-pulse-border bg-[#1a1c24]/30">
        <div className="text-pulse-text-muted uppercase tracking-wider">
          SHOWING {startIndex}-{endIndex} OF {totalItems} TRANSACTIONS
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded text-pulse-text-muted hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {[1, 2, 3, '...', 5].map((page, idx) => (
            <button
              key={idx}
              onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
              disabled={page === '...'}
              className={`w-7 h-7 flex items-center justify-center rounded text-sm transition-colors ${
                page === currentPage
                  ? 'bg-pulse-green text-[#0b0c10] font-bold'
                  : page === '...'
                  ? 'text-pulse-text-muted cursor-default'
                  : 'text-pulse-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {page}
            </button>
          ))}

          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded text-pulse-text-muted hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
