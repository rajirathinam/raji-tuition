import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const TutorDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [mySessions, setMySessions] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalStudents: 0,
    totalFiles: 0
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await axios.get("https://tuitionapp-yq06.onrender.com/api/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    }
  }, [token]);

  const fetchMySessions = useCallback(async () => {
    try {
      const decoded = jwtDecode(token);
      const res = await axios.get("https://tuitionapp-yq06.onrender.com/api/classes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Filter sessions where this tutor is assigned
      const tutorSessions = res.data.filter(cls => cls.tutor?._id === decoded.id);
      setMySessions(tutorSessions);
      
      // Calculate stats
      const totalStudents = tutorSessions.reduce((acc, session) => acc + (session.students?.length || 0), 0);
      setStats({
        totalSessions: tutorSessions.length,
        totalStudents: totalStudents,
        totalFiles: 0
      });
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  }, [token]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchAnnouncements(), fetchMySessions()]);
      setLoading(false);
    };
    loadData();
  }, [fetchAnnouncements, fetchMySessions]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid #e2e8f0',
          borderTopColor: '#10b981',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#64748b', marginTop: '1rem' }}>Loading dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const statCards = [
    { value: stats.totalSessions, label: 'My Sessions', color: '#10b981' },
    { value: stats.totalStudents, label: 'Total Students', color: '#fbbf24' },
    { value: mySessions.reduce((acc, s) => acc + (s.announcements?.length || 0), 0), label: 'Announcements', color: '#3b82f6' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Welcome Section */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        padding: '2rem',
        borderRadius: '20px',
        color: 'white',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            margin: '0 0 0.5rem 0'
          }}>
            Welcome back, Tutor!
          </h1>
          <p style={{
            fontSize: '1rem',
            opacity: 0.9,
            margin: 0
          }}>
            Here's an overview of your teaching activities
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {statCards.map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = stat.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                  {stat.label}
                </p>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {stat.value}
                </h3>
              </div>
              <div style={{
                width: '50px',
                height: '50px',
                background: `${stat.color}15`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  background: stat.color
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Announcements */}
      {announcements.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '1rem'
          }}>
            Global Announcements
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {announcements.slice(0, 3).map((announcement) => {
              const typeStyles = {
                urgent: { bg: '#fef2f2', border: '#ef4444' },
                holiday: { bg: '#f0fdf4', border: '#22c55e' },
                general: { bg: '#f8fafc', border: '#10b981' }
              };
              const style = typeStyles[announcement.type] || typeStyles.general;

              return (
                <div
                  key={announcement._id}
                  style={{
                    backgroundColor: style.bg,
                    border: `2px solid ${style.border}`,
                    padding: '1.25rem',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 600 }}>
                      {announcement.title}
                    </h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#475569', lineHeight: 1.5 }}>
                      {announcement.message}
                    </p>
                    <small style={{ color: '#94a3b8' }}>
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* My Sessions */}
      {mySessions.length > 0 && (
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '1rem'
          }}>
            My Sessions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {mySessions.slice(0, 4).map((session) => (
              <div
                key={session._id}
                style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.2rem'
                  }}>
                    {session.name?.charAt(0) || 'S'}
                  </div>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: '#f0fdf4',
                    color: '#059669',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {session.students?.length || 0} students
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '0.75rem'
                }}>
                  {session.name}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
                    Subject: {session.subject}
                  </p>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
                    Schedule: {session.schedule}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {mySessions.length === 0 && announcements.length === 0 && (
        <div style={{
          background: 'white',
          padding: '4rem 2rem',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>
            No sessions yet
          </h3>
          <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>
            You haven't been assigned to any sessions yet. Check back later or contact the admin.
          </p>
        </div>
      )}
    </div>
  );
};

export default TutorDashboard;
