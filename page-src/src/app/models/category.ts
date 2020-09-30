export type RawCategory = {
  id?: string;
  name: string;
  shortName: string;
};

class Category {
  public id: string | undefined;

  public name: string = "";

  public shortName: string = "";

  constructor(init?: RawCategory | Category) {
    if (init) {
      this.id = init.id;
      this.name = init.name;
      this.shortName = init.shortName;
    }
  }

  public toJson = () => {
    return { id: this.id, name: this.name, shortName: this.shortName };
  };
}

export default Category;
