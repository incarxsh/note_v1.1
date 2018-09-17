import App from "./App.vue";
import NoteDetail from "./noteDetail.vue";
import Content from "./Content.vue";
import NoteMain from "./noteMain.vue";

const routes = [
    {
        path: '/admin',
        component: App,
        children : [
            {
                path : "/admin/:id/:name",
                component : Content,
                name:"cont"
            }
        ]
    },
    {
        path: '/',
        component: NoteDetail,
        children:[
            {
                path:"/detail/:id",
                component:NoteMain,
                name:"noteDetail"
            }
        ]
    }
];

export default routes;