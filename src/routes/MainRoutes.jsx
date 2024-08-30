import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import PrivateRoute from 'routes/PrivateRoute';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const AttendancePage = Loadable(lazy(() => import('pages/dashboard/AttendancePage')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const MisAlumnos = Loadable(lazy(() => import('pages/dashboard/misalumnos')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = [
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: <DashboardDefault />
      },
      {
        path: 'attendance/:courseId',
        element: <AttendancePage />
      },
      {
        path: 'color',
        element: <Color />
      },
      {
        path: 'typography',
        element: <Typography />
      },
      {
        path: 'shadow',
        element: <Shadow />
      },
      {
        path: 'sample-page',
        element: <SamplePage />
      },
      {
        path: 'misalumnos', // La ruta debe coincidir con la forma en que deseas acceder a ella
        element: <MisAlumnos /> // Corregido a "MisAlumnos"
      }
    ]
  }
];

export default MainRoutes;
