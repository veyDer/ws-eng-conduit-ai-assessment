import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';

import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import ormConfig from '../mikro-orm.config';
import { RosterModule } from './roster/roster.module';
@Module({
  controllers: [AppController],
  // imports: [MikroOrmModule.forRoot(ormConfig), ArticleModule, UserModule, ProfileModule, TagModule],
  // rewrite the line above by adding the RosterModule in the list of imports
  imports: [MikroOrmModule.forRoot(ormConfig), ArticleModule, UserModule, ProfileModule, TagModule, RosterModule],

  providers: [],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  // for some reason the auth middlewares in profile and article modules are fired before the request context one,
  // so they would fail to access contextual EM. by registering the middleware directly in AppModule, we can get
  // around this issue
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
