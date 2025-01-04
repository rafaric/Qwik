import { component$ } from "@builder.io/qwik";
import { useCounter } from "~/hooks/useCounter";

export default component$(() => {
  const { counter, increment, decrement } = useCounter(5);
  return (
    <div class="flex flex-col items-center justify-center">
      <span class="text-2xl">Counter:</span>
      <span class="text-7xl">{counter}</span>
      <div class="mx-auto flex w-full justify-center gap-4">
        <button onClick$={decrement} class="rounded-lg bg-blue-200 px-2">
          -1
        </button>
        <button onClick$={increment} class="mr-2 rounded-lg bg-blue-200 px-2">
          +1
        </button>
      </div>
    </div>
  );
});
