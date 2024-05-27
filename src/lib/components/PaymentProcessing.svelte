<script>
    import { writable } from 'svelte/store';
    import Web3 from 'web3';
    import loanContractAbi from '../../abi/MortgageServicingARMABI.json';
  
    const web3 = new Web3(window.ethereum);
    const contractAddress = '0x43C595165FE9c412EB9a970f446C259eba1a2101';
    const contract = new web3.eth.Contract(loanContractAbi, contractAddress);
  
    export let loanId;
  
    const paymentAmount = writable(0);
  
    // Function to process payments
    const processPayment = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        console.log($paymentAmount)
        await contract.methods.makePayment(loanId, $paymentAmount).send({ from: accounts[0] });
        console.log("Payment processed successfully");
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    };
  </script>
  
  <div class="mt-6 bg-gray-200 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">Payment Processing</h3>
    <input 
      type="number" 
      placeholder="Enter Amount" 
      bind:value={$paymentAmount} 
      class="border p-2 rounded w-full mb-2"
    />
    <button 
      on:click={processPayment}
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Process Payment
    </button>
  </div>
  