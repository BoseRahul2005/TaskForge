import CreateProjectForm from "../components/layouts/CreateProjectForm";
import { useState} from "react";
import { useNavigate } from "react-router";
import {
  Plus,
  FolderOpen,
  CircleCheckBig,
  List,
  TriangleAlert,
  LoaderCircle,
  CalendarDays,
} from "lucide-react";

const Dashboard = ({ selectedWorkspace, projects = [] }) => {
  const [isCreateProjectFormModalOpen, setIsCreateProjectFormModalOpen] = useState(false);
  const navigate = useNavigate();

  const reversedProjects= [...projects].reverse();

  const upperCardItems = [
    {
      title: "Total Projects",
      count: projects?.length || 0,
      icon: FolderOpen,
      description: `projects in ${selectedWorkspace?.name || "workspace"}`,
      colorClass: "bg-blue-50 text-blue-500",
    },
    {
      title: "Completed Projects",
      count: 0,
      icon: CircleCheckBig,
      description: `of 0 total`,
      colorClass: "bg-emerald-50 text-emerald-500",
    },
    {
      title: "My Tasks",
      count: 0,
      icon: List,
      description: `in ${selectedWorkspace?.name || "workspace"}`,
      colorClass: "bg-purple-50 text-purple-500",
    },
    {
      title: "Overdue Tasks",
      count: 0,
      icon: TriangleAlert,
      description: `tasks overdue`,
      colorClass: "bg-red-50 text-red-500",
    },
  ];

  const rightCardItems = [
    {
      title: "My Tasks",
      count: 0,
      icon: List,
      description: "No Tasks",
      colorClass: "bg-green-50 text-green-500",
    },
    {
      title: "Overdue Tasks",
      count: 0,
      icon: TriangleAlert,
      description: "No Overdue Tasks",
      colorClass: "bg-red-50 text-red-500",
    },
    {
      title: "In Progress",
      count: 0,
      icon: LoaderCircle,
      description: "No Tasks in Progress",
      colorClass: "bg-yellow-50 text-yellow-500",
    },
  ];

  const handleViewAllProjectsClick = () => {
    navigate("/projects");
  };

  return (
    <>
      <div className="flex items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to {selectedWorkspace?.name || "your workspace"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's what happening with your projects today
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsCreateProjectFormModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <Plus size={20} />
          <span> New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {upperCardItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{item.title}</span>
              <div
                className={`h-9 w-9 flex items-center justify-center rounded-lg ${item.colorClass}`}
              >
                <item.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {item.count}
            </p>
            <p className="mt-1 text-xs text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (spans 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900">
                  Project Overview
                </h2>
                <button
                  onClick={handleViewAllProjectsClick}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
                >
                  View all
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              {projects.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-4">
                    <FolderOpen className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">No projects yet</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateProjectFormModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg text-sm transition duration-200 cursor-pointer active:scale-95"
                  >
                    Create your First Project
                  </button>
                </div>
              ) : (
                /* Project List */
                <div className="divide-y divide-gray-100">
                  {reversedProjects.map((project) => (
                    <div key={project.id} className="p-5 cursor-pointer transition-colors duration-200 hover:bg-gray-50">
                      {/* Title + Badge row */}
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {project.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            0 members
                            <span className="mx-1">·</span>
                            <CalendarDays className="h-3 w-3 inline-block mr-1 -translate-y-0.5" />
                            {project.dueDate
                              ? new Intl.DateTimeFormat("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }).format(new Date(project.dueDate))
                              : "No due date"}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            project.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : project.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          } shrink-0 ml-3`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>Progress </span>
                          <span>0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `0%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900">
                  Recent Activity
                </h2>
              </div>
              <div className="p-5 text-sm text-gray-400">
                {/* Content goes here */}
              </div>
            </div>
          </div>

          {/* Right Column (spans 1/3) */}
          <div className="space-y-6">
            {rightCardItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <h2 className="text-base font-semibold text-gray-900">
                      {item.title}
                    </h2>
                  </div>
                  <span
                    className={`flex items-center justify-center h-6 w-6 rounded-full ${item.colorClass} text-xs font-semibold`}
                  >
                    0
                  </span>
                </div>
                <div className="p-5 text-center">
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCreateProjectFormModalOpen && (
        <CreateProjectForm
          onClose={() => setIsCreateProjectFormModalOpen(false)}
          workspace={selectedWorkspace}
        />
      )}
    </>
  );
};

export default Dashboard;
