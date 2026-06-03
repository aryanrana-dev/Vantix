import { useState } from 'react';
import { MoreVertical, CheckCircle2, XCircle, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

const OrdersTable = ({
  orders = [],
  onActionClick = () => { },
  onPageChange = () => { },
  currentPage = 1,
  totalPages = 5,
  totalItems = 42,
  startIndex = 1,
  endIndex = 10,
}) => {
  const [orderToCancel, setOrderToCancel] = useState(null);
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };
  const pages = getPageNumbers();

  return (
    <div className="w-full bg-pulse-card rounded-xl border border-pulse-border overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-white">
          <thead className="text-xs text-pulse-text-muted uppercase tracking-wider border-b border-pulse-border bg-[#1a1c24]/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Time</th>
              <th className="pr-6 py-4 font-semibold text-center w-16">Type</th>
              <th className="px-6 py-4 font-semibold">Action</th>
              <th className="px-6 py-4 font-semibold">Instrument</th>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold text-right">Qty</th>
              <th className="px-6 py-4 font-semibold text-right">Price</th>
              <th className="px-6 py-4 font-semibold text-center text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-center w-16">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pulse-border">
            {orders.map((order, idx) => {
              const isBuy = order.action === 'BUY' || 'BUY';
              const status = order.status || 'OPEN';
              const displayPrice = order.limitPrice || order.price;

              return (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  {/* Time */}
                  <td className="px-6 py-4 font-mono font-medium">{order.time}</td>

                  {/* Action */}
                  <td className="pr-6 py-4 text-center">
                    <div className={`inline-flex items-center justify-center w-7 h-7 rounded ${isBuy
                      ? 'bg-pulse-green/10 border border-pulse-green/20 text-pulse-green'
                      : 'bg-red-500/10 border border-red-500/20 text-red-500'
                      }`}>
                      <span className="text-xs font-bold">{isBuy ? 'Buy' : 'Sell'}</span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4 font-mono font-medium">{order.type}</td>

                  {/* Instrument */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold">{order.symbol}</span>
                      <span className="text-xs text-pulse-text-muted">{order.name}</span>
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
                    {typeof displayPrice === 'number' ? `$${displayPrice.toFixed(2)}` : displayPrice}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${status === 'OPEN' || status === 'COMPLETED'
                        ? 'bg-pulse-green/10 border border-pulse-green/20 text-pulse-green'
                        : 'bg-red-500/10 border border-red-500/20 text-red-500'
                        }`}>
                        {status === 'OPEN' || status === 'COMPLETED' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{status}</span>
                      </div>
                    </div>
                  </td>

                  {/* Options */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center relative group/dropdown cursor-pointer">
                      <button
                        onClick={() => onActionClick(order)}
                        className="text-pulse-text-muted transition-colors p-1 text-center"
                        aria-label="Order actions"
                      >
                        <MoreVertical className="w-5 h-5 group-hover/dropdown:text-white" />
                      </button>

                      {/* CSS Hover Dropdown */}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-36 bg-[#1a1c24] border border-white/5 shadow-2xl rounded-lg opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-20 overflow-hidden divide-y divide-white/5 text-left">
                        <button
                          onClick={(e) => { e.stopPropagation(); onActionClick({ ...order, actionType: 'edit' }); }}
                          className="w-full text-left px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/5 transition-colors"
                        >
                          Edit order
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setOrderToCancel(order); }}
                          className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
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

          {pages.map((page, idx) => (
            <button
              key={`${idx}-${page}`}
              onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
              disabled={page === '...'}
              className={`w-7 h-7 flex items-center justify-center rounded text-sm transition-colors ${page === currentPage
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

      {/* Confirmation Modal */}
      {orderToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 animate-in fade-in">
          <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              {/* Warning Icon */}
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-500">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              
              {/* Title / Message */}
              <h3 className="text-lg font-bold text-white mb-2">Do you want to cancel the order?</h3>
              <p className="text-xs text-pulse-text-muted mb-6 leading-relaxed">
                This will cancel your <span className="font-bold text-white">{orderToCancel.action}</span> order for <span className="font-bold text-white">{orderToCancel.qty} shares</span> of <span className="font-bold text-white">{orderToCancel.symbol}</span>. This action cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setOrderToCancel(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  Go back
                </button>
                <button
                  onClick={async () => {
                    const targetOrder = orderToCancel;
                    setOrderToCancel(null);
                    await onActionClick({ ...targetOrder, actionType: 'cancel' });
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700 text-xs font-semibold text-white transition-all shadow-lg shadow-red-500/20 cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
