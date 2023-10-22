import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = new Comment({
      content: createCommentDto.content,
      author_id: createCommentDto.authorId,
      article_id: createCommentDto.articleId,
    });
    return await this.entityManager.save(comment);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }
}
