import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import RoleSidebar from './RoleSidebar';

const RoleLayout = ({ role }) => {
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Sidebar */}
      <RoleSidebar role={role} onWidthChange={setSidebarWidth} />
      
      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: `${sidebarWidth}px`,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        {/* Top Header Bar */}
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
          {/* Left side - Breadcrumb/Title */}
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#0f172a',
              margin: 0,
              textTransform: 'capitalize'
            }}>
              {role} Dashboard
            </h1>
            <p style={{
              fontSize: '0.85rem',
              color: '#64748b',
              margin: 0
            }}>
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Right side - User menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Notifications */}
            <button
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f1f5f9';
                e.target.style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f8fafc';
                e.target.style.borderColor = '#e2e8f0';
              }}
            >
              🔔
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                background: '#10b981',
                borderRadius: '50%',
                border: '2px solid white'
              }} />
            </button>

            {/* User Profile */}
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
                {role === 'student' ? '○' : '◇'}
              </div>
              <div>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#0f172a'
                }}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '0.75rem',
                  color: '#64748b'
                }}>
                  Active
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                padding: '0.6rem 1rem',
                background: 'white',
                color: '#ef4444',
                border: '2px solid #fee2e2',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#fef2f2';
                e.target.style.borderColor = '#fecaca';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#fee2e2';
              }}
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto'
        }}>
          <div style={{
            animation: 'fadeIn 0.4s ease-out'
          }}>
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          padding: '1rem 2rem',
          background: 'white',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.85rem',
            color: '#94a3b8'
          }}>
            © {new Date().getFullYear()} Kalvi. Built for better learning.
          </p>
        </footer>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RoleLayout;
