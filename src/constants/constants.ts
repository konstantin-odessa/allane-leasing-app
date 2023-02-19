import {
  MAT_NATIVE_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';

export const DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  },
};

export const SNACK_BAR_DURATION = 5000;

export const REQUIRED_ERROR_MESSAGE = 'Field should not be empty';
