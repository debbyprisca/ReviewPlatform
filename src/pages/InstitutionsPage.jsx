import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, CheckCircle, Globe, Building, MapPin, SlidersHorizontal } from 'lucide-react';

const InstitutionsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredInstitutions = institutions.filter((institution) => {
    const matchesSearch = institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || institution.category === selectedCategory;
    const matchesRating = selectedRating === 0 || institution.rating >= selectedRating;
    
    return matchesSearch && matchesCategory && matchesRating;
  });
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Institutions</h1>
            <p className="text-gray-600">Find and review trusted travel institutions with verified reviews</p>
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn btn-outline mt-4 md:mt-0 md:ml-4 flex items-center"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="input pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="all">All Categories</option>
                <option value="hotel">Hotels</option>
                <option value="airline">Airlines</option>
                <option value="cruise">Cruises</option>
                <option value="resort">Resorts</option>
                <option value="tour">Tour Operators</option>
              </select>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(Number(e.target.value))}
                  className="input"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Star</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
                <select className="input">
                  <option>All</option>
                  <option>Verified Only</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
                <select className="input">
                  <option>Any</option>
                  <option>10+ reviews</option>
                  <option>50+ reviews</option>
                  <option>100+ reviews</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select className="input">
                  <option>Highest Rated</option>
                  <option>Most Reviewed</option>
                  <option>Recently Added</option>
                  <option>Alphabetical</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredInstitutions.length} {filteredInstitutions.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutions.map((institution) => (
            <div 
              key={institution.id} 
              className="card group cursor-pointer"
              onClick={() => navigate(`/institutions/${institution.id}`)}
            >
              <div 
                className="h-48 bg-cover bg-center relative" 
                style={{ backgroundImage: `url(${institution.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span className={`badge ${getCategoryBadgeClass(institution.category)}`}>
                    {getCategoryDisplayName(institution.category)}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  {institution.name}
                </h3>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(institution.rating) ? 'text-accent-500' : 'text-gray-300'}`}
                        fill={i < Math.floor(institution.rating) ? '#F59E0B' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {institution.rating.toFixed(1)} ({institution.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {institution.location}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {institution.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="verified-badge">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-xs">Verified Profile</span>
                  </div>
                  <button 
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/write-review/${institution.id}`);
                    }}
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredInstitutions.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No institutions found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
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

const getCategoryDisplayName = (category) => {
  switch (category) {
    case 'hotel':
      return 'Hotel';
    case 'airline':
      return 'Airline';
    case 'cruise':
      return 'Cruise';
    case 'resort':
      return 'Resort';
    case 'tour':
      return 'Tour';
    default:
      return category;
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
  {
    id: '3',
    name: 'Coastal Cruises',
    rating: 4.5,
    reviewCount: 89,
    location: 'Caribbean, Mediterranean',
    category: 'cruise',
    description: 'Luxury cruise line offering unforgettable voyages to exotic destinations with world-class dining and entertainment.',
    imageUrl: 'https://images.pexels.com/photos/144640/pexels-photo-144640.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    name: 'Mountain View Resorts',
    rating: 4.8,
    reviewCount: 76,
    location: 'Alps, Rockies, Andes',
    category: 'resort',
    description: 'Premium ski and mountain resorts with spectacular views, luxurious accommodations and world-class amenities.',
    imageUrl: 'https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '5',
    name: 'Seaside Boutique Hotels',
    rating: 4.6,
    reviewCount: 103,
    location: 'Mediterranean Coast',
    category: 'hotel',
    description: 'Collection of intimate boutique hotels located in picturesque coastal towns with personalized service and local charm.',
    imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '6',
    name: 'Adventure World Tours',
    rating: 4.9,
    reviewCount: 57,
    location: 'Global Destinations',
    category: 'tour',
    description: 'Specialized adventure tour operator offering immersive experiences in remote and exotic locations worldwide.',
    imageUrl: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default InstitutionsPage;