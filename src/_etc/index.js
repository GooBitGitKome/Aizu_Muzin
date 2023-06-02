//Import React Containers
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';

//Import Web Containers
import TotalDeposit from './TotalDeposit';
import DepositTo from './DepositTo';
import ConnectWallet from './ConnectWallet';
import TransactToken from './TransactToken';

//Import CSS
import './index.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

export default function MainContainer() {
    
    let coutionText="";
    //Componentsとして直接表示させないとHookを間接的に表示させることができないので
    //このような対策を講じている。周りくどいので別案があればそれに変更。
    //onCliikなどで関数として、Asynclonous処理を呼び出すとHookのRule違反となる
    const [connectWallet, setConnectWallet] = useState(false);
    const connectHandleClick = () => {
        //Go to connect to Wallet
        setConnectWallet(true);
        //Make transaction func visible
    };
    //For transaction function
    const [exeTransact, setTransact] = useState(false);//Transaction Button
    //Send Transaction
    const transactHandleClick = () => {
        if(connectWallet === false){
            alert("Please connect your wallet first.");
        }else{
            if(isNaN(document.getElementById("transactionInpt").value))
            {
                alert("Please input value.");
            }else{
                setConnectWallet(true);
                if(connectWallet===true){
                    setTransact(true);
                }
            }
        }
    };

    
    return (
        <>
            <h1>会津無尽</h1>
            <br />
            会津無尽へようこそ。このサイトは現在開発テスト段階です。<br />
            <br /><br />

            <button id="connectBtn" onClick={connectHandleClick}>ウォレットに接続する</button>
            {connectWallet && <ConnectWallet />}
            <br/><br/><br/><br/>
            <form>
                <span id="checkText">送りたいトークン量{coutionText}</span>
                <br/>
                <input type="text" id="transactionInpt" required="required" />
                <br/><br/>
                <input type="button" id="transactionBtn" onClick={transactHandleClick} value="トークンを貯める" />
            </form>
            {exeTransact && <TransactToken />}

            <br /><br />
            <TotalDeposit />
            <br />
            <br />
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
            <div class="form-example">
                <h2>あなたのAM_TOKEN残高を確認</h2>
                あなたのウォレットアドレスを入力してください：
                <br />
                <br />
                <input type="text" name="myAddress" id="myAddress" oninput="onAddressChange();" />
                <br />
                <br />
                <span class="dispResult" id="result2">----------</span>
                <br />
            </div>
            <br />
            <DepositTo />
            <br /><br />
        <br /><br />
        </>
    );
}


root.render(<MainContainer />);