import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { useToast } from '../components/Toast';

const AdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const handleDeleteClass = async (classId) => {
    if (!window.confirm('Are you sure you want to delete this session? This will also remove all student enrollments.')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://tuitionapp-yq06.onrender.com/api/classes/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classes.filter(cls => cls._id !== classId));
      toast.success('Session deleted successfully!');
    } catch (err) {
      console.error('Error deleting session:', err);
      toast.error('Failed to delete session');
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://tuitionapp-yq06.onrender.com/api/classes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return (
    <AdminLayout>
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
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            All Tuition Sessions
          </h1>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
            Manage all sessions and their assignments
          </p>
        </div>

        {classes.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '4rem 2rem',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#10b981' }}>○</div>
            <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>
              No Sessions Yet
            </h3>
            <p style={{ color: '#64748b' }}>Create your first session to get started.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {classes.map((cls) => (
              <div
                key={cls._id}
                style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.75rem 0', color: '#0f172a', fontSize: '1.25rem', fontWeight: 700 }}>
                      {cls.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 500
                      }}>
                        {cls.subject}
                      </span>
                      <span style={{
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 500
                      }}>
                        Grade {cls.classLevel}
                      </span>
                      <span style={{
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 500
                      }}>
                        {cls.schedule}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      backgroundColor: cls.status === 'completed' ? '#fee2e2' : '#f0fdf4',
                      color: cls.status === 'completed' ? '#991b1b' : '#166534',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      {cls.status === 'completed' ? 'Completed' : 'Scheduled'}
                    </span>
                    <button
                      onClick={() => handleDeleteClass(cls._id)}
                      style={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Tutor Info */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.9rem', fontWeight: 600 }}>
                    Assigned Tutor
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700
                    }}>
                      {cls.tutor?.name?.charAt(0) || 'N'}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>
                        {cls.tutor?.name || 'No tutor assigned'}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                        {cls.tutor?.email || 'No email available'}
                      </p>
                    </div>
                  </div>
                </div>

                {cls.scheduledDate && (
                  <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                    Scheduled for: {new Date(cls.scheduledDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminClasses;
