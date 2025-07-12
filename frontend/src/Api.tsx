import type { Transaction, TransactionResource, Links  } from "./utils/types"
import {useState} from "react"
import { useQueryClient, QueryClient } from "@tanstack/react-query";


export default function Api(){
  
  const [list, setList] = useState(['']); 
  const [item, setItem] = useState('');

  const handleClick = async() =>{ 

    const response = await fetch('http://localhost:3001/api/transactions/tag', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tag: "Pay"}),
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

    setList(() => transactions.data.map((data) => data.attributes.amount.value))
    setItem(() => transactions.data[0].attributes.amount.value)

  }
 
  return(
    <div>
      <button onClick={handleClick}>
      </button>
      <ul>
        {list.map((item, index) => <li key={index}>{item}</li>)}
      </ul>

    </div>
  )
  
}
