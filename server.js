const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const LOG_FILE = path.join(__dirname, 'logs', 'demo_logs.txt');

// Buat folder logs jika belum ada
if (!fs.existsSync(path.join(__dirname, 'logs'))) {
    fs.mkdirSync(path.join(__dirname, 'logs'));
}

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    // Serve index.html
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading page');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    
    // Endpoint untuk logging (simulasi server hacker)
    else if (req.url === '/log' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const logEntry = `[${new Date().toISOString()}] IP: ${req.socket.remoteAddress} | Data: ${JSON.stringify(data)}\n`;
                
                console.log('📝 Log entry:', logEntry);
                
                // Simpan ke file (hanya untuk demo)
                fs.appendFile(LOG_FILE, logEntry, (err) => {
                    if (err) console.error('Error writing log:', err);
                });
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'logged', message: 'Data diterima (simulasi)' }));
            } catch (error) {
                res.writeHead(400);
                res.end('Invalid data');
            }
        });
    }
    
    // Halaman logs untuk melihat data (hanya lokal)
    else if (req.url === '/view-logs' && req.headers.host === 'localhost:8080') {
        fs.readFile(LOG_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(200);
                res.end('No logs yet');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`=== LOGS DEMO (Hanya Simulasi) ===\n\n${data}`);
        });
    }
    
    // 404 untuk lainnya
    else {
        res.writeHead(404);
        res.end('404 - Not Found (Demo Educational Only)');
    }
});

server.listen(PORT, 'localhost', () => {
    console.log(`
============================================
🚀 SERVER DEMO EDUKASIONAL BERJALAN
============================================
Alamat: http://localhost:${PORT}
Tujuan: Edukasi tentang phishing GPS
Perhatian: JANGAN gunakan untuk kejahatan!
============================================

Akses:
1. http://localhost:${PORT} - Halaman demo
2. http://localhost:${PORT}/view-logs - Lihat logs (kosong)

Tekan Ctrl+C untuk menghentikan server
    `);
});

// Handle shutdown
process.on('SIGINT', () => {
    console.log('\n\n🔒 Server dihentikan. Ingat: Gunakan pengetahuan ini untuk kebaikan!');
    process.exit(0);
});
