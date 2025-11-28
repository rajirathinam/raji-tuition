import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { useToast } from '../components/Toast';

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('https://tuitionapp-yq06.onrender.com/api/admin/feedback', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedback(res.data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const approveFeedback = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`https://tuitionapp-yq06.onrender.com/api/admin/feedback/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Feedback approved successfully!');
      fetchFeedback();
    } catch (err) {
      toast.error('Error approving feedback');
      console.error('Error approving feedback:', err);
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://tuitionapp-yq06.onrender.com/api/admin/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Feedback deleted successfully!');
      fetchFeedback();
    } catch (err) {
      toast.error('Error deleting feedback');
      console.error('Error deleting feedback:', err);
    }
  };

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
        <p style={{ color: '#64748b', marginTop: '1rem' }}>Loading feedback...</p>
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
            Manage Feedback
          </h1>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
            Review and approve student testimonials
          </p>
        </div>

        {feedback.length === 0 ? (
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
              No Feedback Yet
            </h3>
            <p style={{ color: '#64748b' }}>Feedback from students will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {feedback.map((item) => (
              <div
                key={item._id}
                style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                  border: `2px solid ${item.approved ? '#10b981' : '#fbbf24'}`,
                  transition: 'all 0.3s ease'
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
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.2rem', fontWeight: 700 }}>
                      {item.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 500
                      }}>
                        {item.role}
                      </span>
                      <div style={{ display: 'flex' }}>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color: i < item.rating ? '#fbbf24' : '#e2e8f0',
                              fontSize: '1.1rem'
                            }}
                          >
                            ★
                          </span>
                        ))}
                        <span style={{ fontSize: '0.85rem', color: '#64748b', marginLeft: '0.5rem' }}>
                          ({item.rating}/5)
                        </span>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    backgroundColor: item.approved ? '#dcfce7' : '#fef3c7',
                    color: item.approved ? '#166534' : '#92400e',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}>
                    {item.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>

                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '1rem'
                }}>
                  <p style={{
                    color: '#374151',
                    lineHeight: 1.6,
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    "{item.message}"
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {!item.approved && (
                    <button
                      onClick={() => approveFeedback(item._id)}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => deleteFeedback(item._id)}
                    style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminFeedback;
