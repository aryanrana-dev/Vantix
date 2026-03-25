import React, { useState, useEffect } from 'react';
import { X, Activity, Settings2, ArrowRight } from 'lucide-react';

const OrderModal = ({
  isOpen = false,
  onClose = () => {},
  stock = { symbol: 'NVDA', name: 'NVIDIA CORP', price: 124.32 },
  initialOrderState = { action: 'BUY', product: 'MIS', type: 'Limit', qty: 10, limitPrice: 124.30 },
  onOrderChange = () => {},
  onSubmit = () => {}
}) => {
  const [localOrder, setLocalOrder] = useState(initialOrderState);

  useEffect(() => {
    if (isOpen) {
      setLocalOrder(initialOrderState);
    }
  }, [isOpen]);

  const handleOrderChange = (updates) => {
    const newOrder = { ...localOrder, ...updates };
    setLocalOrder(newOrder);
    onOrderChange(newOrder);
  };

  if (!isOpen) return null;

  const isBuy = localOrder.action === 'BUY';
  const marginRequired = (localOrder.qty * (localOrder.type === 'Market' ? stock.price : localOrder.limitPrice)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const availableBalance = '24,500.00';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Floating Close Button (Top Right) */}
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 p-3 rounded-xl bg-[#11161d] border border-white/10 text-gray-400 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* Main Form Card */}
      <div 
        className="w-[420px] bg-pulse-card border border-white/10 rounded-xl p-6 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside card from closing modal
      >
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-[#0a0f16] border border-white/5 flex items-center justify-center text-pulse-green">
              <Activity size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">{stock.symbol}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">{stock.name}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-pulse-green shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <span className="text-xl font-bold text-pulse-green">${stock.price.toFixed(2)}</span>
            </div>
            <span className="text-[9px] text-pulse-green/70 uppercase font-bold tracking-widest mt-1">Live Market Data</span>
          </div>
        </div>

        {/* Action Toggle (BUY / SELL) */}
        <div className="flex bg-[#0a0f16] rounded-lg p-1 border border-white/5 mb-6">
          <button 
            onClick={() => handleOrderChange({ action: 'BUY' })}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
              isBuy ? 'bg-pulse-green text-[#0a0f16] shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            BUY
          </button>
          <button 
            onClick={() => handleOrderChange({ action: 'SELL' })}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
              !isBuy ? 'bg-red-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            SELL
          </button>
        </div>

        {/* Product Toggle (Intraday vs Delivery) */}
        <div className="mb-6">
          <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Product</label>
          <div className="flex bg-[#0a0f16] rounded-lg p-1 border border-white/5">
            <button 
              onClick={() => handleOrderChange({ product: 'MIS' })}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${
                localOrder.product === 'MIS' ? 'bg-white/10 text-pulse-green border border-white/10' : 'text-gray-400 hover:text-white'
              }`}
            >
              Intraday (MIS)
            </button>
            <button 
              onClick={() => handleOrderChange({ product: 'CNC' })}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${
                localOrder.product === 'CNC' ? 'bg-white/10 text-pulse-green border border-white/10' : 'text-gray-400 hover:text-white'
              }`}
            >
              Delivery (CNC)
            </button>
          </div>
        </div>

        {/* Order Type Toggle */}
        <div className="mb-6">
          <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Order Type</label>
          <div className="flex bg-[#0a0f16] rounded-lg p-1 border border-white/5 space-x-1">
            {['Market', 'Limit', 'Stop Loss'].map(type => (
              <button 
                key={type}
                onClick={() => handleOrderChange({ type })}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
                  localOrder.type === type ? 'border border-pulse-green/50 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Limit Price Inputs */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Quantity</label>
            <div className="relative">
              <input 
                type="number" 
                value={localOrder.qty}
                onChange={(e) => handleOrderChange({ qty: Number(e.target.value) })}
                className="w-full bg-[#0a0f16] border border-white/10 rounded-lg p-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-pulse-green/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 font-bold tracking-widest">SHARES</span>
            </div>
          </div>
          
          <div className="flex-1">
            <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Limit Price</label>
            <div className="relative">
              <input 
                type="number" 
                value={localOrder.limitPrice}
                disabled={localOrder.type === 'Market'}
                onChange={(e) => handleOrderChange({ limitPrice: Number(e.target.value) })}
                className="w-full bg-[#0a0f16] border border-white/10 rounded-lg p-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-pulse-green/50 disabled:opacity-50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 font-bold tracking-widest">USD</span>
            </div>
          </div>
        </div>

        {/* Advanced Options Link */}
        <button className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-colors mb-8 border-b border-dashed border-gray-600 pb-1 w-fit">
          <Settings2 size={12} />
          <span>Advanced Order Options</span>
        </button>

        {/* Financial Summary */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs text-gray-400">Margin Required</span>
            <span className="text-sm font-mono text-white">${marginRequired}</span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="text-xs text-gray-400">Available Balance</span>
            <span className="text-sm font-mono text-white">${availableBalance}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={onSubmit}
          className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-[#0a0f16] flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 shadow-lg ${
            isBuy ? 'bg-pulse-green hover:bg-[#059669] shadow-pulse-green/20' : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
          }`}
        >
          <span>Place {isBuy ? 'Buy' : 'Sell'} Order</span>
          <ArrowRight size={18} />
        </button>

        {/* Footer Warning */}
        <p className="text-[8px] text-gray-500 text-center mt-6 leading-relaxed px-4">
          Executing this order may involve market volatility risks. By clicking you agree to the terminal's trading terms.
        </p>
      </div>
    </div>
  );
};

export default OrderModal;
