import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { PieChartOutlined, AudioOutlined } from '@ant-design/icons';

const routes: ItemType[] = [
  {
    key: '/dashboard',
    icon: <PieChartOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/voice-processing',
    icon: <AudioOutlined />,
    label: 'Voice Processing',
  },
];

export default routes;
