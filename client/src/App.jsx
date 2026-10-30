import { Route, Routes, useNavigate, useLocation } from "react-router";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Sidebar from "./components/layouts/Sidebar";
import CreateProjectForm from "./components/layouts/CreateProjectForm";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { useState, useEffect } from "react";
import API from "./api/axios";

function App() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isCreateProjectFormModalOpen, setIsCreateProjectFormModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectedWorkspaceData = (wsData) => {
    setSelectedWorkspace(wsData);
  };

  const handleProjectsData = async (id) => {
    try {
      const res = await API.get(`/workspaces/${id}/projects`);
      const data = res.data.projects;
      setProjects(data);
      console.log("Projects data: ", data);
    } catch (err) {
      console.log("Projects error: ", err);
    }
  };

  useEffect(() => {
    if (selectedWorkspace?.id) {
      handleProjectsData(selectedWorkspace.id);
    }
  }, [selectedWorkspace]);

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <Sidebar
        selectedWorkspace={selectedWorkspace}
        onSelectWorkspace={handleSelectedWorkspaceData}
        projects={projects}
        defaultActive={
          location.pathname.startsWith("/projects") ? "projects" : "dashboard"
        }
        onSelectNav={(id) => {
          if (id === "dashboard") navigate("/");
          else if (id === "projects" || id.startsWith("project-")) navigate("/projects");
        }}
        onAddProject={() => setIsCreateProjectFormModalOpen(true)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        <header className="p-4 border-b border-gray-100 flex justify-end items-center">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="group px-8 py-2.5 bg-indigo-600 rounded-lg text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-indigo-700">
                <p className="relative h-6 overflow-hidden">
                  <span className="block transition-transform duration-300 group-hover:translate-y-full cursor-pointer">
                    Sign in
                  </span>
                  <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:-translate-y-full">
                    Sign in
                  </span>
                </p>
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </header>
        <main className="flex-1 p-6 bg-gray-50/50 ml-60">
          {selectedWorkspace === null ? (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome to TaskForge. Sign in to continue.
              </p>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Dashboard
                      selectedWorkspace={selectedWorkspace}
                      projects={projects}
                    />
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <Projects
                      selectedWorkspace={selectedWorkspace}
                      projects={projects}
                    />
                  }
                />
              </Routes>
            </div>
          )}
        </main>
      </div>

      {isCreateProjectFormModalOpen && (
        <CreateProjectForm
          onClose={() => setisCreateProjectFormModalOpen(false)}
          workspace={selectedWorkspace}
          onProjectCreated={() => {
            if (selectedWorkspace?.id) {
              handleProjectsData(selectedWorkspace.id);
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
