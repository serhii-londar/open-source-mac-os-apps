import Category, { RawCategory } from "./category";
import Language, { RawLanguage } from "./language";
import Screenshot, { RawScreenshot } from "./screenshot";

export type RawApplication = {
  id: string;
  forks: number;
  watchers: number;
  repo_url: string;
  stars: number;
  title: string;
  description: string;
  icon_url: string;
  languages: RawLanguage[];
  categories: RawCategory[];
  screenshots: RawScreenshot[];
};

class Application {
  public id: string | undefined;

  public forks: number = 0;

  public watchers: number = 0;

  public repo_url: string = "";

  public stars: number = 0;

  public title: string = "";

  public description: string = "";

  public icon_url: string = "";

  public languages: Language[] = [];

  public categories: Category[] = [];

  public screenshots: Screenshot[] = [];

  constructor(init?: RawApplication & Application) {
    if (init) {
      this.id = init.id;
      this.forks = init.forks;
      this.watchers = init.watchers;
      this.repo_url = init.repo_url;
      this.stars = init.stars;
      this.title = init.title;
      this.description = init.description;
      this.icon_url = init.icon_url;
      this.languages = init.languages.map(
        (language: Language | RawLanguage) => new Language(language),
      );
      this.categories = init.categories.map(
        (rawCategory: RawCategory) => new Category(rawCategory),
      );
      this.screenshots = init.screenshots.map(
        (rawScreenshot: RawScreenshot) => new Screenshot(rawScreenshot),
      );
    }
  }

  public toJson = () => {
    return {
      id: this.id,
      forks: this.forks,
      watchers: this.watchers,
      repo_url: this.repo_url,
      stars: this.stars,
      title: this.title,
      description: this.description,
      icon_url: this.icon_url,
      languages: this.languages.map((language: Language) => language.toJson()),
      categories: this.categories.map((category: Category) => category.toJson()),
      screenshots: this.screenshots.map((screenshot: Screenshot) => screenshot.toJson()),
    };
  };
}

export default Application;
