import { container } from "../container";

export const Injectable = (constructor: (new () => any)) => {
  container.registerInjectable(constructor);
}
