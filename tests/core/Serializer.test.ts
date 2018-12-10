import SimpleDtoWithMeta from "../mocks/SimpleDtoWithMeta";
import { serializeObject } from "../../src/nserializer";
import ComplexDtoWithMeta from "../mocks/ComplexDtoWithMeta";
import SelfRerefencing from "../mocks/SelfRerefencing";
import { ReferenceBehavior } from "../../src/core/context/ContextBase";

describe('Serializer', () => {
  it('serializes simple object with metadata', async () => {
    let dto = new SimpleDtoWithMeta("Test");
    dto.numberField = 123;
    dto.boolField = true;


    expect(await serializeObject(dto)).toEqual({
      stringField: "Test",
      numberField: 123,
      boolField: true
    })
  });

  it('serializes complex object with metadata', async () => {
    let dto = new ComplexDtoWithMeta();
    dto.numberField = 7;
    let simple = new SimpleDtoWithMeta();
    simple.numberField = 111;
    simple.boolField = true;

    dto.subObject = simple;

    expect(await serializeObject(dto)).toEqual({
      numberField: 7,
      subObject: {
        stringField: undefined,
        numberField: 111,
        boolField: true
      }
    });
  });

  it('serializes array of objects with metadata', async () => {
    let dto0 = new SimpleDtoWithMeta();
    dto0.stringField = "Test 1";
    dto0.numberField = 123;
    dto0.boolField = true;

    let dto1 = new ComplexDtoWithMeta();
    dto1.numberField = 3;
    let simple = new SimpleDtoWithMeta();
    simple.stringField = undefined;
    simple.numberField = 111;
    simple.boolField = true;
    dto1.subObject = simple;

    let dto2 = new SimpleDtoWithMeta();
    dto2.stringField = "Test 2";
    dto2.numberField = 789;
    dto2.boolField = false;

    let dto = [dto0, dto1, dto2];
    expect(await serializeObject(dto)).toEqual([
      {
        stringField: "Test 1",
        numberField: 123,
        boolField: true
      },
      {
        numberField: 3,
        subObject: {
          stringField: undefined,
          numberField: 111,
          boolField: true
        }
      },
      {
        stringField: "Test 2",
        numberField: 789,
        boolField: false
      },
    ]);
  });

  it('serializes object graph with cycles', async () => {
    let dto = new SelfRerefencing();
    dto.id = 1;
    dto.name = "Test";
    dto.ref = dto;

    expect(await serializeObject(dto, {referenceBehavior: ReferenceBehavior.Serialize})).toEqual({
      $id: "1",
      id: 1,
      name: "Test",
      ref: {
        $ref: "1"
      }
    });

  });

  it('serializes complex object with metadata and null fields', async () => {
    let dto = new ComplexDtoWithMeta();
    dto.numberField = 7;
    dto.subObject = undefined;

    expect(await serializeObject(dto)).toEqual({
      numberField: 7,
      subObject: null
    });
  });
});