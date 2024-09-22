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

export type StockInfoResponse = {
  ['01. symbol']: string
  ['02. open']: string
  ['03. high']: string
  ['04. low']: string
  ['05. price']: string
  ['06. volume']: string
  ['07. latest trading day']: string
  ['08. previous close']: string
  ['09. change']: string
  ['10. change percent']: string
}

export type Ticker = {
  symbol: string
  name: string
  type: string
  region: string
  market_open: string
  market_close: string
  timezone: string
  currency: string
  match_score: string
}

export type StockInfo = {
  symbol: string
  open: string
  high: string
  low: string
  price: string
  volume: string
  latest_trading_day: string
  previous_close: string
  change: string
  change_percent: string
}

export type GetTickersSuccessResponse = {
  bestMatches: TickerResponse[]
}

export type GetStockInfoSuccessResponse = {
  ['Global Quote']: StockInfoResponse
}

export type FalsySuccessResponse = {
  Information?: string
  ['Error Message']?: string
}

export type FalsyPositiveResponse = { [key: string]: unknown } | FalsySuccessResponse
