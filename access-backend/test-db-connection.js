const { Client } = require('pg');

const configs = [
  {
    name: 'Pooler com usuario completo',
    connectionString: 'postgresql://postgres.iaogucaazpxbptziksxi:Mar@123@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
  },
  {
    name: 'Pooler sem usuario completo',
    connectionString: 'postgresql://postgres:Mar@123@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
  },
  {
    name: 'Host direto',
    connectionString: 'postgresql://postgres:Mar@123@db.iaogucaazpxbptziksxi.supabase.co:5432/postgres'
  }
];

async function testConnection(config) {
  console.log(`\n🔍 Testando: ${config.name}`);
  console.log(`📝 String: ${config.connectionString.replace(/Mar@123/, 'MAR***')}`);
  
  const client = new Client({
    connectionString: config.connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log('✅ SUCESSO! Conectado em:', res.rows[0].now);
    await client.end();
    return true;
  } catch (err) {
    console.log('❌ ERRO:', err.message);
    return false;
  }
}

async function testAll() {
  console.log('🧪 Testando conexões com o Supabase...\n');
  
  for (const config of configs) {
    const success = await testConnection(config);
    if (success) {
      console.log('\n✅✅✅ ESTA É A CONEXÃO CORRETA! ✅✅✅');
      console.log('Use esta string no .env:');
      console.log(config.connectionString);
      break;
    }
  }
}

testAll().catch(console.error);
