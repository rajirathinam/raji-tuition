import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const About = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('https://tuitionapp-yq06.onrender.com/api/feedback/approved');
        setTestimonials(res.data);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    };
    fetchTestimonials();
  }, []);

  const features = [
    { icon: '🤖', title: 'Smart Technology', desc: 'AI-powered class matching, automated scheduling, and intelligent progress tracking for optimal learning outcomes.', color: '#10b981' },
    { icon: '✅', title: 'Verified Tutors', desc: 'Rigorous screening process ensures only qualified, experienced educators join our platform.', color: '#fbbf24' },
    { icon: '⚡', title: 'Real-time Platform', desc: 'Instant notifications, live progress tracking, and seamless communication between students and tutors.', color: '#3b82f6' },
    { icon: '🎨', title: 'Personalized Learning', desc: 'Tailored learning paths and customized study materials based on individual student needs and goals.', color: '#8b5cf6' },
    { icon: '🔒', title: 'Trust & Safety', desc: 'Secure platform with verified users, safe payment processing, and comprehensive privacy protection.', color: '#ef4444' },
    { icon: '📊', title: 'Progress Tracking', desc: 'Comprehensive analytics and reporting to monitor learning progress and identify areas for improvement.', color: '#06b6d4' }
  ];

  const values = [
    { icon: '🎯', title: 'Quality Education', desc: 'Committed to providing the highest standard of educational support through verified, experienced tutors.' },
    { icon: '🌍', title: 'Accessibility', desc: 'Making quality education accessible to students from all backgrounds and locations.' },
    { icon: '🚀', title: 'Innovation', desc: 'Leveraging cutting-edge technology to create smarter, more effective learning experiences.' }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(16, 185, 129, 0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            ✨ About Tuitix
          </span>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            Revolutionizing Education Through
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #10b981 0%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Smart Technology
            </span>
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#94a3b8',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We're building the future of personalized learning, connecting students with expert tutors for transformative educational experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: '#f0fdf4',
            color: '#059669',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            🎯 Our Mission
          </span>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            Bridging Students & Quality Education
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#64748b',
            lineHeight: 1.8,
            marginBottom: '3rem',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            To create a seamless, technology-driven platform that connects learners with expert tutors, making personalized learning accessible to everyone regardless of their background or location.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {values.map((value, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                }}>
                  {value.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '0.75rem'
                }}>
                  {value.title}
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              background: '#fef3c7',
              color: '#d97706',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              ⚡ Why Choose Us
            </span>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em'
            }}>
              What Makes Tuitix Different
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: `${feature.color}20`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(251, 191, 36, 0.2)',
            color: '#fbbf24',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            💬 Testimonials
          </span>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '3rem',
            letterSpacing: '-0.02em'
          }}>
            What Our Students Say
          </h2>

          {testimonials.length === 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '3rem',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>💭</span>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                No testimonials available yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {testimonials.map((testimonial, index) => {
                const colors = ['#10b981', '#fbbf24', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4'];
                const bgColor = colors[index % colors.length];

                return (
                  <div
                    key={testimonial._id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '2rem',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      textAlign: 'left',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <div style={{ marginBottom: '1rem', display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{
                          color: i < testimonial.rating ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)',
                          fontSize: '1.2rem'
                        }}>★</span>
                      ))}
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      marginBottom: '1.5rem',
                      fontStyle: 'italic',
                      color: '#e2e8f0'
                    }}>
                      "{testimonial.message}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '45px',
                        height: '45px',
                        backgroundColor: bgColor,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'white'
                      }}>
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600 }}>{testimonial.name}</p>
                        <p style={{ margin: 0, opacity: 0.7, fontSize: '0.85rem' }}>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
