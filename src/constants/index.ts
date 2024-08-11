import { mdiContentSave, mdiHome, mdiWallpaper, mdiAccountMultiple, mdiImagePlus } from '@mdi/js'

export const sidebarLinks = [
    {
        route: '/',
        label: 'Home',
        icon: mdiHome
    },
    {
        route: '/explore',
        label: 'Explore',
        icon: mdiWallpaper
    },
    {
        route: '/people',
        label: 'People',
        icon: mdiAccountMultiple
    },
    {
        route: '/saved',
        label: 'Saved',
        icon: mdiContentSave
    },
    {
        route: '/posts/create',
        label: 'Create Post',
        icon: mdiImagePlus
    },
]

export const bottombarLinks = [
    {
        route: '/',
        label: 'Home',
        icon: mdiHome
    },
    {
        route: '/explore',
        label: 'Explore',
        icon: mdiWallpaper
    },
    {
        route: '/saved',
        label: 'Saved',
        icon: mdiContentSave
    },
    {
        route: '/posts/create',
        label: 'Create Post',
        icon: mdiImagePlus
    },
]