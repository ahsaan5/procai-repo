/**
 * TRANSCRIPT MESSAGE SIMULATOR
 *
 * This script simulates a WebSocket server that streams transcript messages
 * in real-time. Use this to test the LiveTranscript component.
 *
 * Usage:
 * 1. Run this script: node TRANSCRIPT_SIMULATOR.js
 * 2. Connect your frontend to ws://localhost:8080
 * 3. Messages will stream every 2 seconds
 */

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Mock transcript data for two different calls
const CALL_TRANSCRIPTS = {
  'CALL-001': [
    { speaker: 'Customer', text: 'Hi, I\'m calling about my bill. It\'s way higher than usual.' },
    { speaker: 'Agent', text: 'Hello! I understand your concern. Let me pull up your account.' },
    { speaker: 'System', text: 'Loading customer account TC-887234...' },
    { speaker: 'Agent', text: 'I can see your account now. What\'s your usual monthly bill?' },
    { speaker: 'Customer', text: 'Usually around $90, but this month it\'s over $150!' },
    { speaker: 'Agent', text: 'I see. Let me review your recent charges.' },
    { speaker: 'System', text: 'Billing analysis complete. Roaming charges detected.' },
    { speaker: 'Agent', text: 'I found the issue. You have $67 in international roaming charges.' },
    { speaker: 'Customer', text: 'Oh! I went to Canada for a few days. I didn\'t know there would be charges.' },
    { speaker: 'Agent', text: 'That makes sense. You were roaming in Canada from May 8-12.' },
    { speaker: 'Customer', text: 'Is there anything you can do to help?' },
    { speaker: 'Agent', text: 'Absolutely. Since this is your first time, I can offer a 50% courtesy credit.' },
    { speaker: 'System', text: 'Applying $33.72 credit to account...' },
    { speaker: 'Agent', text: 'I\'ve applied a $33.72 credit. Your new bill is $122.71.' },
    { speaker: 'Customer', text: 'Thank you so much! That really helps.' },
    { speaker: 'Agent', text: 'You\'re welcome! For future trips, I recommend our TravelPass for $10/day.' },
    { speaker: 'Customer', text: 'That sounds great. How do I sign up?' },
    { speaker: 'Agent', text: 'I can add it to your account now. It activates automatically when you travel.' },
    { speaker: 'System', text: 'TravelPass feature added to customer profile.' },
    { speaker: 'Agent', text: 'All set! Is there anything else I can help you with today?' },
    { speaker: 'Customer', text: 'No, that\'s everything. Thanks again!' },
    { speaker: 'Agent', text: 'My pleasure! Have a great day.' }
  ],
  'CALL-002': [
    { speaker: 'Customer', text: 'My phone has no service for the past 3 hours. I work from home!' },
    { speaker: 'Agent', text: 'I\'m so sorry to hear that. Let me check what\'s happening right away.' },
    { speaker: 'System', text: 'Loading customer account TC-923461...' },
    { speaker: 'Agent', text: 'What\'s your zip code so I can check for outages?' },
    { speaker: 'Customer', text: '90069 - West Hollywood area.' },
    { speaker: 'Agent', text: 'Checking network status for your area...' },
    { speaker: 'System', text: 'Network outage detected in area 90069. Tower #4721 maintenance.' },
    { speaker: 'Agent', text: 'I found the issue. There\'s a tower outage in your area being repaired.' },
    { speaker: 'Customer', text: 'How long will this take? I have important work calls!' },
    { speaker: 'Agent', text: 'The estimated restoration time is 4:00 PM today. About 2 more hours.' },
    { speaker: 'Customer', text: 'That\'s too long. What can I do now?' },
    { speaker: 'Agent', text: 'I can help you set up WiFi calling so you can make calls over your internet.' },
    { speaker: 'Customer', text: 'Yes please! Walk me through it.' },
    { speaker: 'Agent', text: 'Great. On your iPhone, go to Settings > Phone > WiFi Calling.' },
    { speaker: 'Customer', text: 'Okay, I see it.' },
    { speaker: 'Agent', text: 'Toggle it on and follow the prompts to set up your emergency address.' },
    { speaker: 'System', text: 'WiFi calling activated for customer.' },
    { speaker: 'Customer', text: 'It\'s working! I can see the WiFi calling icon now.' },
    { speaker: 'Agent', text: 'Perfect! I\'m also applying a $35 service credit for the inconvenience.' },
    { speaker: 'System', text: 'Service credit of $35 applied to account.' },
    { speaker: 'Customer', text: 'Thank you. I really appreciate the help.' },
    { speaker: 'Agent', text: 'You\'re welcome. I\'ll also set up notifications for when service is restored.' },
    { speaker: 'Customer', text: 'That would be great.' },
    { speaker: 'System', text: 'Outage alert subscription created.' },
    { speaker: 'Agent', text: 'All set. You\'ll get a text when the tower is back online.' },
    { speaker: 'Customer', text: 'Perfect. Thanks for your help!' },
    { speaker: 'Agent', text: 'My pleasure. Sorry again for the disruption. Have a good day!' }
  ]
};

console.log('🚀 Transcript Simulator WebSocket Server started on ws://localhost:8080');
console.log('📋 Available call IDs: CALL-001 (Billing), CALL-002 (Network Outage)');

wss.on('connection', (ws) => {
  console.log('✅ Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.action === 'start_call' && data.callId) {
        const callId = data.callId;
        const transcript = CALL_TRANSCRIPTS[callId];

        if (!transcript) {
          ws.send(JSON.stringify({
            type: 'error',
            message: `Call ID ${callId} not found`
          }));
          return;
        }

        console.log(`📞 Starting simulation for ${callId}`);

        let messageIndex = 0;
        const startTime = Date.now();

        const interval = setInterval(() => {
          if (messageIndex < transcript.length) {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            const timestamp = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            const message = {
              type: 'transcript_line',
              data: {
                ...transcript[messageIndex],
                timestamp
              }
            };

            ws.send(JSON.stringify(message));
            console.log(`📨 Sent: [${timestamp}] ${transcript[messageIndex].speaker}: ${transcript[messageIndex].text.substring(0, 50)}...`);

            messageIndex++;
          } else {
            // Send call end message
            ws.send(JSON.stringify({
              type: 'call_end',
              data: {
                callId,
                duration: Math.floor((Date.now() - startTime) / 1000),
                totalMessages: transcript.length
              }
            }));

            console.log(`✅ Call ${callId} simulation complete`);
            clearInterval(interval);
          }
        }, 2000); // Send new message every 2 seconds

        // Clean up on disconnect
        ws.on('close', () => {
          clearInterval(interval);
          console.log('❌ Client disconnected');
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: error.message
      }));
    }
  });

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connected',
    message: 'Transcript Simulator connected. Send {"action": "start_call", "callId": "CALL-001"} to begin.'
  }));
});

// Handle server errors
wss.on('error', (error) => {
  console.error('❌ WebSocket server error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  wss.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
