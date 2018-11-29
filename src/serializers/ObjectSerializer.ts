import SerializationContext from "../core/context/SerializationContext";
import { guessSerializer } from "../core/Serializer";
import { SerializerBase } from "./SerializerBase";
import ISubContext from "../core/context/ISubContext";
import SerializationMetadata from "../core/SerializationMetadata";
import { METADATA_FIELD } from "../core/serializable";
import DeserializationContext from "../core/context/DeserializationContext";
import { ReferenceBehavior } from "../core/context/ContextBase";

class ObjectSerializationContext implements ISubContext {
  private readonly _objects: object[] = [];
  private readonly _dtos: object[] = [];

  public addAndAssignId(obj: object, dto: any): number {
    let id = this._objects.push(obj);
    this._dtos.push(dto);
    return id;
  }

  public getDtoForId(index: number): any {
    return this._dtos[index - 1];
  }

  public getIdFor(obj: object): number {
    return this._objects.indexOf(obj) + 1;
  }
}

class ObjectDeserializationContext implements ISubContext {
  private readonly _objects: { [key: string]: any } = {};
  private readonly _listeners: Array<(id: string, obj: any) => void> = [];

  public getObjectForId(id: string): any {
    return this._objects[id];
  }

  public addObjectForId(id: string, obj: any): void {
    this._objects[id] = obj;
    this.triggerOnObjectAdded(id, obj);
  }

  public onObjectAddedAdd(listener: (id: string, obj: any) => void) {
    this._listeners.push(listener);
  }

  public onObjectAddedRemove(listener: (id: string, obj: any) => void) {
    let index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  private triggerOnObjectAdded(id: string, obj: any) {
    for (let listener of this._listeners) {
      listener(id, obj);
    }
  }
}


export class ObjectSerializer extends SerializerBase {

  private readonly cls: new () => any;


  constructor(cls: { new(): any }) {
    super();
    this.cls = cls;
  }

  public createDeserializationSubContext(): ObjectDeserializationContext {
    return new ObjectDeserializationContext();
  }

  public createSerializationSubContext(): any {
    return new ObjectSerializationContext();
  }

  public async serialize(argument: any, context: SerializationContext): Promise<any> {
    if (!argument) {
      return null;
    }

    let subContext = context.getSubContext<ObjectSerializationContext>(this);
    let id = subContext.getIdFor(argument);
    if (!id) {
      let dto: any = {};
      let metadata: SerializationMetadata = argument[METADATA_FIELD];

      subContext.addAndAssignId(argument, dto);
      let promises: { [key: string]: Promise<any> } = {};
      if (metadata) {
        for (let metaKey in metadata) {
          if (metadata.hasOwnProperty(metaKey)) {
            let fieldMeta = metadata[metaKey];
            promises[metaKey] = fieldMeta.serializer.serialize(argument[metaKey], context);
          }
        }
      }

      if (context.allowDynamic) {
        for (let key in argument) {
          // noinspection JSUnfilteredForInLoop
          let value = argument[key];
          let serializer = guessSerializer(value, (value && value.constructor) || Object);
          // noinspection JSUnfilteredForInLoop
          promises[key] = await serializer.serialize(value, context);
        }
      }

      for (let key in promises) {
        if (promises.hasOwnProperty(key)) {
          dto[key] = await promises[key];
        }
      }

      return dto;
    } else {
      switch (context.referenceBehavior) {
        case ReferenceBehavior.Error:
          throw new Error(`Cyclic reference detected for object ${argument}`);
        case ReferenceBehavior.Ignore:
          return undefined;
        case ReferenceBehavior.Serialize:
          let referencedDto = subContext.getDtoForId(id);
          referencedDto.$id = id.toString();
          return {
            $ref: id.toString()
          };
      }
    }
  }

  public deserialize(argument: any, context: DeserializationContext): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!argument) {
        resolve();
        return;
      }

      let subContext = context.getSubContext<ObjectDeserializationContext>(this);
      if (argument.$ref) {
        switch (context.referenceBehavior) {
          case ReferenceBehavior.Error:
            throw new Error('$ref encountered, but ref deserialization is set to Error');
          case ReferenceBehavior.Ignore:
            resolve();
            return;
          case ReferenceBehavior.Serialize:
            let id = argument.$ref;
            let object = subContext.getObjectForId(id);
            if (!object) {
              subContext.onObjectAddedAdd((contextId, obj) => {
                if (contextId === id)
                  resolve(obj);
              });
            } else {
              resolve(object);
              return;
            }
            break;
        }
      } else {
        let obj = new this.cls();
        if (argument.$id) {
          subContext.addObjectForId(argument.$id, obj);
        }

        let metadata: SerializationMetadata = this.cls.prototype[METADATA_FIELD];
        let promises: { [key: string]: Promise<any> } = {};
        if (metadata) {
          for (let metaKey in metadata) {
            if (metadata.hasOwnProperty(metaKey)) {
              let fieldMeta = metadata[metaKey];
              promises[metaKey] = fieldMeta.serializer.deserialize(argument[metaKey], context);
            }
          }
        }

        for (let key in promises) {
          if (promises.hasOwnProperty(key)) {
            obj[key] = await promises[key];
          }
        }

        resolve(obj);
        return;
      }
    });
  }
}

export default function object(cls: new () => any) {
  return new ObjectSerializer(cls);
}