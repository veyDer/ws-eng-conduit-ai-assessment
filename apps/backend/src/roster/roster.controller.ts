/*  generate the controller for the roster
    inject the user repository (EntityRepository<User>) and the article repository (EntityRepository<Article>) into the constructor
    add the `ApiBearerAuth` and `ApiTags` decorators
    set the controller path to `roster`

    generate the default GET handler which returns a `RosterRO` object constructed from all users from the user repository;
    for each user get the date of the first article authored by the user (or the empty string), the total number of all articles authored by the user (or 0) and the total number of all likes received on all articles authored by the user (or 0)
*/
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Article } from '../article/article.entity';
import { User } from '../user/user.entity';
import { RosterRO } from './roster.interface';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@ApiBearerAuth()
@ApiTags('roster')
@Controller('roster')
export class RosterController {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: EntityRepository<Article>,
  ) {}

  @Get()
  async getRoster(): Promise<RosterRO> {
    const users = await this.userRepository.findAll();
    const roster = users.map(async (user) => {
      const articles = await this.articleRepository.find({ author: user.id });
      const articlesAuthoredCount = articles.length;
      const likesReceivedOnArticlesCount = articles.reduce((acc, article) => {
        return acc + article.favoritesCount;
      }, 0);
      const firstArticleDate = articles.length ? articles[0].createdAt.toISOString() : '';
      return {
        authorProfile: {
          username: user.username,
          bio: user.bio,
          image: user.image,
          following: false,
        },
        articlesAuthoredCount,
        likesReceivedOnArticlesCount,
        firstArticleDate,
      };
    });
    return { stats: await Promise.all(roster) };
  }
}
