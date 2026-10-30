import ProjectSetting from "./ProjectSetting.jsx";
import {
  Plus,
  ArrowLeft,
  List,
  CheckCircle,
  Clock,
  Users,
  FileStack,
  Settings,
} from "lucide-react";
import { useState } from "react";

const ProjectDetails = ({ onClose, project }) => {
  const [isActive, setIsActive] = useState("tasks");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTypesOpen, setIsTypesOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [status, setStatus] = useState("All Status");
  const [types, setTypes] = useState("All Types");
  const [priority, setPriority] = useState("All Priority");
  const projectOverview = [
    {
      title: "Total Tasks",
      value: 0,
      icon: List,
      colorClass: "text-gray-700",
    },
    {
      title: "Completed",
      value: 0,
      icon: CheckCircle,
      colorClass: "text-green-700",
    },
    {
      title: "In Progress",
      value: 0,
      icon: Clock,
      colorClass: "text-yellow-700",
    },
    {
      title: "Team Members",
      value: 0,
      icon: Users,
      colorClass: "text-blue-700",
    },
  ];

  const projectStatus = ["All Status", "Active", "Pending", "Completed"];
  const projectPriority = ["All Priority", "Low", "Medium", "High"];
  const projectTypes = ["All Types", "Task", "Feature", "Improvement"];

  const handleStatus = (status) => {
    setStatus(status);
    setIsStatusOpen(false);
  };

  const handlePriority = (priority) => {
    setPriority(priority);
    setIsPriorityOpen(false);
  };

  const handleTypes = (types) => {
    setTypes(types);
    setIsTypesOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-gray-100 font-medium transition duration-200 cursor-pointer active:scale-95 text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {project?.name || "Project Overview"}
              </h1>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  project?.status === "Active"
                    ? "bg-yellow-100 text-yellow-800"
                    : project?.status === "Pending"
                      ? "bg-red-100 text-red-800"
                      : project?.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                }`}
              >
                {project?.status || "Pending"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {project?.description || "Project Description"}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <Plus size={20} />
          <span>New Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {projectOverview.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">{item.title}</span>
              <item.icon className={`h-4 w-4 ${item.colorClass}`} />
            </div>
            <p className={`text-2xl font-bold ${item.colorClass}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex ml-6">
        <div className="flex bg-transparent border border-gray-200 rounded-sm overflow-hidden">
          <div className="flex items-center">
            <input
              type="radio"
              name="options"
              id="tasks"
              onClick={() => setIsActive("tasks")}
              className="hidden peer"
              defaultChecked
            />
            <label
              htmlFor="tasks"
              className="flex items-center justify-center gap-2 cursor-pointer py-2 px-12 text-gray-500 transition-colors duration-200 peer-checked:bg-gray-200 peer-checked:text-gray-800 peer-checked:shadow-sm"
            >
              <span>
                <FileStack className="w-4 h-4" />
              </span>
              <span>Tasks</span>
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="options"
              onClick={() => setIsActive("settings")}
              id="settings"
              className="hidden peer"
            />
            <label
              htmlFor="settings"
              className="flex items-center justify-center gap-2 cursor-pointer py-2 px-12 text-gray-500 transition-colors duration-200 peer-checked:bg-gray-200 peer-checked:text-gray-800 peer-checked:shadow-sm"
            >
              <span>
                <Settings className="w-4 h-4" />
              </span>
              <span>Settings</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 ml-6">
        {/* Status */}
        <div className="flex flex-col w-26 text-sm relative">
          <button
            type="button"
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className="flex items-center justify-between relative z-20 w-full text-left px-2 pr-1 py-1 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            <span>{status}</span>
            <svg
              className={`w-4 h-4 inline float-right transition-transform duration-200 ${
                isStatusOpen ? "rotate-0" : "-rotate-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isStatusOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-10 top-8">
              {projectStatus.map((ps) => (
                <li
                  key={ps}
                  className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                  onClick={() => handleStatus(ps)}
                >
                  {ps}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Types */}
        <div className="flex flex-col w-26 text-sm relative">
          <button
            type="button"
            onClick={() => setIsTypesOpen(!isTypesOpen)}
            className="flex items-center justify-between relative z-20 w-full text-left px-2 pr-1 py-1 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            <span>{types}</span>
            <svg
              className={`w-4 h-4 inline float-right transition-transform duration-200 ${
                isTypesOpen ? "rotate-0" : "-rotate-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isTypesOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-10 top-8">
              {projectTypes.map((pt) => (
                <li
                  key={pt}
                  className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                  onClick={() => handleTypes(pt)}
                >
                  {pt}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Priority */}
        <div className="flex flex-col w-26 text-sm relative">
          <button
            type="button"
            onClick={() => setIsPriorityOpen(!isPriorityOpen)}
            className="flex items-center justify-between relative z-20 w-full text-left px-2 pr-1 py-1 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            <span>{priority}</span>
            <svg
              className={`w-4 h-4 inline float-right transition-transform duration-200 ${
                isPriorityOpen ? "rotate-0" : "-rotate-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isPriorityOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-10 top-8">
              {projectPriority.map((pp) => (
                <li
                  key={pp}
                  className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                  onClick={() => handlePriority(pp)}
                >
                  {pp}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isActive==="settings" && (
        <div>
          <ProjectSetting project={project}/>
        </div>
      )
      }
    </>
  );
};

export default ProjectDetails;
