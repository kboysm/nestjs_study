import { from, Observable } from 'rxjs';

interface ArrParam<T> {
  totalCount: number;
  pageSize: number;
  items: T[];
  msg: string;
  error?: boolean;
}
interface ObjParam<T> {
  msg: string;
  item: T;
  error?: boolean;
}

class ArrResponse<T> {
  error: boolean = false;
  totalCount: number;
  totalPage: number;
  msg: string;
  items: T[];

  constructor(param: ArrParam<T>) {
    this.error = param.error || false;
    this.totalCount = param.totalCount;
    this.totalPage = Math.ceil(param.totalCount / param.pageSize) || 1;
    this.msg = param.msg;
    this.items = param.items;
  }
}

class ObjResponse<T> {
  msg: string;
  item: T;
  error?: boolean;

  constructor(param: ObjParam<T>) {
    this.msg = param.msg;
    this.item = param.item;
    this.error = param.error || false;
    this.checkEmptyItem();
  }
  checkEmptyItem() {
    if (!this.item) {
      this.msg = '데이터가 존재하지 않습니다.';
      this.error = true;
    }
  }

  changeItem(item: T) {
    this.item = item;
  }
  changeMsg(msg: string) {
    this.msg = msg;
  }
}

export { ArrResponse, ObjResponse };
