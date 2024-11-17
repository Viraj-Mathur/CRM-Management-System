// src/pages/AudiencePage.js
import React, { useState } from 'react';

const AudiencePage = () => {
  const [conditions, setConditions] = useState([]);
  const [newCondition, setNewCondition] = useState({ field: '', operator: '', value: '' });
  const [audienceSize, setAudienceSize] = useState(0);
  const [segments, setSegments] = useState([]);

  // Add a new condition to the conditions list
  const handleAddCondition = () => {
    setConditions([...conditions, { ...newCondition }]);
    setNewCondition({ field: '', operator: '', value: '' });
  };

  // Handle saving the audience segment
  const handleSaveSegment = () => {
    const newSegment = {
      id: segments.length + 1,
      conditions,
      audienceSize, // Placeholder; replace with real data when integrating with backend
    };
    setSegments([...segments, newSegment]);
    setConditions([]);
    setAudienceSize(0);
  };

  // Handle deleting a saved segment
  const handleDeleteSegment = (id) => {
    setSegments(segments.filter(segment => segment.id !== id));
  };

  // Placeholder function to calculate audience size based on conditions
  const calculateAudienceSize = () => {
    setAudienceSize(Math.floor(Math.random() * 1000)); // Replace with actual calculation logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Audience Creation and Management</h1>

        {/* Audience Segment Builder */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Define Audience Segment</h2>
          <div className="flex space-x-4 mb-4">
            <select
              value={newCondition.field}
              onChange={(e) => setNewCondition({ ...newCondition, field: e.target.value })}
              className="p-2 border border-gray-300 rounded w-1/3"
            >
              <option value="">Select Field</option>
              <option value="spending">Total Spending</option>
              <option value="visits">Visits</option>
              <option value="lastVisit">Last Visit</option>
            </select>
            <select
              value={newCondition.operator}
              onChange={(e) => setNewCondition({ ...newCondition, operator: e.target.value })}
              className="p-2 border border-gray-300 rounded w-1/3"
            >
              <option value="">Select Operator</option>
              <option value=">">Greater Than</option>
              <option value="<">Less Than</option>
              <option value="=">Equals</option>
            </select>
            <input
              type="text"
              value={newCondition.value}
              onChange={(e) => setNewCondition({ ...newCondition, value: e.target.value })}
              placeholder="Value"
              className="p-2 border border-gray-300 rounded w-1/3"
            />
            <button
              onClick={handleAddCondition}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add Condition
            </button>
          </div>

          {/* Display Added Conditions */}
          <ul className="mb-4">
            {conditions.map((condition, index) => (
              <li key={index} className="flex items-center space-x-2 p-2 bg-gray-100 rounded mb-2">
                <span>{`${condition.field} ${condition.operator} ${condition.value}`}</span>
              </li>
            ))}
          </ul>

          {/* Preview Audience Size */}
          <button
            onClick={calculateAudienceSize}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Preview Audience Size
          </button>
          <p className="mt-2">Audience Size: {audienceSize}</p>
        </div>

        {/* Save Audience Segment */}
        <button
          onClick={handleSaveSegment}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mb-6"
        >
          Save Segment
        </button>

        {/* List of Saved Segments */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Saved Audience Segments</h2>
          <ul>
            {segments.map(segment => (
              <li key={segment.id} className="p-4 bg-gray-100 rounded mb-2 flex justify-between items-center">
                <span>Segment {segment.id} - Size: {segment.audienceSize}</span>
                <button
                  onClick={() => handleDeleteSegment(segment.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudiencePage;
