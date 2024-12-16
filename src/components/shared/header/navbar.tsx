import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class="flex items-center justify-between bg-gray-800 p-4 text-white">
      <h1 class="text-2xl font-bold">Mi Sitio Qwik</h1>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <Link href="/" class="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/pokemons/list-ssr/" class="hover:text-gray-300">
              SSR List
            </Link>
          </li>
          <li>
            <Link href="/pokemons/list-client/" class="hover:text-gray-300">
              Client List
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});
