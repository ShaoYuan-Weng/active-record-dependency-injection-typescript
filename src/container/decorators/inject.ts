import { container } from "../container";

export const Inject = (object: any, propertyName: string) => {
  const type = Reflect.getMetadata("design:type", object, propertyName);
  container.registerInject({
    object,
    propertyName,
    type: type.name,
  });
}
