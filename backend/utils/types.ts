export type Transaction = {
  data: TransactionResource[]
  links: Links
}


export type TransactionResource = {
  type: string
  id: string
  attributes: Attributes
  relationships: Relationships
  links?: {
    self: string
  }
}

export type Links = {
  prev: string
  next: string
}

type Attributes = {
  status: StatusEnum 
  rawText: string | null
  description: string
  message: string | null
  isCategorizable: boolean
  holdInfo: {
    amount: Amount
    foreignAmount: Amount | null 
  } | null
  roundUp: {
    amount: Amount 
    boostPortion: Amount
  } | null
  cashback: {
    description: string
    amount: Amount
  } | null
  amount: Amount
  foreignAmount: Amount
  cardPurchaseMethod: {
    method: CardPurchaseMethodEnum
    cardNumberSuffix: string | null
  }
  settledAt: string | null 
  createdAt: string
  transactionType: string | null
  note:{
    text: string
  } | null
  performingCustomer:{
    displayName: string
  } | null
  deepLinkURL: string
}

type Relationships = {
  account: {
    data: {
      type: "accounts"
      id: string
    }
    links?: {
      related: string
    }
  }
  transferAccount: {
    data: {
      type: "accounts"
      id: string
    } | null
    links?: {
      related: string
    }
  }
  category: {
    data: {
      type: "categories"
      id: string
    } | null
    links?: {
      self: string
      related?: string
    }
  }
  parentCategory: {
    data: {
      type: "categories"
      id: string
    } | null
    links?: {
      related: string
    }
  }
  tags: {
    data: {
      type: "tags"
      id:string
    }[]
    links?: {
      self: string
    }
  }
  attachment: {
    data: {
      type: "attachments"
      id: string
    } | null
    links?: {
      related: string
    }
  }
}

type Amount = {
  currencyCode: string
  value: string
  valueInBaseUnits: number
}



enum CardPurchaseMethodEnum {
  BarCode = "BAR_CODE",
  OCR = "OCR",
  CardPin = "CARD_PING",
  CardDetails = "CARD_DETAILS",
  CardOnFile = "CARD_ON_FILE",
  Ecommerce = "ECOMMERCE",
  MagneticStripe = "MAGNETIC_STRIPE",
  Contactless = "CONTACTLESS"

}

enum StatusEnum {
  Held = "HELD",
  Settled = "SETTLED" 

}

