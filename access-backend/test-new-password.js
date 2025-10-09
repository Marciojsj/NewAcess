const { Client } = require('pg');

const configs = [
  {
    name: 'Direct Connection (5432) - IPv4',
    connectionString: 'postgresql://postgres:Aquelasenha@db.iaogucaazpxbptziksxi.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false },
    family: 4  // 👈 Força IPv4
  },
  {
    name: 'Pooler (6543) - usuario completo - IPv4',
    connectionString: 'postgresql://postgres.iaogucaazpxbptziksxi:Aquelasenha@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
    family: 4  // 👈 Força IPv4
  },
  {
    name: 'Pooler (6543) - usuario simples - IPv4',
    connectionString: 'postgresql://postgres:Aquelasenha@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
    family: 4  // 👈 Força IPv4
  }
];

async function testConnection(config) {
  console.log(`\n🔍 Testando: ${config.name}`);
  
  const client = new Client({
    connectionString: config.connectionString,
    ssl: config.ssl,
    family: config.family
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW(), version()');
    console.log('✅ SUCESSO! Conectado em:', res.rows[0].now);
    console.log('📦 PostgreSQL:', res.rows[0].version.split(' ')[1]);
    await client.end();
    return { success: true, config };
  } catch (err) {
    console.log('❌ ERRO:', err.message);
    return { success: false, config };
  }
}

async function testAll() {
  console.log('🧪 Testando conexões com Supabase (IPv4 forçado)...\n');
  
  for (const config of configs) {
    const result = await testConnection(config);
    if (result.success) {
      console.log('\n🎉🎉🎉 CONEXÃO FUNCIONOU COM IPv4! 🎉🎉🎉');
      console.log('\n📝 Use esta string no .env:');
      console.log(`DATABASE_URL="${result.config.connectionString}"`);
      return;
    }
  }
  
  console.log('\n❌ Nenhuma conexão funcionou. Próximos passos:');
  console.log('1. Verifique no painel Supabase: Project Settings → Database');
  console.log('2. Copie a "Connection string" exata do painel');
  console.log('3. Verifique se o projeto está pausado (plano gratuito pausa após inatividade)');
}

testAll().catch(console.error);
