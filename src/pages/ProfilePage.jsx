import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Star, 
  CheckCircle, 
  List, 
  User, 
  LogOut, 
  Award, 
  Settings, 
  Clock,
  Edit,
  Bell,
  Lock,
  Wallet,
  Mail,
  Globe,
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: '',
    bio: '',
    website: '',
    twitter: '',
    location: ''
  });
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditing(false);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start text-white">
            <div className="relative">
              <img
                src={user?.avatarUrl}
                alt={user?.username}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4 md:mb-0 md:mr-6"
              />
              <button className="absolute bottom-4 right-6 md:bottom-0 md:right-8 bg-white rounded-full p-1.5 text-primary-600 hover:text-primary-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <h1 className="text-2xl font-bold mb-1">{user?.username}</h1>
                <div className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full text-xs font-medium flex items-center ml-3">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified Reviewer
                </div>
              </div>
              <p className="text-primary-100 text-sm mb-3">Member since {user?.joinedDate}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="flex items-center bg-white bg-opacity-10 rounded-lg px-3 py-1.5">
                  <Award className="w-4 h-4 mr-2" />
                  <div>
                    <p className="text-xs opacity-80">Reviews</p>
                    <p className="font-semibold">{user?.reviewCount}</p>
                  </div>
                </div>
                <div className="flex items-center bg-white bg-opacity-10 rounded-lg px-3 py-1.5">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <div>
                    <p className="text-xs opacity-80">Trust Score</p>
                    <p className="font-semibold">92%</p>
                  </div>
                </div>
                <div className="flex items-center bg-white bg-opacity-10 rounded-lg px-3 py-1.5">
                  <Clock className="w-4 h-4 mr-2" />
                  <div>
                    <p className="text-xs opacity-80">Response Time</p>
                    <p className="font-semibold">24h</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center mt-4 md:mt-0">
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg px-3 py-2 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Wallet Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Connected Wallet</p>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-primary-600 mr-2" />
                <span className="font-mono text-sm md:text-base">{user?.address}</span>
              </div>
            </div>
            <div className="mt-3 md:mt-0 flex space-x-3">
              <button className="btn btn-outline text-sm">
                <Wallet className="w-4 h-4 mr-2" />
                View on Explorer
              </button>
              <button className="btn btn-primary text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Verify Identity
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex">
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'dashboard'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </div>
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                <div className="flex items-center">
                  <List className="w-4 h-4 mr-2" />
                  Reviews
                </div>
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <div className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </div>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-primary-900">Trust Score</h3>
                      <Shield className="w-5 h-5 text-primary-600" />
                    </div>
                    <p className="text-2xl font-bold text-primary-700">92%</p>
                    <p className="text-sm text-primary-600">Based on review authenticity</p>
                  </div>
                  
                  <div className="bg-accent-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-accent-900">Total Reviews</h3>
                      <Star className="w-5 h-5 text-accent-600" />
                    </div>
                    <p className="text-2xl font-bold text-accent-700">{user?.reviewCount}</p>
                    <p className="text-sm text-accent-600">Across all institutions</p>
                  </div>
                  
                  <div className="bg-secondary-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-secondary-900">Helpful Votes</h3>
                      <Award className="w-5 h-5 text-secondary-600" />
                    </div>
                    <p className="text-2xl font-bold text-secondary-700">45</p>
                    <p className="text-sm text-secondary-600">From other users</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn btn-outline text-sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleProfileUpdate}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Display Name
                          </label>
                          <input
                            type="text"
                            value={profileData.username}
                            onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="input"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bio
                          </label>
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            className="input"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            value={profileData.website}
                            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Twitter
                          </label>
                          <input
                            type="text"
                            value={profileData.twitter}
                            onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                            className="input"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Display Name</p>
                        <p className="font-medium">{user?.username}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">user@example.com</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Bio</p>
                        <p className="font-medium">Passionate traveler and honest reviewer. Always looking for authentic experiences.</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <p className="font-medium text-primary-600">https://example.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Twitter</p>
                        <p className="font-medium">@username</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">My Reviews</h2>
                
                {userReviews.length > 0 ? (
                  <div className="space-y-6">
                    {userReviews.map((review) => (
                      <div 
                        key={review.id} 
                        className="border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/institutions/${review.institutionId}`)}
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-gray-900">{review.institutionName}</h3>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-accent-500' : 'text-gray-300'}`}
                                fill={i < review.rating ? '#F59E0B' : 'none'}
                              />
                            ))}
                          </div>
                          <h4 className="font-medium mb-2">{review.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{review.content}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="verified-badge">
                              <CheckCircle className="w-3 h-3" />
                              <span className="text-xs">Blockchain Verified</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {review.helpfulCount} people found this helpful
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No reviews yet</h3>
                    <p className="text-gray-500 mb-6">
                      You haven't written any reviews yet. Share your experiences to help others.
                    </p>
                    <button
                      onClick={() => navigate('/institutions')}
                      className="btn btn-primary"
                    >
                      Browse Institutions
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive updates about your reviews</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-500">Receive news and updates</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Privacy Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="font-medium">Public Profile</p>
                          <p className="text-sm text-gray-500">Make your profile visible to others</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Lock className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="font-medium">Show Wallet Address</p>
                          <p className="text-sm text-gray-500">Display your wallet address on reviews</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Account Security</h3>
                  <div className="space-y-4">
                    <button className="btn btn-outline w-full justify-between">
                      <span className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        Enable Two-Factor Authentication
                      </span>
                      <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    </button>
                    
                    <button className="btn btn-outline w-full text-error-600 hover:text-error-700 hover:bg-error-50">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock Data
const userReviews = [
  {
    id: '1',
    institutionId: '1',
    institutionName: 'Skyline Hotels & Resorts',
    rating: 5,
    title: 'Exceptional stay with outstanding service',
    content: 'Our stay at Skyline was nothing short of amazing. The staff went above and beyond to ensure every aspect of our visit was perfect.',
    date: 'May 15, 2025',
    verified: true,
    blockchainAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    helpfulCount: 12,
  },
  {
    id: '2',
    institutionId: '2',
    institutionName: 'Global Airways',
    rating: 4,
    title: 'Comfortable flight with attentive service',
    content: 'The flight was smooth and on-time. Cabin crew was professional and attentive. Food quality could be improved but overall a good experience.',
    date: 'April 20, 2025',
    verified: true,
    blockchainAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    helpfulCount: 5,
  },
];

export default ProfilePage;