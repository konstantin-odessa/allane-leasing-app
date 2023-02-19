import { SortDirectionEnum } from '../enums';

export type PageRequestDTO = {
  page: number;
  size: number;
  sort: SortDirectionEnum;
};

export type BasePageResponseDTO<T extends object> = {
  numberOfItems: number;
  numberOfPages: number;
  page: number;
  size: number;
  sort: SortDirectionEnum;
  overviewItems: T[];
};

export type ErrorResponse = {
  error?: string;
  path?: string;
  status?: number;
  timestamp?: string;
};
