import { cloneDeep } from "lodash";
import { commonSchema } from "./common.schema";
const bookDetailSchema = cloneDeep(commonSchema);

const bookDetailsBodyBase = {
  bookId: { type: "integer" },
  description: { type: "string" },
  level: { type: "integer" },
  parent: { type: "integer" },
  sort: { type: "integer" },
  source: { type: "string" },
};

const bookDetailsBody = {
  BookDetailsId: { type: "integer" },
  ...bookDetailsBodyBase,
  CreatedAt: { type: "string" },
  UpdatedAt: { type: "string" },
};

const bookDetailsQueryBody = {
  bookId: { type: "integer" },
  description: { type: "string" },
  level: { type: "integer" },
  parent: { type: "integer" },
  sort: { type: "integer" },
  source: { type: "string" },
  CreatedAt: { type: "string" },
  UpdatedAt: { type: "string" },
};
const bookDetailsPostBody = {
  bookId: { type: "integer" },
  description: { type: "string" },
  level: { type: "integer" },
  parent: { type: "integer" },
  sort: { type: "integer" },
  source: { type: "string" },
};

const bookDetailsBaseRequired = [
  "bookId",
  "description",
  "level",
  "sort",
  "source",
];
const bookDetailsGetRequired = [
  "BookDetailsId",
  ...bookDetailsBaseRequired,
  "CreatedAt",
  "UpdatedAt",
];
const bookDetailsPostRequired = [...bookDetailsBaseRequired];

bookDetailSchema.response[200] = {
  type: "object",
  properties: bookDetailsBody,
  required: bookDetailsGetRequired,
};

bookDetailSchema.params = {
  type: "object",
  properties: {
    BookDetailsId: { type: "string" },
  },
  required: ["BookDetailsId"],
};



const bookDetailsNewBodyBase = {
  Description: { type: "string" },
  Level: { type: "integer" },
  parent: { type: ["integer", "null"] },
  sort: { type: "integer" },
  BookDetailsId: { type: "integer" },
  title: { type: "string" },
};

const bookDetailsNewBaseRequired = [
  "Description",
  "Level",
  "sort",
  "parent",
  "BookDetailsId",
  "title"
];

const bookDetailsSchema = cloneDeep(commonSchema);

bookDetailsSchema.response[200] = {
  type: "array",
  items: {
    type: "object",
    properties: bookDetailsNewBodyBase,
    required: bookDetailsNewBaseRequired,
  },
};


bookDetailsSchema.querystring = {
  type: "object",
  properties: bookDetailsQueryBody,
};

const bookDetailsPostSchema = cloneDeep(commonSchema);
bookDetailsPostSchema.body = {
  type: "object",
  properties: bookDetailsPostBody,
  required: bookDetailsPostRequired,
  additionalProperties: false,
};

const bookDetailsPutSchema = cloneDeep(commonSchema);
bookDetailsPutSchema.body = {
  type: "object",
  properties: bookDetailsPostBody,
  required: bookDetailsPostRequired,
  additionalProperties: false,
};

export {
  bookDetailSchema as bookDetailSchema,
  bookDetailsSchema,
  bookDetailsPostSchema,
  bookDetailsPutSchema,
};