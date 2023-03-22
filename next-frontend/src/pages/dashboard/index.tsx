import React, { useEffect } from 'react';
import { Table } from 'antd';
import LayoutProvider from '@/providers/layout.provider';
import { pb } from '../_app';

const columns = [
  {
    title: 'userId',
    dataIndex: 'userId',
    key: 'id',
  },
  {
    title: 'word',
    dataIndex: 'word',
    key: 'word',
  },
  {
    title: 'created_at',
    dataIndex: 'created_at',
    key: 'created',
    render: (_: any, { created }: any) => {
      return (
        new Date(created).toLocaleDateString() +
        ' ' +
        new Date(created).toLocaleTimeString()
      );
    },
  },
];

function DashboardPage() {
  const [dataSource, setDataSource] = React.useState<any[]>([]);

  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  const fetchData = React.useCallback(async () => {
    const result = await pb.collection('dashboard').getList(page, pageSize);
    setDataSource(result.items);
  }, [page, pageSize]);

  useEffect(() => {
    pb.collection('dashboard').subscribe('*', () => {
      fetchData();
    });
    fetchData();

    return () => {
      pb.collection('dashboard').unsubscribe('*');
    };
  }, []);

  return (
    <LayoutProvider>
      <div>
        <h1>Dashboard</h1>
        <Table
          rowKey={(record) => record.id}
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
    </LayoutProvider>
  );
}

export default DashboardPage;
