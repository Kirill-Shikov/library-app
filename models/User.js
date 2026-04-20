class User {
  constructor(id, mail) {
    this.id = id;
    this.mail = mail;
  }

  static login() {
    return new User(1, "test@mail.ru");
  }

  getInfo() {
    return {
      id: this.id,
      mail: this.mail
    };
  }
}

module.exports = User;