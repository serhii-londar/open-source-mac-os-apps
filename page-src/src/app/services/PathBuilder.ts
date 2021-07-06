import config from "../../config";

class PathBuilder {
  static build(path: string = "/") {
    return `/${config.repository_name}${path}`;
  }
}

export default PathBuilder;
