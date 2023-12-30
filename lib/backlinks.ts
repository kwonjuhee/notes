import path from "path";
import { getAllFilesByExt } from "./file";

const mdExtRegex = /\.md$/;

class BacklinkResolver {
  resolver = new Map<string, string[]>();

  constructor() {
    this.initialize();
  }

  initialize = () => {
    const mdFiles = getAllFilesByExt("docs", mdExtRegex);

    mdFiles.forEach((file) => {
      file = path.relative("docs", file);

      const slug = path.basename(file).replace(mdExtRegex, ""); // key
      const filePath = file.replace(mdExtRegex, "").replace(path.sep, "/"); // value;

      if (this.resolver.has(slug)) {
        this.resolver.set(slug, [...this.resolver.get(slug), filePath]);
      } else {
        this.resolver.set(slug, [filePath]);
      }
    });
  };

  get = (backlink: string) => {
    const slug = backlink.split("/").at(-1);

    if (slug.includes("#")) {
      const [realSlug, heading] = slug.split("#");
      return (
        this.resolver
          .get(realSlug)
          ?.map((v) => `${v}#${heading.replace(/ /g, "-").toLowerCase()}`) ?? []
      );
    }

    return this.resolver.get(slug) ?? [];
  };
}

const backlinkResolver = new BacklinkResolver();

export default backlinkResolver;
