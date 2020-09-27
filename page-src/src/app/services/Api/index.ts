import config from "../../../config";

export const FetchCategories = () => fetch(`http://${config.api.url}:${config.api.port}/categories`);

