/* generate the module implementing NestModule for the RosterController controller
*/

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RosterController } from './roster.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from '../user/user.module';
import { Article } from '../article/article.entity';
import { User } from '../user/user.entity';

@Module({
  controllers: [RosterController],
  // add imports for MikroOrmModule.forFeature (entities: Article and User) and UserModule
    imports: [MikroOrmModule.forFeature({ entities: [Article, User] }), UserModule],
})
export class RosterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({ path: 'roster', method: RequestMethod.ALL });
  }
}

