// IMPORTANT: DEMO EDUKASIONAL SAJA
// Jangan gunakan untuk mencuri data!

exports.handler = async (event, context) => {
  // Hanya terima POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    // Parse data yang dikirim
    const data = JSON.parse(event.body);
    
    console.log('📍 Data lokasi diterima (DEMO):', {
      latitude: data.lat,
      longitude: data.lon,
      accuracy: data.accuracy,
      timestamp: new Date().toISOString(),
      ip: event.headers['client-ip'] || event.headers['x-forwarded-for'],
      userAgent: event.headers['user-agent']
    });
    
    // Simpan ke log (dalam realita, bisa ke database)
    // Tapi ini hanya demo, jadi cukup return success
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        success: true,
        message: 'Location received (DEMO ONLY)',
        note: 'Data tidak disimpan ke database manapun',
        receivedAt: new Date().toISOString()
      })
    };
    
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Invalid data format',
        details: error.message 
      })
    };
  }
};
