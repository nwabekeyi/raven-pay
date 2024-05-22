import { useState, useEffect } from 'react';
import SegmentedControl from '../segmented-control';
import Dropdown from '../../ui-components/dropdown';
import './orderBook.css';

const OrderBook = () => {
  const [activeTab, setActiveTab] = useState('orderBook'); // State to track the active tab
  const [currencyPair, setCurrencyPair] = useState('BTC/USD');
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [period, setPeriod] = useState('1 Day'); // State to track the selected period

  const handleTabChange = (index) => {
    setActiveTab(index === 0 ? 'orderBook' : 'recentTrades');
  };

  const handlePeriodChange = (option) => {
    setPeriod(option);
  };

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        // Mock fetching function based on period
        const generateMockData = (period) => {
          const periods = {
            '1 Day': { BID: 70000, ASK: 70050 },
            '2 Days': { BID: 70500, ASK: 70550 },
            '3 Days': { BID: 71000, ASK: 71050 },
            '5 Days': { BID: 71500, ASK: 71550 },
            '10 Days': { BID: 72000, ASK: 72050 },
          };
          return periods[period];
        };

        // Fetch data based on the selected period
        const data = generateMockData(period);

        setBids([{ price: data.BID }]);
        setAsks([{ price: data.ASK }]);
      } catch (error) {
        console.error('Error fetching order book data:', error);
      }
    };

    fetchOrderBook();
  }, [currencyPair, period]);

  return (
    <div className="order-book">
      <SegmentedControl
        segments={['Order Book', 'Recent Trades']}
        onSegmentChange={handleTabChange}
        activeStyle="order"
      />

      <div className="nested-controls">
        <SegmentedControl
          segments={['Menu1', 'Menu2', 'Menu3']}
          onSegmentChange={() => {}}
          activeStyle="order"
        />
        <Dropdown
          label={period}  // Display selected period as the label
          options={['1 Day', '2 Days', '3 Days', '5 Days', '10 Days']}
          onSelect={handlePeriodChange}
        />
      </div>

      {activeTab === 'orderBook' ? (
        <div className="order-book__content">
          <h3>Order Book</h3>
          <div className="order-book__section">
            <h4>Bids</h4>
            <ul>
              {bids.map((bid, index) => (
                <li key={index}>Price: {bid.price}</li>
              ))}
            </ul>
          </div>
          <div className="order-book__section">
            <h4>Asks</h4>
            <ul>
              {asks.map((ask, index) => (
                <li key={index}>Price: {ask.price}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="order-book__content">
          <h3>Recent Trades</h3>
          {/* Display recent trades content here */}
        </div>
      )}
    </div>
  );
};

export default OrderBook;