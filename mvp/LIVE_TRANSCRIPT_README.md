# Live Transcript Component - Documentation

## Overview

The **LiveTranscript** component displays real-time conversation messages in **reverse chronological order** (newest messages at the top), with automatic scrolling and intelligent scroll behavior detection.

## ✨ Key Features

### 1. **Reverse Chronological Display**
- ✅ Newest messages appear at the **TOP**
- ✅ Older messages push **downward** automatically
- ✅ Natural reading flow for live monitoring

### 2. **Smart Auto-Scroll**
- ✅ Automatically scrolls to top when new message arrives
- ✅ Pauses auto-scroll when user is manually scrolling
- ✅ Resumes auto-scroll after 3 seconds of inactivity
- ✅ Visual indicator shows when auto-scroll is paused

### 3. **Prominent Scrollbar**
- ✅ Always visible (14px wide)
- ✅ Styled with gradients for modern look
- ✅ Hover and active states
- ✅ Works in Chrome, Safari, and Firefox

### 4. **Message Display**
- ✅ Timestamp (HH:MM:SS format)
- ✅ Speaker badge (Customer, Agent, System)
- ✅ Color-coded by speaker type
- ✅ Icons for visual identification
- ✅ Smooth slide-in animations

### 5. **Real-Time Streaming**
- ✅ WebSocket support for live updates
- ✅ Efficient re-rendering with React hooks
- ✅ Message counter in footer
- ✅ Live indicator badge

---

## 🎨 UI Layout

```
┌────────────────────────────────────────────────┐
│ 📝 Live Transcript        ● LIVE   ⏱️ 2:34    │
├────────────────────────────────────────────────┤
│ ⏸️ Auto-scroll paused - scroll to resume       │ ← Shows when user scrolls
├────────────────────────────────────────────────┤
│                                                │
│  [00:44] 👤 Customer                           │ ← NEWEST (top)
│  I need help with my bill...                   │
│                                                │
│  [00:39] 👨‍💼 Agent                              │
│  Sure, let me pull up your account.            │
│                                                │
│  [00:31] 👤 Customer                           │
│  My bill is higher than usual.                 │ ← OLDEST (bottom)
│                                           ║    │ ← Scrollbar
│                                           ║    │
└────────────────────────────────────────────────┘
│ 12 messages            🔒 Auto-scroll paused   │
└────────────────────────────────────────────────┘
```

---

## 📦 Component Structure

### File: `TranscriptPanel.js`

```javascript
function TranscriptPanel({ transcript, active, callStartTime }) {
  // State
  const [userIsScrolling, setUserIsScrolling] = useState(false);
  const containerRef = useRef(null);

  // Auto-scroll to top when new messages arrive
  useEffect(() => {
    if (!userIsScrolling && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [transcript]);

  // Reverse array to show newest first
  const reversedTranscript = [...transcript].reverse();

  return (
    <div className="transcript-container" ref={containerRef}>
      {reversedTranscript.map((message, idx) => (
        <TranscriptMessage key={idx} message={message} />
      ))}
    </div>
  );
}
```

---

## 🎨 Styling Guide

### Using Tailwind CSS

```jsx
<div className="h-96 overflow-y-scroll scroll-smooth bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
  {reversedMessages.map(msg => (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500 animate-slide-in-top">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
          [{msg.timestamp}]
        </span>
        <span className="text-sm font-bold bg-blue-500 text-white px-3 py-1 rounded-full">
          👨‍💼 {msg.speaker}
        </span>
      </div>
      <div className="text-gray-800 leading-relaxed">
        {msg.text}
      </div>
    </div>
  ))}
</div>
```

### Custom CSS Classes

```css
/* Always-visible scrollbar */
.transcript-container {
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.transcript-container::-webkit-scrollbar {
  width: 14px;
}

.transcript-container::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #6b7280 0%, #4b5563 100%);
  border-radius: 8px;
}

/* Slide in from top animation */
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.transcript-line {
  animation: slideInFromTop 0.4s ease-out;
}
```

---

## 🔌 WebSocket Integration

### Client-Side (React)

```javascript
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    console.log('Connected to transcript stream');
    ws.send(JSON.stringify({
      action: 'start_call',
      callId: 'CALL-001'
    }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'transcript_line') {
      setTranscript(prev => [...prev, message.data]);
    }
  };

  return () => ws.close();
}, []);
```

### Server-Side (Node.js)

See `TRANSCRIPT_SIMULATOR.js` for a complete working example.

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  // Simulate streaming messages every 2 seconds
  const interval = setInterval(() => {
    ws.send(JSON.stringify({
      type: 'transcript_line',
      data: {
        speaker: 'Agent',
        text: 'Hello, how can I help you?',
        timestamp: '00:12'
      }
    }));
  }, 2000);
});
```

---

## 📊 Message Data Structure

```typescript
interface TranscriptMessage {
  speaker: 'Customer' | 'Agent' | 'System';
  text: string;
  timestamp: string; // Format: "HH:MM:SS" or "MM:SS"
  id?: string | number; // Optional unique identifier
}
```

### Example Message

```json
{
  "speaker": "Customer",
  "text": "My bill is higher than usual this month.",
  "timestamp": "00:45",
  "id": "msg_1234567890"
}
```

---

## 🚀 Usage Examples

### Basic Implementation

```jsx
import TranscriptPanel from './components/TranscriptPanel';

function App() {
  const [transcript, setTranscript] = useState([]);
  const [callActive, setCallActive] = useState(false);

  return (
    <TranscriptPanel
      transcript={transcript}
      active={callActive}
      callStartTime={Date.now()}
    />
  );
}
```

### With Mock Data

```jsx
// Simulate streaming messages
useEffect(() => {
  if (!callActive) return;

  const messages = [
    { speaker: 'Customer', text: 'Hello, I need help...' },
    { speaker: 'Agent', text: 'How can I assist you?' }
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index < messages.length) {
      const now = new Date();
      const timestamp = `${now.getMinutes()}:${now.getSeconds()}`;

      setTranscript(prev => [...prev, {
        ...messages[index],
        timestamp
      }]);

      index++;
    }
  }, 2000);

  return () => clearInterval(interval);
}, [callActive]);
```

---

## 🎯 Auto-Scroll Behavior

### How It Works

1. **New Message Arrives** → Container scrolls to `top: 0` smoothly
2. **User Scrolls Manually** → Auto-scroll **pauses** for 3 seconds
3. **User Stops Scrolling** → Auto-scroll **resumes** automatically
4. **Visual Feedback** → "Auto-scroll paused" indicator appears

### Implementation

```javascript
const [userIsScrolling, setUserIsScrolling] = useState(false);
const scrollTimeoutRef = useRef(null);

const handleScroll = () => {
  setUserIsScrolling(true);

  if (scrollTimeoutRef.current) {
    clearTimeout(scrollTimeoutRef.current);
  }

  scrollTimeoutRef.current = setTimeout(() => {
    setUserIsScrolling(false);
  }, 3000);
};
```

---

## 🎨 Speaker Color Coding

| Speaker  | Border Color | Background Gradient         | Badge Color |
|----------|--------------|----------------------------|-------------|
| Agent    | Blue (#3b82f6) | Blue gradient             | Blue        |
| Customer | Pink (#ec4899) | Pink gradient             | Pink        |
| System   | Orange (#f59e0b) | Yellow gradient          | Orange      |

---

## 📱 Responsive Design

```css
@media (max-width: 768px) {
  .transcript-container {
    height: 300px; /* Smaller on mobile */
  }

  .transcript-line {
    padding: 10px 12px;
    font-size: 0.875rem;
  }

  .speaker-badge {
    font-size: 0.75rem;
  }
}
```

---

## 🧪 Testing

### Manual Testing Steps

1. ✅ Start demo call
2. ✅ Verify newest message appears at top
3. ✅ Scroll down manually
4. ✅ Verify auto-scroll paused indicator appears
5. ✅ Wait 3 seconds without scrolling
6. ✅ Verify auto-scroll resumes
7. ✅ Check scrollbar visibility
8. ✅ Test with different message volumes

### Unit Test Example

```javascript
import { render, screen } from '@testing-library/react';
import TranscriptPanel from './TranscriptPanel';

test('displays newest message first', () => {
  const transcript = [
    { speaker: 'Agent', text: 'First message', timestamp: '00:01' },
    { speaker: 'Customer', text: 'Second message', timestamp: '00:02' }
  ];

  render(<TranscriptPanel transcript={transcript} active={true} />);

  const messages = screen.getAllByRole('article');
  expect(messages[0]).toHaveTextContent('Second message'); // Newest first
});
```

---

## 🐛 Troubleshooting

### Scrollbar Not Visible

**Problem:** Scrollbar doesn't appear

**Solutions:**
1. Ensure container has `overflow-y: scroll` (not `auto`)
2. Add `min-height` to container
3. Check browser compatibility (webkit vs firefox)

```css
.transcript-container {
  overflow-y: scroll !important;
  min-height: 320px;
}
```

### Auto-Scroll Not Working

**Problem:** Container doesn't scroll to top

**Solutions:**
1. Verify `ref` is attached to container
2. Check `scrollTo` browser support
3. Use fallback: `scrollTop = 0`

```javascript
if (containerRef.current) {
  containerRef.current.scrollTo?.({ top: 0, behavior: 'smooth' })
    || (containerRef.current.scrollTop = 0);
}
```

### Messages Not Reversing

**Problem:** Newest messages appear at bottom

**Solution:** Ensure array is reversed before mapping

```javascript
const reversedTranscript = [...transcript].reverse();
```

---

## 📚 Files Included

1. **`TranscriptPanel.js`** - Main production component
2. **`LiveTranscript_EXAMPLE.jsx`** - Standalone demo component
3. **`TRANSCRIPT_SIMULATOR.js`** - WebSocket simulator server
4. **`App.css`** - Complete styling
5. **`LIVE_TRANSCRIPT_README.md`** - This documentation

---

## 🔥 Performance Optimization

### Virtual Scrolling (for 1000+ messages)

```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={400}
  itemCount={reversedTranscript.length}
  itemSize={80}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <TranscriptMessage message={reversedTranscript[index]} />
    </div>
  )}
</FixedSizeList>
```

### Memoization

```javascript
const TranscriptMessage = React.memo(({ message }) => {
  return (
    <div className="transcript-line">
      {/* Message content */}
    </div>
  );
});
```

---

## 🎓 Learning Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [CSS Scrollbar Styling](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📝 License

MIT License - Feel free to use in your projects!

---

**Created for ProcAI MVP** 🤖
