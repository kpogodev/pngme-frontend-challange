export type TickerResponse = {
  ['1. symbol']: string
  ['2. name']: string
  ['3. type']: string
  ['4. region']: string
  ['5. marketOpen']: string
  ['6. marketClose']: string
  ['7. timezone']: string
  ['8. currency']: string
  ['9. matchScore']: string
}

export type Ticker = {
  symbol: string
  name: string
  type: string
  region: string
  marketOpen: string
  marketClose: string
  timezone: string
  currency: string
  matchScore: string
}

export type GetTickersSuccessResponse = {
  bestMatches: TickerResponse[]
}

export type GetTickersFailedResponse = {
  Information?: string
  ['Error Message']?: string
}
