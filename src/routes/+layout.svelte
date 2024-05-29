<script>
  import { tick, onMount } from 'svelte';
  import { defaultEvmStores as evm, selectedAccount, chainId } from 'svelte-web3';
  import "../";
  import { writable } from 'svelte/store';
  
  let menuOpen = writable(false);

  onMount(() => {
    evm.setProvider();
  });

  const connectWallet = async () => {
    await evm.setProvider();
    await tick(); // wait for the store to update
  };

  const toggleMenu = () => {
    menuOpen.update(open => !open);
  };

</script>

<main class="min-h-screen bg-gray-800 text-gray-800">
  <header class="bg-gray-900 text-white p-4 shadow-md">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
      <a href="/" class="flex items-center space-x-3">
        <img src="/logo.svg" class="h-8" alt="App Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap">ArmServ</span>
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0">
        {#if !$selectedAccount}
          <button
            class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
            on:click={connectWallet}
          >
            <img src="/wallet.svg" alt="Wallet" class="w-8 h-8 cursor-pointer filter-green" />
            <span>Login</span>
          </button>
        {:else}
          <div class="relative group">
            <img src="/wallet.svg" alt="Wallet" class="w-8 h-8 cursor-pointer filter-green" />
            <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <p>{ $selectedAccount }</p>
              <p>Chain ID: {$chainId}</p>
            </div>
          </div>
        {/if}
        <button on:click={toggleMenu} class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" class:menu-open={$menuOpen}>
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-gray-900">
          <li>
            <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
          </li>
          <li>
            <a href="/borrower" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Borrower</a>
          </li>
          <li>
            <a href="/servicer" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Servicer</a>
          </li>
          <li>
            <a href="/originator" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Originator</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  
  <div class="container mx-auto p-6 space-y-12 mt-16">
    <slot></slot>
  </div>
</main>

<style>
  main {
    text-align: center;
    scroll-behavior: smooth;
  }

  nav a {
    margin: 0 1rem;
  }

  .filter-green{
    filter: invert(40%) sepia(20%) saturate(400%) hue-rotate(70deg) brightness(118%) contrast(60%);
}
</style>
