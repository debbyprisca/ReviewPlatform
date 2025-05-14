import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Star, 
  ThumbsUp, 
  Calendar, 
  MapPin,
  Filter,
  Download,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState('month');
  
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your review impact and engagement metrics</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input pr-10 appearance-none"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="year">Last 12 months</option>
                <option value="all">All time</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <button className="btn btn-outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500 text-sm">Total Reviews</h3>
              <BarChart3 className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">127</p>
            <p className="text-sm text-success-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5% from last month
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500 text-sm">Helpful Votes</h3>
              <ThumbsUp className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">843</p>
            <p className="text-sm text-success-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.2% from last month
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500 text-sm">Average Rating</h3>
              <Star className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-sm text-success-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +0.3 from last month
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500 text-sm">Profile Views</h3>
              <Users className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2.1k</p>
            <p className="text-sm text-success-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15.7% from last month
            </p>
          </div>
        </div>
        
        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Review Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Review Activity</h2>
              <button className="text-gray-500 hover:text-gray-700">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {mockBarData.map((bar, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-primary-100 rounded-t"
                    style={{ height: `${bar.value}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Rating Distribution</h2>
              <button className="text-gray-500 hover:text-gray-700">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600 flex items-center">
                    {rating} <Star className="w-4 h-4 text-accent-500 ml-1" fill="#F59E0B" />
                  </div>
                  <div className="flex-1 mx-4 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-500 rounded-full"
                      style={{ width: `${mockRatingDistribution[rating]}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-gray-600">
                    {mockRatingDistribution[rating]}%
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {mockActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`p-2 rounded-lg ${activity.iconBg} mr-4`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Locations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Reviewed Locations</h2>
            <div className="space-y-4">
              {mockLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{location.name}</p>
                      <p className="text-sm text-gray-500">{location.count} reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < location.rating ? 'text-accent-500' : 'text-gray-300'}`}
                          fill={i < location.rating ? '#F59E0B' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{location.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock Data
const mockBarData = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 45 },
  { label: 'Wed', value: 85 },
  { label: 'Thu', value: 55 },
  { label: 'Fri', value: 75 },
  { label: 'Sat', value: 90 },
  { label: 'Sun', value: 60 },
];

const mockRatingDistribution = {
  5: 65,
  4: 25,
  3: 7,
  2: 2,
  1: 1,
};

const mockActivity = [
  {
    icon: <Star className="w-5 h-5 text-accent-600" />,
    iconBg: 'bg-accent-50',
    title: 'New Review Posted',
    description: 'You reviewed Skyline Hotels & Resorts',
    time: '2h ago',
  },
  {
    icon: <ThumbsUp className="w-5 h-5 text-primary-600" />,
    iconBg: 'bg-primary-50',
    title: 'Helpful Votes Received',
    description: '3 people found your review helpful',
    time: '5h ago',
  },
  {
    icon: <Calendar className="w-5 h-5 text-secondary-600" />,
    iconBg: 'bg-secondary-50',
    title: 'Review Anniversary',
    description: '1 year of reviewing on Trust Seal',
    time: '1d ago',
  },
];

const mockLocations = [
  {
    name: 'Paris, France',
    count: 12,
    rating: 4.8,
  },
  {
    name: 'London, UK',
    count: 8,
    rating: 4.5,
  },
  {
    name: 'New York, USA',
    count: 6,
    rating: 4.2,
  },
  {
    name: 'Tokyo, Japan',
    count: 4,
    rating: 4.9,
  },
];

export default AnalyticsPage;