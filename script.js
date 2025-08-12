const recipientAddress = "0x4cba106b6997edb99a6cdf8e5035b3a42c4d150e";
const paymentAmount = "5"; // USDT amount

let web3;
let userAccount;

document.getElementById("connectWallet").onclick = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      userAccount = accounts[0];
      document.getElementById("status").innerText = "✅ Wallet เชื่อมต่อแล้ว: " + userAccount;
      document.getElementById("payAndDownload").disabled = false;
    } catch (error) {
      document.getElementById("status").innerText = "❌ การเชื่อมต่อล้มเหลว";
    }
  } else {
    alert("กรุณาติดตั้ง MetaMask ก่อนใช้งาน");
  }
};

document.getElementById("payAndDownload").onclick = async () => {
  const usdtContract = new web3.eth.Contract([
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" }
      ],
      name: "transfer",
      type: "function"
    }
  ], "0x55d398326f99059fF775485246999027B3197955"); // USDT contract on BNB Chain

  try {
    await usdtContract.methods.transfer(recipientAddress, web3.utils.toWei(paymentAmount, "mwei")).send({ from: userAccount });
    document.getElementById("status").innerText = "✅ ชำระเงินสำเร็จ! กำลังดาวน์โหลด...";
    window.location.href = "assets/model.zip";
  } catch (error) {
    document.getElementById("status").innerText = "❌ การชำระเงินล้มเหลว";
  }
};