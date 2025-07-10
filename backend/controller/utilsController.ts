import type { Request, Response } from "express";
import { pingApi } from "../up-api/api";

export async function ping(req: Request, res: Response): Promise<void> {

  try {
    const response = await pingApi() 
    const body = await response.json();

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
