import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../terminal/TopNav';
import LeftNav from '../terminal/LeftNav';
import OrderBookHeader from './OrderBookHeader';
import OrdersTable from './OrdersTable';
import OrdersSummaryCards from './OrdersSummaryCards';
import { useAccountManager } from '../AccountManager';

const MOCK_SUMMARY = {
  executionRatio: { value: '94.2%', change: '+12%', isPositive: true },
  tradeVolume: { value: '$1.24M', desc: 'Institutional settlement active' },
  activeMargin: { value: '$42,890', change: '-2.4%', isPositive: false, desc: 'Utilization: 14% of $300,000 limit' }
};

const OrdersPageLayout = ({
  // Header Props
  activeTab = 'Open',
  tabs = ['Open', 'Executed', 'GTT', 'Rejected'],
  onTabClick = () => { },
  searchValue = '',
  onSearchChange = () => { },
  onDateRangeClick = () => { },
  onDownloadClick = () => { },

  // Summary Props
  summaryStats = MOCK_SUMMARY,
}) => {
  const navigate = useNavigate();
  const { orders, fetchOrders, cancelOrder } = useAccountManager() || {};
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Pagination Logic
  const itemsPerPage = 10;
  const safeOrders = Array.isArray(orders) ? orders : [];
  const totalItems = safeOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Bound current page strictly
  const actualCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = totalItems === 0 ? 0 : (actualCurrentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(actualCurrentPage * itemsPerPage, totalItems);

  const paginatedOrders = safeOrders.slice(startIndex > 0 ? startIndex - 1 : 0, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Navigation handlers
  const handleNavClick = (id) => {
    if (id === 'markets' || id === 'watchlist') navigate('/terminal');
    if (id === 'portfolio' || id === 'holdings' || id === 'dashboard') navigate('/portfolio');
    if (id === 'orders') navigate('/orders');
  };

  const handleActionClick = async (order) => {
    if (order.actionType === 'cancel') {
      if (cancelOrder) {
        await cancelOrder(order._id);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0A0F16] font-sans selection:bg-pulse-green/30 overflow-hidden">
      {/* TopNav shell */}
      <TopNav
        activeTab="markets"
        onTabSelect={handleNavClick}
        onLogoClick={() => navigate('/')}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* LeftNav shell */}
        <LeftNav activeRoute="orders" onRouteSelect={handleNavClick} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 wrapper-scroll bg-[#0b0c10]">
          <div className="max-w-7xl mx-auto flex flex-col gap-2">

            {/* Header Section */}
            <OrderBookHeader
              activeTab={activeTab}
              tabs={tabs}
              onTabClick={onTabClick}
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              onDateRangeClick={onDateRangeClick}
              onDownloadClick={onDownloadClick}
            />

            {/* Data Table Section */}
            <OrdersTable
              orders={paginatedOrders}
              onActionClick={handleActionClick}
              onPageChange={handlePageChange}
              currentPage={actualCurrentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              startIndex={startIndex}
              endIndex={endIndex}
            />

            {/* Summary Cards Section */}
            <OrdersSummaryCards
              executionRatio={summaryStats.executionRatio}
              tradeVolume={summaryStats.tradeVolume}
              activeMargin={summaryStats.activeMargin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPageLayout;
