import React from 'react';

function CustomerPanel({ customer, billing }) {
  if (!customer) {
    return (
      <div className="panel customer-panel">
        <h3>👤 Customer Profile</h3>
        <p className="no-data">No customer loaded. Start a call to begin.</p>
      </div>
    );
  }

  return (
    <div className="panel customer-panel">
      <h3>👤 Customer Profile</h3>
      <div className="customer-info">
        <div className="info-row">
          <strong>{customer.name}</strong>
        </div>
        <div className="info-row">
          <span className="label">Account:</span> {customer.customer_id}
        </div>
        <div className="info-row">
          <span className="label">Phone:</span> {customer.phone}
        </div>
        <div className="info-row">
          <span className="label">Email:</span> {customer.email}
        </div>
        <div className="info-row">
          <span className="label">Tenure:</span> {customer.tenure_months} months
        </div>
        <div className="info-row">
          <span className="label">Status:</span>
          <span className={`status ${customer.account_status.toLowerCase()}`}>
            {customer.account_status}
          </span>
        </div>
      </div>

      <h4>📱 Plan Details</h4>
      <div className="plan-info">
        <div className="info-row">
          <strong>{customer.plan.name}</strong>
        </div>
        <div className="info-row">
          <span className="label">Cost:</span> ${customer.plan.monthly_cost}/month
        </div>
        <div className="info-row">
          <span className="label">Data:</span> {customer.plan.data}
        </div>
        <div className="info-row">
          <span className="label">Hotspot:</span> {customer.plan.hotspot}
        </div>
      </div>

      <h4>📱 Device</h4>
      <div className="device-info">
        <div className="info-row">
          {customer.device.manufacturer} {customer.device.model}
        </div>
      </div>

      {billing && (
        <>
          <h4>💳 Current Bill</h4>
          <div className="billing-info">
            <div className="info-row highlight">
              <span className="label">Amount:</span>
              <strong>${billing.current_bill.amount}</strong>
            </div>
            <div className="info-row">
              <span className="label">Due:</span> {billing.current_bill.due_date}
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className={`status ${billing.current_bill.status.toLowerCase()}`}>
                {billing.current_bill.status}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerPanel;
