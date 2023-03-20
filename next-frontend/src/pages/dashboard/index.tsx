import React, { ReactElement } from 'react';
import { Table } from 'antd';
import columns from './columns';
import LayoutProvider from '@/providers/layout.provider';

function DashboardPage() {
  const [dataSource, setDataSource] = React.useState<any[]>([]);

  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  // getListSubscribeCore(page, pageSize, setDataSource);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getCoreList(page, pageSize);
  //     setDataSource(result.items);
  //   };
  //   fetchData();
  // }, [page, pageSize]);

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
