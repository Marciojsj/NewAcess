const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.iaogucaazpxbptziksxi:Aquelasenha@aws-1-us-east-2.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
  family: 4
});

async function checkSchema() {
  await client.connect();
  
  console.log('📋 Verificando colunas da tabela entities:\n');
  const result = await client.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'entities'
    ORDER BY ordinal_position;
  `);
  
  result.rows.forEach(row => {
    console.log(`  - ${row.column_name} (${row.data_type}) ${row.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
  });
  
  await client.end();
}

checkSchema().catch(console.error);
