import React from 'react';

const OrderRow = ({ price, size, depthPercentage, isBid }) => (
  <div className="flex items-center justify-between text-xs py-1 relative cursor-pointer hover:bg-white/5 pr-4 pl-0">
    {/* Depth Bar Background */}
    <div
      className={`absolute left-0 top-0 bottom-0 opacity-10 ${isBid ? 'bg-pulse-green' : 'bg-red-500'}`}
      style={{ width: `${depthPercentage}%` }}
    />
    <span className={`font-mono relative z-10 w-20 ${isBid ? 'text-pulse-green' : 'text-red-500'}`}>
      {price}
    </span>
    <span className="font-mono text-gray-300 relative z-10">{size}</span>
  </div>
);

const OrderBook = ({
  bids = [
    { price: '875.22', size: '42.10', depth: 80 },
    { price: '875.20', size: '15.05', depth: 60 },
    { price: '875.18', size: '28.42', depth: 40 },
    { price: '875.15', size: '112.90', depth: 100 },
  ],
  asks = [
    { price: '875.25', size: '5.20', depth: 20 },
    { price: '875.28', size: '32.14', depth: 50 },
    { price: '875.30', size: '12.00', depth: 30 },
    { price: '875.35', size: '185.32', depth: 100 },
  ],
  totalBidsSize = '450.2K',
  totalAsksSize = '512.8K',
  onBuyClick = () => { },
  onSellClick = () => { },
}) => {
  return (
    <div className="flex flex-col h-64 bg-[#0a0f16]">
      <div className="flex-1 min-h-0 grid grid-cols-2 divide-x divide-white/5">

        {/* Bids Column */}
        <div className="flex flex-col pl-6">
          <div className="flex items-center justify-between py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pr-4">
            <span className="text-pulse-green">Bids (Buy Orders)</span>
            <span>Size: {totalBidsSize}</span>
          </div>
          <div className="flex-1 overflow-y-auto mt-2">
            {bids.map((bid, i) => (
              <OrderRow
                key={i}
                price={bid.price}
                size={bid.size}
                depthPercentage={bid.depth}
                isBid={true}
              />
            ))}
          </div>
        </div>

        {/* Asks Column */}
        <div className="flex flex-col pl-6">
          <div className="flex items-center justify-between py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pr-4">
            <span className="text-red-500">Asks (Sell Orders)</span>
            <span>Size: {totalAsksSize}</span>
          </div>
          <div className="flex-1 overflow-y-auto mt-2">
            {asks.map((ask, i) => (
              <OrderRow
                key={i}
                price={ask.price}
                size={ask.size}
                depthPercentage={ask.depth}
                isBid={false}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 p-3 border-t border-white/5 shrink-0">
        <button onClick={() => onBuyClick()} className="bg-pulse-green hover:bg-[#059669] text-[#0a0f16] w-1/3 mx-auto font-bold py-1.5 rounded transition-colors uppercase tracking-wider text-sm">Buy</button>
        <button onClick={onSellClick} className="bg-red-500 hover:bg-red-600 text-white w-1/3 mx-auto font-bold py-1.5 rounded transition-colors uppercase tracking-wider text-sm">Sell</button>
      </div>

    </div>
  );
};

export default OrderBook;
