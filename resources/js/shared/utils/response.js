export const is404 = (err) => {
    return isErrorWithStatusCode(err) && 404 === err.response.status
}

const isErrorWithStatusCode = (err) => {
    return err.response && err.response.status
}
