// assets
import { BookOutlined, LogoutOutlined } from '@ant-design/icons';

// icons
const icons = {
  BookOutlined,
  LogoutOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const support = {
  id: 'support',
  title: 'Otros',
  type: 'group',
  children: [
    {
      id: 'tutoriales',
      title: 'Tutoriales',
      type: 'item',
      url: '/tutoriales',
      icon: icons.BookOutlined
    },
    {
      id: 'salir',
      title: 'Salir',
      type: 'item',
      url: '#',
      icon: icons.LogoutOutlined,
      external: true,
      target: true
    }
  ]
};

export default support;
