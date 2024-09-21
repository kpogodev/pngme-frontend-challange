// Create a query string from a URLSearchParams object and a name-value pair
export const createQueryString = (
  searchParams: URLSearchParams | Readonly<URLSearchParams>,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams.toString())
  params.set(name, value)
  return params.toString()
}
