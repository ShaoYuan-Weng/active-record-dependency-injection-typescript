interface Inject {
  object: any;
  propertyName: string;
  type: string;
}

class Container {
  injectables: Map<string, (new () => any)> = new Map();
  injects: Map<string, Inject> = new Map();

  registerInjectable(injectable: new () => any): void {
    this.injectables.set(injectable.name, injectable);
  }

  registerInject(inject: Inject) {
    this.injects.set(inject.type, inject);
  }

  private getInjectable(name: string): (new () => any) {
    return this.injectables.get(name);
  }

  injectAll() {
    this.injects.forEach((value) => {
      const {object, propertyName, type} = value;
      const constructor = container.getInjectable(type);
      if (constructor === undefined) {
        throw Error(`The constructor of ${type} is not found. Did you forget to put @Injectable on the ${type} class ?`)
      }
      object[propertyName] = new constructor();
    })
  }
}

export const container = new Container();
