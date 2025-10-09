import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password.util';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar entidade padrão
  const entity = await prisma.entity.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Entidade Principal',
      type: 'COMPANY',
      cnpj: '12345678000190',
      address: 'Rua Exemplo, 123',
      city: 'São Paulo',
      state: 'SP',
      phone: '11987654321',
      email: 'contato@exemplo.com',
    },
  });

  console.log('✅ Entidade criada:', entity.name);

  // Criar usuário SUPERADMIN
  const superadminPassword = await hashPassword('admin123');
  const superadmin = await prisma.user.upsert({
    where: { email: 'admin@exemplo.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@exemplo.com',
      password: superadminPassword,
      cpf: '12345678901',
      phone: '11987654321',
      role: 'SUPERADMIN',
    },
  });

  console.log('✅ SUPERADMIN criado:', superadmin.email);

  // Criar usuário ADMIN
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin.entidade@exemplo.com' },
    update: {},
    create: {
      name: 'Admin Entidade',
      email: 'admin.entidade@exemplo.com',
      password: adminPassword,
      cpf: '12345678902',
      phone: '11987654322',
      role: 'ADMIN',
      entityId: entity.id,
    },
  });

  console.log('✅ ADMIN criado:', admin.email);

  // Criar usuário OPERATOR
  const operatorPassword = await hashPassword('operator123');
  const operator = await prisma.user.upsert({
    where: { email: 'operador@exemplo.com' },
    update: {},
    create: {
      name: 'Operador',
      email: 'operador@exemplo.com',
      password: operatorPassword,
      cpf: '12345678903',
      phone: '11987654323',
      role: 'OPERATOR',
      entityId: entity.id,
    },
  });

  console.log('✅ OPERATOR criado:', operator.email);

  // Criar alguns visitantes de exemplo
  const visitor1 = await prisma.visitor.create({
    data: {
      name: 'João Silva',
      cpf: '98765432100',
      phone: '11987654324',
      email: 'joao@exemplo.com',
      company: 'Empresa XYZ',
      entityId: entity.id,
    },
  });

  const visitor2 = await prisma.visitor.create({
    data: {
      name: 'Maria Santos',
      cpf: '98765432101',
      phone: '11987654325',
      email: 'maria@exemplo.com',
      company: 'Empresa ABC',
      entityId: entity.id,
    },
  });

  console.log('✅ Visitantes criados:', visitor1.name, visitor2.name);

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📝 Credenciais de acesso:');
  console.log('SUPERADMIN: admin@exemplo.com / admin123');
  console.log('ADMIN: admin.entidade@exemplo.com / admin123');
  console.log('OPERATOR: operador@exemplo.com / operator123');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
