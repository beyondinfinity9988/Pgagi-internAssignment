import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Settings, User, Moon, Sun, Heart, TrendingUp, Home, Star, Menu, X, Grip, Play, ExternalLink } from 'lucide-react';
import './PersonalizedDashboard.css'; // Import the new CSS file

// Mock APIs and Data (same as before)
const mockNewsData = [
    { id: 1, title: "Revolutionary AI Breakthrough Changes Everything", description: "Scientists announce major breakthrough in artificial intelligence that could reshape the future of technology.", category: "technology", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop", url: "#", publishedAt: "2024-01-15T10:30:00Z", source: "TechNews" },
    { id: 2, title: "Global Climate Summit Reaches Historic Agreement", description: "World leaders unite on unprecedented climate action plan with binding commitments.", category: "politics", image: "https://images.unsplash.com/photo-1569163139394-de44cb63820d?w=400&h=250&fit=crop", url: "#", publishedAt: "2024-01-15T08:15:00Z", source: "WorldNews" },
    { id: 3, title: "Stock Markets Rally on Economic Recovery Signs", description: "Major indices surge as economic indicators point to strong recovery momentum.", category: "finance", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop", url: "#", publishedAt: "2024-01-15T09:45:00Z", source: "FinanceDaily" },
    { id: 4, title: "Championship Finals Set Record Viewership", description: "Historic match breaks all-time viewership records with millions tuning in worldwide.", category: "sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop", url: "#", publishedAt: "2024-01-15T07:20:00Z", source: "SportsCenter" }
];
const mockRecommendations = [
    { id: 5, title: "Inception", description: "A mind-bending thriller about dream manipulation and reality.", category: "movies", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop", url: "#", rating: 8.8, year: 2010 },
    { id: 6, title: "The Dark Knight", description: "Batman faces his greatest challenge yet in this epic superhero film.", category: "movies", image: "https://images.unsplash.com/photo-1594736797933-d0cc4dcbf0fe?w=400&h=250&fit=crop", url: "#", rating: 9.0, year: 2008 },
    { id: 7, title: "Interstellar", description: "A space odyssey about love, sacrifice, and the survival of humanity.", category: "movies", image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop", url: "#", rating: 8.6, year: 2014 }
];
const mockSocialPosts = [
    { id: 8, title: "Amazing sunset today! 🌅", description: "Nature never fails to amaze me. Perfect end to a perfect day.", category: "social", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop", url: "#", author: "@naturelover", likes: 1250, timestamp: "2 hours ago" },
    { id: 9, title: "New coffee shop discovery ☕", description: "Found this hidden gem in downtown. Best latte I've had in months!", category: "social", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop", url: "#", author: "@coffeeaddict", likes: 847, timestamp: "4 hours ago" }
];

// Utility functions
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// Components
const ContentCard = ({ item, onToggleFavorite, isFavorite, onDragStart, onDragEnd, isDragging }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleAction = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  
  const cardClasses = `content-card ${isDragging ? 'dragging' : ''}`;

  return (
    <div
      className={cardClasses}
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      onDragEnd={onDragEnd}
    >
      <div className="card-image-wrapper">
        <img
          src={item.image}
          alt={item.title}
          className="card-image"
          loading="lazy"
        />
        <div className="card-image-overlay">
          <button
            onClick={() => onToggleFavorite(item.id)}
            className={`card-button ${isFavorite ? 'favorite' : ''}`}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <div className="card-button">
            <Grip size={16} />
          </div>
        </div>
        <div className="card-category-badge">
          {item.category}
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-description">{item.description}</p>
        
        {/* Additional card details can be styled similarly */}
        
        <button
          onClick={handleAction}
          disabled={isLoading}
          className="card-action-button"
        >
          {isLoading ? (
            <div className="spinner" style={{width: '1rem', height: '1rem', borderWidth: '2px'}} />
          ) : (
            <>
              {item.category === 'movies' ? <Play size={16} /> : <ExternalLink size={16} />}
              {item.category === 'movies' ? 'Watch Now' : 'Read More'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const SettingsPanel = ({ isOpen, onClose, preferences, onUpdatePreferences }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const categories = ['technology', 'sports', 'finance', 'politics', 'movies', 'social'];

  const handleSave = () => {
    onUpdatePreferences(localPreferences);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <button onClick={onClose} className="settings-close-button">
            <X size={20} />
          </button>
        </div>
        <div>
          <h3 className="settings-section-title">Content Preferences</h3>
          <div>
            {categories.map(category => (
              <label key={category} className="settings-checkbox-label">
                <input
                  type="checkbox"
                  className="settings-checkbox"
                  checked={localPreferences.categories.includes(category)}
                  onChange={(e) => {
                    const updatedCategories = e.target.checked
                      ? [...localPreferences.categories, category]
                      : localPreferences.categories.filter(c => c !== category);
                    setLocalPreferences(prev => ({ ...prev, categories: updatedCategories }));
                  }}
                />
                <span className="capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="settings-buttons">
          <button onClick={onClose} className="settings-cancel-button">
            Cancel
          </button>
          <button onClick={handleSave} className="settings-save-button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const InfiniteScroll = ({ children, hasMore, loadMore, loading }) => {
    const sentinelRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        const currentSentinel = sentinelRef.current;
        if (currentSentinel) {
            observer.observe(currentSentinel);
        }

        return () => {
            if (currentSentinel) {
                observer.unobserve(currentSentinel);
            }
        };
    }, [hasMore, loadMore, loading]);

    return (
        <>
            {children}
            <div ref={sentinelRef} className="infinite-scroll-sentinel">
                {loading && <div className="spinner" />}
            </div>
        </>
    );
};


// Main Dashboard Component
const PersonalizedDashboard = () => {
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode') || 'false'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('feed');
  const [loading, setLoading] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [preferences, setPreferences] = useState(() => JSON.parse(localStorage.getItem('userPreferences') || '{"categories":["technology","sports","finance"]}'));
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [content, setContent] = useState(() => [...mockNewsData, ...mockRecommendations, ...mockSocialPosts]);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => { localStorage.setItem('userPreferences', JSON.stringify(preferences)); }, [preferences]);
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites]);

  const handleSearch = useCallback(async () => {
    if (!debouncedSearchTerm) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [debouncedSearchTerm]);

  useEffect(() => { handleSearch(); }, [handleSearch]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]);
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => setDraggedItem(null);
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (!draggedItem) return;
    const draggedIndex = content.findIndex(item => item.id === draggedItem.id);
    if (draggedIndex === -1) return;
    
    const newContent = [...content];
    const [removed] = newContent.splice(draggedIndex, 1);
    newContent.splice(targetIndex, 0, removed);
    
    setContent(newContent);
    setDraggedItem(null);
  };

  const loadMore = async () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const getFilteredContent = () => {
    let filtered = content;
    if (activeTab === 'favorites') {
      filtered = content.filter(item => favorites.includes(item.id));
    } else if (activeTab === 'trending') {
      filtered = content.filter(item => item.rating > 8.5 || item.likes > 1000 || item.category === 'technology');
    } else if (activeTab === 'feed') {
      filtered = content.filter(item => preferences.categories.length === 0 || preferences.categories.includes(item.category));
    }

    if (debouncedSearchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredContent = getFilteredContent();

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="header-button menu-button">
              <Menu size={24} />
            </button>
            <h1 className="header-title">Content Dashboard</h1>
          </div>
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {loading && <div className="search-spinner" />}
          </div>
          <div className="header-right">
            <button onClick={() => setDarkMode(!darkMode)} className="header-button">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setSettingsOpen(true)} className="header-button">
              <Settings size={20} />
            </button>
            <button className="header-button">
              <User size={20} />
            </button>
          </div>
        </div>
      </header>
      <div className="layout-flex">
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav>
            <button onClick={() => { setActiveTab('feed'); setSidebarOpen(false); }} className={`sidebar-nav-button ${activeTab === 'feed' ? 'active' : ''}`}>
              <Home size={20} /><span>Feed</span>
            </button>
            <button onClick={() => { setActiveTab('trending'); setSidebarOpen(false); }} className={`sidebar-nav-button ${activeTab === 'trending' ? 'active' : ''}`}>
              <TrendingUp size={20} /><span>Trending</span>
            </button>
            <button onClick={() => { setActiveTab('favorites'); setSidebarOpen(false); }} className={`sidebar-nav-button ${activeTab === 'favorites' ? 'active' : ''}`}>
              <Heart size={20} /><span>Favorites ({favorites.length})</span>
            </button>
          </nav>
        </aside>
        {sidebarOpen && <div className="mobile-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        <main className="main-content">
          <div className="main-content-header">
            <h2 className="main-content-title capitalize">{activeTab} {debouncedSearchTerm && `- "${debouncedSearchTerm}"`}</h2>
            <p className="main-content-subtitle">{filteredContent.length} items found</p>
          </div>
          <InfiniteScroll hasMore={true} loadMore={loadMore} loading={loading}>
            <div className="content-grid" onDragOver={handleDragOver}>
              {filteredContent.map((item, index) => (
                <div key={item.id} onDrop={(e) => handleDrop(e, index)} className="card-container">
                  <ContentCard
                    item={item}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.includes(item.id)}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedItem?.id === item.id}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
          {filteredContent.length === 0 && !loading && (
            <div className="no-content-container">
              <div className="no-content-icon">🔍</div>
              <h3 className="no-content-title">No content found</h3>
              <p className="no-content-text">
                {debouncedSearchTerm ? `No results for "${debouncedSearchTerm}"` : 'Try adjusting your preferences or search terms'}
              </p>
            </div>
          )}
        </main>
      </div>
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        preferences={preferences}
        onUpdatePreferences={setPreferences}
      />
    </div>
  );
};

export default PersonalizedDashboard;
