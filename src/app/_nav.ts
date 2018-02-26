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
        key: 'admin',
        name: 'Admin',
        url: '/admin',
        icon: 'icon-star',
        children: [
            {
                key: 'admin-shop',
                name: 'Manage Business',
                url: '/reports/sales',
                icon: 'icon-basket'
            },
            {
                key: 'admin-branch',
                name: 'Manage Branches',
                url: '/reports/commission',
                icon: 'icon-briefcase'
            },
            {
                key: 'admin-wfp',
                name: 'Manage WFP',
                url: '/reports/customer',
                icon: 'icon-people'
            }
        ]
    },
    {
        menu: true,
        name: 'Commission',
        url: '/commission',
        icon: 'icon-briefcase'
    },
    {
        title: true,
        name: 'Reports'
    },
    {
        divider: true
    }
];
