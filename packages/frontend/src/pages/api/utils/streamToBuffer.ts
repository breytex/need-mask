import Stream from "stream";

function streamToBuffer<TStream extends Stream.Readable>(
  stream: TStream
): Promise<Buffer> {
  return new Promise((resolve, reject: (error: Error) => void) => {
    const bufferArr = [];
    stream.on("readable", () => {
      let chunk;
      while (null !== (chunk = stream.read())) {
        bufferArr.push(chunk);
      }
    });
    stream.on("end", () => {
      resolve(Buffer.concat(bufferArr));
    });
    stream.on("error", (error) => {
      reject(error);
    });
  });
}

export { streamToBuffer };
