// src/pages/MaterialDetail.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  Calendar,
  Package,
  Weight,
  DollarSign,
  Shield,
  CheckCircle,
  Clock,
  Users,
  MessageCircle,
  Phone,
  Mail,
  Send,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  X,
  Award,
  FileText,
  Truck,
  Box,
  BadgeCheck,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Info,
  Tag,
  Building2,
  User,
  Verified,
  Sparkles
} from 'lucide-react';

const MaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isLiked, setIsLiked] = useState(false);
  const chatContainerRef = useRef(null);

  // Mock material data - In production, fetch from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockMaterial = {
        id: parseInt(id),
        title: "Clean PET Plastic Bottles - Grade A",
        category: "Plastic",
        subCategory: "PET",
        description: `Premium quality clear PET plastic bottles, thoroughly cleaned and sorted. These bottles are ideal for high-quality recycling processes and can be turned into new food-grade containers. The material has been processed to meet international recycling standards.

Key Features:
- Consistent quality with minimal contamination
- Clear PET (polyethylene terephthalate) material
- Suitable for food-grade recycling applications
- Sorted by color and size categories
- Free from labels, caps, and other contaminants

Applications:
- Manufacturing new PET containers
- Production of polyester fibers
- Food packaging industry
- Textile industry applications

Environmental Impact:
By recycling these PET bottles, we save approximately 1.5kg of CO2 emissions per kg of recycled material compared to virgin PET production. This helps reduce plastic pollution and supports the circular economy in Ethiopia.`,
        images: [
          { url: '🥤', alt: 'PET Bottles - Front view', label: 'Front View' },
          { url: '🧃', alt: 'PET Bottles - Sorted', label: 'Sorted Batch' },
          { url: '♻️', alt: 'PET Bottles - Recycling', label: 'Ready for Recycling' },
          { url: '📦', alt: 'PET Bottles - Packaging', label: 'Packaged' }
        ],
        specs: {
          purity: 'Grade A',
          packagingType: 'Baled (Compressed)',
          availability: 'Monthly Contract',
          quantity: 450,
          quantityUnit: 'kg',
          price: 2500,
          priceUnit: 'ETB',
          location: 'Addis Ababa, Bole Area',
          postedDate: '2024-01-15',
          expiryDate: '2024-02-15',
          minimumOrder: 100,
          maximumOrder: 1000,
          moistureContent: '< 5%',
          contamination: '< 0.5%',
          color: 'Clear/Transparent',
          dimensions: 'Compressed bales: 120x80x60 cm',
          weightPerBale: '45 kg',
          certificates: ['ISO 14001', 'REACH Compliant']
        },
        seller: {
          id: 1,
          name: 'Green Waste Solutions PLC',
          type: 'Business',
          avatar: '🏢',
          verified: true,
          joinDate: '2022-06-15',
          rating: 4.8,
          totalReviews: 156,
          totalListings: 28,
          responseTime: 'Within 2 hours',
          responseRate: 98,
          location: 'Addis Ababa, Ethiopia',
          phone: '+251 911 234 567',
          email: 'info@greenwaste.com',
          bio: 'Leading recycling company in Ethiopia specializing in plastic waste management. We have been serving the community for over 5 years with quality recycled materials.',
          badges: ['Top Seller', 'Eco Certified', 'Verified Business'],
          recentReviews: [
            {
              id: 1,
              user: 'አብይ ካሳ',
              rating: 5,
              comment: 'Excellent quality materials! Professional service.',
              date: '2024-01-10'
            },
            {
              id: 2,
              user: 'ሳራ አረጋ',
              rating: 4,
              comment: 'Good communication, delivered on time.',
              date: '2024-01-05'
            }
          ]
        },
        status: 'Available',
        views: 234,
        bids: 8,
        isFeatured: true,
        isVerified: true,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-16T14:20:00Z'
      };

      setMaterial(mockMaterial);
      
      // Initialize chat with welcome message
      setChatMessages([
        {
          id: 1,
          sender: 'seller',
          message: '👋 Welcome! How can I help you with this material?',
          timestamp: new Date().toISOString()
        }
      ]);
      
      setLoading(false);
    }, 800);
  }, [id]);

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Navigate to previous/next image
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? material.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === material.images.length - 1 ? 0 : prev + 1
    );
  };

  // Handle bid submission
  const handleBidSubmit = (e) => {
    e.preventDefault();
    // In production, send bid to API
    alert(`Bid submitted: ETB ${bidAmount}\nMessage: ${bidMessage || 'No message'}`);
    setShowBidModal(false);
    setBidAmount('');
    setBidMessage('');
  };

  // Handle chat message send
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim() === '') return;

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'buyer',
      message: chatMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');

    // Simulate seller response
    setTimeout(() => {
      const responses = [
        'Thanks for your interest! This material is still available.',
        'Yes, we can discuss bulk pricing. How much are you looking for?',
        'We can arrange delivery within Addis Ababa for an additional fee.',
        'Quality is consistent across all batches. We can provide samples.',
        'We accept payment through bank transfer or mobile money.',
        'Let me check our inventory and get back to you shortly.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'seller',
        message: randomResponse,
        timestamp: new Date().toISOString()
      }]);
    }, 1500);
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300 fill-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading material details...</p>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Material Not Found</h2>
          <p className="text-slate-500 mb-6">The material you're looking for doesn't exist.</p>
          <Link to="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Marketplace</span>
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-all"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-all">
                <Share2 className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-cyan-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-80">{material.images[currentImageIndex].url}</div>
                </div>
                
                {/* Image Labels */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm">
                  {material.images[currentImageIndex].label}
                </div>

                {/* Navigation Arrows */}
                {material.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Zoom Button */}
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-lg">
                    {material.status}
                  </span>
                  {material.isFeatured && (
                    <span className="px-3 py-1 bg-amber-500 text-white text-sm font-semibold rounded-lg shadow-lg">
                      ⭐ Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {material.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {material.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl transition-all flex-shrink-0 ${
                        currentImageIndex === index
                          ? 'ring-2 ring-emerald-500 bg-emerald-50'
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      {image.url}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Basic Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{material.title}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                      {material.category}
                    </span>
                    <span className="text-sm text-slate-500">•</span>
                    <span className="text-sm text-slate-500">{material.subCategory}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    ETB {material.specs.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500">Per {material.specs.quantityUnit}</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Weight className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-xs text-slate-500">Quantity</div>
                    <div className="font-semibold">{material.specs.quantity} {material.specs.quantityUnit}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-xs text-slate-500">Location</div>
                    <div className="font-semibold text-sm">{material.specs.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-xs text-slate-500">Posted</div>
                    <div className="font-semibold text-sm">
                      {new Date(material.specs.postedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-xs text-slate-500">Views</div>
                    <div className="font-semibold">{material.views}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-200">
                {['details', 'specifications', 'seller'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium capitalize transition-all ${
                      activeTab === tab
                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab === 'details' ? 'Description' : tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <div className="prose prose-slate max-w-none">
                      {material.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-slate-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-slate-800 mb-4">Technical Specifications</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Purity Level</span>
                          <span className="font-medium text-emerald-600">{material.specs.purity}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Packaging Type</span>
                          <span className="font-medium">{material.specs.packagingType}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Availability</span>
                          <span className="font-medium">{material.specs.availability}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Minimum Order</span>
                          <span className="font-medium">{material.specs.minimumOrder} {material.specs.quantityUnit}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Maximum Order</span>
                          <span className="font-medium">{material.specs.maximumOrder} {material.specs.quantityUnit}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Moisture Content</span>
                          <span className="font-medium">{material.specs.moistureContent}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Contamination Level</span>
                          <span className="font-medium">{material.specs.contamination}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Color</span>
                          <span className="font-medium">{material.specs.color}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Dimensions</span>
                          <span className="font-medium text-sm">{material.specs.dimensions}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Weight per Bale</span>
                          <span className="font-medium">{material.specs.weightPerBale}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Certificates */}
                    {material.specs.certificates && (
                      <div className="mt-6">
                        <h4 className="font-medium text-slate-700 mb-2">Certificates</h4>
                        <div className="flex flex-wrap gap-2">
                          {material.specs.certificates.map((cert, index) => (
                            <span key={index} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-lg border border-emerald-200">
                              ✅ {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'seller' && (
                  <div className="space-y-6">
                    {/* Seller Profile Widget */}
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center text-3xl flex-shrink-0">
                        {material.seller.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-800">{material.seller.name}</h3>
                          {material.seller.verified && (
                            <BadgeCheck className="w-5 h-5 text-emerald-600" />
                          )}
                          <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                            {material.seller.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                          <span>⭐ {material.seller.rating} ({material.seller.totalReviews} reviews)</span>
                          <span>•</span>
                          <span>📦 {material.seller.totalListings} listings</span>
                          <span>•</span>
                          <span>⏱️ {material.seller.responseTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-slate-600 text-sm">{material.seller.bio}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                        <div>
                          <div className="text-xs text-slate-500">Member Since</div>
                          <div className="font-medium text-sm">
                            {new Date(material.seller.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                        <div>
                          <div className="text-xs text-slate-500">Response Rate</div>
                          <div className="font-medium text-sm">{material.seller.responseRate}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Seller Badges */}
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        {material.seller.badges.map((badge, index) => (
                          <span key={index} className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-lg border border-amber-200 flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recent Reviews */}
                    <div>
                      <h4 className="font-medium text-slate-700 mb-3">Recent Reviews</h4>
                      <div className="space-y-3">
                        {material.seller.recentReviews.map((review) => (
                          <div key={review.id} className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{review.user}</span>
                                <div className="flex">{renderStars(review.rating)}</div>
                              </div>
                              <span className="text-xs text-slate-400">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Action Hub */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price & Action Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <div className="mb-4">
                <div className="text-sm text-slate-500">Price</div>
                <div className="text-3xl font-bold text-emerald-600">
                  ETB {material.specs.price.toLocaleString()}
                </div>
                <div className="text-sm text-slate-500">per {material.specs.quantityUnit}</div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Available Quantity</span>
                  <span className="font-semibold">{material.specs.quantity} {material.specs.quantityUnit}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Bids</span>
                  <span className="font-semibold">{material.bids}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="font-semibold text-emerald-600">{material.status}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25">
                  Direct Purchase
                </button>
                <button
                  onClick={() => setShowBidModal(true)}
                  className="w-full px-4 py-3 bg-white text-slate-700 rounded-xl font-semibold border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                >
                  Place a Bid
                </button>
              </div>

              {/* Contact & Chat Toggle */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  {isChatOpen ? 'Close Chat' : 'Chat with Seller'}
                </button>
              </div>

              <div className="flex gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm hover:bg-slate-100 transition-all">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm hover:bg-slate-100 transition-all">
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>
            </div>

            {/* Chat Box */}
            {isChatOpen && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg animate-slideUp">
                <div className="p-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                      {material.seller.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{material.seller.name}</div>
                      <div className="text-xs text-emerald-100">Online • {material.seller.responseTime}</div>
                    </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div 
                  ref={chatContainerRef}
                  className="h-64 overflow-y-auto p-4 space-y-3 bg-slate-50"
                >
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'seller' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-xl ${
                        msg.sender === 'seller'
                          ? 'bg-white text-slate-700 border border-slate-200'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        <div className="text-sm">{msg.message}</div>
                        <div className={`text-xs mt-1 ${
                          msg.sender === 'seller' ? 'text-slate-400' : 'text-emerald-100'
                        }`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="text-8xl opacity-90">
            {material.images[currentImageIndex].url}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {currentImageIndex + 1} / {material.images.length}
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-slideUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Place a Bid</h3>
              <button onClick={() => setShowBidModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <form onSubmit={handleBidSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Your Bid Amount (ETB)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter bid amount"
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    placeholder="Add a note for the seller..."
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25"
                >
                  Submit Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MaterialDetail;