import { JsonSchema } from "../interfaces/jsonSchema";

export class JsonSchemaHelper {
  public generateJsonSchema(elements: JsonSchema[]): string {
    const properties: any = {};
    elements.forEach(e => {
      if (e.fieldName && e.fieldDataType) {
        properties[e.fieldName] = { type: e.fieldDataType };
      }
    });
    const schema = {
      type: 'object',
      properties: properties,
      required: elements.filter(e => e.fieldName).map(e => e.fieldName)
    };
    return JSON.stringify(schema, null, 2);
  }

  public generateRandomExample(elements: JsonSchema[]): string {
    const example: any = {};
    elements.forEach(e => {
      if (e.fieldName && e.fieldDataType) {
        example[e.fieldName] = this.getRandomValue(e.fieldDataType);
      }
    });
    return JSON.stringify(example, null, 2);
  }

  private getRandomValue(type: string): any {
    switch (type) {
      case 'string':
        return 'example';
      case 'number':
        return Math.floor(Math.random() * 100);
      case 'integer':
        return Math.floor(Math.random() * 100);
      case 'boolean':
        return Math.random() > 0.5;
      case 'array':
        return [];
      case 'object':
        return {};
      case 'null':
        return null;
      default:
        return '';
    }
  }
}
