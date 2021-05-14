import AuthBaseView from '@/views/ClientOffice/Auth/AuthBaseView'
import ClientBaseView from '@/views/ClientOffice/ClientBaseView'

import View from '@/views/ClientOffice/View'

// Auth
import Login from '@/views/ClientOffice/Auth/Login'
import ClientResetPassword from '@/views/ClientOffice/Auth/ClientResetPassword'

// Dashboard
import Dashboard from '@/views/ClientOffice/Dashboard/Dashboard'

// Students
import RegistStudents from '@/views/ClientOffice/Students/RegistStudents'
import ListStudents from '@/views/ClientOffice/Students/ListStudents'
import EditStudents from '@/views/ClientOffice/Students/EditStudents'

// Users
import RegistUsers from '@/views/ClientOffice/Users/RegistUsers'
import ListUsers from '@/views/ClientOffice/Users/ListUsers'
import EditUsers from '@/views/ClientOffice/Users/EditUsers'

// Auth routes
const Auth = [{
  path: '/',
  redirect: Login
},
{
  path: '/',
  component: AuthBaseView,
  redirect: Login,
  children: [
    {
      path: 'login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: 'reset-password',
      name: 'ClientResetPassword',
      component: ClientResetPassword,
      meta: {
        title: 'Redefinir Password'
      }
    }
  ]
}
]

// Students routes
const Students = [{
  path: '/students',
  name: 'ListStudents',
  component: View,
  children: [{
    path: '/',
    name: 'ListStudents',
    component: ListStudents,
    meta: {
      title: 'Listar Alunos'
    }
  },
  {
    path: 'regist',
    name: 'RegistStudents',
    component: RegistStudents,
    meta: {
      title: 'Registar Aluno'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditStudents',
    component: EditStudents,
    meta: {
      title: 'Editar Aluno'
    },
    props: true
  }
  ]
}]

// Users routes
const Users = [{
  path: '/users',
  name: 'ListUsers',
  component: View,
  children: [{
    path: '/',
    name: 'ListUsers',
    component: ListUsers,
    meta: {
      title: 'Listar Usuarios'
    }
  },
  {
    path: 'regist',
    name: 'RegistUsers',
    component: RegistUsers,
    meta: {
      title: 'Registar Usuarios'
    }
  },
  {
    path: 'edit/:id',
    name: 'EditUsers',
    component: EditUsers,
    meta: {
      title: 'Editar Usuarios'
    },
    props: true
  }
  ]
}]

// Client routes
const Client = [{
  path: '/client/c',
  component: ClientBaseView,
  redirect: Dashboard,
  meta: {
    title: 'Início',
    name: 'Dashboard'
  },
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard'
    }
  },
  ...Students,
  ...Users
  ]
}]

// Home page
export default [...Auth, ...Client]
