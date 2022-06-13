export const singleResponse = { data: {} }
export const pluralResponse = { data: [] }
export const failedResponse = {
  code: 500,
  message: 'Internal Server Error',
}

export const getSingleResponse = (data) => ({ ...data.singleResponse, data })
export const getPluralResponse = (data) => ({ ...data.pluralResponse, data })
export const getFailedResponse = (data) => ({ ...data.failedResponse, data })


