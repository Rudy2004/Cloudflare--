import React, { useState, useEffect } from 'react';

const App = () => {
  // State variables
  const [organizationChart, setOrganizationChart] = useState(null);
  const [meData, setMeData] = useState(null);

  // Fetch organization chart data on component mount
  useEffect(() => {
    fetchOrganizationChart();
  }, []);

  // Fetch data from the /organization-chart endpoint
  const fetchOrganizationChart = async () => {
    try {
      const response = await fetch('/.netlify/functions/organization-chart');
      const data = await response.json();
      setOrganizationChart(data.organization.departments);
    } catch (error) {
      console.error('Error fetching organization chart:', error);
    }
  };

  // Fetch data from the /me endpoint
  const fetchMeData = async () => {
    try {
      const response = await fetch('/.netlify/functions/me');
      const data = await response.json();
      setMeData(data);
    } catch (error) {
      console.error('Error fetching "me" data:', error);
    }
  };

  // Display organization chart
  const renderOrganizationChart = () => {
    if (!organizationChart) {
      return <p>Loading organization chart...</p>;
    }

    // Use organizationChart to render your organizational chart component
    // You can use any visualization library here (e.g., react-org-chart)
    // Replace the following line with your actual organizational chart rendering logic
    return <div>{JSON.stringify(organizationChart, null, 2)}</div>;
  };

  // Display "me" data
  const renderMeData = () => {
    if (!meData) {
      return <p>Loading "me" data...</p>;
    }

    // Replace the following line with your actual rendering logic
    return (
      <div>
        <h2>My Information</h2>
        <p>Name: {meData.name}</p>
        <p>Interesting Fact: {meData.interestingFact}</p>
        <p>Skills: {meData.skills.join(', ')}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>React Frontend for Cloudflare Functions</h1>
      {renderOrganizationChart()}
      <button onClick={fetchMeData}>Fetch "Me" Data</button>
      {renderMeData()}
    </div>
  );
};

export default App;

