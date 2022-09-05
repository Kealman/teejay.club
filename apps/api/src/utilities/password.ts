import { compare, hash } from "bcrypt";

export function encryptPassword(password: string) {
  return hash(password, 10);
}

export function comparePassword(password: string, encryptedPassword: string) {
  return compare(password, encryptedPassword);
}
