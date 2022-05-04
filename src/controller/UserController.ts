import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class UserController {
  // NOTE: getRepository() は deprecated なため代替
  // https://github.com/typeorm/typeorm/issues/7428#issuecomment-1072384216
  private userRepository = AppDataSource.getRepository(User);
  private entitymanager = AppDataSource.manager;

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    // NOTE: entityManager / repository どちらでも実行可能
    // return this.entitymanager
    //   .createQueryBuilder(User, 'user')
    //   .where('user.id = :id', { id: request.params.id })
    //   .getOne();
    return this.userRepository.findOneBy({ id: request.params.id });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({
      id: request.params.id,
    });
    await this.userRepository.remove(userToRemove);
  }
}
