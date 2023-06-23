import { toolTypes } from "../../../constants";
import protoInstance from "./protoDefnFactory";
const zlib = require("zlib");

const decompressBase64String = (compressedBase64) => {
  const compressedBuffer = Buffer.from(compressedBase64, "base64");
  const decompressedBuffer = zlib.inflateSync(compressedBuffer);
  const decompressedBase64String = decompressedBuffer.toString("base64");
  return decompressedBase64String;
};

export const deserializeData = (payload) => {
  if (typeof payload.data === "string") {
    try {
      const decompressedBase64String = decompressBase64String(payload.data);
      console.log("Decompressed Base64 encoded", decompressedBase64String);

      const decodedUint8Array = new Uint8Array(
        atob(decompressedBase64String)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      const decodedData = protoInstance
        .getInstance(toolTypes.PENCIL)
        .decode(decodedUint8Array);
      console.log("Decoded data:", { ...payload, data: decodedData });
      return { ...payload, data: decodedData };
    } catch (e) {
      console.log("Unable to deserialize payload:", payload.data);
      console.error(e);
      return payload;
    }
  } else {
    return payload;
  }
};
