// assets
import { DashboardOutlined, CalendarOutlined, BookOutlined, UsergroupAddOutlined, SnippetsOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  CalendarOutlined,
  BookOutlined,
  UsergroupAddOutlined,
  SnippetsOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navegación',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'calendario',
      title: 'Calendario',
      type: 'item',
      url: '/calendario',
      icon: icons.CalendarOutlined,
      breadcrumbs: false
    },
    {
      id: 'cursos',
      title: 'Cursos',
      type: 'item',
      url: '/cursos',
      icon: icons.BookOutlined,
      breadcrumbs: false
    },
    {
      id: 'misalumnos',
      title: 'Mis alumnos',
      type: 'item',
      url: '/dashboard/misalumnos', // Asegúrate de que coincida exactamente con la ruta configurada
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false
    },
    {
      id: 'sesiones',
      title: 'Sesiones',
      type: 'item',
      url: '/sesiones',
      icon: icons.SnippetsOutlined,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
