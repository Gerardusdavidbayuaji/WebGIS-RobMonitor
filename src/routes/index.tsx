import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeTideInsight from "@/pages/company";
import MapPlain from "@/pages/work";
import Error from "@/components/ErrorDialog";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeTideInsight />,
    },
    {
      path: "/work",
      element: <MapPlain />,
    },
    {
      path: "/ErrorDialog",
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}
