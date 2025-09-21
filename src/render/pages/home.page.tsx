import { useRef } from "react";
import { useNavigate } from "react-router";
import { GithubUtils } from "../../common/github/github.utils";

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

    navigate(`${parsedUrl.id}/${parsedUrl.filename}`);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 font-mono">
      <div className="w-full max-w-md space-y-6 border-2 border-black bg-white p-8 shadow-[6px_6px_0_0_#000]">
        <h1 className="text-center text-3xl font-bold text-black">
          Easy Gist Render
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Gist URL"
            className="w-full border-2 border-black bg-white px-4 py-3 text-lg text-black placeholder-gray-500 focus:outline-none"
          />
          <button className="w-full border-2 border-black bg-yellow-400 px-4 py-3 text-lg font-bold text-black shadow-[3px_3px_0_0_#000] transition-transform hover:shadow-none active:translate-x-[3px] active:translate-y-[3px]">
            Render Gist
          </button>
        </form>
      </div>
    </div>
  );
}

Component.displayName = "HomePage";
