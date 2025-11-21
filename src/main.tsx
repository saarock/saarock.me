import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./pages/home/Home.tsx";
import Projects from "./pages/project/Projects.tsx";
import About from "./pages/about/About.tsx";
import Blogs from "./pages/blogs/Blogs.tsx";
import Contact from "./pages/contact/Contact.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import ReadBlog from "./pages/blogs/readBlog/ReadBlog.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/blogs/:blogId",
        element: <ReadBlog />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
