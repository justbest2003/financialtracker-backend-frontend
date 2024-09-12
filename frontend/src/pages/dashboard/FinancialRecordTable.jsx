import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFinancialRecords } from "../../contexts/financial.context";
import Swal from "sweetalert2";

const FinancialRecordTable = () => {
  const { records, deleteRecord } = useFinancialRecords();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Number of records per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(records.length / recordsPerPage);

  // Get records for the current page
  const getCurrentPageRecords = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return records.slice(startIndex, endIndex);
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete record with ID: ${record.id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(record.id);
        Swal.fire(
          "Deleted!",
          `Record with ID: ${record.id} has been deleted.`,
          "success"
        );
      }
    });
  };

  const handleEdit = (record) => {
    navigate(`/edit/${record.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en");
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg mb-10">
      <table className="table-auto w-full bg-white shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Payment Method</th>
            <th className="py-3 px-4">Edit</th>
            <th className="py-3 px-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageRecords().map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{record.description}</td>
              <td className="py-2 px-4 border-b">{record.amount}</td>
              <td className="py-2 px-4 border-b">{formatDate(record.date)}</td>
              <td className="py-2 px-4 border-b">{record.category}</td>
              <td className="py-2 px-4 border-b">{record.paymentMethod}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="btn btn-warning btn-sm mx-1 bg-yellow-500 text-white hover:bg-yellow-600 rounded"
                  onClick={() => handleEdit(record)}
                >
                  Edit
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="btn btn-error btn-sm mx-1 bg-red-500 text-white hover:bg-red-600 rounded"
                  onClick={() => handleDelete(record)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="join flex justify-center items-center mt-6">
        <button
          className="join-item btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn" disabled>
          Page {currentPage} of {totalPages}
        </button>
        <button
          className="join-item btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default FinancialRecordTable;
