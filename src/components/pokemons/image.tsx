import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage: boolean;
}

export const Image = component$(
  ({ id, size = 96, backImage = true }: Props) => {
    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {
      return backImage
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    });

    return (
      <div
        class="relative mx-auto flex items-center justify-center rounded-xl border border-blue-700 shadow-xl"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && (
          <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        )}
        <img
          src={imageUrl.value}
          alt={`Pokemon ${id}`}
          width={size}
          height={size}
          onLoad$={() => (imageLoaded.value = true)}
          class={imageLoaded.value ? "block" : "hidden"}
        />
      </div>
    );
  },
);
