import { api } from "~/utils/api";

export function useUtils() {
  return api.useContext();
}
