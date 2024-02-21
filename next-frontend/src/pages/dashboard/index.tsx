import React, { useEffect } from 'react';
import { notification, Table } from 'antd';
import LayoutProvider from '@/providers/layout.provider';
import { pb } from '../_app';
import { JoinedDataItem } from '@/models/dashboard.model';
import { Container, SearchInput } from '@/styles/dashboard.style';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '300',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: '200',
    render: (_: any, { date }: any) => {
      return (
        new Date(date).toLocaleDateString() +
        ' ' +
        new Date(date).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    },
  },
  {
    title: 'SPH(R)',
    dataIndex: 'sph_r',
    key: 'sph_r',
  },
  {
    title: 'SPH (L)',
    dataIndex: 'sph_l',
    key: 'sph_l',
  },
  {
    title: 'CYL (R)',
    dataIndex: 'cyl_r',
    key: 'cyl_r',
  },
  {
    title: 'CYL (L)',
    dataIndex: 'cyl_l',
    key: 'cyl_l',
  },
  {
    title: 'AX (R)',
    dataIndex: 'ax_r',
    key: 'ax_r',
  },
  {
    title: 'AX (L)',
    dataIndex: 'ax_l',
    key: 'ax_l',
  },
];

function DashboardPage() {
  const [api, contextHolder] = notification.useNotification();
  const [dataSource, setDataSource] = React.useState<JoinedDataItem[]>([]);

  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [total, setTotal] = React.useState<number>(0);

  const [search, setSearch] = React.useState<string>('');

  const fetchData = React.useCallback(async () => {
    try {
      const dashboardResult = await pb
        .collection('dashboard')
        .getList(page, pageSize);
      const patientResult = await pb.collection('patient').getList();

      const joinedData = dashboardResult.items.map((dashboardItem) => {
        const matchingPatient = patientResult.items.find(
          (patient) => patient.id === dashboardItem.patient_id
        );
        return {
          name: matchingPatient ? matchingPatient.name : null,
          ...dashboardItem,
        };
      });

      setDataSource(joinedData);
      setTotal(dashboardResult.totalItems);
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
      pb.collection('words').unsubscribe();
    };
  }, [fetchData]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const filteredDataSource = dataSource.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <LayoutProvider>
      {contextHolder}
      <Container>
        <h1>Dashboard</h1>
        <SearchInput
          placeholder="search by name"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
          enterButton
        />
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={filteredDataSource}
          scroll={{ x: 1000 }}
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
      </Container>
    </LayoutProvider>
  );
}

export default DashboardPage;
