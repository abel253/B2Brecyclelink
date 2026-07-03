// src/pages/Marketplace.jsx
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Star,
  MapPin,
  Package,
  Phone,
  MessageCircle,
  Eye,
  ChevronDown,
  Weight,
  DollarSign,
  Calendar,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  Building2,
  User,
  ThumbsUp
} from 'lucide-react';

const Marketplace = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [weightRange, setWeightRange] = useState({ min: 0, max: 10000 });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Mock materials data
  const materialsData = [
    {
      id: 1,
      title: "Clean PET Plastic Bottles",
      category: "Plastic",
      subCategory: "PET",
      weight: 450,
      weightUnit: "kg",
      price: 2500,
      location: "Addis Ababa",
      seller: "Green Waste Solutions",
      sellerType: "Business",
      sellerRating: 4.8,
      sellerImage: "🏢",
      totalReviews: 156,
      image: "🥤",
      description: "Sorted and cleaned PET plastic bottles. Ready for recycling. Consistent quality with minimal contamination.",
      postedDate: "2024-01-15",
      status: "Available",
      views: 234,
      bids: 8,
      isVerified: true,
      isFeatured: true,
      expiryDate: "2024-02-15"
    },
    {
      id: 2,
      title: "Mixed Cardboard & Paper",
      category: "Paper",
      subCategory: "Cardboard",
      weight: 1200,
      weightUnit: "kg",
      price: 3200,
      location: "Addis Ababa",
      seller: "EcoPaper Recyclers",
      sellerType: "Business",
      sellerRating: 4.6,
      sellerImage: "📦",
      totalReviews: 89,
      image: "📋",
      description: "Clean cardboard and mixed paper waste. Includes corrugated cardboard, office paper, and newspapers.",
      postedDate: "2024-01-14",
      status: "Available",
      views: 178,
      bids: 5,
      isVerified: true,
      isFeatured: false,
      expiryDate: "2024-02-14"
    },
    {
      id: 3,
      title: "Sorted Aluminum Cans",
      category: "Metal",
      subCategory: "Aluminum",
      weight: 300,
      weightUnit: "kg",
      price: 4500,
      location: "Addis Ababa",
      seller: "MetalCycle Ethiopia",
      sellerType: "Business",
      sellerRating: 4.9,
      sellerImage: "🔩",
      totalReviews: 203,
      image: "🥫",
      description: "Clean and compressed aluminum beverage cans. High quality, sorted by color. Perfect for smelting.",
      postedDate: "2024-01-13",
      status: "Available",
      views: 312,
      bids: 12,
      isVerified: true,
      isFeatured: true,
      expiryDate: "2024-02-13"
    },
    {
      id: 4,
      title: "Mixed E-Waste Components",
      category: "E-Waste",
      subCategory: "Mixed",
      weight: 150,
      weightUnit: "kg",
      price: 1800,
      location: "Nazret",
      seller: "TechRecycle Hub",
      sellerType: "Individual",
      sellerRating: 4.7,
      sellerImage: "👤",
      totalReviews: 67,
      image: "💻",
      description: "Various electronic components including circuit boards, wires, and small devices. Pre-sorted for processing.",
      postedDate: "2024-01-12",
      status: "Available",
      views: 145,
      bids: 3,
      isVerified: false,
      isFeatured: false,
      expiryDate: "2024-02-12"
    },
    {
      id: 5,
      title: "Glass Bottles - Clear & Green",
      category: "Glass",
      subCategory: "Bottles",
      weight: 800,
      weightUnit: "kg",
      price: 2800,
      location: "Hawassa",
      seller: "GlassCycle Industries",
      sellerType: "Business",
      sellerRating: 4.5,
      sellerImage: "🏢",
      totalReviews: 112,
      image: "🍾",
      description: "Mixed clear and green glass bottles. Sorted by color, washed and ready for recycling.",
      postedDate: "2024-01-11",
      status: "Pending",
      views: 198,
      bids: 6,
      isVerified: true,
      isFeatured: false,
      expiryDate: "2024-02-11"
    },
    {
      id: 6,
      title: "HDPE Plastic Containers",
      category: "Plastic",
      subCategory: "HDPE",
      weight: 600,
      weightUnit: "kg",
      price: 3800,
      location: "Addis Ababa",
      seller: "PlasticRecycle Co.",
      sellerType: "Business",
      sellerRating: 4.9,
      sellerImage: "🏢",
      totalReviews: 178,
      image: "🧴",
      description: "High-density polyethylene containers and bottles. Clean and sorted by type.",
      postedDate: "2024-01-10",
      status: "Available",
      views: 267,
      bids: 9,
      isVerified: true,
      isFeatured: true,
      expiryDate: "2024-02-10"
    },
    {
      id: 7,
      title: "Iron & Steel Scrap",
      category: "Metal",
      subCategory: "Ferrous",
      weight: 2500,
      weightUnit: "kg",
      price: 6500,
      location: "Addis Ababa",
      seller: "SteelRecycle Plus",
      sellerType: "Business",
      sellerRating: 4.4,
      sellerImage: "🏢",
      totalReviews: 145,
      image: "🔧",
      description: "Mixed iron and steel scrap. Includes construction waste, pipes, and structural steel.",
      postedDate: "2024-01-09",
      status: "Available",
      views: 189,
      bids: 4,
      isVerified: false,
      isFeatured: false,
      expiryDate: "2024-02-09"
    },
    {
      id: 8,
      title: "Office Paper - Sorted",
      category: "Paper",
      subCategory: "Office",
      weight: 350,
      weightUnit: "kg",
      price: 2200,
      location: "Hawassa",
      seller: "PaperRecycle Ethiopia",
      sellerType: "Business",
      sellerRating: 4.7,
      sellerImage: "🏢",
      totalReviews: 92,
      image: "📄",
      description: "Clean white office paper, sorted and free from contaminants. Ideal for recycling.",
      postedDate: "2024-01-08",
      status: "Available",
      views: 156,
      bids: 7,
      isVerified: true,
      isFeatured: false,
      expiryDate: "2024-02-08"
    },
    {
      id: 9,
      title: "PVC Plastic Pipes",
      category: "Plastic",
      subCategory: "PVC",
      weight: 950,
      weightUnit: "kg",
      price: 4200,
      location: "Nazret",
      seller: "PipeRecycle Ltd",
      sellerType: "Business",
      sellerRating: 4.3,
      sellerImage: "🏢",
      totalReviews: 78,
      image: "🔴",
      description: "Clean PVC pipes from construction sites. Sorted and cut to manageable sizes.",
      postedDate: "2024-01-07",
      status: "Available",
      views: 134,
      bids: 2,
      isVerified: false,
      isFeatured: false,
      expiryDate: "2024-02-07"
    },
    {
      id: 10,
      title: "Copper Wire Scrap",
      category: "Metal",
      subCategory: "Copper",
      weight: 100,
      weightUnit: "kg",
      price: 8500,
      location: "Addis Ababa",
      seller: "CopperRecycle Co.",
      sellerType: "Business",
      sellerRating: 4.9,
      sellerImage: "🏢",
      totalReviews: 234,
      image: "⚡",
      description: "Clean copper wire scrap, stripped and sorted. Premium quality for smelting.",
      postedDate: "2024-01-06",
      status: "Available",
      views: 423,
      bids: 15,
      isVerified: true,
      isFeatured: true,
      expiryDate: "2024-02-06"
    }
  ];

  // Extract unique categories and locations
  const categories = useMemo(() => {
    const unique = [...new Set(materialsData.map(item => item.category))];
    return ['all', ...unique];
  }, []);

  const locations = useMemo(() => {
    const unique = [...new Set(materialsData.map(item => item.location))];
    return ['all', ...unique];
  }, []);

  // Filter and search logic
  const filteredMaterials = useMemo(() => {
    return materialsData
      .filter(item => {
        // Search filter
        const searchMatch = searchTerm === '' || 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;

        // Location filter
        const locationMatch = selectedLocation === 'all' || item.location === selectedLocation;

        // Weight filter
        const weightMatch = item.weight >= weightRange.min && item.weight <= weightRange.max;

        // Price filter
        const priceMatch = item.price >= priceRange.min && item.price <= priceRange.max;

        return searchMatch && categoryMatch && locationMatch && weightMatch && priceMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.postedDate) - new Date(a.postedDate);
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.sellerRating - a.sellerRating;
          case 'weight-high':
            return b.weight - a.weight;
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedCategory, selectedLocation, weightRange, priceRange, sortBy]);

  // Stats
  const stats = useMemo(() => ({
    total: materialsData.length,
    available: materialsData.filter(m => m.status === 'Available').length,
    categories: categories.length - 1,
    locations: locations.length - 1
  }), []);

  // Render stars for rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-3.5 h-3.5 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300 fill-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Stats */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Marketplace</h1>
              <p className="text-sm text-slate-500">Buy and sell recyclable materials</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">{stats.total}</span>
                  <span className="text-slate-500">Listings</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">{stats.available}</span>
                  <span className="text-slate-500">Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">{stats.categories}</span>
                  <span className="text-slate-500">Categories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search materials by name, category, or seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>

            {/* Filter Toggle & Sort */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                  showFilters 
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
                {showFilters && <X className="w-4 h-4" />}
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="weight-high">Most Quantity</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition-all"
              >
                {viewMode === 'grid' ? '☰' : '⊞'}
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-slideDown">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {category === 'all' ? 'All' : category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(location)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedLocation === location
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {location === 'all' ? 'All Cities' : location}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight Range */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Weight Range: {weightRange.min}kg - {weightRange.max}kg
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={weightRange.min}
                      onChange={(e) => setWeightRange({ ...weightRange, min: parseInt(e.target.value) })}
                      className="w-full accent-emerald-600"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={weightRange.max}
                      onChange={(e) => setWeightRange({ ...weightRange, max: parseInt(e.target.value) })}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0 kg</span>
                    <span>10,000 kg</span>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Price Range: ETB {priceRange.min} - ETB {priceRange.max}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                      className="w-full accent-emerald-600"
                    />
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>ETB 0</span>
                    <span>ETB 50,000</span>
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setWeightRange({ min: 0, max: 10000 });
                    setPriceRange({ min: 0, max: 50000 });
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filteredMaterials.length}</span> of{' '}
            <span className="font-semibold text-slate-700">{materialsData.length}</span> listings
          </p>
          {filteredMaterials.length === 0 && (
            <p className="text-sm text-slate-500">No results found. Try adjusting your filters.</p>
          )}
        </div>
      </div>

      {/* Material Grid/List */}
      <div className="container mx-auto px-4 pb-20">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header - Image/Icon */}
                <div className="relative h-40 bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center">
                  <div className="text-6xl">{material.image}</div>
                  {material.isFeatured && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-lg">
                      Featured
                    </div>
                  )}
                  {material.status === 'Pending' && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-lg">
                      Pending
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-slate-700">
                    <Package className="w-3 h-3" />
                    {material.weight} {material.weightUnit}
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-emerald-700">
                    <Eye className="w-3 h-3" />
                    {material.views}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">
                        {material.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                          {material.category}
                        </span>
                        <span className="text-xs text-slate-400">{material.subCategory}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-sm">
                      {material.sellerImage}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">{material.seller}</p>
                      <div className="flex items-center gap-1">
                        {renderStars(material.sellerRating)}
                        <span className="text-xs text-slate-500">({material.totalReviews})</span>
                      </div>
                    </div>
                    {material.isVerified && (
                      <Shield className="w-3 h-3 text-emerald-600" />
                    )}
                  </div>

                  {/* Location & Price */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" />
                      {material.location}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600">
                        ETB {material.price.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-end gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {new Date(material.postedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                    <Link
                      to={`/marketplace/${material.id}`}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    <button
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="group bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center text-3xl flex-shrink-0">
                      {material.image}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800 truncate">
                          {material.title}
                        </h3>
                        {material.isFeatured && (
                          <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-lg flex-shrink-0">
                            Featured
                          </span>
                        )}
                        {material.isVerified && (
                          <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                          {material.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {material.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Weight className="w-3 h-3" />
                          {material.weight} {material.weightUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 lg:gap-8 w-full lg:w-auto">
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-bold text-emerald-600">
                          ETB {material.price.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(material.sellerRating)}
                          <span className="text-xs text-slate-500">
                            ({material.totalReviews})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/marketplace/${material.id}`}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-all"
                      >
                        View
                      </Link>
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No materials found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Marketplace;