// src/pages/AddEditCustomerForm.js
import React, { useState } from 'react';

const AddEditCustomerForm = ({ customer = {}, onSave, onClose }) => {
  const [name, setName] = useState(customer.name || '');
  const [email, setEmail] = useState(customer.email || '');
  const [totalSpent, setTotalSpent] = useState(customer.total_spent || '');
  const [lastVisit, setLastVisit] = useState(customer.last_visit || '');
  const [visits, setVisits] = useState(customer.visits || '');
  const [segment, setSegment] = useState(customer.segment || '');

  const handleSubmit = () => {
    const updatedCustomer = {
      ...customer,
      name,
      email,
      total_spent: parseFloat(totalSpent),
      last_visit: lastVisit,
      visits: parseInt(visits),
      segment,
    };
    onSave(updatedCustomer);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4">{customer.id ? 'Edit Customer' : 'Add Customer'}</h3>
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        
        <input
          type="number"
          placeholder="Total Spent"
          value={totalSpent}
          onChange={(e) => setTotalSpent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="date"
          placeholder="Last Visit"
          value={lastVisit}
          onChange={(e) => setLastVisit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="number"
          placeholder="Visits"
          value={visits}
          onChange={(e) => setVisits(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Segment"
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditCustomerForm;
