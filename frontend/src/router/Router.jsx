import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Edit from "../pages/Edit.jsx";
import Dashboard from "../pages/dashboard/index.jsx";
import { FinancialRecordsProvider } from "../contexts/financial.context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <FinancialRecordsProvider>
            <Dashboard />
          </FinancialRecordsProvider>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <FinancialRecordsProvider>
            <Edit />
          </FinancialRecordsProvider>
        ),
      },
    ],
  },
]);

export default router;
