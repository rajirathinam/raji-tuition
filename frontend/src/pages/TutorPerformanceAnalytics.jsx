import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const TutorPerformanceAnalytics = () => {
  const [classAnalytics, setClassAnalytics] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchAllClassesAnalytics = useCallback(async () => {
    try {
      const response = await axios.get('https://tuitionapp-yq06.onrender.com/api/tutor-analytics/classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClassAnalytics(response.data.classAnalytics || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAllClassesAnalytics();
  }, [fetchAllClassesAnalytics]);

  const fetchClassDetails = async (classId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://tuitionapp-yq06.onrender.com/api/tutor-analytics/class/${classId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClassDetails(response.data);
      setSelectedClass(classId);
    } catch (error) {
      console.error('Error fetching class details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      excellent: '#10b981',
      good: '#3b82f6',
      average: '#fbbf24',
      needs_attention: '#ef4444'
    };
    return colors[status] || '#64748b';
  };

  const getTrendIcon = (trend) => {
    const icons = { improving: '↗', stable: '→', declining: '↘' };
    return icons[trend] || '○';
  };

  if (loading && !classDetails) {
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
        <p style={{ color: '#64748b', marginTop: '1rem' }}>Loading analytics...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const overviewCards = [
    { value: classAnalytics.length, label: 'Total Classes', color: '#3b82f6' },
    { value: classAnalytics.reduce((sum, cls) => sum + cls.totalStudents, 0), label: 'Total Students', color: '#10b981' },
    {
      value: classAnalytics.length > 0
        ? `${Math.round((classAnalytics.reduce((sum, cls) => sum + cls.classAverage, 0) / classAnalytics.length) * 100) / 100}%`
        : '0%',
      label: 'Overall Average',
      color: '#fbbf24'
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          Class Performance Analytics
        </h2>
        <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
          Monitor student performance across your classes
        </p>
      </div>

      {!selectedClass ? (
        <>
          {/* Overview Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {overviewCards.map((card, index) => (
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
                  </div>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: `${card.color}15`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Classes Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem'
          }}>
            {classAnalytics.map((classData) => (
              <div
                key={classData.classId}
                onClick={() => fetchClassDetails(classData.classId)}
                style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{classData.className}</h3>
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    backgroundColor: '#f1f5f9',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    {classData.subject}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '0.75rem', background: '#f8fafc', borderRadius: '10px' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3b82f6' }}>{classData.totalStudents}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Students</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '0.75rem', background: '#f8fafc', borderRadius: '10px' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>{classData.classAverage}%</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Average</div>
                  </div>
                </div>

                {/* Performance Distribution */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>Distribution:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', fontSize: '0.75rem' }}>
                    {[
                      { key: 'excellent', label: 'Excellent' },
                      { key: 'good', label: 'Good' },
                      { key: 'average', label: 'Average' },
                      { key: 'needs_attention', label: 'At Risk' }
                    ].map(item => (
                      <div key={item.key} style={{ textAlign: 'center', color: getStatusColor(item.key) }}>
                        <div style={{ fontWeight: 700 }}>{classData.statusCounts[item.key]}</div>
                        <div>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attention Warning */}
                {classData.subjectsNeedingAttention && classData.subjectsNeedingAttention.length > 0 && (
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#fef2f2',
                    borderRadius: '8px',
                    border: '1px solid #fecaca',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#dc2626', marginBottom: '0.25rem' }}>
                      ⚠️ Needs Attention:
                    </div>
                    {classData.subjectsNeedingAttention.slice(0, 2).map((subj, idx) => (
                      <div key={idx} style={{ fontSize: '0.75rem', color: '#991b1b' }}>
                        {subj.subject}: {subj.weakStudents}/{subj.totalStudents} students
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ textAlign: 'center', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                  Click for detailed analysis →
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Detailed Class View */
        <div>
          <button
            onClick={() => { setSelectedClass(null); setClassDetails(null); }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '2rem',
              fontWeight: 600
            }}
          >
            ← Back to All Classes
          </button>

          {classDetails && (
            <>
              {/* Class Header */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.5rem 0' }}>
                  {classDetails.classInfo.name} - {classDetails.classInfo.subject}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  {[
                    { value: classDetails.classInfo.totalStudents, label: 'Total Students', color: '#3b82f6' },
                    { value: `${classDetails.classSummary.classAverage}%`, label: 'Class Average', color: '#10b981' },
                    { value: classDetails.classSummary.trendCounts.improving, label: 'Improving', color: '#fbbf24' },
                    { value: classDetails.classSummary.trendCounts.declining, label: 'Declining', color: '#ef4444' }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      textAlign: 'center',
                      padding: '1rem',
                      background: '#f8fafc',
                      borderRadius: '10px'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: item.color }}>{item.value}</div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Table */}
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                  Individual Student Performance
                </h4>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Student</th>
                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Average</th>
                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Exams</th>
                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Assignments</th>
                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Trend</th>
                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classDetails.studentAnalytics.map((student, index) => (
                        <tr
                          key={index}
                          style={{ borderBottom: '1px solid #f1f5f9' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{student.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Class {student.className}</div>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: getStatusColor(student.status) }}>
                            {student.avgScore}%
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center', color: '#475569' }}>{student.totalExams}</td>
                          <td style={{ padding: '1rem', textAlign: 'center', color: '#475569' }}>{student.totalAssignments}</td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <span style={{ fontSize: '1.2rem' }}>{getTrendIcon(student.trend)}</span>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'capitalize' }}>{student.trend}</div>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor: getStatusColor(student.status),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}>
                              {student.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorPerformanceAnalytics;
