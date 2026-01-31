exports.handler = async (event, context) => {
  // Ambil query parameter
  const { name = 'Stranger' } = event.queryStringParameters;
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      greeting: `Hello, ${name}!`,
      yourIP: event.headers['client-ip'],
      userAgent: event.headers['user-agent']
    })
  };
};
