import type { GetTickersSuccessResponse, GetTickersFailedResponse, Ticker } from '@/types'

const BASE_URL = new URL(process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_URL as string)

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

export const alphavantageApi = {
  // Function to fetch ticker suggestions based on the search query
  getTickersSuggestions: async (searchQuery: string) => {
    const apiKey = getApiKey()

    const searchParams = new URLSearchParams({
      function: 'SYMBOL_SEARCH',
      keywords: searchQuery,
      apikey: apiKey,
    })

    const response = await fetch(`${BASE_URL}?${searchParams.toString()}`)

    if (!response.ok) throw new Error('Failed to fetch list of ticker suggestions')

    const responseJson = (await response.json()) as GetTickersSuccessResponse | GetTickersFailedResponse

    // That was the only error responses I could find forcing API to fail
    // eseentially, GET request still returns a 200 status code even if the query params are invalid
    if ('Error Message' in responseJson) {
      console.error(responseJson['Error Message'])
      throw new Error('Failed to fetch ticker suggestions')
    }

    // To handle the case where the API returns an information message (e.g. Rate limit reached)
    if ('Information' in responseJson) {
      console.error(responseJson.Information)
      throw new Error('Rate limit reached (25 per day) or service unavailable')
    }

    // Transform the response data to the format more suitable for the app
    const formattedData: Ticker[] = (responseJson as GetTickersSuccessResponse).bestMatches.map((ticker) => ({
      symbol: ticker['1. symbol'],
      name: ticker['2. name'],
      type: ticker['3. type'],
      region: ticker['4. region'],
      marketOpen: ticker['5. marketOpen'],
      marketClose: ticker['6. marketClose'],
      timezone: ticker['7. timezone'],
      currency: ticker['8. currency'],
      matchScore: ticker['9. matchScore'],
    }))

    return formattedData
  },
}
