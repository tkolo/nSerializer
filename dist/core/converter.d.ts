import DeserializationContext from "./context/DeserializationContext";
export default function converter(func: (dto: any, context: DeserializationContext) => Promise<any>): (target: Function) => void;
