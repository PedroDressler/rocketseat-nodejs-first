import { promises as fs } from 'node:fs'

const databasePath = new URL('db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2, 1));
  }

  select(key, search) {
    let data = this.#database[key] ?? [];

    if(search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        })
      })
    }

    return data;
  }

  insert(key, data) {
    if(Array.isArray(this.#database[key])){
      this.#database[key].push(data);
    } else {
      this.#database[key] = [data];
    }
    this.#persist();
    return data;
  }

  delete(key, id) {
    const rowIndex = this.#database[key].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[key].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(key, id, data) {
    const rowIndex = this.#database[key].findIndex(row => row.id === id);
    if(rowIndex > -1) {
      this.#database[key][rowIndex] = { id, ...data };
      this.#persist();
    }
  }
}