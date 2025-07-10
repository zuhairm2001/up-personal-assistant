import type { Transaction, TransactionResource, Links  } from "./utils/types"
import { useState } from "react"


export default function Api(){
  
  const [list, setList] = useState(['']); 

  const handleClick = async() =>{ 

    const response = await fetch('http://localhost:3001/api/transactions/tag', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tag: "Work Related"}),
    })

    const typeCastResponse = await response.json() as {
      success: boolean,
      body: {
        data: TransactionResource[],
        links: Links
      }
    }

    const transactions: Transaction = {
      data: typeCastResponse.body.data,
      links: typeCastResponse.body.links,
    } 

    setList(() => transactions.data.map((data) => data.attributes.createdAt))

  }
  


  return(
    <div>
      <button onClick={handleClick}>
      </button>
      <p>
        {list}
      </p>

    </div>
  )
  
}
