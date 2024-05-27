<script>
  import { onMount } from 'svelte';
  import { selectedAccount, chainId} from 'svelte-web3';
  import { writable } from 'svelte/store';
  import loanContractAbi from '../../abi/MortgageServicingARMABI.json';
  import { Web3 } from 'web3';

  const web3 = new Web3(window.ethereum);
  const contractAddress = '0x43C595165FE9c412EB9a970f446C259eba1a2101';
  const contract = new web3.eth.Contract(loanContractAbi, contractAddress);

  // Store to hold the CPI value
  const cpiValue = writable();
  const loanData = writable();

  // Function to fetch Loan data
  const getLoanData = async () => {
    try {
      const loan = await contract.methods.loans(1).call();
      // Convert BigInt values to numbers
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
    }
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Fetch CPI data when the component is mounted
  onMount(() => {
    getLoanData();
  });

</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Borrower Page</h2>
  {#if $loanData}
    <div class="mt-4 bg-gray-100 p-6 rounded-lg shadow-inner">
      <h3 class="text-xl font-semibold mb-2">Loan Details</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <strong>Loan ID:</strong> {$loanData.loanId}
        </div>
        <div>
          <strong>IPFS Hash:</strong> {$loanData.ipfsHash}
        </div>
        <div>
          <strong>Amount:</strong> {formatCurrency($loanData.amount)}
        </div>
        <div>
          <strong>Initial Interest Rate:</strong> {$loanData.initialInterestRate}%
        </div>
        <div>
          <strong>Adjusted Interest Rate:</strong> {$loanData.adjustedInterestRate}%
        </div>
        <div>
          <strong>Margin:</strong> {$loanData.margin}
        </div>
        <div>
          <strong>Lifetime Cap:</strong> {$loanData.lifetimeCap}
        </div>
        <div>
          <strong>UPB:</strong> {formatCurrency($loanData.upb)}
        </div>
        <div>
          <strong>Payment Date:</strong> {new Date($loanData.paymentDate * 1000).toLocaleDateString()}
        </div>
        <div>
          <strong>Due Date:</strong> {new Date($loanData.dueDate * 1000).toLocaleDateString()}
        </div>
        <div>
          <strong>Adjustment Interval:</strong> {$loanData.adjustmentInterval} year{ $loanData.adjustmentInterval > 1 ? 's' : ''}
        </div>
        <div>
          <strong>Last Adjustment Date:</strong> {new Date($loanData.lastAdjustmentDate * 1000).toLocaleDateString()}
        </div>
        <div>
          <strong>Is Paid:</strong> {$loanData.isPaid ? 'Yes' : 'No'}
        </div>
      </div>
    </div>
  {:else}
    <p>Loading loan data...</p>
  {/if}
  <!-- <p>Contract: {$contracts.MortgageServicingARM.methods.getCPILatestAnswer().call()}</p> -->

  <!-- {#if $connected }

  {#if $chainId !== 500 }

    <p>
      Your are connected to the wrong network ("{$chainData.name}")". Please
      connect to the testnet Görli for the $contract store demo
    </p>

  {:else if $contracts.link}

    {#await $contracts.link.methods.totalSupply().call() }
      <span>waiting for $contracts.link.methods.totalSupply().call() Promise...</span>
    {:then supply}
      <p>We have the result of $contracts.link.methods.totalSupply().call() :</p>
      <p>ERC20 LINK contract has a supply of {supply} tokens on Görli.</p>
    {/await}

  {/if}

{:else}

  <p>
    Please first <a href="/web3/set">connect</a>
    connect to the görli network to be able to use this page.
  </p>

{/if} -->

</div>

<style>
  .shadow-inner {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>