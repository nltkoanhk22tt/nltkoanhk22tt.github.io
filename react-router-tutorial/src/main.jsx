// src/main.jsx

import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

/* existing imports */
import Root, {loader as rootLoader, action as rootAction} from "./routes/Root";
import Contact, {loader as contactLoader, } from "./routes/contact";
/* previous imports */
import ErrorPage from "./error-page";
import EditContact, { action as editAction, } from "./routes/edit";
import { action as destroyAction} from "./routes/destroy";
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, 
    action: rootAction,
    children: [
      { index: true, element: <Index />},
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);