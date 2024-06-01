<script>
    export let loanId;
  
    import { writable } from 'svelte/store';
    import loanContractAbi from '../../abi/MortgageServicingARMABI.json';
    import Web3 from 'web3';
  
    let ipfsHash = writable('');
    let amount = writable('');
    let initialInterestRate = writable('');
    let margin = writable('');
    let lifetimeCap = writable('');
    let paymentDate = writable('');
    let dueDate = writable('');
    let adjustmentInterval = writable('');
  
    let successMessage = writable('');
    let errorMessage = writable('');
  
    const web3 = new Web3(window.ethereum);
    const contractAddress = '0x43C595165FE9c412EB9a970f446C259eba1a2101';
    const contract = new web3.eth.Contract(loanContractAbi, contractAddress);
  
    async function originateLoan() {
      try {
        const accounts = await web3.eth.getAccounts();
  
        const loanIdValue = parseInt(loanId);
        const ipfsHashValue = $ipfsHash;
        const amountValue = parseInt($amount);
        const initialInterestRateValue = parseInt($initialInterestRate);
        const marginValue = parseInt($margin);
        const lifetimeCapValue = parseInt($lifetimeCap);
        const paymentDateValue = parseInt($paymentDate);
        const dueDateValue = parseInt($dueDate);
        const adjustmentIntervalValue = parseInt($adjustmentInterval);
  
        await contract.methods.originateLoan(
          loanIdValue,
          ipfsHashValue,
          amountValue,
          initialInterestRateValue,
          marginValue,
          lifetimeCapValue,
          paymentDateValue,
          dueDateValue,
          adjustmentIntervalValue
        ).send({ from: accounts[0] });
  
        console.log('Loan originated successfully');
        successMessage.set('Loan originated successfully');
      } catch (error) {
        console.error('Error originating loan:', error);
        errorMessage.set('Error originating loan');
      }
    }
  </script>
  
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4">Originate Loan</h3>
    <form on:submit|preventDefault={originateLoan} class="space-y-4">
      <input bind:value={$ipfsHash} placeholder="IPFS Hash" class="w-full p-2 border border-gray-300 rounded" />
      <input bind:value={$amount} placeholder="Amount" class="w-full p-2 border border-gray-300 rounded" />
      <input bind:value={$initialInterestRate} placeholder="Initial Interest Rate" class="w-full p-2 border border-gray-300 rounded" />
      <input bind:value={$margin} placeholder="Margin" class="w-full p-2 border border-gray-300 rounded" />
      <input bind:value={$lifetimeCap} placeholder="Lifetime Cap" class="w-full p-2 border border-gray-300 rounded" />
      <input bind:value={$paymentDate} placeholder="Payment Date" class="w-full p-2 border border-gray-300 rounded" />
      <input bind:value={$dueDate} placeholder="Due Date" class="w-full p-2 border border-gray-300 rounded" />
      <input bind:value={$adjustmentInterval} placeholder="Adjustment Interval" class="w-full p-2 border border-gray-300 rounded" />
      <button type="submit" class="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Originate Loan
      </button>
    </form>
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