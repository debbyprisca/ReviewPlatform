import { useNavigate } from 'react-router-dom';
import { Shield, Search, Star, Award, CheckCircle, TrendingUp, Building, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const handleExplore = () => {
    navigate('/institutions');
  };
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Trusted Reviews, <br />
                <span className="text-accent-300">Blockchain Verified</span>
              </h1>
              <p className="text-primary-100 mb-8 text-lg md:text-xl max-w-xl">
                Discover and share authentic experiences with Trust Seal's blockchain-powered review platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={handleExplore}
                  className="btn bg-white text-primary-800 hover:bg-gray-100 focus:ring-white"
                >
                  Explore Institutions
                </button>
                {!isAuthenticated && (
               <button
  onClick={() => navigate('/add-institution')}
  className="btn border border-primary-300 text-white hover:bg-primary-700 focus:ring-white"
>
  Add Institution
</button>

                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-accent-500 rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-secondary-500 rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="bg-white p-6 rounded-xl shadow-lg animate-slide-up">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <Building className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Skyline Hotels</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4].map((i) => (
                            <Star key={i} className="w-4 h-4 text-accent-500" fill="#F59E0B" />
                          ))}
                          <Star className="w-4 h-4 text-accent-500" fill="none" />
                        </div>
                        <span className="text-sm text-gray-500 ml-1">4.0 (127 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-3 mb-3">
                    <p className="text-gray-700 text-sm">
                      "Exceptional service and amenities. The staff went above and beyond to make our stay memorable."
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">John D. - May 12, 2025</span>
                      <div className="flex items-center text-success-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        <span className="text-xs">Verified</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-xs text-gray-500 flex items-center">
                    <Shield className="w-3 h-3 text-primary-500 mr-1" />
                    Blockchain verified on May 12, 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Trust Seal?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our blockchain technology ensures reviews are verified, transparent, and tamper-proof.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="bg-primary-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Attestations</h3>
              <p className="text-gray-600">
                All reviews are signed as attestations with blockchain wallets, ensuring authenticity and trust.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="bg-secondary-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <CheckCircle className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tamper-Proof Reviews</h3>
              <p className="text-gray-600">
                Once published, reviews cannot be altered or deleted, maintaining integrity and transparency.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="bg-accent-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reputation Building</h3>
              <p className="text-gray-600">
                Build credibility over time with a verifiable history of authentic reviews and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Institutions */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Top Rated Institutions</h2>
            <button 
              onClick={handleExplore}
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center text-sm"
            >
              View all
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInstitutions.map((institution) => (
              <div 
                key={institution.id} 
                className="card group"
                onClick={() => navigate(`/institutions/${institution.id}`)}
              >
                <div 
                  className="h-40 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${institution.imageUrl})` }}
                >
                  <div className="h-full w-full bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                    {institution.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(institution.rating) ? 'text-accent-500' : 'text-gray-300'}`}
                          fill={i < Math.floor(institution.rating) ? '#F59E0B' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {institution.rating} ({institution.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Globe className="w-4 h-4 mr-1" />
                    {institution.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {institution.tags.map((tag) => (
                        <span key={tag} className="badge-blue">{tag}</span>
                      ))}
                    </div>
                    <div className="verified-badge">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-800 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Share Your Experience?</h2>
          <p className="text-secondary-100 mb-8 max-w-2xl mx-auto">
            Join our community of trusted reviewers and help others make informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleExplore}
              className="btn bg-white text-primary-800 hover:bg-gray-100"
            >
              Browse Institutions
            </button>
            {!isAuthenticated && (
             // <button
              //  onClick={() => navigate('/institutions')}
             //   className="btn border border-white text-white hover:bg-primary-700"
             // >
             //</div>   Write a Review
             // </button>
          <button
  onClick={() => navigate('/add-institution')}
  className="btn border border-primary-300 text-white hover:bg-primary-700 focus:ring-white"
>
  Add Institution
</button>

            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Mock Data
const featuredInstitutions = [
  {
    id: '1',
    name: 'Skyline Hotels & Resorts',
    rating: 4.7,
    reviewCount: 127,
    location: 'Multiple Locations',
    tags: ['Hotels', 'Luxury'],
    imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    name: 'Global Airways',
    rating: 4.2,
    reviewCount: 342,
    location: 'International',
    tags: ['Airline', 'Travel'],
    imageUrl: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    name: 'Coastal Cruises',
    rating: 4.5,
    reviewCount: 89,
    location: 'Caribbean, Mediterranean',
    tags: ['Cruise', 'Luxury'],
    imageUrl: 'https://images.pexels.com/photos/144640/pexels-photo-144640.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default HomePage;