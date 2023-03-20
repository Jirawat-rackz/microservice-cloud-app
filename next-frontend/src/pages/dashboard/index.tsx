import React from 'react';
import { Table } from 'antd';
import type { NextPage } from 'next';
import {
  getCoreList,
  getListSubscribeCore,
} from '@/repository/core.repository';
import columns from './columns';

const DashboardPage: NextPage = () => {
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  getListSubscribeCore(page, pageSize, setDataSource);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getCoreList(page, pageSize);
      setDataSource(result.items);
    };
    fetchData();
  }, [page, pageSize]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange(page, pageSize) {
            setPage(page);
            setPageSize(pageSize);
          },
          onShowSizeChange(current, size) {
            setPage(current);
            setPageSize(size);
          },
        }}
      />
    </div>
  );
};

export default DashboardPage;
