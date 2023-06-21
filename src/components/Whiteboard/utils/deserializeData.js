import { toolTypes } from "../../../constants";
import protoInstance from "./protoDefnFactory";

export const deserializeData = (payload) => {
  if (typeof payload.data === "string") {
    try {
      const decodedUint8Array = new Uint8Array(
        atob(payload.data)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      const decodedData = protoInstance
        .getInstance(toolTypes.PENCIL)
        .decode(decodedUint8Array);
      console.log("Decoded data:", { ...payload, data: decodedData });
      return { ...payload, data: decodedData };
    } catch (e) {
      console.error(e);
      return payload;
    }
  } else {
    return payload;
  }
};
