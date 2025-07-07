import type { Response, Request } from "express"

export async function getTags(req: Request, res: Response): Promise<void> {

  const tag = req.body 

  try{

    const params = new URLSearchParams({
      'filter[tag]': 'Work Related',
    })

    const url = `https://api.up.com.au/api/v1/transactions?${params}`;

    console.log(url);


    const response = await Bun.fetch(url, {
      headers: {"Authorization": "Bearer up:yeah:qVuWhA2DNRyzDRHkTDbKN8aAtwZLGJCGORvVdRqCNTHhF3O0fK3jQcB9VWbYvtq05CCVeiH3lrMrIVC5ieq6bM27eFU8CZxrssDeS01hSbqoZm9RDSIObbcRtcMuc5Wr"}, 
    })

    const body = await response.json()

    res.status(200).json({
      success: true,
      body: body
    });
    return;
  } catch (e:any){
    res.status(400).json({
      success: false,
      body: `Error: ${e}`
    });
    return;
  }



}

export async function ping(req: Request, res: Response): Promise<void> {

  try {
    const response = await Bun.fetch('https://api.up.com.au/api/v1/util/ping', {
      headers: {
        "Authorization": "Bearer up:yeah:qVuWhA2DNRyzDRHkTDbKN8aAtwZLGJCGORvVdRqCNTHhF3O0fK3jQcB9VWbYvtq05CCVeiH3lrMrIVC5ieq6bM27eFU8CZxrssDeS01hSbqoZm9RDSIObbcRtcMuc5Wr" 
      }
    })

    const body:any = await response.json();


    res.status(200).json({
      success: true,
      output: body 
    });
    return;
  } catch(e:any){
    res.status(500).json({
      success: false,
      output: `Error: ${e}` 
    });
    return;
  }


  
}
