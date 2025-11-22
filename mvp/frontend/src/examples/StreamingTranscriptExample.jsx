import React, { useState } from 'react';
import StreamingTranscript from '../components/StreamingTranscript';

/**
 * Example Usage of StreamingTranscript Component
 *
 * This file demonstrates all the ways to use the StreamingTranscript component
 */

// Example 1: Mock Stream (Default)
export const MockStreamExample = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mock Stream Example</h1>
        <StreamingTranscript
          streamSource="mock"
          autoStart={true}
        />
      </div>
    </div>
  );
};

// Example 2: WebSocket Stream
export const WebSocketStreamExample = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">WebSocket Stream Example</h1>
        <StreamingTranscript
          streamSource="websocket"
          websocketUrl="ws://localhost:8000/ws/call/CALL-001"
          autoStart={false}
        />
      </div>
    </div>
  );
};

// Example 3: With Message Callback
export const WithCallbackExample = () => {
  const [lastMessage, setLastMessage] = useState(null);

  const handleMessageReceived = (message) => {
    setLastMessage(message);
    console.log('New message received:', message);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">With Callback Example</h1>

        {lastMessage && (
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-bold mb-2">Last Message Received:</h2>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(lastMessage, null, 2)}
            </pre>
          </div>
        )}

        <StreamingTranscript
          streamSource="mock"
          autoStart={true}
          onMessageReceived={handleMessageReceived}
        />
      </div>
    </div>
  );
};

// Example 4: Manual Control
export const ManualControlExample = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manual Control Example</h1>
        <p className="text-gray-600 mb-4">
          Use the Start/Stop/Reset buttons in the component header to control the stream.
        </p>
        <StreamingTranscript
          streamSource="mock"
          autoStart={false}
        />
      </div>
    </div>
  );
};

// Example 5: Side-by-Side Comparison
export const ComparisonExample = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Side-by-Side Comparison</h1>
      <div className="grid grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div>
          <h2 className="text-xl font-bold mb-3">Mock Stream</h2>
          <StreamingTranscript
            streamSource="mock"
            autoStart={true}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3">WebSocket Stream</h2>
          <StreamingTranscript
            streamSource="websocket"
            websocketUrl="ws://localhost:8000/ws/call/CALL-002"
            autoStart={false}
          />
        </div>
      </div>
    </div>
  );
};

// Default export: All examples in tabs
const StreamingTranscriptExamples = () => {
  const [activeTab, setActiveTab] = useState('mock');

  const tabs = [
    { id: 'mock', label: 'Mock Stream', component: <MockStreamExample /> },
    { id: 'websocket', label: 'WebSocket', component: <WebSocketStreamExample /> },
    { id: 'callback', label: 'With Callback', component: <WithCallbackExample /> },
    { id: 'manual', label: 'Manual Control', component: <ManualControlExample /> },
    { id: 'comparison', label: 'Comparison', component: <ComparisonExample /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default StreamingTranscriptExamples;
