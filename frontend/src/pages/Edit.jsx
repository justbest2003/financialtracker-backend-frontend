import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFinancialRecords } from "../contexts/financial.context";

const Edit = () => {
  const { records, updateRecord } = useFinancialRecords();
  const { id } = useParams();
  const navigate = useNavigate();
  const [financials, setFinancials] = useState({
    description: "",
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
  });

  useEffect(() => {
    // Convert id to a number if it's not already
    const recordId = Number(id);
    // Find the record by id from records
    const record = records.find((record) => record.id === recordId);
    // Check if the record was found and update state
    if (record) {
      // Ensure date is formatted as YYYY-MM-DD
      const formattedDate = new Date(record.date).toISOString().split('T')[0];
      setFinancials({
        ...record,
        date: formattedDate
      });
    }
  }, [id, records]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancials({ ...financials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecord(id, financials);
      Swal.fire({
        title: "Record Updated",
        text: "Your financial record has been updated successfully.",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error?.message || "An error occurred while updating the record.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container flex flex-col items-center p-4 mx-auto space-y-6">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description : </span>
            </label>
            <input
              type="text"
              placeholder="Description"
              className="input input-bordered"
              required
              name="description"
              id="description"
              value={financials.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount : </span>
            </label>
            <input
              type="text"
              placeholder="Amount"
              className="input input-bordered"
              required
              name="amount"
              id="amount"
              value={financials.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date : </span>
            </label>
            <input
              type="date"
              placeholder="Date"
              className="input input-bordered"
              required
              name="date"
              id="date"
              value={financials.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category : </span>
            </label>
            <input
              type="text"
              placeholder="Category"
              className="input input-bordered"
              required
              name="category"
              id="category"
              value={financials.category}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Payment Method : </span>
            </label>
            <input
              type="text"
              placeholder="Payment Method"
              className="input input-bordered"
              required
              name="paymentMethod"
              id="paymentMethod"
              value={financials.paymentMethod}
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
