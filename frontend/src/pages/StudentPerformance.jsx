import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../components/Toast';

const StudentPerformance = () => {
  const [performances, setPerformances] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    subject: '',
    examType: '',
    totalMarks: '',
    obtainedMarks: '',
    examDate: '',
    academicYear: '2024-25',
    term: ''
  });

  const toast = useToast();
  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Tamil', 'Hindi', 'Sanskrit', 'French', 'German'];
  const examTypes = ['Unit Test', 'Mid Term', 'Final Exam', 'Monthly Test', 'Quarterly', 'Half Yearly'];
  const terms = ['Term 1', 'Term 2', 'Term 3'];

  useEffect(() => {
    fetchPerformances();
  }, []);

  const fetchPerformances = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://tuitionapp-yq06.onrender.com/api/performance', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPerformances(response.data);
    } catch (error) {
      console.error('Error fetching performances:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://tuitionapp-yq06.onrender.com/api/performance', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Performance record added successfully!');
      setFormData({
        subject: '', examType: '', totalMarks: '', obtainedMarks: '',
        examDate: '', academicYear: '2024-25', term: ''
      });
      setShowForm(false);
      fetchPerformances();
    } catch (error) {
      toast.error('Error adding performance record');
      console.error('Submit error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getGradeColor = (grade) => {
    const colors = {
      'A+': { bg: '#dcfce7', color: '#166534' },
      'A': { bg: '#dbeafe', color: '#1e40af' },
      'B+': { bg: '#fef3c7', color: '#92400e' },
      'B': { bg: '#ffedd5', color: '#c2410c' },
      'C': { bg: '#fee2e2', color: '#991b1b' },
      'D': { bg: '#fee2e2', color: '#991b1b' },
      'F': { bg: '#fee2e2', color: '#991b1b' }
    };
    return colors[grade] || { bg: '#f1f5f9', color: '#475569' };
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  };

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
        <p style={{ color: '#64748b', marginTop: '1rem' }}>Loading performance records...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📊 My Performance Records
          </h2>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
            Track your academic progress
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '0.75rem 1.5rem',
            background: showForm ? '#f1f5f9' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: showForm ? '#64748b' : 'white',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: showForm ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}
        >
          {showForm ? '✕ Cancel' : '➕ Add New Record'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          marginBottom: '2rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '1.5rem'
          }}>
            📝 Add Performance Record
          </h3>
          <form onSubmit={handleSubmit} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Exam Type</option>
              {examTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <input
              name="totalMarks"
              type="number"
              placeholder="Total Marks"
              value={formData.totalMarks}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="obtainedMarks"
              type="number"
              placeholder="Obtained Marks"
              value={formData.obtainedMarks}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="examDate"
              type="date"
              value={formData.examDate}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Term</option>
              {terms.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>

            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              ✓ Add Record
            </button>
          </form>
        </div>
      )}

      {/* Table */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>Subject</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>Exam</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>Marks</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>%</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>Grade</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>Term</th>
            </tr>
          </thead>
          <tbody>
            {performances.map((performance, index) => {
              const gradeStyle = getGradeColor(performance.grade);
              return (
                <tr
                  key={performance._id}
                  style={{
                    background: index % 2 === 0 ? 'white' : '#f8fafc',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
                  onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#f8fafc'}
                >
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: '#0f172a' }}>{performance.subject}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', color: '#475569' }}>{performance.examType}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', color: '#475569' }}>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{performance.obtainedMarks}</span>/{performance.totalMarks}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: '#0f172a' }}>
                    {performance.percentage.toFixed(1)}%
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{
                      background: gradeStyle.bg,
                      color: gradeStyle.color,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      {performance.grade}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.9rem' }}>
                    {new Date(performance.examDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', color: '#475569' }}>{performance.term}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {performances.length === 0 && (
          <div style={{
            padding: '4rem 2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>No Records Yet</h3>
            <p style={{ color: '#64748b' }}>Add your first performance record to start tracking!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPerformance;
