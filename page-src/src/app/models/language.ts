export type RawLanguage = {
  id?: string;
  name: string;
};

class Language {
  public id: string | undefined;

  public name: string = "";

  constructor(init?: RawLanguage | Language) {
    if (init) {
      this.id = init.id;
      this.name = init.name;
    }
  }

  public toJson = () => {
    return { id: this.id, name: this.name };
  };
}

export default Language;
