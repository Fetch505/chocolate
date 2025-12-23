import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// Common 404 Page
import NotFound from "../pages/404.page";
import UserPage from "../pages/user-page";

const Router = () => {
 

  const router = createBrowserRouter([
   
    {
      path: "/",
      element: (
        <>
          <UserPage />
        </>
      )
    
    },
    {
      path: "*",
      element: <NotFound />
    }
   
]);

  return <RouterProvider router={router} />;
};

export default Router;