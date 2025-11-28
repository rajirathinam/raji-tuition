import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from '../components/AdminLayout';

const AdminFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("https://tuitionapp-yq06.onrender.com/api/files", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(res.data);
      } catch (err) {
        setError("Failed to load files");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [token]);

  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    
    try {
      await axios.delete(`https://tuitionapp-yq06.onrender.com/api/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(files.filter(f => f._id !== fileId));
      alert("File deleted successfully");
    } catch (err) {
      alert("Failed to delete file");
      console.error(err);
    }
  };

  // Loading State Component
  const LoadingState = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0'
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
      <p style={{
        color: '#64748b',
        fontSize: '1rem',
        fontWeight: 500,
        margin: 0
      }}>
        Loading files...
      </p>
      <p style={{
        color: '#94a3b8',
        fontSize: '0.85rem',
        margin: '0.5rem 0 0 0'
      }}>
        Please wait while we fetch your data
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      background: '#fef2f2',
      borderRadius: '16px',
      border: '2px solid #fecaca'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        background: '#fee2e2',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        fontSize: '1.5rem'
      }}>
        ✕
      </div>
      <p style={{
        color: '#dc2626',
        fontSize: '1.1rem',
        fontWeight: 600,
        margin: 0
      }}>
        {error}
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1.5rem',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 500,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = '#dc2626'}
        onMouseLeave={(e) => e.target.style.background = '#ef4444'}
      >
        Try Again
      </button>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        fontSize: '2rem'
      }}>
        ▣
      </div>
      <h3 style={{
        color: '#0f172a',
        fontSize: '1.25rem',
        fontWeight: 700,
        margin: '0 0 0.5rem 0'
      }}>
        No Files Yet
      </h3>
      <p style={{
        color: '#64748b',
        fontSize: '0.95rem',
        margin: 0,
        textAlign: 'center',
        maxWidth: '300px'
      }}>
        No files have been uploaded yet. Files uploaded by tutors will appear here.
      </p>
    </div>
  );

  return (
    <AdminLayout>
      <div>
        {/* Page Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#0f172a',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              All Uploaded Files
            </h2>
            <p style={{
              color: '#64748b',
              margin: '0.25rem 0 0 0',
              fontSize: '0.9rem'
            }}>
              Manage all files uploaded by tutors
            </p>
          </div>
          {!loading && !error && files.length > 0 && (
            <div style={{
              padding: '0.5rem 1rem',
              background: '#f0fdf4',
              color: '#059669',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              {files.length} file{files.length !== 1 ? 's' : ''} total
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : files.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #e2e8f0'
                  }}>Title</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #e2e8f0'
                  }}>Class</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #e2e8f0'
                  }}>Uploaded By</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #e2e8f0'
                  }}>Date</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #e2e8f0'
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr
                    key={file._id}
                    style={{
                      background: index % 2 === 0 ? 'white' : '#f8fafc',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#f8fafc'}
                  >
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                      <a
                        href={`https://tuitionapp-yq06.onrender.com/${file.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#10b981',
                          textDecoration: 'none',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <span style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem'
                        }}>
                          ▣
                        </span>
                        {file.title}
                      </a>
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', color: '#475569' }}>
                      {file.classId?.name || "N/A"}
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', color: '#475569' }}>
                      {file.uploadedBy?.name || "N/A"}
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.9rem' }}>
                      {new Date(file.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(file._id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: '0.85rem',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)';
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminFiles;
