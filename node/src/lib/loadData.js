import fetch from "isomorphic-fetch"

const parseResponse = response =>
  response.json()


const logResult = result => {
  console.log(result)
  return result
}

const fetchThenReturn3 =(url, method, body) =>
  fetch(url, {method, body, headers: { 'Content-Type': 'application/json' }})
    .then(parseResponse)


export const loadProductTypes = () => {
  return fetchThenReturn3("/data/api/product/types", "GET")
}

export const loadProductsByType = (type) => {
  return fetchThenReturn3(`/data/api/product/type/${type}`, "GET")
}
// 
// export const fetchThenReturn =(url, method) =>
//   fetch(url, {method, body, headers: { 'Content-Type': 'application/json' }})
//   .then(parseResponse)
