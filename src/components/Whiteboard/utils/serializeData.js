import { toolTypes } from "../../../constants";
import protoInstance from "./protoDefnFactory";

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
      return { ...payload, data: base64String };
    }
    default:
      return { ...payload };
  }
};
