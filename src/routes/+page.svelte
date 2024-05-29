<script>
  import { goto } from '$app/navigation';

  const handleButtonClick = (hrefValue) => {
    goto(hrefValue);
  };

</script>
  
  <main class="bg-secondary-50 text-gray-800 shadow-lg rounded-lg">
    <header class="bg-slate-700 text-white p-6 shadow-md rounded-md">
        <div class="container mx-auto text-center">
          <h1 class="text-3xl font-extrabold">Welcome to the Armserv Full Service Blockchain Loan System</h1>
        </div>
    </header>
  
    <section class="container mx-auto p-6 space-y-12">
      <!-- Section 1: Introduction -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4">Taking Out a Loan</h2>
        <p class="text-gray-700 mb-4">
          Discover the benefits of taking out an Adjustable Rate Mortgage (ARM) loan. Flexible terms and potential for lower initial interest rates make ARM loans an attractive option for many borrowers.
        </p>
        <img src="neighborhood.png" alt="Taking out a loan" class="w-full h-64 object-cover rounded-lg mb-4">
        <button class="w-full p-4 bg-primary-500 text-white rounded hover:bg-primary-700" on:click={() => {handleButtonClick("/about")}}>
          Learn More About ARM Loans
        </button>
      </div>
  
      <!-- Section 2: Advantages of ARM Loans -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4">Advantages of ARM Loans</h2>
        <p class="text-gray-700 mb-4">
          ARM loans offer lower initial interest rates, which can lead to significant savings over the initial fixed-rate period. These loans can be ideal for those who plan to move or refinance within a few years.
        </p>
        <img src="/house-in-glory.png" alt="Advantages of ARM Loans" class="w-full h-64 object-cover rounded-lg mb-4">
        <button class="w-full p-4 bg-primary-500 text-white rounded hover:bg-primary-700" on:click={() => {handleButtonClick("/about")}}>
          See How ARM Loans Benefit You
        </button>
      </div>
  
      <!-- Section 3: Why Choose ARM Loans -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4">Why Choose ARM Loans?</h2>
        <p class="text-gray-700 mb-4">
          ARM loans provide flexibility and the potential for lower payments in the early years of the loan. They are a great option for borrowers who anticipate changes in their financial situation.
        </p>
        <img src="/car-in-drive.png" alt="Why Choose ARM Loans" class="w-full h-64 object-cover rounded-lg mb-4">
        <button class="w-full p-4 bg-primary-500 text-white rounded hover:bg-primary-700" on:click={() => {handleButtonClick("/about")}}>
          Find Out More About ARM Loans
        </button>
      </div>
  
      <!-- Section 4: Buttons for Different Users -->
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4">Get Started</h2>
        <div class="flex justify-center space-x-4">
          <button class="w-1/4 p-4 bg-primary-600 text-white rounded hover:bg-primary-700" on:click={() => {handleButtonClick("/borrower")}}>
            I want a loan
          </button>
          <button class="w-1/4 p-4 border border-primary-600 text-primary-600 rounded hover:bg-primary-50" on:click={() => {handleButtonClick("/servicer")}}>
            I want to service a loan
          </button>
          <button class="w-1/4 p-4 bg-primary-600 text-white rounded hover:bg-primary-700" on:click={() => {handleButtonClick("/originator")}}>
            I want to originate a loan
          </button>
        </div>
      </div>
    </section>
  </main>
  
  <style>
    main {
      scroll-behavior: smooth;
    }
  </style>
  