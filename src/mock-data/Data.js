import { faUsers, faUserTie, faNetworkWired, faCity } from "@fortawesome/free-solid-svg-icons";

export const MockDataStatus =[
    {
        iconName : faUsers,
        titleName : 'Users',
        variable:'usersCount'
    },
    {
        iconName : faUserTie,
        titleName : 'Roles',
        variable:'rolesCount'

    },
    {
        iconName : faNetworkWired,
        titleName : 'Departments',
        variable:'departmentsCount'

    },
    {
        iconName : faCity,
        titleName : 'Work Sites',
        variable:'workSitesCount'

    }
];
