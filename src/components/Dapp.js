import {useState} from 'react';
//Import React Containers
import { ethers } from "ethers";

//import Contracts json
import TokenABI from "../contracts/AizuMujinToken.json";
import AMujinABI from "../contracts/AizuMujin.json";

//import My Components
import DepositToken from "./DepositToken";
import BalanceOf from "./BalanceOf";
import FoundToken from "./FoundToken";

//AizuMujinToken Contract Address to be used ABI and create token instance.
let TAddress = "0xf8C0f8499147ac28387d2d6394E3bD94D1Bb061e";
//AizuMujin Contract Address to be used ABI.
let AMujinAddress = "0x07CDBed21422e7B7B258a80B07CA813Bcf4D7e5A";

//Those structure get the information contract and checkCode
//e.g.) tokencontract = {contract: given contract, checkCode: Error code}
//[FUTURE]checkCode would be not needed, because allmost all cases getting contract will work.
let tokenContract = {contract:null,checkCode:"TOKEN CONTRACT"};
let aizuMujinContract ={contract:null,checkCode:"AIZU MUJIN CONTRACT"};

//variables
let currentAccount; //user wallet address.
let provider = null; //Like Metamask.
let signer = null;  //the signature from currentAccount, used to interact with Blockchain.
let balance = 0; //temp variables to get blance of Token from address.
export default function Dapp() {
    const [toggle,setToggle] = useState(false);

    return (
        <>
        <h1>会津無尽</h1>
        <br />
        会津無尽へようこそ。このサイトは現在開発テスト段階です。<br />
        <br /><br />

        <button id="connectBtn" onClick={_connectionProcedure}>ウォレットに接続する</button>

        <br/><br/><br/><br/>
        <DepositToken _sendTokenToAizuMujin={()=>{_sendTokenToAizuMujin(setToggle)}} toggle={toggle} />

        <BalanceOf />

        <FoundToken _transferAllToken={_transferAllToken}/>
        <br />
        <div>
        <br />
        <h2>会津無尽へ参加するには</h2>
        <p>
        会津無尽へようこそ。このサイトは現在開発テスト段階です。<br />
        実際にご利用になりたい方は”Metamask”というアプリケーションを入れてください。<br />
        そこで、新たなあなたのウォレットを作りましょう！<br />
        実際にAM_TOKENを手に入れるには管理者への問い合わせが必要です。<br />
        下記にご連絡ください。<br />
        <br />
        test@test.com<br />
        </p>
        <br />
        </div>
        </>
        );
    }

    async function _connectionProcedure()
    {
        await _connectWallet();
        deactivateFunctions();//deactivate the connection button
        await _makeSigner();//current account signature
        await _getAccount();//current account address
        await _makeContract(TAddress,TokenABI.abi,tokenContract);// Token Contract Instance
        await _makeContract(AMujinAddress,AMujinABI.abi,aizuMujinContract);// AizuMujin Contract Instance
        await _getBalanceOf(currentAccount,"myTotalToken"); //get balance from MY wallet
        await _getBalanceOf(AMujinAddress,"AizuMujinTotalToken");// get balance from AIZUMUJIN contract
    }

    async function _connectWallet()
    {
        //check whether Metamask is installed
        if (window.ethereum === undefined) {
            console.log("ERROR: MetaMask not installed; using read-only defaults");
        } else {
            console.log("OK: Metamask exists.");
            // get Metamask Provider
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            console.log(provider);
        }
    }
    //to trnsact to blockchain, if you want to know about siner, please go to the Official Documentation
    async function _makeSigner()
    {
        signer = await provider.getSigner();
        console.log("Signer: " + signer);
    }

    //e.g.) _makeContract(the address of which you wan to get functions,
    //                    the abi related to the address,
    //                    the provider you use or where the contract is in
    //                  );
    function _makeContract(_address,_abi,obj)
    {
        obj.contract = new ethers.Contract(_address, _abi, provider);
        console.log(obj.checkCode + ": " +obj.contract.symbol());
    }

    //To get the balance of AMT
    //e.g.) _getBalanceOf(address which has AMT, the HTML ID which you want to insert the result into)
    async function _getBalanceOf(_address,_elementId){
        const balanceHex = await tokenContract.contract.balanceOf(_address); //get balance as hexidecimal
        balance = ethers.BigNumber.from(balanceHex).toNumber();//to decimal
        console.log(ethers.BigNumber.from(balance).toNumber());
        document.getElementById(_elementId).innerHTML = balance;
    }


    async function _sendTokenToAizuMujin(setToggle){
        let amount = document.getElementById("transactionInpt").value;
        if(!isNaN(amount)){
            try{
                let transaction = await tokenContract.contract.connect(signer).transfer(AMujinAddress,Number(amount));

                activateSendTokenFunctions(false);
                setToggle(true);
                await transaction.wait();
                setToggle(false);

                //activateSendTokenFunctions(true);
                await _getBalanceOf(currentAccount,"myTotalToken"); //get balance from MY wallet
                await _getBalanceOf(AMujinAddress,"AizuMujinTotalToken");// get balance from AIZUMUJIN contract


            }catch(error){
                alert("ERROR: Canceled or Failed");
            }
        }else{
            alert("ERROR: Failed to pay.");
        }

    }

    async function _getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
            } else {
                console.error(err);
            }
        });
        currentAccount = accounts[0];
        console.log("ACCOUNT: " + currentAccount);
    }

    //After the connection to this page, connectBtn must be inactivated.
    function deactivateFunctions()
    {
        if(provider != null)
        {
            document.getElementById('connectBtn').innerHTML ="ウォレット接続済み";
            document.getElementById('connectBtn').setAttribute("disabled", true);
        }
    }

    //After the connection to this page, connectBtn must be inactivated.
    function activateSendTokenFunctions(action)
    {
        if(action==false)
        {
            document.getElementById('transactionBtn').innerHTML ="Waiting";
            document.getElementById('transactionBtn').setAttribute("disabled", true);
        }else{
            document.getElementById('transactionBtn').innerHTML ="Send";
            document.getElementById('transactionBtn').setAttribute("disabled", false);
            document.getElementById('transactionBtn').setAttribute("enabled", true);
        }
    }

    //Aizumujin Contract function
    //send all token into the person of the address in input box
    async function _transferAllToken()
    {
        //get Address from html form
        const _toAddress = document.getElementById("aizuMujinInpt").value;
        console.log(_toAddress);
        if(!isNaN(_toAddress)){
            //when the inputbox has a value to get
            try{
                await aizuMujinContract.contract.connect(signer).sendAllTokens(_toAddress);
            }catch(error){
                alert("ERROR: Canceled or Failed");
            }
        }else{
            //when the inputbox is Nothing to get
            alert("ERROR: Failed to pay.");
        }
        await _connectWallet();
        await _makeSigner();//current account signature
        await _getAccount();//current account address
        await _makeContract(TAddress,TokenABI.abi,tokenContract);// Token Contract Instance
        await _makeContract(AMujinAddress,AMujinABI.abi,aizuMujinContract);// AizuMujin Contract Instance
        await _getBalanceOf(currentAccount,"myTotalToken"); //get balance from MY wallet
        await _getBalanceOf(AMujinAddress,"AizuMujinTotalToken");// get balance from AIZUMUJIN contract
    }

