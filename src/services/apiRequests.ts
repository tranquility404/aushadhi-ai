import { authApiClient } from "./api";

export function findTargetProtein(disease: string) {
    return authApiClient.post("/find_protien/", {"disease": disease});
}

export function findHits(disease: string) {
    return authApiClient.post("/aushadhi_lelo/", {"disease": disease});
}