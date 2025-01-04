import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Navbar from "~/components/shared/header/navbar";

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwt = cookie.get("jwt");
  if (!jwt) {
    redirect(302, "/login");
  }
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex h-screen w-full flex-col items-center gap-10 bg-slate-400 pt-10 text-white">
        <h3 class="text-2xl">Dashboard</h3>
        <Slot />
      </div>
    </>
  );
});
