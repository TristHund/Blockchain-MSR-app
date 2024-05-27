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

  // Function to fetch CPI data
  const getCPILatestAnswer = async () => {
    try {
      const valueCPI = await contract.methods.getCPILatestAnswer().call();
      cpiValue.set(parseFloat(valueCPI)/(10**18));
    } catch (error) {
      console.error("Error fetching CPI value:", error);
      cpiValue.set(null);
    }
  };

  // Function to fetch Loan data
  const getLoanData = async () => {
    try {
      const loan = await contract.methods.loans(1).call();
      loanData.set(loan);
    } catch (error) {
      console.error("Error fetching loan data:", error);
      loanData.set(null);
    }
  };

  // Fetch CPI data when the component is mounted
  onMount(() => {
    getCPILatestAnswer();
  });

</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Borrower Page</h2>
  <p>Account: {$selectedAccount}</p>
  <p>ChainID: {$chainId}</p>
  <p>CPI Value: {$cpiValue}</p>
  <p>Loan Data: {$loanData}</p>
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