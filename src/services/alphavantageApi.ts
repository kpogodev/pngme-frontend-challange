import type {
  GetTickersSuccessResponse,
  GetStockInfoSuccessResponse,
  FalsySuccessResponse,
  FalsyPositiveResponse,
  StockInfo,
  Ticker,
} from '@/types'

const BASE_URL = new URL(process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_URL as string)

// Service object to interact with the Alpha Vantage API
export const alphavantageApi = {
  /**
   * Fetches a list of ticker suggestions based on the search query
   */
  getTickersSuggestions: async (searchQuery: string) => {
    const apiKey = getApiKey()
    const searchParams = new URLSearchParams({
      function: 'SYMBOL_SEARCH',
      keywords: searchQuery,
      apikey: apiKey,
    })

    const response = await fetch(`${BASE_URL}?${searchParams.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch list of ticker suggestions')

    const responseJson = (await response.json()) as GetTickersSuccessResponse | FalsySuccessResponse

    // Throws an error if the response is a false positive
    validateFalsyPositiveResponse(responseJson)

    const formattedData = (responseJson as GetTickersSuccessResponse).bestMatches.map((ticker) => {
      return transformResponseObject(ticker) as Ticker
    })

    return formattedData
  },
  /**
   * Fetches real-time stock information for the given symbol
   */
  getRealTimeStockInfo: async (symbol: string) => {
    const apiKey = getApiKey()
    const searchParams = new URLSearchParams({
      function: 'GLOBAL_QUOTE',
      symbol,
      apikey: apiKey,
    })

    const response = await fetch(`${BASE_URL}?${searchParams.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch real-time stock information')

    const responseJson = (await response.json()) as GetStockInfoSuccessResponse | FalsySuccessResponse

    // Throws an error if the response is a false positive
    validateFalsyPositiveResponse(responseJson)

    const formattedData = transformResponseObject(
      (responseJson as GetStockInfoSuccessResponse)['Global Quote'],
    ) as StockInfo

    return formattedData
  },
}

/**
 * Helper function to retrieve the API key and throw an error if it's not found
 *
 * Disclaimer: This is not the best way to handle API keys in production. Normally, I would possibly proxy all of
 * the requests through next.js "server" routes but then it is importnat to consider perofrmance implications
 * in terms of latency due to localisation discrepancy between next.js serverless deplyoments, alphavantage api, and the user
 * but this is slighlty out of scope for this task...
 * */
const getApiKey = () => {
  if (!process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY) {
    console.error('API key not found')
    throw new Error('Serivce currently unavailable')
  }
  return process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY
}

/**
 * Helper function to validate false positive responses from the API
 *
 * Disclaimer: Those are the only two "error" responses I could find forcing API to fail,
 * without having errors documented in the API documentation, it's hard to handle them properly
 */
const validateFalsyPositiveResponse = (responseJson: FalsyPositiveResponse) => {
  if ('Error Message' in responseJson) {
    console.error(responseJson['Error Message'])
    throw new Error('Unexpected error occured')
  }

  if ('Information' in responseJson) {
    console.error(responseJson.Information)
    throw new Error('Rate limit reached (25 per day) or service unavailable')
  }
}

/**
 * Helper function to transform the response object keys
 *
 * Disclaimer: This generic function is not recursive and only works for the first level of nesting,
 * it also doesn't cover all edge cases, but it's a good starting point considering the scope of this task
 */
const transformResponseObject = <T extends { [key: string]: string }>(responseObject: T): { [key: string]: string } => {
  return Object.keys(responseObject).reduce(
    (acc, key) => {
      // Remove numbers and dots and then replace spaces with underscores
      const newKey = key.replace(/\d+\.\s?/g, '').replace(/\s+/g, '_')

      // Directly assign the string value, assuming all values are already strings
      acc[newKey] = responseObject[key]

      return acc
    },
    {} as { [key: string]: string },
  )
}
