export const singleResponse = { data: {} }
export const pluralResponse = { data: [] }
export const failedResponse = {
  code: 500,
  message: 'Internal Server Error',
}

export const getSingleResponse = (data) => ({ ...singleResponse, data })
export const getPluralResponse = (data) => ({ ...pluralResponse, data })
export const getFailedResponse = (data) => ({ ...failedResponse, data })


