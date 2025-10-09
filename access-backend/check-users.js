const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.iaogucaazpxbptziksxi:Aquelasenha@aws-1-us-east-2.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
  family: 4
});

async function checkUsers() {
  await client.connect();
  
  console.log('📋 Colunas da tabela users:\n');
  const result = await client.query(`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'users'
    ORDER BY ordinal_position;
  `);
  
  result.rows.forEach(row => {
    console.log(`   - ${row.column_name}`);
  });
  
  await client.end();
}

checkUsers().catch(console.error);
