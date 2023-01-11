import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCallback, useEffect } from "react";
import { addAsks, addBids, addCoinValue, addExistingState } from '../store/orderbook';

import { Delta, Coin } from '../interfaces/table.interface'
import { useAppDispatch } from '.';

const socketUrl = "wss://stream.binance.com:9443/stream";
// FOR THE OTHER REQUEST - dispatch(addExistingState(response));


let currentBids: number[][] = []
let currentAsks: number[][] = []

const useWebSocketBinance = (pair = "btcbusd", type = "depth") => {
  const dispatch = useAppDispatch();
  let parsedPair = pair.replace("_", "").toLowerCase()

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    onMessage: (event: WebSocketEventMap['message']) => processMessages(event),
    shouldReconnect: (closeEvent) => true,
  });

  const processMessages = (event: { data: string; }) => {
    const response = JSON.parse(event.data)?.data;

    if (!response) {
      return;
    }


    switch (type) {
      case 'depth':
        response.bids = response.a;
        response.asks = response.b;
        response.product_id = response.s;
        processBidsAsks(response);
        break;

      case 'aggTrade':
        response.coinValue = response.p;
        processBookTicker(response);
        break;

      default:
        break;
    }
  };

  const processBidsAsks = (data: Delta) => {
    if (data?.bids?.length > 0) {
      currentBids = [...currentBids, ...data.bids];

      dispatch(addBids(currentBids));
      currentBids = [];
      currentBids.length = 0;
    }
    if (data?.asks?.length >= 0) {
      currentAsks = [...currentAsks, ...data.asks];

      dispatch(addAsks(currentAsks));
      currentAsks = [];
      currentAsks.length = 0;
    }
  };

  const processBookTicker = (data: Coin) => {
    dispatch(addCoinValue(data.coinValue))
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const unsubscribe = useCallback(
    () =>
      sendJsonMessage({
        method: "UNSUBSCRIBE",
        // @ts-ignore
        params: [`${parsedPair}@${type}`],
        id: 1,
      }),
    [sendJsonMessage]
  );

  const subscribe = useCallback(
    () =>
      sendJsonMessage({
        method: "SUBSCRIBE",
        // @ts-ignore
        params: [`${parsedPair}@${type}`],
        id: 1,
      }),
    [sendJsonMessage]
  );

  useEffect(() => {
    subscribe();

    return () => {
      unsubscribe();
    };
  }, []);

  return [connectionStatus];
}

export default useWebSocketBinance;