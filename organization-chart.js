addEventListener('fetch', (event) => {
    event.respondWith(handleOrganizationChartRequest(event.request));
  });
  
  async function handleOrganizationChartRequest(request) {
    // Retrieve organization data from Workers KV (replace 'your_namespace' with your actual namespace)
    const orgData = await ORG_KV_NAMESPACE.get('organization_data');
  
    if (orgData) {
      const orgChart = convertCsvToJson(orgData);
      return new Response(JSON.stringify({ organization: { departments: orgChart } }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('Organization data not found', { status: 404 });
    }
  }
  
  // Function to convert CSV to JSON (implement your conversion logic)
  function convertCsvToJson(csvData) {
   // Parse CSV using PapaParse
  const { data, errors, meta } = Papa.parse(csvText, { header: true });

  if (errors.length > 0) {
    console.error('CSV Parsing Error:', errors);
    throw new Error('Failed to parse CSV.');
  }

  return data;
  }
  



  addEventListener('fetch', (event) => {
    event.respondWith(handlePostOrganizationChartRequest(event.request));
  });
  
  async function handlePostOrganizationChartRequest(request) {
    const requestData = await request.json();
    const { organizationData } = requestData;
  
    // Store the new organization data in Workers KV (replace 'your_namespace' with your actual namespace)
    await ORG_KV_NAMESPACE.put('organization_data', organizationData);
  
    // Respond with the graph representation of the organization
    const orgChart = convertCsvToJson(organizationData);
    return new Response(JSON.stringify({ organization: { departments: orgChart } }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
