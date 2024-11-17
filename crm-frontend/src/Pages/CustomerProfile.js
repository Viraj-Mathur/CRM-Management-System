// src/pages/CustomerProfile.js
import React from 'react';

const CustomerProfile = ({ customer, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h3 className="text-2xl font-bold mb-4">{customer.name}'s Profile</h3>
        
        {/* Contact Information */}
        <div className="space-y-2">
          <h4 className="font-semibold text-blue-700">Contact Information</h4>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Total Spending:</strong> INR {customer.totalSpending}</p>
          <p><strong>Engagement Score:</strong> {customer.engagementScore}</p>
          <p><strong>Visits:</strong> {customer.visits}</p>
          <p><strong>Last Visit:</strong> {customer.lastVisit}</p>
          <p><strong>Segment:</strong> {customer.segment || 'Not assigned'}</p>
        </div>

        {/* Purchase History */}
        <div className="mt-4">
          <h4 className="font-semibold text-blue-700">Purchase History</h4>
          {customer.purchaseHistory && customer.purchaseHistory.length > 0 ? (
            <ul className="list-disc ml-5">
              {customer.purchaseHistory.map((purchase, index) => (
                <li key={index}>
                  Date: {purchase.date}, Amount: INR {purchase.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p>No purchase history available.</p>
          )}
        </div>
        
        {/* Communication Logs */}
        <div className="mt-4">
          <h4 className="font-semibold text-blue-700">Communication Logs</h4>
          {customer.communicationLogs && customer.communicationLogs.length > 0 ? (
            <ul className="list-disc ml-5">
              {customer.communicationLogs.map((log, index) => (
                <li key={index}>
                  Date: {log.date}, Type: {log.type}, Note: {log.note}
                </li>
              ))}
            </ul>
          ) : (
            <p>No communication logs available.</p>
          )}
        </div>

        {/* Notes */}
        <div className="mt-4">
          <h4 className="font-semibold text-blue-700">Notes</h4>
          {customer.notes && customer.notes.length > 0 ? (
            <ul className="list-disc ml-5">
              {customer.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          ) : (
            <p>No additional notes available.</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomerProfile;
