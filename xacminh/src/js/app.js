const contractAddress = "0x8D0dFd3060096A885eBc292c97d0Ad02B2Ca424F"; // Thay thế bằng địa chỉ hợp đồng của bạn 

// Web3 initialization (assuming Web3.js is included)
window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    console.log("Phát hiện MetaMask!");

    try {
      // Yêu cầu quyền truy cập tài khoản
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      App.account = accounts[0];

      // Cập nhật UI với địa chỉ người dùng 
      document.getElementById("user").innerHTML = App.account;

      // Xử lý thay đổi tài khoản (Handle account changes)
      ethereum.on("accountsChanged", function (accounts) {
        console.log("Tài khoản được thay đổi thành:", accounts[0]);
        App.account = accounts[0];
        document.getElementById("user").innerHTML = App.account;
        alert("Tài khoản đã thay đổi. Đang tải lại trang..."); // Cân nhắc cơ chế tải lại mượt mà hơn 
        location.reload(); // Có thể cần cơ chế tải lại mượt mà hơn
      });
    } catch (error) {
      // Người dùng từ chối truy cập (User denied access)
      console.error("Người dùng từ chối quyền truy cập Ethereum:", error);
      alert("Người dùng đã từ chối giao dịch!"); 
    }
  } else {
    // Trình duyệt không hỗ trợ Ethereum 
    console.error("Phát hiện trình duyệt không hỗ trợ Ethereum. Bạn nên thử MetaMask!");
    alert("Phát hiện trình duyệt không hỗ trợ Ethereum. Bạn nên thử MetaMask!");
  }

  // Khởi tạo phiên bản hợp đồng 
  App.contracts.MyContract = new web3.eth.Contract(App.abi, contractAddress);
});

 App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  abi: null, // Assuming `abi` is defined elsewhere

  getCurrentOwner: async function() {
    try {
      const ownerID = await App.contracts.MyContract.methods.getOwner().call();
      return ownerID;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chủ sở hữu:", error);
      alert("Lỗi khi truy xuất thông tin chủ sở hữu."); 
    }
  },

  printCurrentOwner: async function() {
    const ownerID = await App.getCurrentOwner();
    document.getElementById("ownerID").innerHTML = ownerID;
  },

  add: async function() {

    const mssv = document.getElementById("mssv").value;
    const sohieu = document.getElementById("sohieu").value; 
    const fullname = document.getElementById("fullname").value; 
    try {
      const tx = await App.contracts.MyContract.methods
        .createCertificate( mssv, sohieu)
        .send({ from: App.account });
      console.log("Mã giao dịch:", tx.transactionHash);
      alert("Bằng cho sinh viên " + fullname + " đã được tạo thành công!"); 
    } catch (error) {
      console.error("Lỗi khi tạo bằng:", error);
      if (error.code === 4001) { // Example error code for insufficient funds
        alert("Tài khoản không đủ phí giao dịch. Vui lòng nạp thêm.");
      } else {
        alert("Lỗi khi tạo bằng . Bạn có thể không được cấp quyền.");
      }
      
    }
  },

  xacthuc: async function() {
    const mssv = document.getElementById("mssv").value; // Mã số sinh viên
    const sohieu = document.getElementById("sohieu").value; // Bằng cấp 
    const fullname = document.getElementById("fullname").value; 
  
    try {
      const verified = await App.contracts.MyContract.methods
        .xacthuc( mssv, sohieu)
        .call();
      const message = verified ? "Đúng!" : "Sai!";
      alert("Thông tin của sinh viên " + fullname + " là " + message); 
    } catch (error) {
      console.error("Lỗi khi xác minh văn bằng:", error);
      alert("Lỗi khi xác minh chứng chỉ."); 
    }
  },
  tracuu: async function() {
    const mssv = document.getElementById("mssv").value; // Mã số sinh viên
    const pw = document.getElementById("pw").value; // Bằng cấp 
    const fullname = document.getElementById("fullname").value; 
  
    try {
      const verified = await App.contracts.MyContract.methods
        .tracuu( mssv, pw)
        .call();
      const message = verified ? "Đúng!" : "Sai!";
      alert("Thông tin của sinh viên " + fullname + " là " + message); 
    } catch (error) {
      console.error("Lỗi khi xác minh văn bằng:", error);
      alert("Lỗi khi xác minh chứng chỉ."); 
    }
  }
};
