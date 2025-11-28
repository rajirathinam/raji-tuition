import React, { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';

const StudentTimer = () => {
  const [activeTab, setActiveTab] = useState('timer');
  const toast = useToast();

  // Timer State
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerTime, setTimerTime] = useState(25 * 60);

  // Stopwatch State
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchActive, setStopwatchActive] = useState(false);

  // Preset timers
  const presets = [
    { label: '5 min', minutes: 5 },
    { label: '15 min', minutes: 15 },
    { label: '25 min', minutes: 25 },
    { label: '45 min', minutes: 45 },
    { label: '60 min', minutes: 60 }
  ];

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (timerActive && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime(time => time - 1);
      }, 1000);
    } else if (timerTime === 0 && timerActive) {
      setTimerActive(false);
      toast.success('Timer finished! Great work!');
    }
    return () => clearInterval(interval);
  }, [timerActive, timerTime, toast]);

  // Stopwatch Effect
  useEffect(() => {
    let interval = null;
    if (stopwatchActive) {
      interval = setInterval(() => {
        setStopwatchTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stopwatchActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setTimerTime(timerMinutes * 60 + timerSeconds);
    setTimerActive(true);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimerTime(timerMinutes * 60 + timerSeconds);
  };

  const resetStopwatch = () => {
    setStopwatchActive(false);
    setStopwatchTime(0);
  };

  const setPreset = (minutes) => {
    setTimerMinutes(minutes);
    setTimerSeconds(0);
    setTimerTime(minutes * 60);
    setTimerActive(false);
  };

  const getTimerProgress = () => {
    const total = timerMinutes * 60 + timerSeconds;
    return total > 0 ? ((total - timerTime) / total) * 100 : 0;
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#0f172a',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          Study Timer
        </h2>
        <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
          Track your study sessions and stay focused
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        background: '#f1f5f9',
        padding: '0.5rem',
        borderRadius: '12px'
      }}>
        {[
          { id: 'timer', label: 'Timer' },
          { id: 'stopwatch', label: 'Stopwatch' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Timer Tab */}
      {activeTab === 'timer' && (
        <div style={{
          backgroundColor: 'white',
          padding: '2.5rem',
          borderRadius: '24px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          {/* Timer Circle */}
          <div style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            margin: '0 auto 2rem'
          }}>
            <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="12"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={timerActive ? '#10b981' : '#94a3b8'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={565.48}
                strokeDashoffset={565.48 * (1 - getTimerProgress() / 100)}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 800,
                color: timerActive ? '#10b981' : '#0f172a',
                fontFamily: 'monospace',
                letterSpacing: '-0.02em'
              }}>
                {formatTime(timerTime)}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {timerActive ? 'Focus Time' : 'Ready'}
              </div>
            </div>
          </div>

          {/* Presets */}
          {!timerActive && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              {presets.map((preset) => (
                <button
                  key={preset.minutes}
                  onClick={() => setPreset(preset.minutes)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: timerMinutes === preset.minutes ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#f1f5f9',
                    color: timerMinutes === preset.minutes ? 'white' : '#64748b',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {/* Custom Time Input */}
          {!timerActive && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#64748b', fontSize: '0.85rem' }}>
                  Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={timerMinutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setTimerMinutes(val);
                    setTimerTime(val * 60 + timerSeconds);
                  }}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '2px solid #e2e8f0',
                    width: '80px',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>
              <span style={{ fontSize: '1.5rem', color: '#64748b', marginTop: '1.5rem' }}>:</span>
              <div style={{ textAlign: 'center' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#64748b', fontSize: '0.85rem' }}>
                  Seconds
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={timerSeconds}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setTimerSeconds(val);
                    setTimerTime(timerMinutes * 60 + val);
                  }}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '2px solid #e2e8f0',
                    width: '80px',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {!timerActive ? (
              <button
                onClick={startTimer}
                style={{
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                ▶ Start Focus
              </button>
            ) : (
              <button
                onClick={() => setTimerActive(false)}
                style={{
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                }}
              >
                ⏸ Pause
              </button>
            )}

            <button
              onClick={resetTimer}
              style={{
                padding: '1rem 2rem',
                background: '#f1f5f9',
                color: '#64748b',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      )}

      {/* Stopwatch Tab */}
      {activeTab === 'stopwatch' && (
        <div style={{
          backgroundColor: 'white',
          padding: '2.5rem',
          borderRadius: '24px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          {/* Stopwatch Display */}
          <div style={{
            width: '200px',
            height: '200px',
            margin: '0 auto 2rem',
            borderRadius: '50%',
            background: stopwatchActive
              ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: `4px solid ${stopwatchActive ? '#10b981' : '#e2e8f0'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: stopwatchActive ? '#10b981' : '#0f172a',
              fontFamily: 'monospace',
              letterSpacing: '-0.02em'
            }}>
              {formatTime(stopwatchTime)}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {stopwatchActive ? 'Running' : 'Stopped'}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setStopwatchActive(!stopwatchActive)}
              style={{
                padding: '1rem 2.5rem',
                background: stopwatchActive
                  ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: stopwatchActive
                  ? '0 4px 15px rgba(239, 68, 68, 0.4)'
                  : '0 4px 15px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              {stopwatchActive ? '⏸ Stop' : '▶ Start'}
            </button>

            <button
              onClick={resetStopwatch}
              style={{
                padding: '1rem 2rem',
                background: '#f1f5f9',
                color: '#64748b',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        borderRadius: '16px',
        border: '1px solid #bbf7d0'
      }}>
        <h4 style={{
          color: '#166534',
          margin: '0 0 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          💡 Study Tips
        </h4>
        <ul style={{
          margin: 0,
          padding: '0 0 0 1.5rem',
          color: '#16a34a',
          fontSize: '0.9rem',
          lineHeight: 1.8
        }}>
          <li>Try the Pomodoro technique: 25 min focus, 5 min break</li>
          <li>Take a longer 15-30 min break after 4 sessions</li>
          <li>Stay hydrated and keep snacks nearby</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentTimer;
