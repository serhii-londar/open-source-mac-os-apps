import Category from "./category";
import Language from "./language";
import Screenshot from "./screenshot";

export type Application = {
  id: string;
  forks: number;
  watchers: number;
  repo_url: string;
  stars: number;
  title: string;
  description: string;
  icon_url: string;
  languages: Language[];
  categories: Category[];
  screenshots: Screenshot[];
};

export default Application;
