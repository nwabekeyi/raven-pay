// src/components/Dashboard.js
import React from 'react';
import './dashboard.css';
import Navbar from '../../dashboard-components/navbar';
import CurrencyInfoPage from '../../dashboard-components/currencyInfopage';
import OrderControl from '../../dashboard-components/orderControl';
import ChartTable from '../../dashboard-components/charts-tables';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <CurrencyInfoPage />
      <ChartTable />
      <OrderControl />
    </div>
  );
};

export default Dashboard;
