const fs = require('fs');
const http = require('http');

async function testProfileSave() {
    // 1. Get token
    const loginData = JSON.stringify({ email: 'admin@paft.com', password: 'password123' });

    const req = http.request('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(loginData)
        }
    }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const response = JSON.parse(data);
            const token = response.access_token;
            console.log("Token:", !!token);

            if (!token) {
                console.log("Login failed", response);
                return;
            }

            // 2. Try update
            const updateData = JSON.stringify({ name: 'Admin User', phone: '123456789', bio: 'Test bio' });
            const req2 = http.request('http://localhost:3001/api/auth/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(updateData),
                    'Authorization': 'Bearer ' + token
                }
            }, (res2) => {
                let data2 = '';
                res2.on('data', chunk => data2 += chunk);
                res2.on('end', () => {
                    console.log("Update status:", res2.statusCode);
                    console.log("Update response:", data2);
                });
            });
            req2.write(updateData);
            req2.end();
        });
    });

    req.write(loginData);
    req.end();
}

testProfileSave();
