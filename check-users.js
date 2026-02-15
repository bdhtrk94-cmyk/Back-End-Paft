const mysql = require('mysql2/promise');

async function checkUsers() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'paft_cms'
    });

    const [rows] = await connection.execute('SELECT email, role FROM users');
    
    console.log('Users in database:');
    rows.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });

    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkUsers();