import { load } from "protobufjs";
import whiteboardToolTypes from "../../../protoDefinations/whiteboardToolTypesStructure.proto";
import { toolTypes } from "../../../constants/toolType";

let protoInstance = null;

class ProtoDefnFactory {
  protoDefn = null;

  getInstance(toolType) {
    switch (toolType) {
      case toolTypes.RECTANGLE:
        return this.protoDefn.lookupType("whiteboard.Rectangle");
      case toolTypes.LINE:
        return this.protoDefn.lookupType("whiteboard.Line");
      case toolTypes.PENCIL:
        return this.protoDefn.lookupType("whiteboard.Pencil");
      case toolTypes.TEXT:
        return this.protoDefn.lookupType("whiteboard.Text");
      case toolTypes.SELECTION:
        return this.protoDefn.lookupType("whiteboard.Selection");
      default:
        return null;
    }
  }

  setProtoDefn(proto) {
    this.protoDefn = proto;
  }
}

if (!protoInstance) {
  protoInstance = new ProtoDefnFactory();
}

(async () => {
  console.clear();
  console.log("going to load proto defn");
  const root = await load(whiteboardToolTypes);
  if (!root) throw new Error("Root is not loaded");
  protoInstance.setProtoDefn(root);
})();

export default protoInstance;
