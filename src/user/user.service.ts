import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  InsertResult,
  Repository,
  UpdateResult,
  Connection,
  EntityManager,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { from, Observable, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CUser } from './user.interface';
import { ArrResponse, ObjResponse } from '../common/api';
import { PageReq } from 'src/common/api/requset';
@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  private async transactionCreateTest(
    manager: EntityManager,
    createUserDto: CreateUserDto,
  ) {
    return await manager.save(User, createUserDto);
  }
  private async transactionErrorTest(
    manager: EntityManager,
    createdUser: User,
  ) {
    const findedUser = await manager.findOne(User, createdUser.id);
    console.log('findedUser : ', findedUser);
    throw new Error('test');
  }
  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { status: number; msg: string }> {
    console.log(createUserDto);
    try {
      let result;
      await this.connection.transaction(async (manager: EntityManager) => {
        result = await this.transactionCreateTest(manager, createUserDto);
        console.log('createdUser : ', result);
        await this.transactionErrorTest(manager, result);
        console.log('result: ', result);
      });
      return result;
    } catch (err) {
      return { status: 400, msg: err.message };
    }
  }

  findAll(param: PageReq): Observable<ArrResponse<User>> {
    return from(
      this.userRepo.findAndCount({
        skip: param.getOffset(),
        take: param.getLimit(),
      }),
    ).pipe(
      map((userList: [User[], number]) => {
        return new ArrResponse({
          totalCount: userList[1],
          pageSize: param.limit,
          items: userList[0],
          msg: '유저 목록을 찾는데 성공했습니다.',
        });
      }),
    );
  }

  findOne(id: number): Observable<ObjResponse<User>> {
    return from(this.userRepo.findOne({ id })).pipe(
      map((user: User) => {
        return new ObjResponse({
          item: user,
          msg: '유저 정보를 찾는데 성공했습니다.',
        });
      }),
    );
  }

  update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Observable<ObjResponse<User>> {
    return from(this.userRepo.update({ id }, updateUserDto)).pipe(
      switchMap((result: UpdateResult) => {
        return from(this.findOne(id));
      }),
      map((result: ObjResponse<User>) => {
        result.changeMsg('유저 정보 수정에 성공했습니다.');
        return result;
      }),
    );
  }

  remove(id: number): Observable<ObjResponse<User>> {
    let userInfo = null;
    return from(this.userRepo.findOne({ id })).pipe(
      switchMap((user: CUser) => {
        userInfo = user;
        return from(this.userRepo.delete({ id }));
      }),
      map((result: DeleteResult) => {
        return new ObjResponse({
          item: userInfo,
          msg: `유저 삭제에 ${result.affected > 0 ? '성공' : '실패'}했습니다.`,
        });
      }),
    );
  }
}
