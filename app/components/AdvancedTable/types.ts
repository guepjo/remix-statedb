import { ColumnType } from 'antd/lib/table';

export type AdvancedTableColumnType<T> = ColumnType<T> & {
  visible: boolean;
};
