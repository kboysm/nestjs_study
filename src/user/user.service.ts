import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
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
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Observable<ObjResponse<User>> {
    return from(this.userRepo.insert(createUserDto)).pipe(
      switchMap((result: InsertResult) => {
        return from(this.findOne(result.identifiers[0].id));
      }),
      map((result: ObjResponse<User>) => {
        result.changeMsg('유저 생성에 성공했습니다.');
        return result;
      }),
    );
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
