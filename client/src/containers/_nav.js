import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  }, {
    _tag: 'CSidebarNavTitle',
    _children: [ 'Task Views' ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Calendar',
    to: '/task-view/calendar',
    icon: 'cil-calendar',
  }
]

export default _nav
