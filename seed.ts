import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Permission } from './src/permissions/entities/permission.entity';
import { Role } from './src/roles/entities/role.entity';
import { RoleHasPermission } from './src/role-has-permissions/entities/role-has-permission.entity';

async function bootstrap() {
  console.log('Iniciando Seeder Automático de Permissões do Plano de Estudo...');
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    // 1. Cria ou recupera a permissão
    const [permission] = await Permission.findOrCreate({
      where: { name: 'plano-estudo.read' },
      defaults: { name: 'plano-estudo.read', description: 'Acesso à Gestão do Plano de Estudos' }
    });
    console.log(`Permissão [${permission.name}] criada/recuperada (ID: ${permission.id}).`);

    // 2. Cargos que precisam desse acesso
    const rolesToBind = ['Estudante', 'Coordenador(a)', 'Secretário(a)'];

    for (const roleName of rolesToBind) {
      const role = await Role.findOne({ where: { name: roleName } });
      if (role) {
        await RoleHasPermission.findOrCreate({
          where: { role_id: role.id, permission_id: permission.id },
          defaults: { role_id: role.id, permission_id: permission.id }
        });
        console.log(`✔️ Permissão injetada com sucesso no cargo: ${roleName}`);
      } else {
        console.log(`⚠️ Cargo não encontrado no banco: ${roleName}`);
      }
    }

    // 3. Garantir permissões de cursos, disciplinas e publicações para Estudantes e Secretários
    const studentPerms = [
      'subjects.list', 'subjects.read', 'courses.list', 'courses.read',
      'publication.list', 'publication.read', 'publication.create', 'publication.update', 'publication.delete'
    ];
    const secretaryPerms = [
      'subjects.list', 'subjects.read', 'subjects.create', 'subjects.update', 'subjects.delete',
      'courses.list', 'courses.read', 'courses.create', 'courses.update', 'courses.delete'
    ];

    const bindPermsToRole = async (roleName: string, permNames: string[]) => {
      const role = await Role.findOne({ where: { name: roleName } });
      if (!role) {
        console.log(`⚠️ Cargo não encontrado para vínculos adicionais: ${roleName}`);
        return;
      }
      for (const permName of permNames) {
        const perm = await Permission.findOne({ where: { name: permName } });
        if (perm) {
          await RoleHasPermission.findOrCreate({
            where: { role_id: role.id, permission_id: perm.id },
            defaults: { role_id: role.id, permission_id: perm.id }
          });
          console.log(`✔️ Permissão [${permName}] vinculada ao cargo: ${roleName}`);
        } else {
          console.log(`⚠️ Permissão não encontrada no banco: ${permName}`);
        }
      }
    };

    await bindPermsToRole('Estudante', studentPerms);
    await bindPermsToRole('Secretário(a)', secretaryPerms);
  } catch (err) {
    console.error('Erro ao executar o Seeder:', err);
  } finally {
    await app.close();
    console.log('Seeder Finalizado.');
  }
}
bootstrap();
