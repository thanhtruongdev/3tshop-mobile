import { Pagination } from "./pagination.type"

export type ApiResponse<T> = {
    success : true,
    message : string,
    data : T
}

export type ApiResponsePagination<T> = {
    success : true,
    message : string,
    data : {
        items : T[],
        pagination : Pagination
    },
}