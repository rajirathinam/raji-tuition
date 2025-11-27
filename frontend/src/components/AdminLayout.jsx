import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children, showAnnouncementForm, setShowAnnouncementForm }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin', icon: '📊', label: 'Dashboard' },
    { path: '/admin/files', icon: '📁', label: 'View All Files' },
    { path: '/admin/classes', icon: '📚', label: 'View Sessions' },
    { path: '/admin/create-class', icon: '➕', label: 'Create Session' },
    { path: '/admin/feedback', icon: '💬', label: 'Manage Feedback' },
    { path: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
    { path: '/admin/payments', icon: '💰', label: 'Payment Management' },
    { path: '/admin/reports', icon: '📈', label: 'Reports & Analytics' }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      {/* Sidebar */}
      <div style={{
        width: isMinimized ? '70px' : '260px',
        background: 'linear-gradient(180deg, #0f172a 0%, #064e3b 100%)',
        padding: '1rem 0',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: isMinimized ? '1rem 0.5rem' : '1rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: isMinimized ? 'center' : 'space-between',
            alignItems: 'center'
          }}>
            {!isMinimized && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>
                  🛡️
                </div>
                <div>
                  <h2 style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 700,
                    margin: 0
                  }}>
                    Admin Panel
                  </h2>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#94a3b8',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(16, 185, 129, 0.2)';
                e.target.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.color = '#94a3b8';
              }}
            >
              {isMinimized ? '→' : '←'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0 0.5rem', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: isMinimized ? '0.75rem' : '0.75rem 1rem',
                  margin: '0.25rem 0',
                  borderRadius: '10px',
                  color: isActive ? 'white' : '#94a3b8',
                  textDecoration: 'none',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 100%)'
                    : 'transparent',
                  borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent',
                  justifyContent: isMinimized ? 'center' : 'flex-start'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#94a3b8';
                  }
                }}
                title={isMinimized ? item.label : ''}
              >
                <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>{item.icon}</span>
                {!isMinimized && <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.label}</span>}
              </Link>
            );
          })}

          {/* Post Announcement Button */}
          <button
            onClick={() => {
              if (setShowAnnouncementForm) {
                setShowAnnouncementForm(true);
              } else {
                window.location.href = '/admin';
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: isMinimized ? '0.75rem' : '0.75rem 1rem',
              margin: '0.25rem 0',
              borderRadius: '10px',
              color: '#fbbf24',
              background: 'rgba(251, 191, 36, 0.1)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              justifyContent: isMinimized ? 'center' : 'flex-start',
              width: isMinimized ? 'auto' : '100%',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(251, 191, 36, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(251, 191, 36, 0.1)';
            }}
            title={isMinimized ? 'Post Announcement' : ''}
          >
            <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>📢</span>
            {!isMinimized && <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Post Announcement</span>}
          </button>
        </nav>

        {/* Footer */}
        <div style={{
          padding: isMinimized ? '1rem 0.5rem' : '1rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: 'auto'
        }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: '10px',
              color: '#94a3b8',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              justifyContent: isMinimized ? 'center' : 'flex-start',
              marginBottom: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🏠</span>
            {!isMinimized && <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Back to Home</span>}
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: '10px',
              color: '#ef4444',
              background: 'rgba(239, 68, 68, 0.1)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              justifyContent: isMinimized ? 'center' : 'flex-start',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🚪</span>
            {!isMinimized && <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: isMinimized ? '70px' : '260px',
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        {/* Top Header */}
        <header style={{
          background: 'white',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#0f172a',
              margin: 0
            }}>
              Admin Dashboard
            </h1>
            <p style={{
              fontSize: '0.85rem',
              color: '#64748b',
              margin: 0
            }}>
              Manage your tuition platform
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1rem',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}>
              🛡️
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>Administrator</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Full Access</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto'
        }}>
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          padding: '1rem 2rem',
          background: 'white',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
            © {new Date().getFullYear()} Tuitix Admin Panel
          </p>
        </footer>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
