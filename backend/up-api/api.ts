const apikey = process.env.UP_API_KEY
console.log(apikey)

export async function getByTags(params:URLSearchParams){
    const url = `https://api.up.com.au/api/v1/transactions?${params}`;
    const response = await Bun.fetch(url, {
      headers: {"Authorization": `Bearer ${apikey}`}, 
    })
    return response;
}
export async function pingApi(){
  const response = await Bun.fetch('https://api.up.com.au/api/v1/util/ping', {
    headers: {
      "Authorization": `Bearer ${apikey}` 
    }
  })
  return response;
}
