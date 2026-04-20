class Book {
  constructor(id, title, description, authors, favorite, fileCover, fileName, fileBook) {
    this.id = id;
    this.title = title;
    this.description = description || '';
    this.authors = authors;
    this.favorite = favorite || false;
    this.fileCover = fileCover || '';
    this.fileName = fileName || '';
    this.fileBook = fileBook || '';
  }

  // генерации ID
  static generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // обновления книги
  update(updateData) {
    if (updateData.title !== undefined) this.title = updateData.title;
    if (updateData.description !== undefined) this.description = updateData.description;
    if (updateData.authors !== undefined) this.authors = updateData.authors;
    if (updateData.favorite !== undefined) this.favorite = updateData.favorite;
    if (updateData.fileCover !== undefined) this.fileCover = updateData.fileCover;
    if (updateData.fileName !== undefined) this.fileName = updateData.fileName;
    if (updateData.fileBook !== undefined) this.fileBook = updateData.fileBook;
    return this;
  }

  // получения данных книги
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      authors: this.authors,
      favorite: this.favorite,
      fileCover: this.fileCover,
      fileName: this.fileName,
      fileBook: this.fileBook
    };
  }
}

module.exports = Book;