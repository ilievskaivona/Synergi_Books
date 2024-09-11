import { cloneDeep } from "lodash";
import { commonSchema } from "./common.schema";
const bookTagSchema = cloneDeep(commonSchema);

const bookTagsBodyBase = {
  BookId: { type: "integer" },
};

const bookTagsBody = {
  TagId: { type: "integer" },
  ...bookTagsBodyBase,
  CreatedAt: { type: "string" },
  UpdatedAt: { type: "string" },
};

const bookTagsQueryBody = {
  BookId: { type: "integer" },
  CreatedAt: { type: "string" },
  UpdatedAt: { type: "string" },
};
const bookTagsPostBody = {
  BookId: { type: "integer" },
};

const bookTagsBaseRequired = ["BookId"];
const bookTagsGetRequired = [
  "TagId",
  ...bookTagsBaseRequired,
  "CreatedAt",
  "UpdatedAt",
];
const bookTagsPostRequired = [...bookTagsBaseRequired];

bookTagSchema.response[200] = {
  type: "object",
  properties: bookTagsBody,
  required: bookTagsGetRequired,
};

bookTagSchema.params = {
  type: "object",
  properties: {
    TagId: { type: "string" },
  },
  required: ["TagId"],
};

const bookTagsSchema = cloneDeep(commonSchema);

bookTagsSchema.response[200] = {
  type: "array",
  items: {
    type: "object",
    properties: bookTagsBody,
    required: bookTagsGetRequired,
  },
};

bookTagsSchema.querystring = {
  type: "object",
  properties: bookTagsQueryBody,
};

const bookTagsPostSchema = cloneDeep(commonSchema);
bookTagsPostSchema.body = {
  type: "object",
  properties: bookTagsPostBody,
  required: bookTagsPostRequired,
  additionalProperties: false,
};

const bookTagsPutSchema = cloneDeep(commonSchema);
bookTagsPutSchema.body = {
  type: "object",
  properties: bookTagsPostBody,
  required: bookTagsPostRequired,
  additionalProperties: false,
};

export { bookTagSchema, bookTagsSchema, bookTagsPostSchema, bookTagsPutSchema };
