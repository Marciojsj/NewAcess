const { Client } = require('pg');

const config = {
  connectionString: 'postgresql://postgres.iaogucaazpxbptziksxi:Aquelasenha@aws-1-us-east-2.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false },
  family: 4
};

console.log('🧪 Testando conexão com Transaction Pooler (região correta)...\n');

const client = new Client(config);

client.connect()
  .then(() => {
    console.log('✅ CONEXÃO ESTABELECIDA COM SUCESSO!\n');
    return client.query('SELECT NOW(), version(), current_database(), current_user');
  })
  .then(res => {
    console.log('📊 Informações do Banco:');
    console.log(`   🕐 Timestamp: ${res.rows[0].now}`);
    console.log(`   📦 Database: ${res.rows[0].current_database}`);
    console.log(`   👤 User: ${res.rows[0].current_user}`);
    console.log(`   🐘 PostgreSQL: ${res.rows[0].version.split(' ')[1]}`);
    console.log('\n🎉 TUDO FUNCIONANDO!');
    console.log('\n✅ Próximos comandos:');
    console.log('   1. npx prisma db push');
    console.log('   2. npm run prisma:seed');
    console.log('   3. npm run dev');
    return client.end();
  })
  .catch(err => {
    console.error('❌ ERRO:', err.message);
    process.exit(1);
  });
