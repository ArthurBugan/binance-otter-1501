import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

import { useWebSocketBinance, useAppSelector, usePrevious } from "../hooks";
import Arrow from "./Arrow";
import { money } from "../helpers";
import { selectCoinValue } from "../store/orderbook";
import { Link } from "@mui/material";
import { Type } from "../interfaces/arrow.interface";

const Ticker = () => {
  const params = useParams();

  const [connectionStatus] = useWebSocketBinance(params.pair, "aggTrade");
  const coinValue: number = useAppSelector(selectCoinValue);
  const previous = usePrevious(coinValue);

  if (connectionStatus != "Open") {
    return null;
  }

  const getStatus = () => {
    if (coinValue === previous) {
      return Type.NEUTRAL;
    } else if (coinValue > previous) {
      return Type.POSITIVE;
    }

    return Type.NEGATIVE;
  };

  return (
    <Box display="flex" alignItems={"center"}>
      <Typography variant="h6" component="h6" className={getStatus()}>
        {coinValue.toFixed(2)}
      </Typography>
      <div>
        <Arrow type={getStatus()} />
      </div>
      <Typography variant="caption" component="p">
        {money(coinValue)}
      </Typography>
      <Link
        className="ml-auto"
        href="https://www.binance.com/en/orderbook/BTC_BUSD"
      >
        More
      </Link>
    </Box>
  );
};

export default Ticker;
