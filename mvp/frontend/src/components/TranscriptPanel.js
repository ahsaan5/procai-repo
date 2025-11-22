import React, { useEffect, useRef, useState } from 'react';

function TranscriptPanel({ transcript, active, callStartTime }) {
  const containerRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [userIsScrolling, setUserIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  // Timer for elapsed call duration
  useEffect(() => {
    let interval;
    if (active && callStartTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [active, callStartTime]);

  // Auto-scroll to top when new messages arrive (unless user is actively scrolling)
  useEffect(() => {
    if (transcript.length > 0 && containerRef.current && !userIsScrolling) {
      // Scroll to top smoothly when new message arrives
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [transcript, userIsScrolling]);

  // Detect when user is manually scrolling
  const handleScroll = () => {
    setUserIsScrolling(true);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // After 3 seconds of no scrolling, resume auto-scroll
    scrollTimeoutRef.current = setTimeout(() => {
      setUserIsScrolling(false);
    }, 3000);
  };

  // Cleanup scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Reverse the transcript array to show newest first
  const reversedTranscript = [...transcript].reverse();

  return (
    <div className="panel transcript-panel">
      <div className="transcript-header">
        <h3>
          📝 Live Transcript
          {active && <span className="live-indicator">● LIVE</span>}
        </h3>
        {callStartTime && (
          <div className="call-timer">
            <span className="timer-icon">⏱️</span>
            <span className="timer-value">{formatTime(elapsedTime)}</span>
          </div>
        )}
      </div>

      {/* Show scroll hint when user is scrolling */}
      {userIsScrolling && active && (
        <div className="scroll-hint">
          Auto-scroll paused - scroll to resume
        </div>
      )}

      <div
        className="transcript-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {transcript.length === 0 ? (
          <p className="no-data">Waiting for call to start...</p>
        ) : (
          <>
            {/* Display messages in reverse chronological order (newest first) */}
            {reversedTranscript.map((line, idx) => {
              // Calculate actual index for unique key
              const actualIndex = transcript.length - 1 - idx;

              return (
                <div
                  key={actualIndex}
                  className={`transcript-line ${line.speaker.toLowerCase()}`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="message-header">
                    <span className="timestamp">[{line.timestamp}]</span>
                    <span className={`speaker-badge ${line.speaker.toLowerCase()}`}>
                      {line.speaker === 'Customer' && '👤'}
                      {line.speaker === 'Agent' && '👨‍💼'}
                      {line.speaker === 'System' && '🔔'}
                      {' '}{line.speaker}
                    </span>
                  </div>
                  <div className="text">{line.text}</div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Message counter */}
      {transcript.length > 0 && (
        <div className="transcript-footer">
          <span className="message-count">
            {transcript.length} message{transcript.length !== 1 ? 's' : ''}
          </span>
          {userIsScrolling && (
            <span className="auto-scroll-indicator">
              🔒 Auto-scroll paused
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default TranscriptPanel;
