import { useAuth, SignInButton } from "@clerk/react";
import { ArrowRight, LockKeyhole, X } from "lucide-react";

const SignInOverlay = ({ onClose }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070a12]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-indigo-500" />
          <p className="text-sm font-medium text-slate-300">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }
  if (isSignedIn) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#141c2e]/95 p-6 text-center shadow-2xl shadow-black/40">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/15">
          <LockKeyhole className="h-6 w-6 text-indigo-400" />
        </div>

        <h2 className="text-xl font-bold text-white">Sign in to continue</h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Sign in to access your workspace and explore TaskForge features.
        </p>

        <SignInButton mode="modal">
          <button
            type="button"
            className="mt-6 cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-[#141c2e]"
          >
            Sign in to continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </SignInButton>

        <p className="mt-4 text-xs text-slate-500">
          Your workspace will be ready after sign-in.
        </p>
      </div>
    </div>
  );
};

export default SignInOverlay;

