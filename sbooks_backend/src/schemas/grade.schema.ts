import { cloneDeep } from "lodash";
import { commonSchema } from "./common.schema";

const gradeSchema = cloneDeep(commonSchema);

const gradeBodyBase = {
  name: { type: "string" },
};
const gradeBody = {
  GradeId: { type: "integer" },
  CreatedAt: { type: "string" },
  UpdatedAt: { type: "string" },
  ...gradeBodyBase,
};

const gradeQueryBody = {
  ...gradeBodyBase,
};

const gradePostBody = {
  ...gradeBodyBase,
};

const gradeBaseRequired = ["name"];

const gradeGetRequired = [
  "GradeId",
  ...gradeBaseRequired,
  "CreatedAt",
  "UpdatedAt",
];

const gradePostRequired = [...gradeBaseRequired];

gradeSchema.response[200] = {
  type: "object",
  properties: gradeBody,
  required: gradeGetRequired,
};

gradeSchema.params = {
  type: "object",
  properties: {
    gradeId: { type: "string" },
  },
  required: ["gradeId"],
};

const gradesSchema = cloneDeep(commonSchema);

gradesSchema.response[200] = {
  type: "array",
  items: {
    type: "object",
    properties: gradeBody,
    required: gradeGetRequired,
  },
};

gradesSchema.querystring = {
  type: "object",
  properties: gradeQueryBody,
};

const gradePostSchema = cloneDeep(commonSchema);

gradePostSchema.body = {
  type: "object",
  properties: gradePostBody,
  required: gradePostRequired,
  additionalProperties: false,
};

const gradePutSchema = cloneDeep(commonSchema);

gradePutSchema.body = {
  type: "object",
  properties: gradePostBody,
  required: gradePostRequired,
  additionalProperties: false,
};

export { gradeSchema, gradesSchema, gradePostSchema, gradePutSchema };
