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
                entitlements: ["VIEW_SHOP_PROFILE", "UPDATE_SHOP_PROFILE"],
                name: 'Manage Business',
                url: '/shop/details',
                icon: 'icon-basket'
            },
            {
                entitlements: ["VIEW_BRANCH_LIST", "ADD_NEW_BRANCH", "UPDATE_NEW_BRANCH"],
                name: 'Manage Branches',
                url: '/branch/branches',
                icon: 'icon-briefcase'
            },
            {
                entitlements: ["VIEW_SHOP_CORNER_LIST", "CREATE_SHOP_CORNER"],
                name: 'Manage WFP',
                url: '/shop-corner/manage',
                icon: 'icon-people'
            },
            {
                entitlements: ["VIEW_SHOP_CORNER_LIST", "CREATE_SHOP_CORNER"],
                name: 'Manage Users',
                url: '/admin/users',
                icon: 'icon-people'
            }
        ]
    },
    {
        menu: true,
        entitlements: ["VIEW_SUPPLIER_LISTS"],
        name: 'Management',
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
