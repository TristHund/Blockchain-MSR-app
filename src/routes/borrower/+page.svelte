<script>
  import { writable } from 'svelte/store';
  import loanContractAbi from '../../abi/MortgageServicingARMABI.json';
  import Web3 from 'web3';
  import { loanRequests } from '../../stores.js';
  

  const web3 = new Web3(window.ethereum);
  const contractAddress = '0x43C595165FE9c412EB9a970f446C259eba1a2101';
  const contract = new web3.eth.Contract(loanContractAbi, contractAddress);

  const accountNumber = writable('');
  const loanData = writable();
  const isLoading = writable(false);
  const isLoggedIn = writable(false);
  const loanAmount = writable(0);
  const requestMessage = writable('');

  // Function to fetch Loan data
  const getLoanData = async (accountNumber) => {
    try {
      isLoading.set(true);
      const loan = await contract.methods.loans(accountNumber).call();
      loan.loanId = Number(loan.loanId);
      loan.amount = Number(loan.amount);
      loan.initialInterestRate = Number(loan.initialInterestRate) / 100; // Convert bps to percentage
      loan.adjustedInterestRate = Number(loan.adjustedInterestRate) / 100; // Convert bps to percentage
      loan.margin = Number(loan.margin);
      loan.lifetimeCap = Number(loan.lifetimeCap);
      loan.upb = Number(loan.upb);
      loan.paymentDate = Number(loan.paymentDate);
      loan.dueDate = Number(loan.dueDate);
      loan.adjustmentInterval = Math.round(Number(loan.adjustmentInterval) / (365 * 24 * 60 * 60)); // Convert seconds to years
      loan.lastAdjustmentDate = Number(loan.lastAdjustmentDate);
      loanData.set(loan);
    } catch (error) {
      console.error("Error fetching loan data:", error);
      loanData.set(null);
    } finally {
      isLoading.set(false);
    }
  };

  function requestLoan() {
    loanRequests.addLoanRequest({
      accountNumber: $accountNumber,
      amount: $loanAmount,
      status: 'pending'
    });
    requestMessage.set(`Loan request submitted.`);
  };

  const handleLogin = () => {
    getLoanData($accountNumber);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Borrower Page</h2>

  {#if !$isLoggedIn}
    <input type="text" bind:value={$accountNumber} placeholder="Enter your account number" class="w-full p-2 border border-gray-300 rounded mb-4" />
    <button on:click={handleLogin} class="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Login
    </button>
  {/if}
  {#if $isLoading}
    <p>Loading loan data...</p>
  {:else if $loanData}
    <div class="mt-4 bg-gray-100 p-6 rounded-lg shadow-inner">
      <h3 class="text-xl font-semibold mb-2">Loan Details</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><strong>Loan ID:</strong> {$loanData.loanId}</div>
        <div><strong>IPFS Hash:</strong> {$loanData.ipfsHash}</div>
        <div><strong>Amount:</strong> {formatCurrency($loanData.amount)}</div>
        <div><strong>Initial Interest Rate:</strong> {$loanData.initialInterestRate}%</div>
        <div><strong>Adjusted Interest Rate:</strong> {$loanData.adjustedInterestRate}%</div>
        <div><strong>Margin:</strong> {$loanData.margin}</div>
        <div><strong>Lifetime Cap:</strong> {$loanData.lifetimeCap}</div>
        <div><strong>UPB:</strong> {formatCurrency($loanData.upb)}</div>
        <div><strong>Payment Date:</strong> {new Date($loanData.paymentDate * 1000).toLocaleDateString()}</div>
        <div><strong>Due Date:</strong> {new Date($loanData.dueDate * 1000).toLocaleDateString()}</div>
        <div><strong>Adjustment Interval:</strong> {$loanData.adjustmentInterval} year{ $loanData.adjustmentInterval > 1 ? 's' : ''}</div>
        <div><strong>Last Adjustment Date:</strong> {new Date($loanData.lastAdjustmentDate * 1000).toLocaleDateString()}</div>
        <div><strong>Is Paid:</strong> {$loanData.isPaid ? 'Yes' : 'No'}</div>
      </div>
    </div>
  {/if}
</div>

<div class="bg-white p-6 rounded-lg shadow-md mt-6">
  <h2 class="text-2xl font-bold mb-4">Request a Loan</h2>
  <form on:submit|preventDefault={requestLoan} class="space-y-4">
    <input type="text" bind:value={$accountNumber} placeholder="Enter your account number" class="w-full p-2 border border-gray-300 rounded mb-4" />
    <input type="number" bind:value={$loanAmount} placeholder="Enter loan amount" class="w-full p-2 border border-gray-300 rounded mb-4" />
    <button type="submit" class="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Request Loan
    </button>
  </form>
  {#if $requestMessage}
    <p class="mt-4 text-green-600">{$requestMessage}</p>
  {/if}
</div>
<style>
  .shadow-inner {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
