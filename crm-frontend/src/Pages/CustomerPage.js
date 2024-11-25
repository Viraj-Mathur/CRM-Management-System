import React, { useState, useEffect } from 'react';
import CustomerProfile from './CustomerProfile';
import AddEditCustomerForm from './AddEditCustomerForm';
import axios from 'axios';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [showFilterBuilder, setShowFilterBuilder] = useState(false);
  const [filterConditions, setFilterConditions] = useState([]);
  const [logic, setLogic] = useState('AND');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://crm-management-system-1.onrender.com/api/customers');
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    setFilteredCustomers(customers.filter((customer) => 
      customer.name.toLowerCase().includes(query) || 
      customer.email.toLowerCase().includes(query)
    ));
  };

  const handleAddEditCustomer = async (customer) => {
    try {
      const method = customer.id ? 'PUT' : 'POST';
      const url = customer.id 
        ? `https://crm-management-system-1.onrender.com/api/customers/${customer.id}`
        : 'https://crm-management-system-1.onrender.com/api/customers';
      
      const response = await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(customer),
      });

      if (response.status === 200 || response.status === 201) {
        fetchCustomers();
        setShowAddEditForm(false);
      } else {
        console.error('Error saving customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await axios.delete(`https://crm-management-system-1.onrender.com/api/customers/${customerId}`);
      if (response.status === 200) {
        fetchCustomers();
      } else {
        console.error('Error deleting customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const addFilterCondition = () => {
    setFilterConditions([
      ...filterConditions,
      { field: 'total_spent', operator: '>', value: '', conditions: [], logic: 'AND' }
    ]);
  };

  const removeFilterCondition = (index) => {
    const updatedConditions = filterConditions.filter((_, i) => i !== index);
    setFilterConditions(updatedConditions);
  };

  const handleFilterConditionChange = (index, field, value) => {
    const updatedConditions = filterConditions.map((condition, i) =>
      i === index ? { ...condition, [field]: value } : condition
    );
    setFilterConditions(updatedConditions);
  };

  const applyFilters = () => {
    const evaluateCondition = (customer, condition) => {
      const { field, operator, value } = condition;
      let customerValue;

      if (field === 'last_visit') {
        customerValue = new Date(customer[field]);
      } else {
        customerValue = customer[field];
      }

      const comparisonValue =
        field === 'last_visit'
          ? new Date(new Date().setMonth(new Date().getMonth() - parseInt(value)))
          : isNaN(value)
          ? value
          : parseFloat(value);

      switch (operator) {
        case '>':
          return customerValue > comparisonValue;
        case '<':
          return customerValue < comparisonValue;
        case '>=':
          return customerValue >= comparisonValue;
        case '<=':
          return customerValue <= comparisonValue;
        case '==':
          return customerValue === comparisonValue;
        case '!=':
          return customerValue !== comparisonValue;
        default:
          return false;
      }
    };

    const evaluateFilters = (customer, conditions, logic) => {
      const results = conditions.map((condition) =>
        Array.isArray(condition.conditions)
          ? evaluateFilters(customer, condition.conditions, condition.logic) // Nested conditions
          : evaluateCondition(customer, condition)
      );

      return logic === 'AND'
        ? results.every((result) => result === true)
        : results.some((result) => result === true);
    };

    const filtered = customers.filter((customer) =>
      evaluateFilters(customer, filterConditions, logic)
    );

    setFilteredCustomers(filtered);
    setShowFilterBuilder(false);
  };

  const handleDownload = () => {
    const json = JSON.stringify(filteredCustomers, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Customer Management</h2>
        <div className="flex space-x-4">
          <button onClick={handleDownload} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-200">Download Data</button>
          <button onClick={() => setShowFilterBuilder(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Create Filter</button>
          <button onClick={() => setShowAddEditForm(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">Add Customer</button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-700 uppercase text-sm">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Total Spent</th>
            <th className="p-4">Last Visit</th>
            <th className="p-4">Visits</th>
            <th className="p-4">Segment</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100 transition duration-150">
              <td className="p-4 cursor-pointer" onClick={() => setSelectedCustomer(customer)}>{customer.name}</td>
              <td className="p-4 cursor-pointer" onClick={() => setSelectedCustomer(customer)}>{customer.email}</td>
              <td className="p-4">{customer.total_spent}</td>
              <td className="p-4">{customer.last_visit}</td>
              <td className="p-4">{customer.visits}</td>
              <td className="p-4">{customer.segment}</td>
              <td className="p-4">
                <button onClick={() => handleDeleteCustomer(customer.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-150">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCustomer && (
        <CustomerProfile
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {showAddEditForm && (
        <AddEditCustomerForm
          onSave={handleAddEditCustomer}
          onClose={() => setShowAddEditForm(false)}
        />
      )}

      {showFilterBuilder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-center mb-6">Create Custom Filter</h3>
            {filterConditions.map((condition, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <select value={condition.field} onChange={(e) => handleFilterConditionChange(index, 'field', e.target.value)} className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="total_spent">Total Spent</option>
                  <option value="last_visit">Last Visit (months ago)</option>
                  <option value="visits">Visits</option>
                  <option value="segment">Segment</option>
                </select>
                <select value={condition.operator} onChange={(e) => handleFilterConditionChange(index, 'operator', e.target.value)} className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                  <option value=">=">&gt;=</option>
                  <option value="<=">&lt;=</option>
                  <option value="==">==</option>
                  <option value="!=">!=</option>
                </select>
                <input
                  type={condition.field === 'last_visit' ? 'number' : 'text'}
                  value={condition.value}
                  onChange={(e) => handleFilterConditionChange(index, 'value', e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter value"
                />
                {filterConditions.length > 1 && (
                  <button onClick={() => removeFilterCondition(index)} className="text-red-500 font-semibold hover:underline">Remove</button>
                )}
              </div>
            ))}
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="logic" className="text-gray-700 font-semibold">Logic:</label>
              <select id="logic" value={logic} onChange={(e) => setLogic(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </div>
            <button onClick={addFilterCondition} className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition duration-200 mb-4">Add Condition</button>
            <div className="flex justify-between mt-6">
              <button onClick={() => setShowFilterBuilder(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200 w-full mr-2">Cancel</button>
              <button onClick={applyFilters} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 w-full ml-2">Apply Filter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
