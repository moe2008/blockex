import React from "react";
import { Alchemy } from "alchemy-sdk";
import { useEffect, useState, useReducer } from "react";
import { transactionReducer } from "./transactionReducer";
import settings from "./settings";

const alchemy = new Alchemy(settings);

const Home = () => {
  const [blockNumber, setBlockNumber] = useState();

  const [loaded, setLoaded] = useState(false);

  const [content, setContent] = useState([]);

  const [state, dispatch] = useReducer(transactionReducer, {
    gasUsage: {},
    from: {},
    to: {},
    type: {},
  });

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getBlockWithTransactions() {
      const trans = await (
        await alchemy.core.getBlockWithTransactions(blockNumber)
      ).transactions;

      setContent(trans);

      setLoaded(true);
    }
    getBlockNumber();
    getBlockWithTransactions();
  }, []);

  const onClickTransHandler = async (e) => {
    const hash = e.target.innerText;
    if (state.gasUsage[hash]) {
      dispatch({
        type: "SET_GAS_USAGE",
        payload: { hash, gasUsage: undefined },
      });
      return;
    }

    const detail = await alchemy.core.getTransactionReceipt(hash);
    dispatch({
      type: "SET_GAS_USAGE",
      payload: { hash, gasUsage: detail.effectiveGasPrice },
    });
    dispatch({ type: "SET_FROM", payload: { hash, from: detail.from } });
    dispatch({ type: "SET_TO", payload: { hash, to: detail.to } });
    dispatch({ type: "SET_TYPE", payload: { hash, type: detail.type } });
  };
  return (
    <React.Fragment>
      <div className="App">Block Number: {blockNumber}</div>
      <div className="Trans">
        {<p>{"Amount of Transactions: " + content.length}</p>}
      </div>

      <div className="Wrapper">
        <h1>Transactions</h1>
        {loaded
          ? content.map((t, index) => (
              <div className="content ">
                <p>{index + 1 + ":"}</p>
                <p onClick={onClickTransHandler} key={index} className="hash">
                  {t.hash}
                </p>
                <p>
                  {state.gasUsage[t.hash] !== undefined
                    ? "Gas Fees: " + state.gasUsage[t.hash] + " gwei"
                    : ""}
                </p>
                <p>
                  {state.gasUsage[t.hash] !== undefined
                    ? "From: " + state.from[t.hash]
                    : ""}
                </p>
                <p>
                  {state.gasUsage[t.hash] !== undefined
                    ? "To: " + state.to[t.hash]
                    : "Click Transaction for more Information"}
                </p>
                <p>
                  {state.gasUsage[t.hash] !== undefined
                    ? "Type: " + state.type[t.hash]
                    : ""}
                </p>
              </div>
            ))
          : "Loading"}
      </div>
    </React.Fragment>
  );
};

export default Home;
