import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Shield, ArrowLeft, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WriteReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [institution, setInstitution] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBlockchainModal, setShowBlockchainModal] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/institutions/${id}`);
      return;
    }
    
    // Simulate data fetching
    const fetchData = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        const foundInstitution = institutions.find(inst => inst.id === id);
        if (foundInstitution) {
          setInstitution(foundInstitution);
        }
        setLoading(false);
      }, 300);
    };
    
    fetchData();
  }, [id, isAuthenticated, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate blockchain attestation verification
    setShowBlockchainModal(true);
    
    // In a real app, this would handle the blockchain verification
    setTimeout(() => {
      setShowBlockchainModal(false);
      navigate(`/institutions/${id}`);
    }, 3000);
  };
  
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
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="container-custom max-w-3xl">
        <button
          onClick={() => navigate(`/institutions/${id}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to {institution.name}
        </button>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">Write a Review</h1>
            <p className="text-gray-600">Share your experience with {institution.name}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate your overall experience
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-8 h-8 cursor-pointer transition-colors ${
                      (rating >= value || hoverRating >= value) ? 'text-accent-500' : 'text-gray-300'
                    }`}
                    fill={(rating >= value || hoverRating >= value) ? '#F59E0B' : 'none'}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {rating > 0 ? getRatingText(rating) : 'Select a rating'}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Review Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="input"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell others about your experience"
                className="input min-h-32"
                rows={5}
                required
              />
            </div>
            
            <div className="bg-primary-50 rounded-lg p-4 mb-6 flex items-start">
              <Info className="w-5 h-5 text-primary-600 mr-3 mt-0.5" />
              <div className="flex-1">
                <p className="text-primary-800 font-medium">Blockchain Attestation</p>
                <p className="text-sm text-primary-700">
                  Your review will be signed as an attestation using your blockchain wallet address: <span className="font-mono">{user?.address}</span>. This creates a permanent, verifiable record of your experience.
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => navigate(`/institutions/${id}`)}
                className="btn btn-outline mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Blockchain Attestation Modal */}
      {showBlockchainModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full animate-slide-up">
            <div className="text-center mb-4">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Signing Blockchain Attestation</h3>
              <p className="text-gray-600">
                Your review is being cryptographically signed and recorded on the blockchain.
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-primary-600 h-2 rounded-full w-2/3 animate-pulse"></div>
            </div>
            <p className="text-center text-sm text-gray-500">
              Please do not close this window
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function
const getRatingText = (rating) => {
  switch (rating) {
    case 1:
      return 'Poor';
    case 2:
      return 'Fair';
    case 3:
      return 'Good';
    case 4:
      return 'Very Good';
    case 5:
      return 'Excellent';
    default:
      return '';
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

export default WriteReviewPage;