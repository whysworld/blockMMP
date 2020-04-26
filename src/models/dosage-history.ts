export interface IDosageHistoryRequest {
    client_id: string,
    site_id: string
}

export interface IDosage {
    timestamp: string,
    dose_mg: number
}

export interface IDosageRequestError {
    field: string,
    value: string,
    message: string
}

export interface IDosageHistoryData {
    site_id: string,
    client_id: string
    doses: IDosage[]
}

export interface IDosageHistoryResponse {
    data: IDosageHistoryData | null,
    status: number | null,
    errors: IDosageRequestError | null
}