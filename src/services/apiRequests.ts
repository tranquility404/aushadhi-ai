import { authApiClient } from "./api";

export function findTargetProtein(disease: string) {
    return authApiClient.post("/find_protien/", {"disease": disease});
}

export function findHits(pdpid: string) {
    return authApiClient.post("/fetch_chambl_data/", {"pdb_id_input": pdpid});
}

export function generateAlternateMols(disease: string) {
    return authApiClient.post("/alternate_molecule_generator/", {"disease": disease});
}

export function showEvaluation(smile: string){
    return authApiClient.post("/find_data_evaluation_report/",{"smiles":smile});
}