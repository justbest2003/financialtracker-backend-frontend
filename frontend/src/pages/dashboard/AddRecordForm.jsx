import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const AddRecordForm = () => {
  const { user } = useUser();

  const [financials, setFinancials] = useState({
    description: "",
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancials({ ...financials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/financial/",
        { ...financials, userId: user.id }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Add Financial Record!",
          text: "Financial record has been added successfully.",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
        setFinancials({
          description: "",
          date: "",
          amount: "",
          category: "",
          paymentMethod: "",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Add Financial Record",
        text: error?.response?.data?.message || error.message,
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
              placeholder="คำอธิบาย"
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
              placeholder="จำนวนเงิน"
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
              placeholder="วันที่"
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
              placeholder="หมวดหมู่"
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
              <span className="label-text">Payment : </span>
            </label>
            <input
              type="text"
              placeholder="การชำระเงิน"
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
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecordForm;
