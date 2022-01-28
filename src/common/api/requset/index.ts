export class PageReq {
  pageNo: number = 1; // 현재 페이지 넘버
  limit: number = 10; // rowPerPage, pageSize

  constructor(limit: number, pageNo: number) {
    this.limit = limit ?? 10;
    this.pageNo = pageNo ?? 1;
  }

  getOffset(): number {
    return (this.pageNo - 1) * this.limit || 0;
  }

  getLimit(): number {
    return this.limit || 10;
  }
}
