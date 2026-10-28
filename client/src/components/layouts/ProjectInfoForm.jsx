import { useForm } from "react-hook-form";
import API from "../../api/axios.js";
import { useState } from "react";
import { useAuth } from "@clerk/react";
import { LoaderCircle } from "lucide-react";

const ProjectInfoForm = ({ onClose, workspace }) => {
  const {getToken}= useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      startDate: "",
      dueDate: "",
      // projectLead: "No lead",
      // teamMembers: "",
    },
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async(data) => {
    try{
      const token = await getToken();
      const response = await API.post(`/workspaces/${workspace.id}/projects`,data,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });

      if(response?.data?.success){
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Create New Project
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              In workspace:{" "}
              <span className="text-blue-600 font-medium">{workspace?.name|| "Your Workspace"}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Project Name
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              {...register("name", { required: "Project name is required" })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe your project"
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option selected >Pending</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Priority
              </label>
              <select
                {...register("priority")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option>Low</option>
                <option selected>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                {...register("dueDate", {
                  validate: (value, formValues) =>
                    !value ||
                    !formValues.startDate ||
                    new Date(value) >= new Date(formValues.startDate) ||
                    "End date must be after start date",
                })}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Project Lead
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Project Lead
            </label>
            <select
              {...register("projectLead")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>No lead</option>
              Map over your team members here
            </select>
          </div>

          Team Members
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Team Members
            </label>
            <select
              multiple
              {...register("teamMembers")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>Add team members</option>
            </select>
          </div> */}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting||showSuccess}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              {isSubmitting?(
                <>
                <LoaderCircle className="animate-spin" size={20} />
                <span> Creating...</span>
                </>
              ):showSuccess?(
                "Project Created!"
              ):(
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectInfoForm;
