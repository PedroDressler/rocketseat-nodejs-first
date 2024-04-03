import { Readable } from 'node:stream'


class OneToFiveStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if(i > 5) {
        this.push(null);
      } else {
        const buffer = Buffer.from(String(i));
        this.push(buffer);
      }
    }, 100)
  }
}

fetch('http://localhost:4040/numbers', {
  method: 'POST',
  body: new OneToFiveStream(),
  duplex: 'half'
}).then(response => {
    return response.text()
  })
  .then(data => {
    console.log(data)
  })