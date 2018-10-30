import SimpleDtoWithMeta from "../mocks/SimpleDtoWithMeta";
import { defaultDeserializationSettingss, deserializeObject } from "../../src/nserializer";
import SelfRerefencing from "../mocks/SelfRerefencing";
import { ReferenceBehavior } from "../../src/core/context/ContextBase";
import ComplexDtoWithMeta from "../mocks/ComplexDtoWithMeta";

describe('Deserializer', () => {
  it('deserializers simple objects', async () => {
    let dto = new SimpleDtoWithMeta();
    dto.stringField = "Test";
    dto.numberField = 123;
    dto.boolField = true;


    expect(await deserializeObject({
      stringField: "Test",
      numberField: 123,
      boolField: true
    }, SimpleDtoWithMeta)).toEqual(dto);
  });

  it('deserializes object graph with cycles', async () => {
    let dto = new SelfRerefencing();
    dto.id = 1;
    dto.name = "Test";
    dto.ref = dto;

    let dto2 = new SelfRerefencing();
    dto2.id = 2;
    dto2.name = "Test 2";

    let dto3 = new SelfRerefencing();
    dto3.id = 3;
    dto3.name = "Test 3";
    dto3.ref = dto2;

    dto2.ref = dto3;

    defaultDeserializationSettingss.referenceBehavior = ReferenceBehavior.Serialize;

    expect(await deserializeObject({
      $id: "1",
      id: 1,
      name: "Test",
      ref: {
        $ref: "1"
      }
    }, SelfRerefencing)).toEqual(dto);

    expect(await deserializeObject([
      {$ref: "1"},
      {
        $id: "1",
        id: 1,
        name: "Test",
        ref: {
          $ref: "1"
        }
      }
    ], SelfRerefencing)).toEqual([
      dto,
      dto
    ]);

    expect(await deserializeObject([
      {
        $id: "1",
        id: 1,
        name: "Test",
        ref: {
          $ref: "1"
        }
      },
      {$ref: "1"}
    ], SelfRerefencing)).toEqual([
      dto,
      dto
    ]);

    expect(await deserializeObject([
      {
        $id: "2",
        id: 2,
        name: "Test 2",
        ref: {
          $ref: "3"
        }
      },
      {
        $id: "3",
        id: 3,
        name: "Test 3",
        ref: {
          $ref: "2"
        }
      }
    ], SelfRerefencing)).toEqual([
      dto2,
      dto3
    ]);

  });

  it("deserializes object with null reference", async () => {
    let dto = new ComplexDtoWithMeta();
    dto.numberField = 5;
    dto.subObject = undefined;

    expect(await deserializeObject({
      numberField: 5,
      subObject: null
    }, ComplexDtoWithMeta)).toEqual(dto);
  });
});