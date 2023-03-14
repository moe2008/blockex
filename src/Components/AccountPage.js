import { Alchemy } from "alchemy-sdk";
import { useState } from "react";
import React from "react";
import classes from "./AccountPage.module.css";
import settings from "../settings";


const alchemy = new Alchemy(settings);

function AccountPage() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [nftAdress, setNFTAdress] = useState("");
  const [owner, setOwner] = useState(0);
  const [transAdress, setTransAdress] = useState("");
  const [trans, setTrans] = useState(0);

  const getBalance = async () => {
    const balanceWei = await alchemy.core.getBalance(address, "latest");
    setBalance(balanceWei / 10 ** 18); 
  };

  const getOwner = async () => {
    const ownerAdress = await alchemy.nft.getOwnersForNft(nftAdress, 1);
    setOwner(ownerAdress.owners[0]);
  };

  const getTransOfAdd = async () => {
    const transa = await alchemy.core.getTransactionCount(transAdress);
    setTrans(transa)
  };

  return (
    <React.Fragment>
      <div className={classes.AccountPage}>
        <h1>ETH Balance Checker</h1>
        <input
          type="text"
          placeholder="Enter Public Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={getBalance}>Check Balance</button>
        {balance !== 0 && (
          <div className={classes.balance}>
            <p>Balance: {balance} ETH</p>
          </div>
        )}
      </div>
      <div className={classes.AccountPage}>
        <h1>Checking Owners of an NFT</h1>
        <input
          type="text"
          placeholder="Enter NFT Address"
          value={nftAdress}
          onChange={(e) => setNFTAdress(e.target.value)}
        />
        <button onClick={getOwner}>Check Owner</button>
        {owner !== 0 && (
          <div className={classes.balance}>
            <p>Owner: {owner} </p>
          </div>
        )}
      </div>
      <div className={classes.AccountPage}>
        <h1>Amount of Transactions for a Address</h1>
        <input
          type="text"
          placeholder="Enter Public Address"
          value={transAdress}
          onChange={(e) => setTransAdress(e.target.value)}
        />
        <button onClick={getTransOfAdd}>Check Transactions</button>
        {trans !== 0 && (
          <div className={classes.balance}>
            <p>Amount of Transactions: {trans} </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default AccountPage;
