import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import API from "../../api/axios.js";
import { LoaderCircle } from "lucide-react";

const ProjectSetting = ({ project }) => {
  const defaultValues = {
    name: project?.name,
    description: project?.description,
    status: project?.status,
    priority: project?.priority,
    startDate: project?.startDate,
    dueDate: project?.dueDate,
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen]= useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess]= useState(false);
  const [isDeleting, setIsDeleting]= useState(false);
  const watched = useWatch({ control });

  const hasChanges = JSON.stringify(watched) != JSON.stringify(defaultValues);

  const onSubmit = async (data) => {
    try {
      const response = await API.put(
        `/workspaces/projects/${project?._id}`,
        data,
      );

      if (response?.data?.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
  try {
    setIsConfirmationModalOpen(false);
    setIsDeleting(true);

    const [response] = await Promise.all([
      API.delete(`/workspaces/projects/${project?._id}`),
      new Promise((resolve) => setTimeout(resolve, 1500))
    ]);

    if (response?.data?.success) {
      setShowDeleteSuccess(true);

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }

  } catch (err) {
    console.log(err);
  } finally{
    setIsDeleting(false);
  }
};
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Project Details Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Project Details
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Project name is required",
                  })}
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  {...register("description")}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Status & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    {...register("priority")}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Start Date & Due Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...register("startDate")}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    {...register("dueDate", {
                      validate: (value, formValues) =>
                        !value ||
                        !formValues.startDate ||
                        new Date(value) >= new Date(formValues.startDate) ||
                        "Due date must be after start date",
                    })}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      errors.dueDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  disabled={!hasChanges || isSubmitting || showSuccess}
                  className={`flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium text-white ${showSuccess ? "bg-green-600 rounded-lg hover:bg-green-700" : "bg-blue-600 rounded-lg hover:bg-blue-700"} transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                >
                  {isSubmitting ? (
                    <>
                      <span>
                        <LoaderCircle className="animate-spin" size={15} />
                      </span>
                      <span> Saving...</span>
                    </>
                  ) : showSuccess ? (
                    "Changes Saved!"
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Team Members */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Team Members (1)
              </h2>
              <button className="flex items-center justify-center h-8 w-8 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
                <span className="text-sm text-gray-700 truncate">
                  user.greatstack@gmail.com
                </span>
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-200 text-gray-700 whitespace-nowrap">
                  Team Lead
                </span>
              </div>
            </div>
          </div>

          {/* Delete Section */}
          <div className="bg-white rounded-xl border border-red-200 shadow-sm mt-4">
            {/* Header */}
            <div className="p-5 border-b border-red-100">
              <h2 className="text-base font-semibold text-red-600">
                Danger Zone
              </h2>
            </div>

            {isConfirmationModalOpen ? (
              <div className="flex flex-col items-center bg-white shadow-md py-6 px-5  border rounded-b-xl border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h2 className="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
                Do you really want to delete? This action<br />cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
                <button type="button" onClick={()=>setIsConfirmationModalOpen(false)} className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition cursor-pointer">
                    Cancel
                </button>
                <button type="button" onClick={handleDelete} className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition cursor-pointer">
                    Confirm
                </button>
            </div>
        </div>
            ):
            (<div className="p-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Delete this Project
                </h3>
                <p className="text-sm text-gray-500">
                  Once you delete a project, there is no going back. Please
                  be certain.
                </p>
              </div>
              <button onClick={()=>setIsConfirmationModalOpen(true)} disabled={isDeleting || showDeleteSuccess} className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}>
                {isDeleting ? (
                    <>
                      <span>
                        <LoaderCircle className="animate-spin" size={15} />
                      </span>
                      <span> Deleting...</span>
                    </>
                  ) : showDeleteSuccess ? (
                    "Deleted!"
                  ) : (
                    "Delete this project"
                  ) }
              </button>
            </div>)
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSetting;
