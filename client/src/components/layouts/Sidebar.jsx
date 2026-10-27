import { useState } from 'react';
import { useAuth } from "@clerk/react";
import SignInOverlay from '../auth/SigninOverlay';
import {
  LayoutGrid,
  Folder,
  Users,
  Settings,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Plus,
  Check,
} from 'lucide-react';

export default function Sidebar({
  currentWorkspace = '',
  workspaces = [],
  defaultActive = 'dashboard',
  taskCount = 0,
  projects = [],
  onSelectNav,
  onSelectWorkspace,
  onAddProject,
  className = '',
}) {
  const { isSignedIn } = useAuth();
  const [activeItem, setActiveItem] = useState(defaultActive);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(currentWorkspace);
  const [showSignInOverlay, setShowSignInOverlay] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveItem(id);
    if (onSelectNav) onSelectNav(id);
  };

  const handleWorkspaceChange = (workspace) => {
    setSelectedWorkspace(workspace);
    setIsWorkspaceDropdownOpen(false);
    if (onSelectWorkspace) onSelectWorkspace(workspace);
  };

  return (
    <aside
      className={`w-60 h-screen bg-white border-r border-gray-200/90 flex flex-col font-sans select-none ${className}`}
    >
      {/* Workspace Selector */}
      <div className="relative px-3.5 py-3.5">
        <button
          type="button"
          onClick={() => setIsWorkspaceDropdownOpen((prev) => !prev)}
          className="w-full flex items-center justify-between p-1 rounded-xl hover:bg-gray-50/90 transition-colors text-left group cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* workspace Brand Icon / Logo Box */}
            <div className="w-10 h-10 rounded-xl bg-gray-200 border border-gray-200/80 flex items-center justify-center p-0.5 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers preview-icon"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
            </div>

            {/* Workspace info */}
            <div className="min-w-0 leading-tight">
              <p className="text-[14px] font-semibold text-gray-900 truncate tracking-tight">
                {(workspaces.length==0)?'No Workspace':selectedWorkspace.name}
              </p>
              <p className="text-[11.5px] text-gray-400 font-normal mt-0.5">
                {(workspaces.length==0)?'0 workspace':selectedWorkspace.workspacesCount+' workspaces'}
              </p>
            </div>
          </div>

          <ChevronDown
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 shrink-0 mr-1 ${
              isWorkspaceDropdownOpen ? 'rotate-180 text-gray-600' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isWorkspaceDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setIsWorkspaceDropdownOpen(false)}
            />
            <div className="absolute top-full left-3.5 right-3.5 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-1.5 overflow-hidden animate-in fade-in duration-150">
              <div className="px-3 py-1.5 text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">
                Workspaces
              </div>
              {(workspaces.length!==0)?workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    type="button"
                    onClick={() => handleWorkspaceChange(ws)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="truncate">{ws.name}</span>
                    {selectedWorkspace.id === ws.id && (
                      <Check className="w-3.5 h-3.5 text-gray-900" />
                    )}
                  </button>
                )):
                <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 transition-colors text-left">
                    <span className="truncate">No Workspace created</span>
                </div>}
              <div className="border-t border-gray-100 my-1" />
              <button
                type="button"
                onClick={() => {
                  setIsWorkspaceDropdownOpen(false);
                  if (!isSignedIn) {
                    setShowSignInOverlay(true);
                    return;
                  }
                  if (onSelectWorkspace) onSelectWorkspace('new');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-gray-400" />
                <span>Create Workspace</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Edge-to-Edge Divider */}
      <div className="border-b border-gray-200/80 mb-3" />

      {/* Primary Navigation List */}
      <nav className="px-2.5 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors text-left cursor-pointer group ${
                isActive
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
              }`}
            >
              <Icon
                className={`w-[17px] h-[17px] shrink-0 transition-colors ${
                  isActive
                    ? 'text-gray-900'
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Middle Spacing and "My Tasks" */}
      <div className="pt-8 px-2.5">
        <button
          type="button"
          onClick={() => handleNavClick('my-tasks')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors text-left cursor-pointer group ${
            activeItem === 'my-tasks'
              ? 'bg-gray-100 text-gray-900 font-semibold'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50/80'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <CheckSquare
              className={`w-[17px] h-[17px] shrink-0 transition-colors ${
                activeItem === 'my-tasks'
                  ? 'text-gray-900'
                  : 'text-gray-600 group-hover:text-gray-900'
              }`}
            />
            <span className="truncate">My Tasks</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-medium text-gray-600 bg-gray-200/80 rounded min-w-[19px] leading-none">
              {taskCount}
            </span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 shrink-0" />
        </button>
      </div>

      {/* Projects Section Header */}
      <div className="mt-6 px-3.5">
        <div className="flex items-center justify-between py-1">
          <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">
            PROJECTS
          </span>
          <button
            type="button"
            onClick={onAddProject}
            title="Projects"
            className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project items list if any exist */}
        {projects && projects.length > 0 && (
          <div className="mt-1 space-y-0.5">
            {projects.map((proj) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => handleNavClick(`project-${proj.id}`)}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-colors text-left cursor-pointer ${
                  activeItem === `project-${proj.id}`
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: proj.color || '#6366F1' }}
                />
                <span className="truncate text-xs font-medium">
                  {proj.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Flexible bottom filler */}
      <div className="flex-1" />

      {/* Fullscreen Sign-in Overlay for signed-out users */}
      {showSignInOverlay && !isSignedIn && (
        <SignInOverlay onClose={() => setShowSignInOverlay(false)} />
      )}
    </aside>
  );
}
