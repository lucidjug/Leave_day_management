import { useEffect } from "react";
import { getMyLeaveRequest } from "../../services/api.service";
const MyLeaveRequest = () => {
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await getMyLeaveRequest();
      console.log("Leave Requests: ", response.data);
    } catch (error) {
      console.error("Error fetching leave requests: ", error);
    }
  };
  return <div>MyLeaveRequest</div>;
};

export default MyLeaveRequest;
