import { SortDirectionEnum } from '../enums';
import { SortDirection } from '@angular/material/sort';

export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

export function getSortDirection(direction: SortDirection) {
  let sortDirection: SortDirectionEnum;

  switch (direction) {
    case '':
      sortDirection = SortDirectionEnum.UNSORTED;
      break;
    case 'asc':
      sortDirection = SortDirectionEnum.ASC;
      break;

    case 'desc':
      sortDirection = SortDirectionEnum.DESC;
      break;
    default:
      return assertNever(direction);
  }

  return sortDirection;
}
