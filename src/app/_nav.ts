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
        menu: true,
        entitlements: [],
        name: 'Admin',
        url: '/admin',
        icon: 'icon-star',
        children: [
            {
                entitlements: ['VIEW_SHOP_PROFILE', 'UPDATE_SHOP_PROFILE'],
                name: 'Manage Shops',
                url: '/admin/shop',
                icon: 'icon-basket'
            },
            {
                entitlements: ['VIEW_BRANCH_LIST', 'ADD_NEW_BRANCH', 'UPDATE_NEW_BRANCH'],
                name: 'Manage Domain',
                url: '/admin/manage-branch',
                icon: 'icon-briefcase'
            },
          {
            entitlements: ['VIEW_SHOP_PROFILE', 'UPDATE_SHOP_PROFILE'],
            name: 'Product Categories',
            url: '/admin/product-categories',
            icon: 'icon-briefcase'
          },
            {
                entitlements: ['VIEW_USER_PROFILE', 'UPDATE_USER_PROFILE'],
                name: 'Manage Users',
                url: '/admin/users',
                icon: 'icon-people'
            },
          {
            entitlements: ['VIEW_SHOP_PROFILE', 'UPDATE_SHOP_PROFILE'],
            menu: true,
            name: 'Custom Master Data',
            url: '',
            icon: 'icon-briefcase',
            children: [
              // {
              //   entitlements: ['VIEW_SHOP_PROFILE', 'UPDATE_SHOP_PROFILE'],
              //   name: 'Vehicle',
              //   url: '',
              //   icon: 'icon-briefcase'
              // },
              {
                entitlements: ['VIEW_SHOP_PROFILE', 'UPDATE_SHOP_PROFILE'],
                name: 'Master Data',
                url: '/admin/master-data',
                icon: 'icon-briefcase'
              }]
          }
        ]
    },
    // {
    //     menu: true,
    //     entitlements: ['VIEW_SUPPLIER_LISTS'],
    //     name: 'Supplier',
    //     url: '/commission',
    //     icon: 'icon-briefcase'
    // },
    {
        title: true,
        name: 'Reports'
    },
    {
        divider: true
    }
];
