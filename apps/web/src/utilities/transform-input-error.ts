import { InputError } from "@teejay/api";

export function transformInputError(error: InputError) {
  return error.errors.reduce((errors, error) => {
    const path = error.path.join(".");
    if (!Array.isArray(errors[path])) {
      errors[path] = [];
    }
    errors[path].push(error.message);
    return errors;
  }, {} as Record<string, string[]>);
}
