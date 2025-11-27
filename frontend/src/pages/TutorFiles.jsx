import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import FileList from "../components/FileList";
import { useToast } from '../components/Toast';

const TutorFiles = () => {
  const [files, setFiles] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    file: null,
    selectedClass: '',
    title: ''
  });
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");
  const toast = useToast();

  const fetchFiles = useCallback(async () => {
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded._id;

      const res = await axios.get("https://tuitionapp-yq06.onrender.com/api/files", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tutorFiles = res.data.filter(file => file.uploadedBy?._id === userId);
      setFiles(tutorFiles);
    } catch (err) {
      console.error("Failed to fetch files", err);
    }
  }, [token]);

  const fetchClasses = useCallback(async () => {
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded._id;

      const res = await axios.get(`https://tuitionapp-yq06.onrender.com/api/classes/tutor/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data);
    } catch (err) {
      console.error("Failed to load classes", err);
    }
  }, [token]);

  useEffect(() => {
    fetchFiles();
    fetchClasses();
  }, [fetchFiles, fetchClasses]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadData.file || !uploadData.selectedClass) {
      toast.error("Please select a file and a class.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", uploadData.file);
    formData.append("classId", uploadData.selectedClass);
    if (uploadData.title) formData.append("title", uploadData.title);

    try {
      await axios.post("https://tuitionapp-yq06.onrender.com/api/files", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully!");
      setUploadData({ file: null, selectedClass: '', title: '' });
      setShowUploadModal(false);
      fetchFiles();
    } catch (err) {
      toast.error("File upload failed.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id) => setFiles(files.filter((f) => f._id !== id));

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
            📁 File Management
          </h2>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
            Upload and manage study materials for your sessions
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          style={{
            padding: '0.875rem 1.5rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          📁 Upload New File
        </button>
      </div>

      {/* Files Container */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0'
      }}>
        {files.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📁</div>
            <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>
              No Files Uploaded
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              Click "Upload New File" to add your first study material
            </p>
          </div>
        ) : (
          <>
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              borderRadius: '10px',
              border: '1px solid #bbf7d0'
            }}>
              <h3 style={{ margin: '0 0 0.25rem 0', color: '#166534', fontSize: '1rem' }}>
                📂 My Uploaded Files ({files.length})
              </h3>
              <p style={{ margin: 0, color: '#16a34a', fontSize: '0.85rem' }}>
                Manage your study materials and resources
              </p>
            </div>
            <FileList files={files} onDelete={handleDelete} />
          </>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '20px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '85vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ margin: 0, color: '#0f172a', fontWeight: 700, fontSize: '1.25rem' }}>
                📁 Upload Study Material
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#374151',
                  fontSize: '0.9rem'
                }}>
                  Select Session *
                </label>
                <select
                  value={uploadData.selectedClass}
                  onChange={(e) => setUploadData({ ...uploadData, selectedClass: e.target.value })}
                  required
                  style={{
                    ...inputStyle,
                    background: 'white'
                  }}
                >
                  <option value="">Choose a session...</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.name} - {cls.subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#374151',
                  fontSize: '0.9rem'
                }}>
                  File Title (Optional)
                </label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  placeholder="Enter a descriptive title..."
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#374151',
                  fontSize: '0.9rem'
                }}>
                  Choose File *
                </label>
                <input
                  type="file"
                  onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
                  required
                  style={{
                    ...inputStyle,
                    padding: '0.5rem',
                    background: '#f8fafc'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    borderRadius: '10px',
                    border: '2px solid #e2e8f0',
                    background: 'white',
                    color: '#64748b',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: uploading ? '#94a3b8' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    boxShadow: uploading ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {uploading ? 'Uploading...' : 'Upload File'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorFiles;
