// Fungsi paling dasar
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "Hello from Netlify Functions!",
      timestamp: new Date().toISOString(),
      method: event.httpMethod,
      path: event.path
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
};
