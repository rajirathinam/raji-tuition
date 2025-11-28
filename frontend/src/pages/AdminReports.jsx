import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const AdminReports = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [revenueTrends, setRevenueTrends] = useState([]);
  const [performanceByClass, setPerformanceByClass] = useState([]);
  const [subjectPerformance, setSubjectPerformance] = useState([]);
  const [paymentDistribution, setPaymentDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const token = localStorage.getItem('token');

  const fetchAllReports = useCallback(async () => {
    try {
      const [dashboard, revenue, performance, subjects, payments] = await Promise.all([
        axios.get('https://tuitionapp-yq06.onrender.com/api/reports/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://tuitionapp-yq06.onrender.com/api/reports/revenue-trends', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://tuitionapp-yq06.onrender.com/api/reports/performance-by-class', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://tuitionapp-yq06.onrender.com/api/reports/subject-performance', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://tuitionapp-yq06.onrender.com/api/reports/payment-distribution', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setDashboardData(dashboard.data.overview);
      setRevenueTrends(revenue.data.trends || []);
      setPerformanceByClass(performance.data.performanceByClass || []);
      setSubjectPerformance(subjects.data.subjectPerformance || []);
      setPaymentDistribution(payments.data.paymentDistribution || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAllReports();
  }, [fetchAllReports]);

  const getStatusColor = (status) => {
    const colors = {
      verified: '#10b981',
      pending: '#fbbf24',
      rejected: '#ef4444',
      unpaid: '#64748b'
    };
    return colors[status] || '#64748b';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatMonth = (monthStr) => {
    const date = new Date(monthStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#0f172a',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Reports & Analytics
            </h2>
            <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
              Track performance, revenue, and student progress
            </p>
          </div>

          {/* Loading Card */}
          <div style={{
            background: 'white',
            padding: '4rem 2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid #e2e8f0',
              borderTopColor: '#10b981',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }} />
            <p style={{ color: '#64748b', margin: 0, fontWeight: 500 }}>Loading reports...</p>
            <p style={{ color: '#94a3b8', margin: '0.5rem 0 0', fontSize: '0.85rem' }}>
              Please wait while we fetch your analytics data
            </p>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AdminLayout>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'performance', label: 'Performance' },
    { id: 'payments', label: 'Payments' }
  ];

  const dashboardCards = dashboardData ? [
    { value: dashboardData.totalStudents, label: 'Total Students', color: '#3b82f6' },
    { value: dashboardData.totalTutors, label: 'Total Tutors', color: '#10b981' },
    { value: formatCurrency(dashboardData.currentRevenue), label: 'This Month', color: '#fbbf24', growth: dashboardData.revenueGrowth },
    { value: `${dashboardData.avgPerformance}%`, label: 'Avg Performance', color: '#8b5cf6' },
    { value: `${dashboardData.collectionRate}%`, label: 'Collection Rate', color: '#06b6d4' },
    { value: dashboardData.studentsAtRisk, label: 'At Risk', color: '#ef4444' }
  ] : [];

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Reports & Analytics
          </h2>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
            Track performance, revenue, and student progress
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          background: '#f1f5f9',
          padding: '0.5rem',
          borderRadius: '12px',
          width: 'fit-content'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#64748b',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && dashboardData && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {dashboardCards.map((card, index) => (
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
                  e.currentTarget.style.borderColor = card.color;
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
                      {card.label}
                    </p>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {card.value}
                    </h3>
                    {card.growth !== undefined && (
                      <p style={{
                        fontSize: '0.8rem',
                        color: card.growth >= 0 ? '#10b981' : '#ef4444',
                        margin: '0.25rem 0 0'
                      }}>
                        {card.growth >= 0 ? '↗' : '↘'} {Math.abs(card.growth)}%
                      </p>
                    )}
                  </div>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: `${card.color}15`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      background: card.color
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Revenue Trends (Last 6 Months)
            </h3>

            {revenueTrends.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                No revenue data available
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'end',
                gap: '1rem',
                height: '280px',
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '12px'
              }}>
                {revenueTrends.map((trend, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1
                  }}>
                    <div style={{
                      height: `${Math.max(20, (trend.revenue / Math.max(...revenueTrends.map(t => t.revenue))) * 220)}px`,
                      background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
                      width: '100%',
                      borderRadius: '8px 8px 0 0',
                      display: 'flex',
                      alignItems: 'end',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      paddingBottom: '0.5rem',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}>
                      {formatCurrency(trend.revenue)}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#0f172a',
                      fontWeight: 600,
                      marginTop: '0.75rem'
                    }}>
                      {formatMonth(trend.month)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {trend.payments} payments
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* By Class */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Performance by Class
              </h3>

              {performanceByClass.length === 0 ? (
                <p style={{ color: '#64748b', textAlign: 'center' }}>No data available</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {performanceByClass.map((classData, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 600 }}>
                          Class {classData._id || 'Unassigned'}
                        </h4>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>
                          {Math.round(classData.avgScore)}%
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.5rem' }}>
                        {classData.count} exams • Range: {Math.round(classData.minScore)}% - {Math.round(classData.maxScore)}%
                      </p>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '3px'
                      }}>
                        <div style={{
                          width: `${classData.avgScore}%`,
                          height: '100%',
                          background: classData.avgScore >= 75 ? 'linear-gradient(90deg, #10b981, #059669)' :
                            classData.avgScore >= 60 ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' :
                              'linear-gradient(90deg, #ef4444, #dc2626)',
                          borderRadius: '3px'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* By Subject */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Subject Performance
              </h3>

              {subjectPerformance.length === 0 ? (
                <p style={{ color: '#64748b', textAlign: 'center' }}>No data available</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {subjectPerformance.map((subject, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.25rem'
                      }}>
                        <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 600 }}>{subject._id}</h4>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>
                          {Math.round(subject.avgScore)}%
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                        {subject.count} exams
                      </p>
                      {subject.studentsBelow50 > 0 && (
                        <p style={{ fontSize: '0.8rem', color: '#ef4444', margin: '0.25rem 0 0' }}>
                          {subject.studentsBelow50} students below 50%
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Payment Distribution
            </h3>

            {paymentDistribution.length === 0 ? (
              <p style={{ color: '#64748b', textAlign: 'center' }}>No payment data available</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                {paymentDistribution.map((payment, index) => {
                  const icons = { verified: '✓', pending: '○', rejected: '✕' };
                  return (
                    <div
                      key={index}
                      style={{
                        padding: '1.5rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '16px',
                        border: `2px solid ${getStatusColor(payment.status)}`,
                        textAlign: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {icons[payment.status] || '◈'}
                      </div>
                      <h4 style={{
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: getStatusColor(payment.status),
                        margin: 0
                      }}>
                        {payment.count}
                      </h4>
                      <p style={{
                        color: '#64748b',
                        margin: '0.25rem 0',
                        textTransform: 'capitalize',
                        fontWeight: 500
                      }}>
                        {payment.status} Students
                      </p>
                      {payment.amount > 0 && (
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#0f172a',
                          fontWeight: 600,
                          marginTop: '0.25rem'
                        }}>
                          {formatCurrency(payment.amount)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
