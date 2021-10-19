class School {
  readonly code: string;

  private url = "https://provisioning.edulinkone.com/";
  payload() {
    return {
      "jsonrpc": "2.0",
      "method": "School.FromCode",
      "params": {
        "code": this.code,
      },
      "uuid": crypto.randomUUID(),
      "id": "1",
    };
  }

  public get() {
    const url = this.url;
    const payload = this.payload();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return new Promise(function (resolve, reject) {
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  }

  constructor(code: string) {
    this.code = code;
  }
}

export { School }
