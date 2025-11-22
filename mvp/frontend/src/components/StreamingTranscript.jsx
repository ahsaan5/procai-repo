import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * StreamingTranscript Component
 *
 * A production-ready real-time transcript component with:
 * - Newest messages at TOP
 * - Smart auto-scroll that respects user input
 * - Full scrollable history
 * - No flickering or re-mounting
 * - Support for both mock streaming and WebSocket
 */
const StreamingTranscript = ({
  streamSource = 'mock', // 'mock' | 'websocket'
  websocketUrl = 'ws://localhost:8000/ws/call/CALL-001',
  onMessageReceived = null,
  autoStart = true
}) => {
  // State: messages array (newest first)
  const [messages, setMessages] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [userIsScrolling, setUserIsScrolling] = useState(false);

  // Refs
  const scrollContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const wsRef = useRef(null);
  const streamIntervalRef = useRef(null);
  const messageCountRef = useRef(0);

  // Auto-scroll to top when new message arrives (if user is not scrolling)
  useEffect(() => {
    if (messages.length > 0 && !userIsScrolling && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [messages.length, userIsScrolling]);

  // Detect user manual scrolling
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const scrollTop = scrollContainerRef.current.scrollTop;

    // If user scrolled away from top (>30px), disable auto-scroll
    if (scrollTop > 30) {
      setUserIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    }
    // If user scrolled back to near top (<=10px), re-enable auto-scroll
    else if (scrollTop <= 10) {
      setUserIsScrolling(false);

      // Clear timeout since we're back at top
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    }
  }, []);

  // Mock streaming implementation
  const startMockStream = useCallback(() => {
    const mockMessages = [
      { speaker: 'Agent', text: 'Thank you for calling. How can I help you today?' },
      { speaker: 'Customer', text: 'Hi, I have a question about my bill.' },
      { speaker: 'Agent', text: 'I\'d be happy to help. Let me pull up your account.' },
      { speaker: 'Customer', text: 'It seems higher than usual this month.' },
      { speaker: 'Agent', text: 'I can see your account now. Let me review the charges.' },
      { speaker: 'System', text: 'Account loaded: TC-887234' },
      { speaker: 'Agent', text: 'I found the issue - there are roaming charges from your recent trip.' },
      { speaker: 'Customer', text: 'Oh, I didn\'t know there would be extra charges.' },
      { speaker: 'Agent', text: 'Let me explain the charges and see what I can do for you.' },
      { speaker: 'Customer', text: 'I appreciate that, thank you.' },
      { speaker: 'Agent', text: 'I\'ll apply a courtesy credit to your account.' },
      { speaker: 'System', text: 'Credit applied: $33.72' },
      { speaker: 'Customer', text: 'That\'s very helpful, thank you!' },
      { speaker: 'Agent', text: 'You\'re welcome! Is there anything else I can help with?' },
      { speaker: 'Customer', text: 'No, that\'s all. Thanks again!' },
      { speaker: 'Agent', text: 'Have a great day!' }
    ];

    let index = 0;
    messageCountRef.current = 0;

    streamIntervalRef.current = setInterval(() => {
      if (index < mockMessages.length) {
        const now = new Date();
        const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const newMessage = {
          id: `msg-${Date.now()}-${index}`,
          timestamp,
          speaker: mockMessages[index].speaker,
          text: mockMessages[index].text
        };

        // Add message at the TOP (beginning of array)
        setMessages(prev => [newMessage, ...prev]);

        if (onMessageReceived) {
          onMessageReceived(newMessage);
        }

        index++;
        messageCountRef.current++;
      } else {
        // Stream ended
        clearInterval(streamIntervalRef.current);
        setIsLive(false);
      }
    }, 2000); // New message every 2 seconds
  }, [onMessageReceived]);

  // WebSocket implementation
  const startWebSocketStream = useCallback(() => {
    const ws = new WebSocket(websocketUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsLive(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'transcript_line') {
        const messageData = data.data;
        const newMessage = {
          id: `msg-${Date.now()}-${messageCountRef.current}`,
          timestamp: messageData.timestamp || new Date().toLocaleTimeString(),
          speaker: messageData.speaker || 'Agent',
          text: messageData.text || ''
        };

        // Add message at the TOP (beginning of array)
        setMessages(prev => [newMessage, ...prev]);

        if (onMessageReceived) {
          onMessageReceived(newMessage);
        }

        messageCountRef.current++;
      } else if (data.type === 'call_end') {
        setIsLive(false);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsLive(false);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      setIsLive(false);
    };
  }, [websocketUrl, onMessageReceived]);

  // Start streaming on mount (if autoStart)
  useEffect(() => {
    if (autoStart) {
      setIsLive(true);
      messageCountRef.current = 0;

      if (streamSource === 'mock') {
        startMockStream();
      } else if (streamSource === 'websocket') {
        startWebSocketStream();
      }
    }

    // Cleanup on unmount
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [autoStart, streamSource, startMockStream, startWebSocketStream]);

  // Manual start function
  const startStream = () => {
    setMessages([]);
    setIsLive(true);
    messageCountRef.current = 0;

    if (streamSource === 'mock') {
      startMockStream();
    } else if (streamSource === 'websocket') {
      startWebSocketStream();
    }
  };

  // Manual stop function
  const stopStream = () => {
    setIsLive(false);

    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
  };

  // Reset function
  const resetStream = () => {
    stopStream();
    setMessages([]);
    setUserIsScrolling(false);
    messageCountRef.current = 0;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-800">📝 Live Transcript</h2>
          {isLive && (
            <span className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full animate-pulse">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              LIVE
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
          </span>

          {/* Control buttons */}
          <div className="flex gap-2 ml-2">
            {!isLive ? (
              <button
                onClick={startStream}
                className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Start
              </button>
            ) : (
              <button
                onClick={stopStream}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Stop
              </button>
            )}
            <button
              onClick={resetStream}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Auto-scroll pause indicator */}
      {userIsScrolling && isLive && (
        <div className="mx-6 mt-4 px-4 py-2 text-sm font-medium text-amber-800 bg-amber-100 border border-amber-300 rounded-lg flex items-center gap-2">
          <span>⏸️</span>
          <span>Auto-scroll paused - scroll to top to resume</span>
        </div>
      )}

      {/* Transcript container - FIXED HEIGHT with scroll */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-scroll px-6 py-4 space-y-3"
        style={{
          height: '500px',
          maxHeight: '500px',
          scrollBehavior: 'smooth'
        }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 italic">
              {isLive ? 'Waiting for messages...' : 'No messages yet. Click Start to begin streaming.'}
            </p>
          </div>
        ) : (
          <>
            {/* Render messages (already in reverse chronological order) */}
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
              />
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {streamSource === 'mock' ? 'Mock Stream' : 'WebSocket Stream'}
          </span>
          {userIsScrolling && (
            <span className="flex items-center gap-1 text-amber-600 font-medium">
              🔒 Auto-scroll paused
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * MessageBubble Component
 * Stable rendering with React.memo to prevent unnecessary re-renders
 */
const MessageBubble = React.memo(({ message }) => {
  const getSpeakerStyles = (speaker) => {
    switch (speaker) {
      case 'Agent':
        return {
          container: 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500',
          badge: 'bg-blue-500 text-white',
          icon: '👨‍💼'
        };
      case 'Customer':
        return {
          container: 'bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-pink-500',
          badge: 'bg-pink-500 text-white',
          icon: '👤'
        };
      case 'System':
        return {
          container: 'bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500',
          badge: 'bg-amber-500 text-white',
          icon: '🔔'
        };
      default:
        return {
          container: 'bg-gray-50 border-l-4 border-gray-400',
          badge: 'bg-gray-500 text-white',
          icon: '💬'
        };
    }
  };

  const styles = getSpeakerStyles(message.speaker);

  return (
    <div className={`p-4 rounded-lg shadow-sm transition-all hover:shadow-md ${styles.container}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono text-gray-500 bg-gray-200 px-2 py-1 rounded">
          {message.timestamp}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${styles.badge}`}>
          <span>{styles.icon}</span>
          {message.speaker}
        </span>
      </div>
      <p className="text-gray-800 leading-relaxed">
        {message.text}
      </p>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';

export default StreamingTranscript;
