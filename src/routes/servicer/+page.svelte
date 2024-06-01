<script>
    import { writable } from 'svelte/store';
    import { onDestroy } from 'svelte';
    import { loanData, getLoanData } from '../../lib/utils/loanData';
    import LoanDetails from '$lib/components/LoanDetails.svelte';
    import PaymentProcessing from '$lib/components/PaymentProcessing.svelte';
    import AdjustInterestRate from '$lib/components/AdjustInterestRate.svelte';
    import ResetPaymentStatus from '$lib/components/ResetPaymentStatus.svelte';
  
    const searchTerm = writable('');

    onDestroy(() => {
    loanData.set(null);
  });
  
  </script>
  
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Servicer Page</h2>
    <div class="mb-6">
      <input
        type="number"
        placeholder="Enter Loan ID"
        bind:value={$searchTerm}
        class="border p-2 rounded w-full"
      />
      <button
        on:click={() => getLoanData($searchTerm)}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Search Loan
      </button>
    </div>
  
    {#if $loanData}
      <LoanDetails loan={$loanData} />
      <PaymentProcessing 
        loanId={$loanData.loanId} 
        refreshLoanData={() => getLoanData($loanData.loanId)}
      />
      <AdjustInterestRate 
        loanId={$loanData.loanId} 
        currentInterestRate={$loanData.adjustedInterestRate} 
        refreshLoanData={() => getLoanData($loanData.loanId)}
      />
      <ResetPaymentStatus 
        loanId={$loanData.loanId} 
        isPaid={$loanData.isPaid} 
        refreshLoanData={() => getLoanData($loanData.loanId)}
      />
    {:else}
      <p>No loan data available. Please search for a loan.</p>
    {/if}
  </div>
  