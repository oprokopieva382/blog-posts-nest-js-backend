import { OmitType } from "@nestjs/mapped-types";
import { BlogQueryModel } from "src/features/blog/DTOs/input/BlogQueryModel.dto";

export class PostQueryModel extends OmitType(BlogQueryModel, [
  'searchNameTerm',
] as const) {}
