import { createRouter, createWebHistory} from "vue-router";
import Home from "@/components/home/Home.vue";
import Registration from "@/components/login/Registration.vue";
import Login from "@/components/login/Login.vue";
import Upload from "@/components/upload/Upload.vue";
import Database from "@/components/database/Database.vue";
import Detail from "@/components/database/Detail.vue";
import Annotator from "@/components/annotator/Annotator.vue";
import Admin from "@/components/admin/Admin.vue";
import Profile from "@/components/annotator/profile/Profile.vue";
import Annotation from "@/components/annotation/Annotation.vue";
import AdminProfile from "@/components/admin/Profile.vue";
import AdminTags from "@/components/admin/Tags.vue";
import Documents1 from "@/components/admin/Documents1.vue";
import Documents2 from "@/components/admin/Documents2.vue";
import Documents3 from "@/components/admin/Documents3.vue";
import ViewProfile from "@/components/admin/ViewProfile.vue";
import EditProfile from "@/components/admin/EditProfile.vue";



const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/register',
        component: Registration
    },
    {
        path:'/login',
        component: Login
    },
    {
        path: '/upload',
        component: Upload
    },
    {
        path: '/database',
        component: Database
    },

    {
        path: '/annotator',
        component: Annotator,
        children: [
            {
                path: 'view_profile',
                component: Profile

            }
        ]
    },
    {
        path: '/admin',
        component: Admin
    },
    {
        path: '/admin/profile',
        component: AdminProfile
    },
    {
        path: '/admin/tags',
        component: AdminTags
    },
    {
        path: '/admin/documents1',
        component: Documents1
    },
    {
        path: '/admin/documents2',
        component: Documents2
    },
    {
        path: '/admin/documents3',
        component: Documents3
    },
    {
        path: '/admin/editprofile',
        component: EditProfile
    },
    {
        path: '/admin/viewprofile',
        component: ViewProfile
    },
    {
        path: '/annotation',
        name: 'Annotation',
        component: Annotation,
        props: true,
    },
    {
        path: '/database/:id',
        component: Detail
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;