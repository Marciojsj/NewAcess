const { Client } = require('pg');
const dns = require('dns');

// Testa resolução DNS primeiro
async function testDNS() {
  console.log('🔍 Testando resolução DNS...\n');
  
  const hosts = [
    'db.iaogucaazpxbptziksxi.supabase.co',
    'aws-0-us-east-1.pooler.supabase.com'
  ];
  
  for (const host of hosts) {
    try {
      const addresses = await dns.promises.resolve4(host);
      console.log(`✅ ${host}`);
      console.log(`   IPv4: ${addresses[0]}\n`);
    } catch (err) {
      console.log(`❌ ${host}: ${err.message}\n`);
    }
  }
}

const configs = [
  {
    name: 'Direct - sslmode=require',
    connectionString: 'postgresql://postgres:Aquelasenha@db.iaogucaazpxbptziksxi.supabase.co:5432/postgres?sslmode=require',
    ssl: { rejectUnauthorized: false },
    family: 4
  },
  {
    name: 'Direct - sem params',
    connectionString: 'postgresql://postgres:Aquelasenha@db.iaogucaazpxbptziksxi.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false },
    family: 4
  },
  {
    name: 'Pooler - usuario completo',
    connectionString: 'postgresql://postgres.iaogucaazpxbptziksxi:Aquelasenha@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
    family: 4
  },
  {
    name: 'Pooler - usuario simples + pgbouncer',
    connectionString: 'postgresql://postgres:Aquelasenha@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
    ssl: { rejectUnauthorized: false },
    family: 4
  },
  {
    name: 'Pooler - Transaction Mode',
    connectionString: 'postgresql://postgres.iaogucaazpxbptziksxi:Aquelasenha@aws-0-us-east-1.pooler.supabase.com:5432/postgres',
    ssl: { rejectUnauthorized: false },
    family: 4
  }
];

async function testConnection(config) {
  console.log(`\n🔍 Testando: ${config.name}`);
  console.log(`   URL: ${config.connectionString.replace(/Aquelasenha/g, '***')}`);
  
  const client = new Client({
    connectionString: config.connectionString,
    ssl: config.ssl,
    family: config.family,
    connectionTimeoutMillis: 10000
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW(), version(), current_database()');
    console.log('✅ SUCESSO!');
    console.log(`   Conectado em: ${res.rows[0].now}`);
    console.log(`   Database: ${res.rows[0].current_database}`);
    console.log(`   PostgreSQL: ${res.rows[0].version.split(' ')[1]}`);
    await client.end();
    return { success: true, config };
  } catch (err) {
    console.log(`❌ ERRO: ${err.message}`);
    return { success: false, config };
  }
}

async function main() {
  console.log('=' .repeat(60));
  console.log('🧪 TESTE COMPLETO DE CONEXÃO SUPABASE');
  console.log('=' .repeat(60));
  
  await testDNS();
  
  console.log('=' .repeat(60));
  console.log('📡 Testando conexões...');
  console.log('=' .repeat(60));
  
  for (const config of configs) {
    const result = await testConnection(config);
    if (result.success) {
      console.log('\n' + '='.repeat(60));
      console.log('🎉 CONEXÃO FUNCIONOU!');
      console.log('='.repeat(60));
      console.log('\n📝 Atualize o .env com esta string:');
      console.log(`DATABASE_URL="${result.config.connectionString}"`);
      console.log('\n✅ Pode continuar com:');
      console.log('   npx prisma db push');
      console.log('   npm run prisma:seed');
      console.log('   npm run dev');
      return;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('❌ NENHUMA CONEXÃO FUNCIONOU');
  console.log('='.repeat(60));
  console.log('\n🔍 Possíveis causas:');
  console.log('1. Projeto Supabase pausado (plano gratuito pausa após 7 dias)');
  console.log('2. Senha incorreta');
  console.log('3. Firewall bloqueando conexões');
  console.log('4. IP precisa ser autorizado no Supabase');
  console.log('\n📋 Verifique no painel Supabase:');
  console.log('   https://supabase.com/dashboard/project/iaogucaazpxbptziksxi/settings/database');
}

main().catch(console.error);
