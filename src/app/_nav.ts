export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Menus'
  },
  {
    name: 'Admin',
    url: '/admin',
    icon: 'icon-star'
  },
  {
    name: 'Commission',
    url: '/commission',
    icon: 'icon-briefcase'
  },
  {
    name: 'Customers',
    url: '/customer',
    icon: 'icon-people'
  },
  {
    name: 'Order',
    url: '/order',
    icon: 'icon-basket-loaded'
  },
  {
    name: 'Message',
    url: '/message',
    icon: 'icon-envelope'
  },
  {
    title: true,
    name: 'Reports'
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'icon-docs',
    children: [
      {
        name: 'Sales',
        url: '/reports/sales',
        icon: 'icon-basket'
      },
      {
        name: 'Commission',
        url: '/reports/commission',
        icon: 'icon-briefcase'
      },
      {
        name: 'Customer',
        url: '/reports/customer',
        icon: 'icon-people'
      }
    ]
  },
  // {
  //  title: true,
  //  name: 'UI elements'
  // },
  // {
  //  name: 'Components',
  //  url: '/components',
  //  icon: 'icon-puzzle',
  //  children: [
  //    {
  //      name: 'Demo Page',
  //      url: '/components/demo-page',
  //      icon: 'icon-puzzle'
  //    }
  //  ]
  // },
  {
    divider: true
  }
];
