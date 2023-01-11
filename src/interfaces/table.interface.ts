interface DataTypeProps {
  price: string;
  amount: string;
  total: string;
}

interface TableProps {
  data: DataTypeProps[]
  enableTableHead?: boolean
}

interface Delta {
  bids: number[][];
  asks: number[][];
}

interface Coin {
  coinValue: number
}

export type { DataTypeProps, TableProps, Delta, Coin };