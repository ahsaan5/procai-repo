import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const api = {
  getCustomer: (customerId) =>
    axios.get(`${API_BASE}/customer/${customerId}`),

  getBilling: (customerId) =>
    axios.get(`${API_BASE}/billing/${customerId}`),

  getNetworkStatus: (zipCode) =>
    axios.get(`${API_BASE}/network/${zipCode}`),

  getTickets: (customerId) =>
    axios.get(`${API_BASE}/tickets/${customerId}`),

  summarizeCall: (transcript, customerId) =>
    axios.post(`${API_BASE}/summarize_call`, { transcript, customer_id: customerId }),

  getSuggestions: (transcript, customerId, issueCategory) =>
    axios.post(`${API_BASE}/suggest_resolutions`, {
      transcript,
      customer_id: customerId,
      issue_category: issueCategory
    }),

  getCRMAutoFill: (callId, customerId, transcript, resolution) =>
    axios.post(`${API_BASE}/crm_autofill`, {
      call_id: callId,
      customer_id: customerId,
      transcript,
      resolution_applied: resolution
    }),

  submitFeedback: (data) =>
    axios.post(`${API_BASE}/end_call_feedback`, data),

  getMetrics: () =>
    axios.get(`${API_BASE}/metrics`)
};

export const createWebSocket = (callId) => {
  return new WebSocket(`ws://localhost:8000/ws/call/${callId}`);
};
