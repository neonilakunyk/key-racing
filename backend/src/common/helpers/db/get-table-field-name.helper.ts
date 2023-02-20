import { TableName } from 'common/enums';
import { ModelKey } from 'common/types';

const getTableFieldName = (
  tableName: TableName,
  fieldName: ModelKey,
): string => {
  return `${tableName}.${fieldName}`;
};

export { getTableFieldName };
