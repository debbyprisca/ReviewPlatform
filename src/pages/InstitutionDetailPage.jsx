import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  CheckCircle, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  ThumbsUp,
  ThumbsDown,
  Flag,
  Shield,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';



const InstitutionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('reviews');
  const [institution, setInstitution] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      // In a real app, this would be API calls to get institution and reviews
      setTimeout(() => {
        const foundInstitution = institutions.find(inst => inst.id === id);
        if (foundInstitution) {
          setInstitution(foundInstitution);
          setReviews(institutionReviews);
        }
        setLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!institution) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Institution not found</h2>
        <p className="text-gray-600 mb-8">The institution you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/institutions')}
          className="btn btn-primary"
        >
          Browse Institutions
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 pb-16">
      {/* Hero Section */}
      <div 
        className="h-64 md:h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${institution.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container-custom">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`badge ${getCategoryBadgeClass(institution.category)}`}>
                  {institution.category}
                </span>
                <div className="verified-badge text-white">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-xs">Verified</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{institution.name}</h1>
              <div className="flex items-center flex-wrap space-x-4">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(institution.rating) ? 'text-accent-500' : 'text-gray-300'}`}
                        fill={i < Math.floor(institution.rating) ? '#F59E0B' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-gray-200">
                    {institution.rating.toFixed(1)} ({institution.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{institution.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:space-x-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'about'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </button>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'photos'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('photos')}
                >
                  Photos
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
                <span className="text-lg font-semibold text-primary-600">
                    Write a Review
                  </span>

                </div>

                               {/* Write a review */}

                 <form
        className=" mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col "
      // onSubmit={handleSubmit}
    >
      <div >
        <div >
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value=""
            
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter address"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="harsh">
            Harsh
          </label>
          <input
            id="harsh"
            name="harsh"
            type="text"
            value=""
            onChange=""
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter harsh"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="review">
            Review
          </label>
          <textarea
          id="review"
          name="review"
          rows={6}
          value=""
          onChange=""
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Write your review"
          required
        />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Review
        </button>
      </div>
    </form>

                {/* End Write a review */}
                
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="mt-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-4">
                              <img
                                src={review.userAvatar}
                                alt={review.userName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                                  {review.verified && (
                                    <div className="verified-badge ml-2">
                                      <CheckCircle className="w-3 h-3" />
                                      <span className="text-xs">Verified</span>
                                    </div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {review.date} • via Blockchain Attestation
                                </div>
                              </div>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-accent-500' : 'text-gray-300'}`}
                                  fill={i < review.rating ? '#F59E0B' : 'none'}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <h4 className="text-lg font-semibold mt-4 mb-2">{review.title}</h4>
                          <p className="text-gray-600 mb-4">{review.content}</p>
                          
                          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="bg-gray-50 rounded-lg px-3 py-1 text-xs text-gray-500 flex items-center">
                              <Shield className="w-3 h-3 text-primary-500 mr-1" />
                              <span className="hidden sm:inline">Blockchain ID: </span>
                              <span className="truncate max-w-[140px] sm:max-w-xs">
                                {review.blockchainAddress}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-xs">{review.helpfulCount}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                                <Flag className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No reviews yet</h3>
                    <p className="text-gray-500 mb-6">
                      Be the first to leave a review for {institution.name}.
                    </p>
                   <span className="text-lg font-semibold text-primary-600">
                        Write a Review
                      </span>

                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About {institution.name}</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                  <p className="text-gray-700 mb-6">
                    {institution.fullDescription || institution.description}
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-4">Facilities & Services</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {institution.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-success-500 mr-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  {institution.awards && (
                    <>
                      <h3 className="text-lg font-semibold mb-4">Awards & Recognition</h3>
                      <div className="space-y-3 mb-6">
                        {institution.awards.map((award, index) => (
                          <div key={index} className="flex items-center">
                            <Award className="w-4 h-4 text-accent-500 mr-2" />
                            <span className="text-gray-700">{award}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'photos' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Photos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {institution.photos?.map((photo, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img 
                        src={photo} 
                        alt={`${institution.name} - Photo ${index + 1}`} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="md:w-80 mt-8 md:mt-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-700">Website</p>
                    <a href="#" className="text-primary-600 hover:text-primary-700 text-sm">
                      {institution.website || 'www.example.com'}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-700">Phone</p>
                    <a href="#" className="text-primary-600 hover:text-primary-700 text-sm">
                      {institution.phone || '+1 (555) 123-4567'}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-700">Email</p>
                    <a href="#" className="text-primary-600 hover:text-primary-700 text-sm">
                      {institution.email || 'contact@example.com'}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-700">Hours</p>
                    <p className="text-sm text-gray-600">
                      {institution.hours || '24/7 Customer Service'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
                <div className="bg-success-50 rounded-lg p-4 flex items-start">
                  <Shield className="w-5 h-5 text-success-700 mr-3 mt-0.5" />
                  <div>
                    <p className="text-success-700 font-medium">Verified Business</p>
                    <p className="text-sm text-success-700 opacity-80">
                      This institution has verified their identity and credentials through our blockchain verification process.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* <button
                onClick={() => navigate(`/write-review/${id}`)}
                className="btn btn-primary w-full"
              >
                Write a Review
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getCategoryBadgeClass = (category) => {
  switch (category) {
    case 'hotel':
      return 'badge-blue';
    case 'airline':
      return 'badge-teal';
    case 'cruise':
      return 'badge-amber';
    default:
      return 'badge-blue';
  }
};

// Mock Data
const institutions = [
  {
    id: '1',
    name: 'Skyline Hotels & Resorts',
    rating: 4.7,
    reviewCount: 127,
    location: 'Multiple Locations Worldwide',
    category: 'hotel',
    description: 'Luxury hotel chain known for exceptional service and premium accommodations in prime locations worldwide.',
    imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullDescription: 'Skyline Hotels & Resorts is a premier luxury hotel chain with properties in over 50 countries. Known for our commitment to exceptional service, premium accommodations, and breathtaking locations, we provide unforgettable experiences for business and leisure travelers alike. Our properties feature world-class amenities including fine dining restaurants, spa facilities, and state-of-the-art fitness centers.',
    amenities: [
      'Luxury Accommodations', 
      '24/7 Concierge', 
      'Fine Dining Restaurants', 
      'Spa & Wellness Centers', 
      'Fitness Facilities', 
      'Business Centers',
      'Swimming Pools',
      'Room Service',
      'Conference Facilities'
    ],
    awards: [
      'World Travel Awards - World\'s Leading Hotel Chain 2024',
      'Forbes Five Star Rating - Multiple Properties',
      'Condé Nast Traveler Readers\' Choice Awards 2024'
    ],
    website: 'www.skylinehotels.com',
    phone: '+1 (800) 123-4567',
    email: 'reservations@skylinehotels.com',
    hours: '24/7 Customer Service',
    photos: [
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '2',
    name: 'Global Airways',
    rating: 4.2,
    reviewCount: 342,
    location: 'International',
    category: 'airline',
    description: 'International airline offering flights to over 120 destinations with focus on passenger comfort and on-time performance.',
    imageUrl: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const institutionReviews= [
  {
    id: '1',
    userId: '101',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    title: 'Exceptional stay with outstanding service',
    content: 'Our stay at Skyline was nothing short of amazing. The staff went above and beyond to ensure every aspect of our visit was perfect. The rooms are spacious and beautifully appointed, and the amenities are top-notch. The rooftop restaurant offers breathtaking views and delicious cuisine. Will definitely be returning!',
    date: 'May 15, 2025',
    verified: true,
    blockchainAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    helpfulCount: 12,
    userAccount: '0x71C7...976F'
  },
  {
    id: '2',
    userId: '102',
    userName: 'Michael Chen',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4,
    title: 'Great location and comfortable rooms',
    content: 'The hotel is centrally located with easy access to major attractions. Our room was comfortable and clean, though slightly smaller than expected. The staff was friendly and responsive to our needs. The breakfast buffet offered a good variety of options. Overall, a very pleasant stay.',
    date: 'April 28, 2025',
    verified: true,
    blockchainAddress: '0x3243Ed9fdCDE2345AE89f1a73437fBf0b4112AB1',
    helpfulCount: 8,
    userAccount: '0x3243...AB1'
  },
  {
    id: '3',
    userId: '103',
    userName: 'Emma Rodriguez',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    title: 'Luxury experience worth every penny',
    content: 'From the moment we arrived, the experience was first-class. The check-in process was smooth, and we were welcomed with refreshments. The suite was stunning with panoramic city views. The spa treatments were excellent, and the attentive service throughout our stay made us feel like VIPs. This hotel sets the standard for luxury accommodations.',
    date: 'April 10, 2025',
    verified: true,
    blockchainAddress: '0x8901cD34E1fD92476aB25d6f2F5bD7F70c4A2e35',
    helpfulCount: 15,
    userAccount: '0x8901...2e35'
  }
];

export default InstitutionDetailPage;