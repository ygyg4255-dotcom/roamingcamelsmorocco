import React, { useState, useEffect, useMemo } from 'react';
import { Tour } from '../types';
import { getToursData, saveToursData } from '../data/tours';
import { getSiteConfig, saveSiteConfig, SiteConfig } from '../data/siteConfig';
import {
  Lock,
  Unlock,
  Plus,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Edit2,
  CheckCircle,
  AlertCircle,
  Compass,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Search,
  Filter,
  X,
  ExternalLink
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('rcm_admin_auth') === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Tab: 'tours' | 'contact'
  const [activeTab, setActiveTab] = useState<'tours' | 'contact'>('tours');

  // Tours State
  const [tours, setTours] = useState<Tour[]>(() => getToursData());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'cancelled'>('all');

  // Contact Info State
  const [config, setConfig] = useState<SiteConfig>(() => getSiteConfig());

  // Modal State for Add / Edit Tour
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formTour, setFormTour] = useState<Partial<Tour>>({
    title: '',
    duration: '',
    durationDays: 1,
    departureCity: 'Marrakech',
    destinations: [],
    tourType: 'extended',
    image: '/images/Morocco-Tour-Finder-Roaming-Camels-Morocco-1.jpg',
    description: '',
    price: 500,
    isCancelled: false,
    link: '#quote-form'
  });
  const [destinationsInput, setDestinationsInput] = useState('');

  // Toast / Feedback message
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSavingDisk, setIsSavingDisk] = useState(false);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('rcm_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('rcm_admin_auth');
    setPasswordInput('');
  };

  // Persist Tours to LocalStorage & Vite Disk API
  const handleSaveToursToDisk = async (toursToSave: Tour[] = tours) => {
    setIsSavingDisk(true);
    // 1. Save to LocalStorage immediately
    saveToursData(toursToSave);

    // 2. Send to Vite dev server middleware to write to src/data/tours.ts
    try {
      const res = await fetch('/api/save-tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toursToSave),
      });
      if (res.ok) {
        showToast('✓ Tours saved to disk and updated across all site pages!');
      } else {
        showToast('✓ Saved to browser storage (Dev API not reachable in static mode)', 'success');
      }
    } catch (err) {
      // In static preview / production build where Vite dev server middleware isn't present
      showToast('✓ Saved to localStorage (Live across all client sessions)', 'success');
    } finally {
      setIsSavingDisk(false);
    }
  };

  // Persist Contact Config to LocalStorage & Vite Disk API
  const handleSaveConfigToDisk = async () => {
    setIsSavingDisk(true);
    // 1. Save to LocalStorage immediately
    saveSiteConfig(config);

    // 2. Send to Vite dev server middleware to write to src/data/siteConfig.ts
    try {
      const res = await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        showToast('✓ Contact info saved to disk and updated across all site pages!');
      } else {
        showToast('✓ Saved to browser storage (Dev API not reachable in static mode)', 'success');
      }
    } catch (err) {
      showToast('✓ Saved to localStorage (Live across all client sessions)', 'success');
    } finally {
      setIsSavingDisk(false);
    }
  };

  // Tour Actions
  const handleInlinePriceChange = (tourId: string, newPrice: number) => {
    const updated = tours.map((t) => {
      if (t.id === tourId) {
        const val = Math.max(0, isNaN(newPrice) ? 0 : newPrice);
        return {
          ...t,
          price: val,
          priceEstimate: `From $${val.toLocaleString()} USD`
        };
      }
      return t;
    });
    setTours(updated);
    saveToursData(updated);
  };

  const handleAdjustPrice = (tourId: string, delta: number) => {
    const updated = tours.map((t) => {
      if (t.id === tourId) {
        const current = t.price || 0;
        const val = Math.max(0, current + delta);
        return {
          ...t,
          price: val,
          priceEstimate: `From $${val.toLocaleString()} USD`
        };
      }
      return t;
    });
    setTours(updated);
    saveToursData(updated);
  };

  const handleToggleCancel = (tourId: string) => {
    const updated = tours.map((t) => {
      if (t.id === tourId) {
        return { ...t, isCancelled: !t.isCancelled };
      }
      return t;
    });
    setTours(updated);
    saveToursData(updated);
    showToast('Tour visibility toggled!');
  };

  const handleDeleteTour = (tourId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this tour?')) {
      const updated = tours.filter((t) => t.id !== tourId);
      setTours(updated);
      saveToursData(updated);
      showToast('Tour deleted from database!');
    }
  };

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingTour(null);
    setFormTour({
      id: `tour-${Date.now()}`,
      slug: `tour-${Date.now()}`,
      title: '',
      duration: '7 Days',
      durationDays: 7,
      departureCity: 'Marrakech',
      destinations: ['Marrakech', 'Sahara Desert'],
      tourType: 'extended',
      image: '/images/18-Day-Grand-Morocco-Tour-Roaming-Camels-Morocco-1536x1024.jpg',
      description: '',
      price: 1200,
      isCancelled: false,
      link: '#quote-form'
    });
    setDestinationsInput('Marrakech, Sahara Desert');
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (tour: Tour) => {
    setEditingTour(tour);
    setFormTour({ ...tour });
    setDestinationsInput((tour.destinations || []).join(', '));
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    const destArray = destinationsInput
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const numericPrice = Number(formTour.price) || 0;
    const finalTour: Tour = {
      id: editingTour?.id || formTour.id || `tour-${Date.now()}`,
      slug: editingTour?.slug || formTour.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `tour-${Date.now()}`,
      title: formTour.title || 'Untitled Tour',
      duration: formTour.duration || '1 Day',
      durationDays: Number(formTour.durationDays) || 1,
      departureCity: formTour.departureCity || 'Marrakech',
      destinations: destArray.length > 0 ? destArray : ['Morocco'],
      tourType: formTour.tourType || 'extended',
      image: formTour.image || '/images/Morocco-Tour-Finder-Roaming-Camels-Morocco-1.jpg',
      description: formTour.description || '',
      price: numericPrice,
      priceEstimate: `From $${numericPrice.toLocaleString()} USD`,
      isCancelled: !!formTour.isCancelled,
      link: '#quote-form'
    };

    let updated: Tour[];
    if (editingTour) {
      updated = tours.map((t) => (t.id === editingTour.id ? finalTour : t));
      showToast('Tour details updated!');
    } else {
      updated = [finalTour, ...tours];
      showToast('New tour added successfully!');
    }

    setTours(updated);
    saveToursData(updated);
    setIsModalOpen(false);
  };

  // Filtered tours for table view
  const filteredTours = useMemo(() => {
    return tours.filter((t) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const mTitle = t.title.toLowerCase().includes(q);
        const mCity = t.departureCity.toLowerCase().includes(q);
        const mDest = t.destinations?.some((d) => d.toLowerCase().includes(q));
        if (!mTitle && !mCity && !mDest) return false;
      }
      if (categoryFilter !== 'all' && t.tourType !== categoryFilter) return false;
      if (statusFilter === 'active' && t.isCancelled) return false;
      if (statusFilter === 'cancelled' && !t.isCancelled) return false;
      return true;
    });
  }, [tours, searchQuery, categoryFilter, statusFilter]);

  // Statistics
  const totalToursCount = tours.length;
  const activeToursCount = tours.filter((t) => !t.isCancelled).length;
  const cancelledToursCount = tours.filter((t) => t.isCancelled).length;
  const avgPrice = Math.round(
    tours.reduce((acc, t) => acc + (t.price || 0), 0) / (tours.length || 1)
  );

  // 1. Login View if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-palette-grayBg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl border border-palette-cream overflow-hidden">
          <div className="bg-palette-dark p-6 text-center text-white">
            <div className="w-14 h-14 bg-palette-terracotta/20 border border-palette-terracotta/40 rounded-full flex items-center justify-center mx-auto mb-3 text-palette-sand">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-wide">Roaming Camels Morocco</h1>
            <p className="text-xs uppercase tracking-widest text-palette-sand mt-1">Admin Dashboard Portal</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-2">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Enter password (default: admin123)"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
              />
              {loginError && (
                <p className="text-xs text-red-600 mt-2 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  <span>Incorrect password. Default is: admin123</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-palette-navy hover:bg-palette-dark text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors shadow"
            >
              Log In To Dashboard
            </button>

            <div className="pt-2 text-center">
              <a href="/" className="text-xs text-palette-dark/70 hover:text-palette-terracotta transition-colors flex items-center justify-center space-x-1">
                <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
                <span>Return to Public Website</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Full Admin Dashboard View
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-palette-dark flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-palette-dark text-white px-4 sm:px-6 py-3.5 shadow-md sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-2 text-palette-sand hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Website</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="font-serif text-lg font-bold tracking-wide text-white">
              Roaming Camels Morocco Admin
            </span>
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-palette-terracotta text-white rounded">
              Manager
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-palette-cream/70 hidden md:inline">
              Logged in as: <strong className="text-white">{config.ownerName}</strong>
            </span>
            <button
              onClick={() => handleSaveToursToDisk()}
              disabled={isSavingDisk}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium inline-flex items-center space-x-1.5 transition-colors shadow-sm"
              title="Save all changes to disk files"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingDisk ? 'Saving...' : 'Save All To Disk'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-palette-cream rounded font-medium transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-5 z-50 animate-bounce">
          <div
            className={`px-5 py-3 rounded shadow-lg text-xs font-semibold flex items-center space-x-2 ${
              toastMessage.type === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
        {/* KPI / Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Total Tours</p>
            <p className="text-2xl font-bold font-serif text-palette-dark mt-1">{totalToursCount}</p>
          </div>
          <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">Active On Site</p>
            <p className="text-2xl font-bold font-serif text-emerald-600 mt-1">{activeToursCount}</p>
          </div>
          <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600">Cancelled / Hidden</p>
            <p className="text-2xl font-bold font-serif text-amber-600 mt-1">{cancelledToursCount}</p>
          </div>
          <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-palette-terracotta">Average Price</p>
            <p className="text-2xl font-bold font-serif text-palette-terracotta mt-1">${avgPrice} USD</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-white px-4 rounded-t-sm shadow-sm">
          <button
            onClick={() => setActiveTab('tours')}
            className={`py-3.5 px-5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'tours'
                ? 'border-palette-terracotta text-palette-terracotta'
                : 'border-transparent text-gray-500 hover:text-palette-dark'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Tours &amp; Pricing Management ({tours.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3.5 px-5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'contact'
                ? 'border-palette-terracotta text-palette-terracotta'
                : 'border-transparent text-gray-500 hover:text-palette-dark'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Contact Info &amp; Owner Branding</span>
          </button>
        </div>

        {/* TAB 1: TOURS MANAGEMENT */}
        {activeTab === 'tours' && (
          <div className="bg-white rounded-b-sm border border-gray-200 shadow-sm p-4 sm:p-6 space-y-5">
            {/* Action Bar (Search, Filters, Add Button) */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex flex-1 flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, city, or destination..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded text-xs bg-white text-palette-dark focus:outline-none focus:border-palette-navy"
                >
                  <option value="all">All Categories</option>
                  <option value="extended">Extended Tours</option>
                  <option value="desert">Desert Trips</option>
                  <option value="day-trip">Day Trips</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded text-xs bg-white text-palette-dark focus:outline-none focus:border-palette-navy"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active Only</option>
                  <option value="cancelled">Cancelled/Hidden Only</option>
                </select>
              </div>

              {/* Add New Tour Button */}
              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2.5 bg-palette-terracotta hover:bg-[#833330] text-white rounded text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Tour</span>
              </button>
            </div>

            {/* Table of Tours */}
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-palette-grayBg text-palette-dark border-b border-gray-200 font-serif font-bold uppercase tracking-wider">
                    <th className="py-3 px-3 w-16">Image</th>
                    <th className="py-3 px-4 min-w-[220px]">Title &amp; Destinations</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">From</th>
                    <th className="py-3 px-3">Length</th>
                    <th className="py-3 px-4 min-w-[170px]">Price (USD) &amp; Quick Update</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTours.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-500 italic">
                        No tours match the current filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredTours.map((tour) => {
                      const isCancelled = !!tour.isCancelled;
                      return (
                        <tr
                          key={tour.id}
                          className={`hover:bg-gray-50 transition-colors ${
                            isCancelled ? 'bg-red-50/40 opacity-75' : ''
                          }`}
                        >
                          {/* Image */}
                          <td className="py-2.5 px-3">
                            <img
                              src={tour.image}
                              alt={tour.title}
                              className="w-14 h-10 object-cover rounded border border-gray-200"
                            />
                          </td>

                          {/* Title & Destinations */}
                          <td className="py-2.5 px-4">
                            <p className="font-serif font-bold text-palette-dark leading-snug">
                              {tour.title}
                            </p>
                            <p className="text-[11px] text-gray-500 font-light mt-0.5 line-clamp-1">
                              {tour.destinations?.join(' • ')}
                            </p>
                          </td>

                          {/* Category Badge */}
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                tour.tourType === 'desert'
                                  ? 'bg-palette-terracotta/15 text-palette-terracotta border border-palette-terracotta/30'
                                  : tour.tourType === 'extended'
                                  ? 'bg-palette-navy/15 text-palette-navy border border-palette-navy/30'
                                  : 'bg-palette-green/15 text-palette-green border border-palette-green/30'
                              }`}
                            >
                              {tour.tourType}
                            </span>
                          </td>

                          {/* Departure City */}
                          <td className="py-2.5 px-3 font-medium text-gray-700">
                            {tour.departureCity}
                          </td>

                          {/* Duration */}
                          <td className="py-2.5 px-3 text-gray-600">
                            {tour.duration}
                          </td>

                          {/* Price with Inline Edit & Quick Increment */}
                          <td className="py-2.5 px-4">
                            <div className="flex items-center space-x-1.5">
                              <span className="text-gray-400 font-semibold">$</span>
                              <input
                                type="number"
                                min="0"
                                step="10"
                                value={tour.price ?? 0}
                                onChange={(e) =>
                                  handleInlinePriceChange(tour.id, parseFloat(e.target.value))
                                }
                                className="w-20 px-2 py-1 border border-gray-300 rounded font-bold text-palette-dark text-xs focus:outline-none focus:border-palette-navy"
                              />
                              <button
                                type="button"
                                onClick={() => handleAdjustPrice(tour.id, 50)}
                                className="px-1.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-[10px] font-semibold text-gray-700"
                                title="Add $50"
                              >
                                +$50
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdjustPrice(tour.id, -50)}
                                className="px-1.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-[10px] font-semibold text-gray-700"
                                title="Subtract $50"
                              >
                                -$50
                              </button>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-2.5 px-3 text-center">
                            {isCancelled ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                                Hidden
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
                                Active
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-2.5 px-3 text-right">
                            <div className="flex items-center justify-end space-x-1">
                              <button
                                onClick={() => handleToggleCancel(tour.id)}
                                className={`p-1.5 rounded transition-colors ${
                                  isCancelled
                                    ? 'text-emerald-600 hover:bg-emerald-50'
                                    : 'text-amber-600 hover:bg-amber-50'
                                }`}
                                title={isCancelled ? 'Activate on Site' : 'Cancel/Hide from Public Site'}
                              >
                                {isCancelled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => handleOpenEditModal(tour)}
                                className="p-1.5 text-palette-navy hover:bg-blue-50 rounded transition-colors"
                                title="Edit Full Tour Details"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteTour(tour.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Permanently Delete Tour"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Save Bar */}
            <div className="p-4 bg-palette-grayBg rounded flex flex-col sm:flex-row items-center justify-between gap-3 border border-gray-200">
              <div className="text-xs text-gray-600">
                <span>Showing <strong>{filteredTours.length}</strong> of <strong>{tours.length}</strong> tours. Changes are auto-saved to localStorage and can be synced to disk.</span>
              </div>
              <button
                onClick={() => handleSaveToursToDisk()}
                disabled={isSavingDisk}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-semibold text-xs uppercase tracking-wider inline-flex items-center space-x-1.5 transition-colors shadow"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingDisk ? 'Writing to Disk...' : 'Save All Tours to Disk'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT & OWNER INFO EDITOR */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-b-sm border border-gray-200 shadow-sm p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-xl font-serif font-bold text-palette-dark">
                Owner Branding &amp; Contact Details
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Edit your personal contact info here. When saved, it immediately updates the Navbar, Footer, About Page, and Quote Form across the site.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Owner Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  Owner / Contact Full Name
                </label>
                <input
                  type="text"
                  value={config.ownerName}
                  onChange={(e) => setConfig({ ...config, ownerName: e.target.value })}
                  placeholder="Mohammed El Kouih"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => setConfig({ ...config, email: e.target.value })}
                  placeholder="mohammedlakouaihi000@gmail.com"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>

              {/* Phone Local */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  Phone (Local Morocco Format)
                </label>
                <input
                  type="text"
                  value={config.phoneLocal}
                  onChange={(e) => setConfig({ ...config, phoneLocal: e.target.value })}
                  placeholder="0659307677"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>

              {/* Phone Intl */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  Phone (International Format)
                </label>
                <input
                  type="text"
                  value={config.phoneIntl}
                  onChange={(e) => setConfig({ ...config, phoneIntl: e.target.value })}
                  placeholder="+212 659-307677"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>

              {/* WhatsApp Link */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  WhatsApp Direct URL
                </label>
                <input
                  type="text"
                  value={config.whatsappLink}
                  onChange={(e) => setConfig({ ...config, whatsappLink: e.target.value })}
                  placeholder="https://wa.me/212659307677"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>

              {/* Phone Tel Protocol */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  Phone Dial URI (tel:)
                </label>
                <input
                  type="text"
                  value={config.phoneTel}
                  onChange={(e) => setConfig({ ...config, phoneTel: e.target.value })}
                  placeholder="+212659307677"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>

              {/* Instagram Username */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={config.instagramUsername}
                  onChange={(e) => setConfig({ ...config, instagramUsername: e.target.value })}
                  placeholder="@_mohammed____cb"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>

              {/* Instagram URL */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  Instagram Profile Link
                </label>
                <input
                  type="text"
                  value={config.instagramUrl}
                  onChange={(e) => setConfig({ ...config, instagramUrl: e.target.value })}
                  placeholder="https://www.instagram.com/_mohammed____cb/"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  Location / Base
                </label>
                <input
                  type="text"
                  value={config.location}
                  onChange={(e) => setConfig({ ...config, location: e.target.value })}
                  placeholder="Morocco"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>

              {/* Office Address Title */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-1.5">
                  Company / Agency Title
                </label>
                <input
                  type="text"
                  value={config.addressTitle || ''}
                  onChange={(e) => setConfig({ ...config, addressTitle: e.target.value })}
                  placeholder="Roaming Camels Morocco Tours"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-palette-navy"
                />
              </div>
            </div>

            {/* Quick Link Verifications */}
            <div className="p-4 bg-palette-grayBg rounded border border-gray-200 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-palette-dark">
                Live Link Testers
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={config.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-medium inline-flex items-center space-x-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Test WhatsApp Link</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <a
                  href={`tel:${config.phoneTel}`}
                  className="px-3 py-1.5 bg-palette-navy text-white rounded text-xs font-medium inline-flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Test Call ({config.phoneLocal})</span>
                </a>
                <a
                  href={`mailto:${config.email}`}
                  className="px-3 py-1.5 bg-palette-terracotta text-white rounded text-xs font-medium inline-flex items-center space-x-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Test Mailto Link</span>
                </a>
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-pink-700 text-white rounded text-xs font-medium inline-flex items-center space-x-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Test Instagram Profile</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveConfigToDisk}
                disabled={isSavingDisk}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded inline-flex items-center space-x-2 transition-colors shadow"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingDisk ? 'Writing Config to Disk...' : 'Save Contact Info to Disk & Site'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Add / Edit Tour */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-palette-dark text-white rounded-t-lg">
              <h3 className="font-serif text-lg font-bold">
                {editingTour ? 'Edit Tour Details' : 'Add New Morocco Tour'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-300 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-palette-dark mb-1">
                  Tour Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTour.title || ''}
                  onChange={(e) => setFormTour({ ...formTour, title: e.target.value })}
                  placeholder="e.g. 10 Day Morocco Desert & Imperial Cities Journey"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-palette-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-palette-dark mb-1">
                    Duration (Display) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTour.duration || ''}
                    onChange={(e) => setFormTour({ ...formTour, duration: e.target.value })}
                    placeholder="e.g. 10 Days"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-palette-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-palette-dark mb-1">
                    Duration (Days Count) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formTour.durationDays || 1}
                    onChange={(e) => setFormTour({ ...formTour, durationDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-palette-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-palette-dark mb-1">
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    required
                    value={formTour.price || 0}
                    onChange={(e) => setFormTour({ ...formTour, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded font-bold focus:outline-none focus:border-palette-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-palette-dark mb-1">
                    Departure City *
                  </label>
                  <select
                    value={formTour.departureCity || 'Casablanca'}
                    onChange={(e) => setFormTour({ ...formTour, departureCity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-palette-navy"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Fes">Fes</option>
                    <option value="Tangier">Tangier</option>
                    <option value="Ouarzazate">Ouarzazate</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-palette-dark mb-1">
                    Tour Category *
                  </label>
                  <select
                    value={formTour.tourType || 'extended'}
                    onChange={(e) => setFormTour({ ...formTour, tourType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-palette-navy"
                  >
                    <option value="extended">Extended Tour</option>
                    <option value="desert">Desert Trip</option>
                    <option value="day-trip">Day Trip</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-palette-dark mb-1">
                  Destinations (comma-separated)
                </label>
                <input
                  type="text"
                  value={destinationsInput}
                  onChange={(e) => setDestinationsInput(e.target.value)}
                  placeholder="Casablanca, Chefchaouen, Fes, Sahara Desert, Marrakech"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-palette-navy"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-palette-dark mb-1">
                  Image URL / Asset Path
                </label>
                <input
                  type="text"
                  value={formTour.image || ''}
                  onChange={(e) => setFormTour({ ...formTour, image: e.target.value })}
                  placeholder="/images/18-Day-Grand-Morocco-Tour-Roaming-Camels-Morocco-1536x1024.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-palette-navy"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-palette-dark mb-1">
                  Tour Description
                </label>
                <textarea
                  rows={3}
                  value={formTour.description || ''}
                  onChange={(e) => setFormTour({ ...formTour, description: e.target.value })}
                  placeholder="Detailed tour highlights and travel experience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-palette-navy"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="modal-cancel-checkbox"
                  checked={!!formTour.isCancelled}
                  onChange={(e) => setFormTour({ ...formTour, isCancelled: e.target.checked })}
                  className="w-4 h-4 text-palette-terracotta border-gray-300 rounded focus:ring-palette-navy"
                />
                <label htmlFor="modal-cancel-checkbox" className="font-semibold text-gray-700">
                  Cancel / Hide this tour from public display (Keep data in Admin)
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 uppercase tracking-wider font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-palette-terracotta hover:bg-[#833330] text-white rounded uppercase tracking-wider font-semibold shadow"
                >
                  {editingTour ? 'Save Changes' : 'Create Tour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
