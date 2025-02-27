import * as Yup from 'yup';
import {
  LINK_OR_FILE_REQUIRED,
  RESOURCE_NAME_REQUIRED,
  URL_VALID_REQUIRED,
  RESOURCE_FILE_SIZE_EXCEEDED,
  RESOURCE_FILE_TYPE_INVALID,
} from '../const';

export const addResourceValidationSchema = Yup.object()
  .shape({
    resourceName: Yup.string().required(RESOURCE_NAME_REQUIRED),
    resourceLink: Yup.string().url(URL_VALID_REQUIRED).nullable(),
    file: Yup.mixed()
      .nullable()
      .test('fileType', RESOURCE_FILE_TYPE_INVALID, function (value: any) {
        if (value) {
          const allowedTypes = [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain',
            'application/pdf',
          ];
          if (!allowedTypes.includes(value.type)) {
            return this.createError({ path: 'file', message: RESOURCE_FILE_TYPE_INVALID });
          }
        }
        return true;
      })
      .test('fileSize', RESOURCE_FILE_SIZE_EXCEEDED, function (value: any) {
        const maxSizeInMB = 5;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        if (value && value.size > maxSizeInBytes) {
          return this.createError({ path: 'file', message: RESOURCE_FILE_SIZE_EXCEEDED });
        }
        return true;
      }),
  })
  .test('resource-test', LINK_OR_FILE_REQUIRED, function (values) {
    const { resourceLink, file } = values;
    if (!resourceLink && !file) {
      return this.createError({ path: 'resourceLink', message: LINK_OR_FILE_REQUIRED });
    }
    return true;
  });
