<script>
    import { loanData, getLoanData } from '../../lib/utils/loanData';
    import { writable } from 'svelte/store';
    import { onDestroy } from 'svelte';
    import { loanRequests } from '$lib/stores/loanRequests';
    import { payments } from '$lib/stores/payments';
  
    const accountNumber = writable('');
    const requestAccountNumber = writable('');
    const isLoading = writable(false);
    const isLoggedIn = writable(false);
    const loanAmount = writable(0);
    const requestMessage = writable('');
    const loanRequestStatus = writable(null);
    const paymentAmount = writable(0);
    const paymentMessage = writable('');
  
    function requestLoan() {
      loanRequests.addLoanRequest({
        accountNumber: $accountNumber,
        amount: $loanAmount,
        status: 'pending'
      });
      requestMessage.set('Loan request submitted.');
      loanRequestStatus.set('pending');
    }
  
    $: {
      const request = $loanRequests.find(r => r.accountNumber === $accountNumber);
      if (request) {
        loanRequestStatus.set(request.status);
      }
    }
  
    const handleLogin = () => {
      getLoanData($accountNumber);
      isLoggedIn.set(true);
    };
  
    const handleLogout = () => {
      loanData.set(null);
      isLoggedIn.set(false);
    };
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };
  
    function submitPayment() {
      payments.addPayment({
        accountNumber: $accountNumber,
        amount: $paymentAmount,
        status: 'pending'
      });
      paymentMessage.set('Payment submitted.');
    };

    onDestroy(() => {
    loanData.set(null);
  });
  
  </script>
  
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Borrower Page</h2>
  
    {#if !$isLoggedIn}
      <input
        type="text"
        bind:value={$accountNumber}
        placeholder="Enter your account number"
        class="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        on:click={handleLogin}
        class="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
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
  
      <div class="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 class="text-2xl font-bold mb-4">Submit Payment</h2>
        <form on:submit|preventDefault={submitPayment} class="space-y-4">
          <input
            type="number"
            bind:value={$paymentAmount}
            placeholder="Enter payment amount"
            class="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            class="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Payment
          </button>
        </form>
        {#if $paymentMessage}
          <p class="mt-4 text-green-600">{$paymentMessage}</p>
        {/if}
      </div>
  
      <button
        on:click={handleLogout}
        class="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Logout
      </button>
    {/if}
  </div>
  
  {#if !$isLoggedIn}
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 class="text-2xl font-bold mb-4">Request a Loan</h2>
      <form on:submit|preventDefault={requestLoan} class="space-y-4">
        <input
          type="text"
          bind:value={$requestAccountNumber}
          placeholder="Enter your account number"
          class="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="number"
          bind:value={$loanAmount}
          placeholder="Enter loan amount"
          class="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          class="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Request Loan
        </button>
      </form>
      {#if $requestMessage}
        <p class="mt-4 text-green-600">{$requestMessage}</p>
      {/if}
      {#if $loanRequestStatus === 'approved'}
        <p class="mt-4 text-green-600">Your loan request has been approved!</p>
      {:else if $loanRequestStatus === 'denied'}
        <p class="mt-4 text-red-600">Your loan request has been denied.</p>
      {:else if $loanRequestStatus === 'pending'}
        <p class="mt-4 text-yellow-600">Your loan request is pending approval.</p>
      {/if}
    </div>
  {/if}
  
  <style>
    .shadow-inner {
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  </style>
  