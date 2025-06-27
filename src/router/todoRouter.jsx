import { lazy, Suspense } from "react";

import TodoIndexPage from "../pages/todo/todoIndexPag";
import { Navigate } from "react-router";

const Loading = () => <div>Loading....</div>

const TodoList =lazy(() => import("../pages/todo/todoListPage"))
const TodoRead =lazy(() => import("../pages/todo/todoReadPage"))

function todoRouter() {
    return ({
        path: "/todo",
        Component: TodoIndexPage,
        children: [
            {
                path: "list",
                element: <Suspense fallback={<Loading/>}><TodoList/></Suspense>
            },
            {
                path: "read/:tno",
                element: <Suspense fallback={<Loading/>}><TodoRead/></Suspense>
            },
            {
                path:"",
                element: <Navigate to={'/todo/list'}></Navigate>
            }
        ]
    })
}

export default todoRouter