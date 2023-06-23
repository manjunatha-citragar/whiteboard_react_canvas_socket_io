import { toolTypes } from "../../../constants";
import protoInstance from "./protoDefnFactory";
const zlib = require("zlib");

const compressBase64String = (base64String) => {
  const buffer = Buffer.from(base64String, "base64");
  const compressedBuffer = zlib.deflateSync(buffer);
  const compressedBase64String = compressedBuffer.toString("base64");
  return compressedBase64String;
};

export const serializeData = (payload) => {
  switch (payload?.data?.type) {
    case toolTypes.PENCIL: {
      console.clear();
      console.log("Raw data:", JSON.stringify(payload.data));
      const buffer = protoInstance
        .getInstance(payload?.data?.type)
        .encode(payload.data)
        .finish();
      console.log("Uint8Array encoded", buffer.length / 1_048_576);
      const base64String = btoa(String.fromCharCode.apply(null, buffer));
      console.log("Base64 encoded", base64String);

      const compressedBase64String = compressBase64String(base64String);
      console.log("Compressed Base64 encoded", compressedBase64String);
      return { ...payload, data: compressedBase64String };
    }
    default:
      return { ...payload };
  }
};
