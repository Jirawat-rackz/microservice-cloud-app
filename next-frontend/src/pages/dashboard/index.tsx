import React, { useEffect } from 'react';
import { notification, Table } from 'antd';
import LayoutProvider from '@/providers/layout.provider';
import { pb } from '../_app';
import { TDashboard } from '@/models/dashboard.model';
import { Record } from 'pocketbase';

const columns = [
  {
    title: 'Word',
    dataIndex: 'word',
    key: 'word',
  },
  {
    title: 'Create at',
    dataIndex: 'created',
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
  const [api, contextHolder] = notification.useNotification();
  const [dataSource, setDataSource] = React.useState<Record[]>([]);

  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [total, setTotal] = React.useState<number>(0);

  const fetchData = React.useCallback(async () => {
    try {
      const result = await pb.collection('dashboard').getList(page, pageSize, {
        filter: `user_id='${pb.authStore.model?.id}'`,
        sort: '-created',
      });

      setDataSource(result.items);
      setTotal(result.totalItems);
    } catch (error: any) {
      api.error({
        message: 'Error',
        description: error?.message,
      });
    }
  }, [page, pageSize]);

  pb.collection('dashboard').subscribe('*', () => {
    fetchData();
  });

  useEffect(() => {
    fetchData();

    return () => {
      pb.collection('dashboard').unsubscribe();
    };
  }, [fetchData]);

  return (
    <LayoutProvider>
      {contextHolder}
      <div>
        <h1>Dashboard</h1>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
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
