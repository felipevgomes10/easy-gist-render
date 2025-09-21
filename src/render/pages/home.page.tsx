import { useRef } from "react";
import { useNavigate } from "react-router";
import { GithubUtils } from "../../common/github/github.utils";
import { RoutePath } from "../../common/router/enums/route-path.enum";

export function Component() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { value = "" } = inputRef.current ?? {};
    const parsedUrl = GithubUtils.parseGistUrl(value);

    if (!parsedUrl) {
      alert("Invalid Gist URL");
      return;
    }

    navigate(`/${RoutePath.RENDER}/${parsedUrl.id}/${parsedUrl.filename}`);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Easy Gist Render
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Gist URL"
            className="w-full rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="focus:ring-opacity-50 w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            Render Gist
          </button>
        </form>
      </div>
    </div>
  );
}

Component.displayName = "HomePage";
