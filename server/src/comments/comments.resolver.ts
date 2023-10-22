import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class CommentsResolver {
  @Query(() => String)
  comments(): string {
    return 'comments';
  }
}
