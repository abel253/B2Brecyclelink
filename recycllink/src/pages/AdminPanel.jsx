// src/pages/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Users, FileCheck, AlertTriangle, CheckCircle, XCircle,
  Clock, Search, Filter, MapPin, Eye, Edit, Trash2, Ban,
  UserCheck, UserX, MessageCircle, Phone, Mail, Flag, Scale,
  FileText, ThumbsUp, ThumbsDown, MoreVertical, Download,
  RefreshCw, AlertCircle, Info, ChevronDown, ArrowUp, ArrowDown,
  Star, Calendar, Building2, User, BadgeCheck, ShieldCheck,
  Lock, Unlock, Send, Reply, Check, X, FileSpreadsheet,
  Activity, TrendingUp, PieChart, BarChart3, Package
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('verification');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeResponse, setDisputeResponse] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock verification queue data
  const verificationQueue = [
    {
      id: 1,
      seller: 'TechRecycle Hub',
      sellerType: 'Individual',
      sellerAvatar: '👤',
      material: 'Mixed E-Waste Components',
      category: 'E-Waste',
      weight: '150 kg',
      price: 'ETB 1,800',
      location: 'Nazret',
      submittedDate: '2024-01-16T10:30:00Z',
      status: 'pending',
      images: ['💻', '🔌', '📱'],
      description: 'Mixed electronic waste including circuit boards, wires, and small devices. Pre-sorted for processing.',
      quality: 'Grade B',
      packaging: 'Loose',
      notes: 'Please verify the sorting quality and material composition.',
      priority: 'high'
    },
    {
      id: 2,
      seller: 'GlassCycle Industries',
      sellerType: 'Business',
      sellerAvatar: '🏢',
      material: 'Glass Bottles - Clear & Green',
      category: 'Glass',
      weight: '800 kg',
      price: 'ETB 2,800',
      location: 'Hawassa',
      submittedDate: '2024-01-15T14:20:00Z',
      status: 'pending',
      images: ['🍾', '🥃', '🧪'],
      description: 'Mixed clear and green glass bottles. Sorted by color, washed and ready for recycling.',
      quality: 'Grade A',
      packaging: 'Baled (Compressed)',
      notes: 'High quality material, well sorted.',
      priority: 'medium'
    },
    {
      id: 3,
      seller: 'PaperRecycle Ethiopia',
      sellerType: 'Business',
      sellerAvatar: '🏢',
      material: 'Office Paper - Sorted',
      category: 'Paper',
      weight: '350 kg',
      price: 'ETB 2,200',
      location: 'Hawassa',
      submittedDate: '2024-01-15T09:15:00Z',
      status: 'pending',
      images: ['📄', '📋', '📰'],
      description: 'Clean white office paper, sorted and free from contaminants. Ideal for recycling.',
      quality: 'Grade A',
      packaging: 'Baled (Compressed)',
      notes: 'Excellent quality paper. Ready for processing.',
      priority: 'low'
    },
    {
      id: 4,
      seller: 'CopperRecycle Co.',
      sellerType: 'Business',
      sellerAvatar: '🏢',
      material: 'Copper Wire Scrap',
      category: 'Metal',
      weight: '100 kg',
      price: 'ETB 8,500',
      location: 'Addis Ababa',
      submittedDate: '2024-01-16T11:45:00Z',
      status: 'reviewed',
      images: ['⚡', '🔌', '🔧'],
      description: 'Clean copper wire scrap, stripped and sorted. Premium quality for smelting.',
      quality: 'Grade A',
      packaging: 'Baled (Compressed)',
      notes: 'Approved by quality control team.',
      priority: 'high'
    }
  ];

  // Mock user management data
  const users = [
    {
      id: 1,
      name: 'Abebe Kebede',
      email: 'abebe@example.com',
      phone: '+251 911 234 567',
      role: 'seller',
      type: 'Individual',
      avatar: '👤',
      verified: true,
      status: 'active',
      joinDate: '2023-06-15',
      listings: 12,
      rating: 4.8,
      totalReviews: 156,
      location: 'Addis Ababa',
      reportedCount: 0,
      warnings: 0
    },
    {
      id: 2,
      name: 'Green Waste Solutions PLC',
      email: 'info@greenwaste.com',
      phone: '+251 911 234 567',
      role: 'seller',
      type: 'Business',
      avatar: '🏢',
      verified: true,
      status: 'active',
      joinDate: '2022-06-15',
      listings: 28,
      rating: 4.9,
      totalReviews: 234,
      location: 'Addis Ababa',
      reportedCount: 0,
      warnings: 0
    },
    {
      id: 3,
      name: 'Sara Aregawi',
      email: 'sara@example.com',
      phone: '+251 922 345 678',
      role: 'buyer',
      type: 'Individual',
      avatar: '👩',
      verified: false,
      status: 'active',
      joinDate: '2023-08-20',
      listings: 0,
      rating: 0,
      totalReviews: 0,
      location: 'Addis Ababa',
      reportedCount: 1,
      warnings: 0
    },
    {
      id: 4,
      name: 'MetalCycle Ethiopia',
      email: 'metalcycle@example.com',
      phone: '+251 933 456 789',
      role: 'seller',
      type: 'Business',
      avatar: '🏢',
      verified: false,
      status: 'suspended',
      joinDate: '2023-10-01',
      listings: 15,
      rating: 3.2,
      totalReviews: 45,
      location: 'Addis Ababa',
      reportedCount: 3,
      warnings: 2
    },
    {
      id: 5,
      name: 'Tigist Hailu',
      email: 'tigist@example.com',
      phone: '+251 944 567 890',
      role: 'buyer',
      type: 'Individual',
      avatar: '👩',
      verified: true,
      status: 'active',
      joinDate: '2023-12-01',
      listings: 0,
      rating: 4.5,
      totalReviews: 12,
      location: 'Hawassa',
      reportedCount: 0,
      warnings: 0
    }
  ];

  // Mock disputes data
  const disputes = [
    {
      id: 1,
      orderId: 'ORD-2024-001',
      material: 'PET Plastic Bottles',
      buyer: {
        name: 'Sara Aregawi',
        avatar: '👩',
        id: 3
      },
      seller: {
        name: 'Green Waste Solutions PLC',
        avatar: '🏢',
        id: 2
      },
      amount: 'ETB 2,500',
      quantity: '450 kg',
      filedDate: '2024-01-14T08:30:00Z',
      status: 'open',
      priority: 'high',
      issue: 'Quality Discrepancy',
      description: 'The delivered PET bottles do not match the quality specification. The material has higher contamination than stated.',
      evidence: ['Photo_1.jpg', 'Photo_2.jpg', 'Quality_Report.pdf'],
      messages: [
        {
          id: 1,
          sender: 'buyer',
          name: 'Sara Aregawi',
          message: 'The delivered material has significant contamination. This is not Grade A as advertised.',
          timestamp: '2024-01-14T08:30:00Z'
        },
        {
          id: 2,
          sender: 'seller',
          name: 'Green Waste Solutions PLC',
          message: 'We disagree with this claim. Our quality control team verified the material before shipping.',
          timestamp: '2024-01-14T10:15:00Z'
        },
        {
          id: 3,
          sender: 'admin',
          name: 'Admin Team',
          message: 'We are reviewing the case. Please provide additional evidence if available.',
          timestamp: '2024-01-14T14:00:00Z'
        }
      ],
      resolution: null
    },
    {
      id: 2,
      orderId: 'ORD-2024-002',
      material: 'Aluminum Cans',
      buyer: {
        name: 'Abebe Kebede',
        avatar: '👤',
        id: 1
      },
      seller: {
        name: 'MetalCycle Ethiopia',
        avatar: '🏢',
        id: 4
      },
      amount: 'ETB 4,500',
      quantity: '300 kg',
      filedDate: '2024-01-12T16:45:00Z',
      status: 'in-progress',
      priority: 'medium',
      issue: 'Delivery Delay',
      description: 'The material was delivered 5 days late, causing production delays. We are requesting compensation.',
      evidence: ['Delivery_Confirmation.pdf', 'Communication_Log.txt'],
      messages: [
        {
          id: 1,
          sender: 'buyer',
          name: 'Abebe Kebede',
          message: 'The delivery was significantly delayed. This has affected our production schedule.',
          timestamp: '2024-01-12T16:45:00Z'
        },
        {
          id: 2,
          sender: 'seller',
          name: 'MetalCycle Ethiopia',
          message: 'We apologize for the delay. The issue was caused by transportation problems beyond our control.',
          timestamp: '2024-01-13T09:30:00Z'
        },
        {
          id: 3,
          sender: 'admin',
          name: 'Admin Team',
          message: 'We are investigating the circumstances of the delay. Please provide any supporting documentation.',
          timestamp: '2024-01-13T11:00:00Z'
        },
        {
          id: 4,
          sender: 'seller',
          name: 'MetalCycle Ethiopia',
          message: 'We have provided all relevant documents. The delay was unavoidable due to road conditions.',
          timestamp: '2024-01-13T14:20:00Z'
        }
      ],
      resolution: null
    },
    {
      id: 3,
      orderId: 'ORD-2024-003',
      material: 'HDPE Plastic Containers',
      buyer: {
        name: 'Tigist Hailu',
        avatar: '👩',
        id: 5
      },
      seller: {
        name: 'PlasticRecycle Co.',
        avatar: '🏢',
        id: 6
      },
      amount: 'ETB 3,800',
      quantity: '600 kg',
      filedDate: '2024-01-10T13:20:00Z',
      status: 'resolved',
      priority: 'low',
      issue: 'Quantity Discrepancy',
      description: 'The received quantity was 50 kg less than ordered. Requesting partial refund.',
      evidence: ['Weighing_Receipt.jpg', 'Delivery_Note.pdf'],
      messages: [
        {
          id: 1,
          sender: 'buyer',
          name: 'Tigist Hailu',
          message: 'The delivered quantity is short by 50 kg from what was ordered.',
          timestamp: '2024-01-10T13:20:00Z'
        },
        {
          id: 2,
          sender: 'seller',
          name: 'PlasticRecycle Co.',
          message: 'We apologize for the error. We will refund the difference.',
          timestamp: '2024-01-10T15:00:00Z'
        },
        {
          id: 3,
          sender: 'admin',
          name: 'Admin Team',
          message: 'Resolution reached: Seller will refund ETB 300 for the missing quantity.',
          timestamp: '2024-01-11T10:00:00Z'
        }
      ],
      resolution: 'Partial refund of ETB 300 issued to buyer.'
    }
  ];

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700';
      case 'approved':
        return 'bg-emerald-100 text-emerald-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'active':
        return 'bg-emerald-100 text-emerald-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      case 'open':
        return 'bg-red-100 text-red-700';
      case 'in-progress':
        return 'bg-amber-100 text-amber-700';
      case 'resolved':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <Eye className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'active':
        return <UserCheck className="w-4 h-4" />;
      case 'suspended':
        return <UserX className="w-4 h-4" />;
      case 'open':
      case 'in-progress':
        return <AlertTriangle className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  // Handle verification action
  const handleVerification = (itemId, action) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Material ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
      // In production, send API request
    }, 1000);
  };

  // Handle user action
  const handleUserAction = (userId, action) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`User ${action === 'verify' ? 'verified' : action === 'block' ? 'blocked' : 'unblocked'} successfully!`);
      // In production, send API request
    }, 1000);
  };

  // Handle dispute resolution
  const handleDisputeResolution = (disputeId, action) => {
    if (action === 'resolve' && !disputeResponse) {
      alert('Please provide a resolution message.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowDisputeModal(false);
      setDisputeResponse('');
      alert(`Dispute ${action === 'resolve' ? 'resolved' : 'escalated'} successfully!`);
      // In production, send API request
    }, 1000);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Time ago function
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60 / 60);
    if (diff < 1) return 'Just now';
    if (diff < 24) return `${diff}h ago`;
    if (diff < 168) return `${Math.floor(diff / 24)}d ago`;
    return formatDate(dateString);
  };

  // Filter and search
  const filteredVerification = verificationQueue.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.seller.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredDisputes = disputes.filter(dispute => {
    const matchesStatus = filterStatus === 'all' || dispute.status === filterStatus;
    const matchesSearch = dispute.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Stats
  const stats = {
    pendingVerifications: verificationQueue.filter(v => v.status === 'pending').length,
    activeUsers: users.filter(u => u.status === 'active').length,
    openDisputes: disputes.filter(d => d.status === 'open' || d.status === 'in-progress').length,
    totalUsers: users.length,
    totalDisputes: disputes.length,
    approvedMaterials: verificationQueue.filter(v => v.status === 'approved').length,
    rejectedMaterials: verificationQueue.filter(v => v.status === 'rejected').length,
    suspendedUsers: users.filter(u => u.status === 'suspended').length
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-emerald-100 mt-1">Manage platform verification, users, and disputes</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-sm font-medium flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-100 text-sm">Pending Verifications</div>
              <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-100 text-sm">Active Users</div>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-100 text-sm">Open Disputes</div>
              <div className="text-2xl font-bold">{stats.openDisputes}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-100 text-sm">Total Users</div>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 mb-6">
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'verification', label: 'Verification Queue', icon: FileCheck },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'disputes', label: 'Dispute Resolution', icon: Scale },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'verification' && stats.pendingVerifications > 0 && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {stats.pendingVerifications}
                  </span>
                )}
                {tab.id === 'disputes' && stats.openDisputes > 0 && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-red-100 text-red-700'
                  }`}>
                    {stats.openDisputes}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            >
              <option value="all">All Status</option>
              {activeTab === 'verification' && (
                <>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </>
              )}
              {activeTab === 'users' && (
                <>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </>
              )}
              {activeTab === 'disputes' && (
                <>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </>
              )}
            </select>
            {(searchTerm || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
                className="px-4 py-2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Verification Queue Tab */}
        {activeTab === 'verification' && (
          <div className="space-y-4">
            {filteredVerification.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-800">No pending verifications</h3>
                <p className="text-slate-500">All materials have been reviewed</p>
              </div>
            ) : (
              filteredVerification.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Material Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{item.images[0]}</div>
                          <div>
                            <h3 className="font-semibold text-slate-800">{item.material}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <span>{item.category}</span>
                              <span>•</span>
                              <span>{item.weight}</span>
                              <span>•</span>
                              <span className="font-medium text-emerald-600">{item.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} flex items-center gap-1`}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </span>
                          {item.priority === 'high' && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              High Priority
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <User className="w-4 h-4 text-slate-400" />
                          {item.seller} ({item.sellerType})
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <span>📍</span>
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <FileText className="w-4 h-4 text-slate-400" />
                          Quality: {item.quality}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Package className="w-4 h-4 text-slate-400" />
                          Packaging: {item.packaging}
                        </div>
                      </div>

                      <div className="mt-2 p-3 bg-slate-50 rounded-xl text-sm text-slate-600">
                        {item.description}
                      </div>
                      {item.notes && (
                        <div className="mt-2 p-2 bg-amber-50 rounded-lg text-sm text-amber-700 border border-amber-200">
                          <Info className="w-4 h-4 inline mr-1" />
                          Note: {item.notes}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row md:flex-col gap-2">
                      <button
                        onClick={() => handleVerification(item.id, 'approve')}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleVerification(item.id, 'reject')}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowDetailModal(true);
                        }}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Submitted: {timeAgo(item.submittedDate)}</span>
                    <span>Images: {item.images.length}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Listings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center text-xl">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-slate-800">{user.name}</span>
                              {user.verified && <BadgeCheck className="w-4 h-4 text-emerald-600" />}
                            </div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'seller' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {user.role}
                        </span>
                        <div className="text-xs text-slate-400 mt-0.5">{user.type}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(user.status)}
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{user.listings}</td>
                      <td className="px-6 py-4">
                        {user.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{user.rating}</span>
                            <span className="text-xs text-slate-400">({user.totalReviews})</span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">No reviews</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {!user.verified && (
                            <button
                              onClick={() => handleUserAction(user.id, 'verify')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Verify User"
                            >
                              <ShieldCheck className="w-4 h-4" />
                            </button>
                          )}
                          {user.status === 'active' ? (
                            <button
                              onClick={() => handleUserAction(user.id, 'block')}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Block User"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction(user.id, 'unblock')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Unblock User"
                            >
                              <Unlock className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedItem(user);
                              setShowDetailModal(true);
                            }}
                            className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {user.reportedCount > 0 && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              {user.reportedCount} reports
                            </span>
                          )}
                          {user.warnings > 0 && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                              {user.warnings} warnings
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Dispute Resolution Tab */}
        {activeTab === 'disputes' && (
          <div className="space-y-4">
            {filteredDisputes.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Scale className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-800">No disputes</h3>
                <p className="text-slate-500">All disputes have been resolved</p>
              </div>
            ) : (
              filteredDisputes.map((dispute) => (
                <div key={dispute.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-800">{dispute.material}</h3>
                            <span className="text-xs text-slate-400">#{dispute.orderId}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" />
                              {dispute.buyer.name}
                              <span className="text-xs text-slate-400">(Buyer)</span>
                            </span>
                            <span className="text-slate-300">vs</span>
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-400" />
                              {dispute.seller.name}
                              <span className="text-xs text-slate-400">(Seller)</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)} flex items-center gap-1`}>
                            {getStatusIcon(dispute.status)}
                            {dispute.status}
                          </span>
                          {dispute.priority === 'high' && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">High</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div className="text-slate-600">
                          <span className="text-slate-400">Amount:</span> {dispute.amount}
                        </div>
                        <div className="text-slate-600">
                          <span className="text-slate-400">Quantity:</span> {dispute.quantity}
                        </div>
                        <div className="text-slate-600">
                          <span className="text-slate-400">Issue:</span> {dispute.issue}
                        </div>
                        <div className="text-slate-600">
                          <span className="text-slate-400">Filed:</span> {timeAgo(dispute.filedDate)}
                        </div>
                      </div>

                      <div className="mt-2 p-3 bg-slate-50 rounded-xl text-sm text-slate-600">
                        {dispute.description}
                      </div>

                      {dispute.resolution && (
                        <div className="mt-2 p-2 bg-emerald-50 rounded-lg text-sm text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Resolution: {dispute.resolution}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2">
                      <button
                        onClick={() => {
                          setSelectedItem(dispute);
                          setShowDisputeModal(true);
                        }}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 flex items-center gap-2"
                      >
                        <Scale className="w-4 h-4" />
                        Resolve Dispute
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(dispute);
                          setShowDetailModal(true);
                        }}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        View Messages ({dispute.messages.length})
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">Details</h3>
                <button onClick={() => setShowDetailModal(false)}>
                  <X className="w-6 h-6 text-slate-400 hover:text-slate-600" />
                </button>
              </div>
              <pre className="bg-slate-50 p-4 rounded-xl text-sm overflow-auto">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dispute Resolution Modal */}
        {showDisputeModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">Resolve Dispute</h3>
                <button onClick={() => setShowDisputeModal(false)}>
                  <X className="w-6 h-6 text-slate-400 hover:text-slate-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-medium text-slate-800 mb-2">Dispute Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-slate-500">Order:</span> {selectedItem.orderId}</p>
                    <p><span className="text-slate-500">Material:</span> {selectedItem.material}</p>
                    <p><span className="text-slate-500">Issue:</span> {selectedItem.issue}</p>
                    <p><span className="text-slate-500">Buyer:</span> {selectedItem.buyer.name}</p>
                    <p><span className="text-slate-500">Seller:</span> {selectedItem.seller.name}</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h4 className="font-medium text-amber-800 mb-2">Messages</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedItem.messages.map((msg) => (
                      <div key={msg.id} className={`p-2 rounded-lg ${
                        msg.sender === 'admin' ? 'bg-amber-100' :
                        msg.sender === 'buyer' ? 'bg-blue-50' : 'bg-emerald-50'
                      }`}>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-medium">{msg.name}</span>
                          <span className="text-slate-400">{timeAgo(msg.timestamp)}</span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Resolution Message
                  </label>
                  <textarea
                    rows={4}
                    value={disputeResponse}
                    onChange={(e) => setDisputeResponse(e.target.value)}
                    placeholder="Enter resolution details..."
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setShowDisputeModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDisputeResolution(selectedItem.id, 'escalate')}
                    className="px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all"
                  >
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    Escalate
                  </button>
                  <button
                    onClick={() => handleDisputeResolution(selectedItem.id, 'resolve')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25"
                  >
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Resolve Dispute
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;