<script>
  import Web3 from 'web3';
  import loanContractAbi from '../../abi/MortgageServicingARMABI.json';
  import { writable } from 'svelte/store';

  const web3 = new Web3(window.ethereum);
  const contractAddress = '0x43C595165FE9c412EB9a970f446C259eba1a2101';
  const contract = new web3.eth.Contract(loanContractAbi, contractAddress);

  export let loanId;
  export let currentInterestRate;

  let successMessage = writable('');
  let errorMessage = writable('');

  // Function to adjust interest rate
  const adjustInterestRate = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.adjustInterestRate(loanId).send({ from: accounts[0] });
      console.log("Interest rate adjusted successfully");
      successMessage.set("Interest rate adjusted successfully");
    } catch (error) {
      console.error("Error adjusting interest rate:", error);
      errorMessage.set("Error adjusting interest rate.")
    }
  };
</script>

<div class="mt-6 bg-gray-200 p-4 rounded-lg">
  <h3 class="text-lg font-semibold mb-2">Adjust Interest Rate</h3>
  <p>Current Interest Rate: {currentInterestRate}%</p>
  <button 
    on:click={adjustInterestRate}
    class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
  >
    Adjust Interest Rate
  </button>
  {#if $successMessage}
  <div class="mt-4 text-green-600">
    {$successMessage}
  </div>
  {:else if $errorMessage}
    <div class="mt-4 text-red-600">
      {$errorMessage}
    </div>
  {/if}
</div>
