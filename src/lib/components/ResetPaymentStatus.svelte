<script>
    import { web3, contract } from '../../lib/utils/contract';

    // Props
    export let loanId;
    export let isPaid;
    export let refreshLoanData;

    // Function to reset payment status
    const resetPaymentStatus = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.resetPaymentStatus(loanId).send({ from: accounts[0] });
            console.log("Payment status reset successfully");
            refreshLoanData();
        } catch (error) {
            console.error("Error resetting payment status:", error);
        }
    };
</script>

<div class="mt-6 bg-gray-200 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">Reset Payment Status</h3>
    <p>Current Payment Status: {isPaid ? 'Paid' : 'Unpaid'}</p>
    <button
        on:click={resetPaymentStatus}
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
        Reset Payment Status
    </button>
</div>
