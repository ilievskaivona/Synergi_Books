import { cloneDeep } from "lodash";
import { commonSchema } from "./common.schema";
const bookSubjectSchema = cloneDeep(commonSchema);

const bookSubjectsBodyBase = {
  subjectId: { type: "integer" },
  bookId: { type: "integer" },
};

const bookSubjectsBody = {
  ...bookSubjectsBodyBase,
  CreatedAt: { type: "string" },
  UpdatedAt: { type: "string" },
};

const bookSubjectsQueryBody = {
  subjectId: { type: "integer" },
  bookId: { type: "integer" },
};

const bookSubjectsPostBody = {
  subjectId: { type: "integer" },
  bookId: { type: "integer" },
};

const bookSubjectsBaseRequired = [
  "subjectId",
  "bookId",
];

const bookSubjectsGetRequired = [
  ...bookSubjectsBaseRequired,
  "CreatedAt",
  "UpdatedAt",
];

const bookSubjectsPostRequired = [...bookSubjectsBaseRequired];

bookSubjectSchema.response[200] = {
  type: "object",
  properties: bookSubjectsBody,
  required: bookSubjectsGetRequired,
};

bookSubjectSchema.params = {
  type: "object",
  properties: {
    subjectId: { type: "string" },
    bookId: { type: "string" },
  },
  required: ["subjectId", "bookId"],
};

const bookSubjectsSchema = cloneDeep(commonSchema);

bookSubjectsSchema.response[200] = {
  type: "array",
  items: {
    type: "object",
    properties: bookSubjectsBody,
    required: bookSubjectsGetRequired,
  },
};

bookSubjectsSchema.querystring = {
  type: "object",
  properties: bookSubjectsQueryBody,
};

const bookSubjectsPostSchema = cloneDeep(commonSchema);

bookSubjectsPostSchema.body = {
  type: "object",
  properties: bookSubjectsPostBody,
  required: bookSubjectsPostRequired,
  additionalProperties: false,
};

const bookSubjectsPutSchema = cloneDeep(commonSchema);

bookSubjectsPutSchema.body = {
  type: "object",
  properties: bookSubjectsPostBody,
  required: bookSubjectsPostRequired,
  additionalProperties: false,
};

export {
  bookSubjectSchema as bookSubjectSchema,
  bookSubjectsSchema,
  bookSubjectsPostSchema,
  bookSubjectsPutSchema,
};
