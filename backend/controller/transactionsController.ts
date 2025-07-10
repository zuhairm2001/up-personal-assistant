import type { Response, Request } from "express"
import type { Transaction, TransactionResource, Links } from "../utils/types";
import { getByTags } from "../up-api/api";

export async function getTransactionByTag(req: Request, res: Response): Promise<void> {

  const tag = req.body.tag 

  try{
    const params = new URLSearchParams({
      'filter[tag]': `${tag}`,
    })
    const response = await getByTags(params) 

    const apiResponse = await response.json() as {
      data: TransactionResource[],
      links: Links
    }
    const transactions: Transaction = {
      data: apiResponse.data,
      links: apiResponse.links
    }

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

