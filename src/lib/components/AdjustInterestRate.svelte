<script>
    import { web3, contract } from '../../lib/utils/contract';
    import { writable } from 'svelte/store';

    // Props
    export let loanId;
    export let currentInterestRate;
    export let refreshLoanData;

    // State
    let successMessage = writable('');
    let errorMessage = writable('');

    // Function to adjust interest rate
    const adjustInterestRate = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.adjustInterestRate(loanId).send({ from: accounts[0] });
            console.log("Interest rate adjusted successfully");
            successMessage.set("Interest rate adjusted successfully");
            refreshLoanData();
        } catch (error) {
            console.error("Error adjusting interest rate:", error);
            errorMessage.set("Error adjusting interest rate.");
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
        <div class="mt-4 text-green-600">{$successMessage}</div>
    {:else if $errorMessage}
        <div class="mt-4 text-red-600">{$errorMessage}</div>
    {/if}
</div>