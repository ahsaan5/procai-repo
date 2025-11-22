/**
 * STANDALONE EXAMPLE: LiveTranscript Component
 *
 * This is a fully working example showing how to implement a reverse-chronological
 * live transcript panel with auto-scroll and WebSocket streaming.
 *
 * Features:
 * - Newest messages appear at the TOP
 * - Older messages push downward
 * - Auto-scrolls to top when new message arrives
 * - Pauses auto-scroll when user is manually scrolling
 * - Shows timestamp, speaker badge, and message text
 * - Prominent scrollbar for navigation
 */

import React, { useEffect, useRef, useState } from 'react';

function LiveTranscript() {
  const [messages, setMessages] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [userIsScrolling, setUserIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Mock WebSocket simulator - replace with real WebSocket
  useEffect(() => {
    if (!isLive) return;

    const mockMessages = [
      { speaker: 'Customer', text: 'Hi, I need help with my account.' },
      { speaker: 'Agent', text: 'Hello! I\'d be happy to help you. What seems to be the issue?' },
      { speaker: 'Customer', text: 'My bill is higher than usual this month.' },
      { speaker: 'Agent', text: 'Let me pull up your account details.' },
      { speaker: 'System', text: 'Account loaded: TC-887234' },
      { speaker: 'Agent', text: 'I can see you have some roaming charges. Did you travel recently?' },
      { speaker: 'Customer', text: 'Yes, I went to Canada for a business trip.' },
      { speaker: 'Agent', text: 'That explains the charges. Let me see what I can do for you.' },
      { speaker: 'System', text: 'Applying courtesy credit...' },
      { speaker: 'Agent', text: 'I\'ve applied a 50% courtesy credit to your account.' },
      { speaker: 'Customer', text: 'Thank you so much! That helps a lot.' }
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < mockMessages.length) {
        const now = new Date();
        const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        setMessages(prev => [...prev, {
          ...mockMessages[messageIndex],
          timestamp,
          id: Date.now() + messageIndex
        }]);

        messageIndex++;
      } else {
        clearInterval(interval);
        setIsLive(false);
      }
    }, 2000); // New message every 2 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  // Auto-scroll to top when new messages arrive (unless user is scrolling)
  useEffect(() => {
    if (messages.length > 0 && containerRef.current && !userIsScrolling) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [messages, userIsScrolling]);

  // Detect manual scrolling
  const handleScroll = () => {
    setUserIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Resume auto-scroll after 3 seconds of no scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      setUserIsScrolling(false);
    }, 3000);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const startDemo = () => {
    setMessages([]);
    setIsLive(true);
  };

  const resetDemo = () => {
    setMessages([]);
    setIsLive(false);
  };

  // Reverse messages to show newest first
  const reversedMessages = [...messages].reverse();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          📝 Live Transcript {isLive && <span style={styles.liveBadge}>● LIVE</span>}
        </h2>
        <div style={styles.controls}>
          <button onClick={startDemo} disabled={isLive} style={styles.button}>
            Start Demo
          </button>
          <button onClick={resetDemo} style={styles.button}>
            Reset
          </button>
        </div>
      </div>

      {userIsScrolling && isLive && (
        <div style={styles.scrollHint}>
          ⏸️ Auto-scroll paused - stop scrolling to resume
        </div>
      )}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={styles.transcriptContainer}
      >
        {messages.length === 0 ? (
          <p style={styles.emptyState}>Waiting for messages...</p>
        ) : (
          reversedMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.message,
                ...(msg.speaker === 'Agent' ? styles.messageAgent : {}),
                ...(msg.speaker === 'Customer' ? styles.messageCustomer : {}),
                ...(msg.speaker === 'System' ? styles.messageSystem : {})
              }}
            >
              <div style={styles.messageHeader}>
                <span style={styles.timestamp}>[{msg.timestamp}]</span>
                <span style={{
                  ...styles.speakerBadge,
                  ...(msg.speaker === 'Agent' ? styles.badgeAgent : {}),
                  ...(msg.speaker === 'Customer' ? styles.badgeCustomer : {}),
                  ...(msg.speaker === 'System' ? styles.badgeSystem : {})
                }}>
                  {msg.speaker === 'Customer' && '👤 '}
                  {msg.speaker === 'Agent' && '👨‍💼 '}
                  {msg.speaker === 'System' && '🔔 '}
                  {msg.speaker}
                </span>
              </div>
              <div style={styles.messageText}>{msg.text}</div>
            </div>
          ))
        )}
      </div>

      <div style={styles.footer}>
        <span style={styles.messageCount}>
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </span>
        {userIsScrolling && (
          <span style={styles.scrollIndicator}>
            🔒 Auto-scroll paused
          </span>
        )}
      </div>
    </div>
  );
}

// Inline styles (replace with Tailwind or CSS modules in production)
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '2px solid #e5e7eb'
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#1f2937'
  },
  liveBadge: {
    color: '#ef4444',
    fontSize: '0.875rem',
    fontWeight: 600,
    marginLeft: '8px',
    background: '#fee2e2',
    padding: '4px 10px',
    borderRadius: '12px',
    animation: 'pulse 2s infinite'
  },
  controls: {
    display: 'flex',
    gap: '8px'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  scrollHint: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '8px 12px',
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: 600,
    borderRadius: '6px',
    marginBottom: '12px',
    border: '1px dashed #f59e0b'
  },
  transcriptContainer: {
    height: '400px',
    overflowY: 'scroll',
    padding: '16px',
    backgroundColor: '#fafafa',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    scrollBehavior: 'smooth'
  },
  emptyState: {
    textAlign: 'center',
    color: '#9ca3af',
    fontStyle: 'italic',
    padding: '40px'
  },
  message: {
    marginBottom: '14px',
    padding: '14px 16px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    borderLeft: '4px solid transparent',
    animation: 'slideInFromTop 0.4s ease-out'
  },
  messageAgent: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 40%, #ffffff 100%)',
    borderLeftColor: '#3b82f6'
  },
  messageCustomer: {
    background: 'linear-gradient(135deg, #fce7f3 0%, #fdf2f8 40%, #ffffff 100%)',
    borderLeftColor: '#ec4899'
  },
  messageSystem: {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fef9c3 40%, #ffffff 100%)',
    borderLeftColor: '#f59e0b'
  },
  messageHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  timestamp: {
    color: '#6b7280',
    fontSize: '0.75rem',
    fontWeight: 600,
    fontFamily: 'monospace',
    background: 'rgba(107, 114, 128, 0.1)',
    padding: '2px 8px',
    borderRadius: '4px'
  },
  speakerBadge: {
    fontWeight: 700,
    fontSize: '0.85rem',
    padding: '4px 10px',
    borderRadius: '12px',
    color: 'white'
  },
  badgeAgent: {
    backgroundColor: '#3b82f6'
  },
  badgeCustomer: {
    backgroundColor: '#ec4899'
  },
  badgeSystem: {
    backgroundColor: '#f59e0b'
  },
  messageText: {
    color: '#1f2937',
    lineHeight: 1.7,
    fontSize: '0.95rem',
    paddingLeft: '4px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '2px solid #e5e7eb',
    fontSize: '0.875rem'
  },
  messageCount: {
    color: '#6b7280',
    fontWeight: 600,
    background: '#f3f4f6',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  scrollIndicator: {
    color: '#f59e0b',
    fontWeight: 600,
    background: '#fef3c7',
    padding: '4px 10px',
    borderRadius: '12px'
  }
};

export default LiveTranscript;
