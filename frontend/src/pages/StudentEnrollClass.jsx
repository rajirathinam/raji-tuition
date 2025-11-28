import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StudentEnrollClass = () => {
  const [availableSessions, setAvailableSessions] = useState([]);
  const [enrolledSessions, setEnrolledSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchSessions = useCallback(async () => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded._id;

      const allSessionsRes = await axios.get('https://tuitionapp-yq06.onrender.com/api/classes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const enrolled = [];
      const available = [];

      allSessionsRes.data.forEach(session => {
        const isEnrolled = session.students && session.students.some(student => student._id === userId);
        if (isEnrolled) {
          enrolled.push(session);
        } else {
          available.push(session);
        }
      });

      setEnrolledSessions(enrolled);
      setAvailableSessions(available);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

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
        <p style={{ color: '#64748b', marginTop: '1rem' }}>Loading sessions...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Enrolled Sessions */}
      {enrolledSessions.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Enrolled Sessions ({enrolledSessions.length})
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem'
          }}>
            {enrolledSessions.map((session) => (
              <div
                key={session._id}
                style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                  border: '2px solid #10b981',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  ✓ Enrolled
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    📖
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      margin: 0
                    }}>
                      {session.name}
                    </h3>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {session.subject}
                  </span>
                  <span style={{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {session.schedule}
                  </span>
                </div>

                <p style={{
                  color: '#64748b',
                  margin: 0,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Tutor: {session.tutor?.name || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Sessions */}
      {availableSessions.length > 0 && (
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Other Available Sessions ({availableSessions.length})
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem'
          }}>
            {availableSessions.map((session) => (
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
                  e.currentTarget.style.borderColor = '#fbbf24';
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
                  gap: '1rem',
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
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    📖
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      margin: 0
                    }}>
                      {session.name}
                    </h3>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {session.subject}
                  </span>
                  <span style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    Grade {session.classLevel}
                  </span>
                  <span style={{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {session.schedule}
                  </span>
                </div>

                <p style={{
                  color: '#64748b',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Tutor: {session.tutor?.name || "N/A"}
                </p>

                <div style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#f8fafc',
                  color: '#64748b',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  📋 Contact Admin to Join
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {enrolledSessions.length === 0 && availableSessions.length === 0 && (
        <div style={{
          background: 'white',
          padding: '4rem 2rem',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#10b981' }}>○</div>
          <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>
            No sessions available
          </h3>
          <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>
            There are no sessions available at the moment. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentEnrollClass;
