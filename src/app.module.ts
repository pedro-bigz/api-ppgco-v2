import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ENV, SequelizeConfig } from 'core';
import { AuthService, AuthController, AuthModule } from './auth';
import { User, UserModule } from './user';
import { CrudGeneratorModule, crudGeneratorCommands } from './crud-generator';
import { StudentModule, Student } from './student';
// {IMPORTS} Don't delete me, I'm used for automatic code generation

const env = ENV();
const orm = {
  tables: [
    User,
    Student,
    // {MODELS} Don't delete me, I'm used for automatic code generation
  ],
  views: [],
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot(
      SequelizeConfig.configure({
        models: [...orm.tables, ...orm.views],
      }),
    ),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET_KEY,
    }),
    UserModule,
    AuthModule,
    CrudGeneratorModule,
    StudentModule,
    // {MODULE} Don't delete me, I'm used for automatic code generation
  ],
  controllers: [AuthController],
  providers: [AuthService, ...crudGeneratorCommands],
  exports: [AuthService, ...crudGeneratorCommands],
})
export class AppModule {}
