import SimpleDtoWithMeta from "../mocks/SimpleDtoWithMeta";
import { defaultDeserializationSettingss, deserializeObject, populateObject } from "../../src/nserializer";
import SelfReferencing from "../mocks/SelfReferencing";
import SelfRerefencingWithConverter from "../mocks/SelfReferencingWithConverter";
import { ReferenceBehavior } from "../../src/core/context/ContextBase";
import ComplexDtoWithMeta from "../mocks/ComplexDtoWithMeta";
import DtoWithListMeta from "../mocks/DtoWithListMeta";

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

  it('deserializers complex objects', async () => {
    let simpleDto = new SimpleDtoWithMeta();
    simpleDto.stringField = "Test";
    simpleDto.numberField = 123;
    simpleDto.boolField = true;

    let complexDto = new ComplexDtoWithMeta();
    complexDto.numberField = 50;
    complexDto.subObject = simpleDto;


    expect(await deserializeObject({
      numberField: 50,
      subObject: {
        stringField: "Test",
        numberField: 123,
        boolField: true
      }
    }, ComplexDtoWithMeta)).toEqual(complexDto);
  });

  it('populates complex objects', async () => {
    let simpleDto = new SimpleDtoWithMeta();
    simpleDto.stringField = "Test";
    simpleDto.boolField = true;

    let complexDto = new ComplexDtoWithMeta();
    complexDto.numberField = 50;
    complexDto.subObject = simpleDto;

    let simpleDto2 = new SimpleDtoWithMeta();
    simpleDto2.stringField = "Test";
    simpleDto2.numberField = 123;
    simpleDto2.boolField = true;

    let complexDto2 = new ComplexDtoWithMeta();
    complexDto2.numberField = 50;
    complexDto2.subObject = simpleDto2;

    let result = await populateObject(complexDto, {
      subObject: {
        numberField: 123,
        boolField: true
      }
    });

    expect(result).toBe(complexDto);
    expect(result.subObject).toBe(simpleDto);
    expect(complexDto).toEqual(complexDto2);
  });

  it('deserializes object graph with cycles', async () => {
    let dto = new SelfReferencing();
    dto.id = 1;
    dto.name = "Test";
    dto.ref = dto;

    let dto2 = new SelfReferencing();
    dto2.id = 2;
    dto2.name = "Test 2";

    let dto3 = new SelfReferencing();
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
    }, SelfReferencing)).toEqual(dto);

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
    ], SelfReferencing)).toEqual([
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
    ], SelfReferencing)).toEqual([
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
    ], SelfReferencing)).toEqual([
      dto2,
      dto3
    ]);

  });

  it('deserializes object graph with cycles with external converter func', async () => {
    let dto = new SelfRerefencingWithConverter(1, "Test");
    dto.ref = dto;

    let dto2 = new SelfRerefencingWithConverter(2, "Test 2");
    let dto3 = new SelfRerefencingWithConverter(3, "Test 3");

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
    }, SelfReferencing)).toEqual(dto);

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
    ], SelfReferencing)).toEqual([
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
    ], SelfReferencing)).toEqual([
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
    ], SelfReferencing)).toEqual([
      dto2,
      dto3
    ]);

  });

  it('populates object graph with cycles', async () => {
    let dto = new SelfReferencing();
    dto.id = 1;
    dto.name = "Test";

    let dto2 = new SelfReferencing();
    dto2.id = 2;
    dto2.name = "Test 2";

    let dto3 = new SelfReferencing();
    dto3.id = 3;
    dto3.name = "Test 3";
    dto3.ref = dto2;

    dto2.ref = dto3;

    let dto4 = new SelfReferencing();
    dto4.id = 1;
    dto4.name = "Test";
    dto4.ref = dto4;

    let dto5 = new SelfReferencing();
    dto5.id = 2;
    dto5.name = "Test 2";

    let dto6 = new SelfReferencing();
    dto6.id = 3;
    dto6.name = "Test 3";
    dto6.ref = dto5;

    dto5.ref = dto6;

    let dtoArr1: SelfReferencing[] = [];

    let dtoArr2 = [
      dto4,
      dto5,
      dto6
    ];

    defaultDeserializationSettingss.referenceBehavior = ReferenceBehavior.Serialize;

    let populated1 = await populateObject(dto, {
      $id: "1",
      ref: {
        $ref: "1"
      }
    });

    expect(populated1).toBe(dto);
    expect(dto.ref).toBe(dto);

    await populateObject(dtoArr1, [
      {
        $id: "1",
        id: 1,
        name: "Test",
        ref: {
          $ref: "1"
        }
      },
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
    ], SelfReferencing);

    expect(dtoArr1).toEqual(dtoArr2);

    dtoArr1 = [
      dto,
      dto2
    ];

    await populateObject(dtoArr1, [
      {
        $id: "1",
        id: 1,
        name: "Test",
        ref: {
          $ref: "1"
        }
      },
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
    ], SelfReferencing);

    expect(dtoArr1).toEqual(dtoArr2);

    dtoArr1 = [
      dto,
      dto2,
      dto3,
      dto4
    ];

    await populateObject(dtoArr1, [
      {
        $id: "1",
        id: 1,
        name: "Test",
        ref: {
          $ref: "1"
        }
      },
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
    ], SelfReferencing);

    expect(dtoArr1).toEqual(dtoArr2);

    dtoArr1 = [
      new SelfReferencing(),
      new SelfReferencing()
    ];

    await populateObject(dtoArr1, [
      {
        $id: "1",
        id: 1,
        name: "Test",
        ref: {
          $ref: "1"
        }
      },
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
    ], SelfReferencing);

    expect(dtoArr1).toEqual(dtoArr2);


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

  it("deserializes lists with null reference", async () => {
    let dto = new DtoWithListMeta()
    dto.name = "Test";

    expect(await deserializeObject({
      name: "Test"
    }, DtoWithListMeta)).toEqual(dto);
  })
});