import Sidebar from "../components/layouts/Sidebar"
import { Show, SignInButton, UserButton } from '@clerk/react'

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-white text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        <header className="p-4 border-b border-gray-100 flex justify-end items-center">
          <Show when="signed-out">
            <SignInButton mode="modal">
            <button className="group px-8 py-2.5 bg-indigo-600 rounded-lg text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-indigo-700">
                <p className="relative h-6 overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:translate-y-full cursor-pointer">Sign in</span>
                    <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:-translate-y-full">Sign in</span>
                </p>
            </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </header>
        <main className="flex-1 p-6 bg-gray-50/50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome to your workspace. Select a project or task from the sidebar.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard