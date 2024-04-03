import { Writable } from 'node:stream';

class MultiplyByTen extends Writable {
  _write(chunk, encoding, callback) {
    console.log(`Chunk carregada: ${Number(chunk.toString() * 10)}`);
    callback();
  }
}

new OneToFiveStream() //Leitura
  .pipe(new InvertNumber()) //Transformação
  .pipe(new MultiplyByTen()) //Escrita