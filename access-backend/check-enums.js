const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.iaogucaazpxbptziksxi:Aquelasenha@aws-1-us-east-2.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
  family: 4
});

async function checkEnums() {
  await client.connect();
  
  console.log('📋 Verificando enums criados:\n');
  const result = await client.query(`
    SELECT t.typname as enum_name, e.enumlabel as enum_value
    FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
    ORDER BY t.typname, e.enumsortorder;
  `);
  
  let currentEnum = '';
  result.rows.forEach(row => {
    if (row.enum_name !== currentEnum) {
      if (currentEnum) console.log('');
      console.log(`📦 ${row.enum_name}:`);
      currentEnum = row.enum_name;
    }
    console.log(`   - ${row.enum_value}`);
  });
  
  await client.end();
}

checkEnums().catch(console.error);
