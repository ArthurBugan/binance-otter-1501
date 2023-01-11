import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { Table, Header, Ticker } from "./components";
import { useWebSocketBinance, useAppSelector } from "./hooks";
import { selectAsks, selectBids } from "./store/orderbook";
import { DataTypeProps } from "./interfaces/table.interface";
import { useParams } from "react-router-dom";

import { formatPrice, formatNumber } from "./helpers";

enum OrderType {
  BIDS,
  ASKS,
}

export default function App() {
  const params = useParams();

  const [connectionStatus] = useWebSocketBinance(params.pair, "depth");

  const bids: number[][] = useAppSelector(selectBids);
  const asks: number[][] = useAppSelector(selectAsks);

  const buildPriceLevels = (
    levels: number[][],
    orderType: OrderType = OrderType.BIDS
  ): DataTypeProps[] => {
    const sortedLevelsByPrice: number[][] = [...levels].sort(
      (currentLevel: number[], nextLevel: number[]): number => {
        let result: number = 0;
        if (orderType === OrderType.BIDS) {
          result = nextLevel[0] - currentLevel[0];
        } else {
          result = currentLevel[0] - nextLevel[0];
        }
        return result;
      }
    );

    return sortedLevelsByPrice
      .filter((l) => l[1] != 0)
      .map((level, idx) => {
        const calculatedTotal: number = level[2];
        const total: string = formatNumber(calculatedTotal);
        const depth = level[3];
        const size: string = formatNumber(level[1]);
        const price: string = formatPrice(level[0]);

        return {
          price,
          amount: size,
          total: formatPrice(level[0] * level[2]),
        };
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Header />
        <Table
          enableTableHead
          data={buildPriceLevels(bids, OrderType.BIDS).slice(0, 17)}
        />
        <Ticker />
        <Table
          enableTableHead={false}
          data={buildPriceLevels(asks, OrderType.ASKS).slice(0, 17)}
        />
      </Box>
    </Container>
  );
}
