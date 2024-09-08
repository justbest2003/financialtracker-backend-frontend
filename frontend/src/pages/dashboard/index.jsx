import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial.context";
import AddRecordForm from "./AddRecordForm";
import FinancialRecordTable from "./FinancialRecordTable";
import { useMemo } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      const amount = parseFloat(record.amount);
      totalAmount += amount;
    });

    return totalAmount;
  }, [records]);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 text-center">
      <div className="title bg-base-100 shadow-xl p-8 m-8 rounded-lg w-6/12 mx-auto">
      <div className="avatar online p-4">
        <div className="w-24 rounded-full border-4 border-green-200">
        <img src={user?.imageUrl} alt="User Profile" />
        </div>
      </div>
      <div className="text-4xl font-mono">
        Welcome : {user?.firstName}! <br />
        <span className="text-green-500 text-2xl">Here are you finance</span>
      </div>
      </div>
      <AddRecordForm />
      <div className="stats shadow-xl p-2 m-8">
        <div className="stat">
          <div className="stat-title">Total Monthly</div>
          <div className="stat-value text-green-500">{totalMonthly}฿</div>
          <div className="stat-desc">Total money in your wallet</div>
        </div>
      </div>
      <FinancialRecordTable />
    </div>
  );
};

export default Dashboard;
