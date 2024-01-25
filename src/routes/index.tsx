import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeTideInsight from "@/pages/company";
import MapPlain from "@/pages/work";

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
  ]);

  return <RouterProvider router={router} />;
}
