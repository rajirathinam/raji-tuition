import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const StudentGamification = () => {
  const [stats, setStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [allBadges, setAllBadges] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchGamificationData = useCallback(async () => {
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded._id;

      const [statsRes, leaderboardRes, badgesRes] = await Promise.all([
        axios.get(`https://tuitionapp-yq06.onrender.com/api/gamification/stats/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://tuitionapp-yq06.onrender.com/api/gamification/leaderboard', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://tuitionapp-yq06.onrender.com/api/gamification/badges', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStats(statsRes.data.stats);
      setBadges(statsRes.data.badges);
      setLeaderboard(leaderboardRes.data);
      setAllBadges(badgesRes.data);
    } catch (error) {
      console.error('Error fetching gamification data:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchGamificationData();
  }, [fetchGamificationData]);

  const getRarityColor = (rarity) => {
    const colors = {
      common: { bg: '#f1f5f9', text: '#64748b', border: '#94a3b8' },
      rare: { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
      epic: { bg: '#f3e8ff', text: '#7c3aed', border: '#8b5cf6' },
      legendary: { bg: '#fef3c7', text: '#b45309', border: '#f59e0b' }
    };
    return colors[rarity] || colors.common;
  };

  const getProgressPercentage = () => {
    if (!stats) return 0;
    return (stats.level.xp / stats.level.xpToNext) * 100;
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
        <p style={{ color: '#64748b', marginTop: '1rem' }}>Loading achievements...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const statCards = stats ? [
    { value: stats.points.total, label: 'Total Points', color: '#10b981' },
    { value: stats.streaks.current, label: 'Current Streak', color: '#ef4444' },
    { value: badges.length, label: 'Badges Earned', color: '#fbbf24' },
    { value: `Level ${stats.level.current}`, label: `${stats.level.xp}/${stats.level.xpToNext} XP`, color: '#8b5cf6', showProgress: true }
  ] : [];

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
          Achievements & Progress
        </h2>
        <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
          Track your learning journey and earn rewards
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
                  <h3 style={{ fontSize: stat.showProgress ? '1.5rem' : '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {stat.value}
                  </h3>
                  {stat.showProgress && (
                    <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '10px', height: '6px', marginTop: '0.5rem' }}>
                      <div style={{
                        width: `${getProgressPercentage()}%`,
                        background: `linear-gradient(90deg, ${stat.color}, ${stat.color}cc)`,
                        height: '100%',
                        borderRadius: '10px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  )}
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: `${stat.color}15`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'badges', label: 'Badges' },
          { id: 'leaderboard', label: 'Leaderboard' }
        ].map(tab => (
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
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'badges' && (
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            marginBottom: '1.5rem',
            color: '#0f172a',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Your Badges ({badges.length}/{allBadges.length})
          </h3>

          {badges.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#fbbf24' }}>☆</div>
              <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>No Badges Yet!</h3>
              <p style={{ color: '#64748b' }}>Complete assignments and maintain streaks to earn badges.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {badges.map((badge) => {
                const rarityStyle = getRarityColor(badge.rarity);
                return (
                  <div
                    key={badge._id}
                    style={{
                      padding: '1.5rem',
                      border: `2px solid ${rarityStyle.border}`,
                      borderRadius: '16px',
                      backgroundColor: rarityStyle.bg,
                      textAlign: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{badge.icon}</div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: rarityStyle.text, fontWeight: 700 }}>{badge.name}</h4>
                    <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#64748b' }}>{badge.description}</p>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: rarityStyle.border,
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      {badge.rarity}
                    </span>
                    <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                      Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            marginBottom: '1.5rem',
            color: '#0f172a',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Leaderboard
          </h3>

          {leaderboard.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#fbbf24' }}>☆</div>
              <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>No Rankings Yet</h3>
              <p style={{ color: '#64748b' }}>Be the first to earn points!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.user._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem 1.25rem',
                    backgroundColor: index < 3 ? ['#fef3c7', '#f1f5f9', '#ffedd5'][index] : 'white',
                    border: `2px solid ${index < 3 ? ['#f59e0b', '#94a3b8', '#f97316'][index] : '#e2e8f0'}`,
                    borderRadius: '12px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: index < 3
                      ? ['linear-gradient(135deg, #f59e0b, #d97706)', 'linear-gradient(135deg, #94a3b8, #64748b)', 'linear-gradient(135deg, #f97316, #ea580c)'][index]
                      : 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    marginRight: '1rem',
                    fontSize: index < 3 ? '1.2rem' : '0.9rem'
                  }}>
                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : entry.rank}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontWeight: 600 }}>{entry.user.name}</h4>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b', flexWrap: 'wrap' }}>
                      <span>{entry.points.total} pts</span>
                      <span>{entry.streaks.current} streak</span>
                      <span>{entry.badgesCount} badges</span>
                      <span>Lvl {entry.level.current}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'overview' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Recent Badges */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              marginBottom: '1rem',
              color: '#0f172a',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Recent Badges
            </h3>
            {badges.length === 0 ? (
              <p style={{ color: '#64748b', textAlign: 'center', padding: '1rem' }}>No badges earned yet</p>
            ) : (
              badges.slice(0, 3).map((badge) => (
                <div
                  key={badge._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px'
                  }}
                >
                  <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{badge.icon}</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontWeight: 600, fontSize: '0.95rem' }}>{badge.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{badge.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Progress Summary */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              marginBottom: '1rem',
              color: '#0f172a',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Progress Summary
            </h3>
            {stats && (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {[
                  { label: 'Assignments Completed', value: stats.achievements.assignmentsCompleted },
                  { label: 'Average Score', value: `${stats.achievements.averageScore}%` },
                  { label: 'Login Days', value: stats.achievements.loginDays },
                  { label: 'Longest Streak', value: `${stats.streaks.longest} days` }
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '10px'
                    }}
                  >
                    <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {item.icon} {item.label}
                    </span>
                    <strong style={{ color: '#0f172a' }}>{item.value}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentGamification;
