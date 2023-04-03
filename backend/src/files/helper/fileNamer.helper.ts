/* eslint-disable @typescript-eslint/ban-types */
import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file) return cb(new Error('File is empty'), false);

  const fileName = `${uuid()}`;

  cb(null, fileName);
};
