import { useState } from "react";
import { createRequestLeave } from "../../services/api.service";
import { notification } from "antd";

const CreateLeaveRequest = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleCreateRequest = async (e) => {
    e.preventDefault(); // Ngăn form reload

    try {
      const res = await createRequestLeave(startDate, endDate, reason, null);

      if (res.data) {
        notification.success({
          message: "Leave Request Created Successfully",
          description: "Your leave request has been submitted.",
        });

        setStartDate("");
        setEndDate("");
        setReason("");
      } else {
        notification.error({
          message: "Error Creating Leave Request",
          description: res.message,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error Creating Leave Request",
        description: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px]">
        <h2 className="text-center text-lg font-semibold mb-4">
          CREATE A LEAVE REQUEST
        </h2>
        <hr className="mb-4" />

        <form className="space-y-4" onSubmit={handleCreateRequest}>
          {/* Start and End date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Start date of leave</label>
              <input
                type="date"
                className="w-full p-2 border rounded mt-1"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium">End date of leave</label>
              <input
                type="date"
                className="w-full p-2 border rounded mt-1"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block font-medium">Reason</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLeaveRequest;
