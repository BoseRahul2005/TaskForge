import { useState } from "react";
import { Plus, FolderOpen, Search } from "lucide-react";
import CreateProjectForm from "../components/layouts/CreateProjectForm";
import ProjectDetails from "../featutres/projects/ProjectDetails";

const Projects = ({ selectedWorkspace, projects = [] }) => {
  const [isCreateProjectFormModalOpen, setIsCreateProjectFormModalOpen] = useState(false);
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priority");
  const [searchQuery, setSearchQuery] = useState("");

  const projectStatus = ["All Status", "Active", "Pending", "Completed"];
  const projectPriority = ["All Priority", "Low", "Medium", "High"];

  const handleStatus = (status) => {
    setStatus(status);
    setIsStatusOpen(false);
  };

  const handlePriority = (priority) => {
    setPriority(priority);
    setIsPriorityOpen(false);
  };

  const reversedProjects = [...projects].reverse();

  const filteredProjects = reversedProjects.filter((project) => {
    const matchesSearch =
      !searchQuery ||
      project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      status === "All Status" || project.status === status;
    const matchesPriority =
      priority === "All Priority" || project.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <>
      {isProjectDetailsOpen ? (
        <ProjectDetails
          onClose={() => setIsProjectDetailsOpen(false)}
          project={selectedProject}
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-8 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and track your projects
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateProjectFormModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus size={20} />
              <span>New Project</span>
            </button>
          </div>

          <div className="flex items-center gap-5 w-xl mb-8 ml-8">
            {/* Input */}
            <div className="flex flex-1 items-center h-8 w-full max-w-md text-sm text-gray-500 bg-white border border-gray-500/30 rounded-xl">
              <button type="button" className="h-full px-3">
                <Search className="text-gray-500 w-4 h-4" />
              </button>
              <input
                className="outline-none bg-transparent h-full w-full"
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
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
          </div>

          <div className="mx-8">
            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-4">
                  <FolderOpen className="h-8 w-8 text-gray-600" />
                </div>
                <p className="text-sm text-gray-500 mb-4">No projects yet</p>
                <button
                  type="button"
                  onClick={() => setIsCreateProjectFormModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg text-sm transition duration-200 cursor-pointer active:scale-95"
                >
                  Create your First Project
                </button>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6">
                <p className="text-sm text-gray-500">
                  No projects match your filter.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      setIsProjectDetailsOpen(true);
                      setSelectedProject(project);
                    }}
                    className="bg-white w-[23vw] min-w-65 rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow duration-200 flex flex-col cursor-pointer"
                  >
                    {/* Title */}
                    <h3 className="text-base font-semibold text-blue-600 mb-1 truncate">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    {/* This section is pushed to the bottom of the card */}
                    <div className="mt-auto">
                      {/* Badges row */}
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            project.status === "Active"
                              ? "bg-yellow-100 text-yellow-800"
                              : project.status === "Pending"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {project.status}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            project.priority === "Low"
                              ? "bg-blue-100 text-blue-800"
                              : project.priority === "Medium"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-violet-100 text-violet-800"
                          }`}
                        >
                          {project.priority}
                        </span>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: (project.progress || 0) + "%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {isCreateProjectFormModalOpen && (
        <CreateProjectForm
          onClose={() => setIsCreateProjectFormModalOpen(false)}
          workspace={selectedWorkspace}
        />
      )}
    </>
  );
};

export default Projects;
