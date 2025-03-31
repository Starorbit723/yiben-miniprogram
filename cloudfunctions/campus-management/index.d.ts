
interface Campus {
  _id?: string;
  name: string;
  address: string;
  createTime: number;
  updateTime?: number;
}

interface SaveParams {
  name: string;
  address: string;
}

interface QueryParams {
  campusId?: string;
  keyword?: string;
  pageSize?: number;
  pageNumber?: number;
}

type CampusEvent = {
  type: 'save' | 'query';
  data?: SaveParams;
} & QueryParams;

export declare function main(
  event: CampusEvent,
  context: any
): Promise<{
  code: number;
  data?: Campus[] | { _id: string };
  total?: number;
  message?: string;
}>;
  