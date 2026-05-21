import { useEffect, useState } from "react";
import {
  getProjectJoinRequestsApi,
  updateJoinRequestStatusApi,
} from "../api/projectApi";
import Button from "../../../components/common/Button";
import { showSuccessToast, showErrorToast } from "../../../lib/toast";

function ProjectJoinRequests({ projectId, onMemberAdded }) {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const data = await getProjectJoinRequestsApi(projectId);
      setRequests(data?.filter((r) => r.status === "PENDING") || []);
    } catch (error) {
      console.error("Failed to fetch join requests", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchRequests();
    }
  }, [projectId]);

  const handleAction = async (requestId, status) => {
    try {
      setActionLoadingId(requestId);
      await updateJoinRequestStatusApi(projectId, requestId, status);
      
      showSuccessToast(`Request ${status.toLowerCase()} successfully`);
      
      // Remove from list
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      
      // If approved, trigger a project refresh to update members list
      if (status === "APPROVED" && onMemberAdded) {
        onMemberAdded();
      }
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || `Failed to ${status.toLowerCase()} request`
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isLoading && requests.length === 0) {
    return null;
  }

  if (requests.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-xl font-semibold text-orange-800">
          Pending Join Requests
        </h2>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-200 text-xs font-bold text-orange-800">
          {requests.length}
        </span>
      </div>

      <div className="space-y-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-gray-800">
                {request.user?.name || "Unknown User"}
              </p>
              <p className="text-sm text-gray-500">
                {request.user?.email}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                disabled={actionLoadingId === request.id}
                onClick={() => handleAction(request.id, "REJECTED")}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                Reject
              </Button>
              
              <Button
                disabled={actionLoadingId === request.id}
                onClick={() => handleAction(request.id, "APPROVED")}
                className="bg-green-600 hover:bg-green-700"
              >
                {actionLoadingId === request.id ? "Processing..." : "Approve"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectJoinRequests;
