<script>
  import { selectedAccount, web3 } from 'svelte-web3';

  let loanId, ipfsHash, amount, initialInterestRate, margin, lifetimeCap, paymentDate, dueDate, adjustmentInterval;

  async function originateLoan() {
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [
      // Your contract ABI
    ];

    const contract = new $web3.eth.Contract(abi, contractAddress);

    try {
      await contract.methods.originateLoan({
        loanId,
        ipfsHash,
        amount,
        initialInterestRate,
        margin,
        lifetimeCap,
        paymentDate,
        dueDate,
        adjustmentInterval
      }).send({ from: $selectedAccount });
    } catch (error) {
      console.error('Error originating loan:', error);
    }
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Originator Page</h2>
  <p>Account: {$selectedAccount}</p>
  <form on:submit|preventDefault={originateLoan} class="space-y-4">
    <input bind:value={loanId} placeholder="Loan ID" class="w-full p-2 border border-gray-300 rounded" />
    <input bind:value={ipfsHash} placeholder="IPFS Hash" class="w-full p-2 border border-gray-300 rounded" />
    <input bind:value={amount} placeholder="Amount" class="w-full p-2 border border-gray-300 rounded" />
    <input bind:value={initialInterestRate} placeholder="Initial Interest Rate" class="w-full p-2 border border-gray-300 rounded" />
    <input bind:value={margin} placeholder="Margin" class="w-full p-2 border border-gray-300 rounded" />
    <input bind:value={lifetimeCap} placeholder="Lifetime Cap" class="w-full p-2 border border-gray-300 rounded" />
    <input bind:value={paymentDate} placeholder="Payment Date" class="w-full p-2 border border-gray-300 rounded" />
    <input bind:value={dueDate} placeholder="Due Date" class="w-full p-2 border border-gray-300 rounded" />
    <input bind:value={adjustmentInterval} placeholder="Adjustment Interval" class="w-full p-2 border border-gray-300 rounded" />
    <button type="submit" class="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Originate Loan</button>
  </form>
  <!-- Add originator-specific functionality here -->
</div>
