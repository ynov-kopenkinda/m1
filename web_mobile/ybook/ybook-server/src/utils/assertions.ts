import { ApiError } from "../middleware/error.middleware";

export function assertNumber(value: number | string): asserts value is number {
  if (typeof value === "string") {
    const parsed = parseInt(value);
    if (Number.isNaN(parsed)) {
      throw new ApiError(400, "Value is not a number");
    }
  }
  if (typeof value !== "number") {
    throw new ApiError(400, "Value is not a number");
  }
}
