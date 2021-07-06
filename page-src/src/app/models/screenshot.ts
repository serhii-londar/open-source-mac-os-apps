export type RawScreenshot = {
  id?: string;
  url: string;
};

class Screenshot {
  public id: string | undefined;

  public url: string = "";

  constructor(init?: Screenshot | RawScreenshot) {
    if (init) {
      this.id = init.id;
      this.url = init.url;
    }
  }

  public toJson = () => {
    return { id: this.id, url: this.url };
  };
}

export default Screenshot;
