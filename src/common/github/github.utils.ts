export class GithubUtils {
  static parseGistUrl(url: string) {
    try {
      const urlObject = new URL(url);
      const pathParts = urlObject.pathname.split("/").filter((part) => part);

      if (urlObject.hostname !== "gist.github.com" || pathParts.length < 2) {
        return null;
      }

      const id = pathParts.at(1) as string;
      const filename = GithubUtils.getFilename(urlObject);

      return { id, filename, url };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public static identifyGist(id: string, filename: string) {
    return `${id}-${filename}`;
  }

  public static getFilename(url: URL) {
    return url.hash.replace("#file-", "").replace(/-\w+$/, "");
  }
}
