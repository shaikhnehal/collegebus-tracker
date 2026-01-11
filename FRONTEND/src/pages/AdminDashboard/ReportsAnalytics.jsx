import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer,
  BarChart, Bar, ComposedChart, Area, Scatter
} from 'recharts';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const allLineData = {
  Daily: [
    { label: 'Mon', rides: 40 },
    { label: 'Tue', rides: 55 },
    { label: 'Wed', rides: 60 },
    { label: 'Thu', rides: 48 },
    { label: 'Fri', rides: 70 },
    { label: 'Sat', rides: 30 },
    { label: 'Sun', rides: 20 },
  ],
  Weekly: [
    { label: 'Week 1', rides: 350 },
    { label: 'Week 2', rides: 410 },
    { label: 'Week 3', rides: 390 },
    { label: 'Week 4', rides: 440 },
  ],
  Monthly: [
    { label: 'Jan', rides: 1600 },
    { label: 'Feb', rides: 1400 },
    { label: 'Mar', rides: 1800 },
    { label: 'Apr', rides: 2000 },
  ]
};

const pieData = [
  { name: 'Bus A', value: 400 },
  { name: 'Bus B', value: 300 },
  { name: 'Bus C', value: 300 },
  { name: 'Bus D', value: 200 },
];

const stackedBarData = [
  { label: 'Mon', BusA: 20, BusB: 15, BusC: 5 },
  { label: 'Tue', BusA: 25, BusB: 20, BusC: 10 },
  { label: 'Wed', BusA: 30, BusB: 25, BusC: 10 },
  { label: 'Thu', BusA: 28, BusB: 15, BusC: 5 },
  { label: 'Fri', BusA: 35, BusB: 25, BusC: 10 },
  { label: 'Sat', BusA: 18, BusB: 10, BusC: 5 },
  { label: 'Sun', BusA: 15, BusB: 5, BusC: 0 },
];

const ReportsAnalytics = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Daily');
  const data = allLineData[filter];

  const exportCSV = () => {
    const rows = [['Label', 'Rides'], ...data.map(d => [d.label, d.rides])];
    const csvContent = 'data:text/csv;charset=utf-8,' +
      rows.map(row => row.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `${filter}_bus_usage_report.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Back & Title */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-black text-base sm:text-lg"
        >
          <FaArrowLeft size={20} />
        </motion.button>
        <h2 className="text-lg sm:text-3xl font-bold text-center flex-1">Reports & Analytics</h2>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Filters and Export */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex gap-2">
          {['Daily', 'Weekly', 'Monthly'].map(option => (
            <button
              key={option}
              className={`px-3 py-1 text-sm sm:px-4 sm:py-2 rounded-lg text-white ${
                filter === option ? 'bg-blue-600' : 'bg-gray-600'
              } hover:bg-blue-700 transition`}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-700 transition text-sm sm:text-base text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={exportCSV}
        >
          <FaDownload size={16} /> Export CSV
        </motion.button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {/* Line Chart */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">{filter} Bus Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rides" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Stacked Bar Chart */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Stacked Bus Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart
              width={500}
              height={300}
              data={stackedBarData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="BusA" stackId="a" fill="#0088FE" />
              <Bar dataKey="BusB" stackId="a" fill="#00C49F" />
              <Bar dataKey="BusC" stackId="a" fill="#FFBB28" />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Pie Chart */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white p-4 sm:p-6 rounded-xl shadow mt-4 sm:mt-6"
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Bus Utilization</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default ReportsAnalytics;
