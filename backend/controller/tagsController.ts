import type { Response, Request } from "express"
import type { Transaction, TransactionResource, Links } from "../utils/types";
import { createCSV } from "../utils/csvExport";

export async function getTags(req: Request, res: Response): Promise<void> {

  const tag = req.body 

  try{
    const params = new URLSearchParams({
      'filter[tag]': 'Work Related',
    })
    const url = `https://api.up.com.au/api/v1/transactions?${params}`;

    const response = await Bun.fetch(url, {
      headers: {"Authorization": "Bearer up:yeah:qVuWhA2DNRyzDRHkTDbKN8aAtwZLGJCGORvVdRqCNTHhF3O0fK3jQcB9VWbYvtq05CCVeiH3lrMrIVC5ieq6bM27eFU8CZxrssDeS01hSbqoZm9RDSIObbcRtcMuc5Wr"}, 
    })

    const apiResponse = await response.json() as {
      data: TransactionResource[],
      links: Links
    }
    const transactions: Transaction = {
      data: apiResponse.data,
      links: apiResponse.links
    }

    console.log(transactions.data.map((data)=> data.attributes.description))

    createCSV(transactions);

    res.status(200).json({
      success: true,
      body: transactions 
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
