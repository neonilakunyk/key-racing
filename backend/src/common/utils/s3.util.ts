import fs from 'fs';
import mime from 'mime-types';
import S3 from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk/lib/error';
import { env } from 'env';

import { HttpCode, HttpErrorMessage } from 'common/enums';
import { HttpError } from 'common/exceptions';
import { getKeyFromObjectLocation } from 'common/helpers';

const { accessKeyId, secretAccessKey, bucketName } = env.s3;

const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

const isFileExistsInS3 = async (fileName: string): Promise<boolean> => {
  const params = { Bucket: bucketName, Key: fileName };
  // The HEAD action retrieves metadata from an object without returning the object itself.
  // If the HEAD request generates an error, it returns a generic 404 Not Found or 403 Forbidden code.
  try {
    s3.headObject(params).promise();
    return true;
  } catch {
    return false;
  }
};

const deleteInS3 = async (
  fileName: string,
): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>> => {
  const params = { Bucket: bucketName, Key: fileName };
  return s3.deleteObject(params).promise();
};

const uploadToS3 = (
  file: Express.Multer.File,
): Promise<S3.ManagedUpload.SendData> => {
  const fileStream = fs.createReadStream(file.path);

  // Lookup the content-type associated with a file.
  const fileType = mime.lookup(file.path);

  if (!fileType) {
    throw new HttpError({
      status: HttpCode.UNPROCESSABLE_ENTITY,
      message: HttpErrorMessage.INVALID_FILE_TYPE,
    });
  }

  /* Create a full content-type header given a content-type or extension.
   When given an extension, mime.lookup is used to get the matching content-type,
   otherwise the given content-type is used. */
  const type = mime.contentType(fileType);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentType: type || undefined,
  };

  return s3.upload(uploadParams).promise();
};

const getSignedUrl = async (location: string): Promise<string> => {
  const key = getKeyFromObjectLocation(location);
  const params = {
    Bucket: bucketName,
    Key: key,
    ResponseContentDisposition: 'inline',
    ResponseContentType: 'application/octet-stream',
  };
  return s3.getSignedUrlPromise('getObject', params);
};

export { isFileExistsInS3, deleteInS3, uploadToS3, getSignedUrl };
