/**
 * Minimal test: PATCH a single item and see if it persists
 */
async function test() {
    // Login
    const loginRes = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@paft.com', password: 'admin123' }),
    });
    const { access_token } = await loginRes.json();

    // PATCH single item
    console.log('PATCHing id=41 with valueAr...');
    const patchRes = await fetch('http://localhost:3001/api/content/bulk-update', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify([{ id: 41, value: 'Our Journey', valueAr: 'مسيرتنا' }]),
    });
    const patchData = await patchRes.json();
    console.log('PATCH response:', JSON.stringify(patchData[0]?.valueAr));

    // GET to verify
    const getRes = await fetch('http://localhost:3001/api/content/page/our-journey');
    const getData = await getRes.json();
    console.log('GET badge-text valueAr:', JSON.stringify(getData.hero?.['badge-text']?.valueAr));
}

test().catch(e => { console.error(e); process.exit(1); });
