import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeTideInsight from "@/pages/company";
import MapPlain from "@/pages/work";
import Studio from "@/pages/work/studio";
import Insight from "@/pages/work/insight";
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
      path: "/insight",
      element: <Insight />,
    },
    {
      path: "/studio",
      element: <Studio />,
    },
    {
      path: "/ErrorDialog",
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}
