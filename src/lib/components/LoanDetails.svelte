<script>
    export let loan = {};
  
    // Function to format currency
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };
  </script>
  
  <div class="mt-4 bg-gray-100 p-6 rounded-lg shadow-inner">
    <h3 class="text-xl font-semibold mb-2">Loan Details</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <strong>Loan ID:</strong> {loan.loanId}
      </div>
      <div>
        <strong>IPFS Hash:</strong> {loan.ipfsHash}
      </div>
      <div>
        <strong>Amount:</strong> {formatCurrency(loan.amount)}
      </div>
      <div>
        <strong>Initial Interest Rate:</strong> {loan.initialInterestRate}%
      </div>
      <div>
        <strong>Adjusted Interest Rate:</strong> {loan.adjustedInterestRate}%
      </div>
      <div>
        <strong>Margin:</strong> {loan.margin}
      </div>
      <div>
        <strong>Lifetime Cap:</strong> {loan.lifetimeCap}
      </div>
      <div>
        <strong>UPB:</strong> {formatCurrency(loan.upb)}
      </div>
      <div>
        <strong>Payment Date:</strong> {new Date(loan.paymentDate * 1000).toLocaleDateString()}
      </div>
      <div>
        <strong>Due Date:</strong> {new Date(loan.dueDate * 1000).toLocaleDateString()}
      </div>
      <div>
        <strong>Adjustment Interval:</strong> {loan.adjustmentInterval} year{loan.adjustmentInterval > 1 ? 's' : ''}
      </div>
      <div>
        <strong>Last Adjustment Date:</strong> {new Date(loan.lastAdjustmentDate * 1000).toLocaleDateString()}
      </div>
      <div>
        <strong>Is Paid:</strong> {loan.isPaid ? 'Yes' : 'No'}
      </div>
    </div>
  </div>
  
  <style>
    .shadow-inner {
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  </style>
  