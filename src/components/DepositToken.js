//Example to get function as argument
//the {} is needed in the argument
export default function DepositToken({_sendTokenToAizuMujin})
{
    return(<>
        <form>
            <span id="mySymbol">AMT</span><span id="checkText">トークンを貯める</span>
            <br/>
            <input type="text" id="transactionInpt" required="required" />
            <br/><br/>
            <input type="button" id="transactionBtn" onClick={_sendTokenToAizuMujin} value="トークン送信" />
            <br /><br />
        </form>
    </>)
}