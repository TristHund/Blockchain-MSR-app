<script>
  import { selectedAccount, web3} from 'svelte-web3';
  
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Borrower Page</h2>
  <p>Account: {$selectedAccount}</p>
  
</div>