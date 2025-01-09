

export interface TokenErrorResponse {
    response: Response
}


interface Response {
    data: Data
}

interface Data {
    error: string
    error_description: string
    message: string
}