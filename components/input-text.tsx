import { createSignal, For, type JSX, Show, splitProps } from "solid-js";
import type { DivTargeted, InputTargeted } from "./targeted.ts";

export default (
   props: {
      options: Iterable<string>;
      maxSuggest?: number;
      onInput?: (v: string) => void;
      onChange?: (v: string) => void;
   } & JSX.InputHTMLAttributes<HTMLInputElement>,
) => {
   let containerDiv!: HTMLDivElement;
   let suggestionDiv: HTMLDivElement;
   const [local, others] = splitProps(props, [
      "class",
      "value",
      "options",
      "maxSuggest",
      "onInput",
      "onChange",
   ]);
   const [atDownside, setDownside] = createSignal(true);
   const max = local.maxSuggest ?? 12;
   const [suggestions, setSuggestions] = createSignal<Array<string>>([]);
   const handleBlur = () => setTimeout(() => setSuggestions([]), 200);
   const handleKeyPress = (e: KeyboardEvent & InputTargeted) => {
      e.stopPropagation();
      e.key === "Enter" &&
         handleBlur() &&
         local.onChange?.(e.currentTarget.value);
   };
   const handleInput = (e: InputEvent & InputTargeted) => {
      const text = e.currentTarget.value;
      local.onInput?.(text);
      if (!text) return setSuggestions([]);
      const first: Array<string> = [];
      const second: Array<string> = [];
      for (const option of local.options) {
         if (option.startsWith(text)) first.push(option);
         else if (option.includes(text)) second.push(option);
         if (first.length >= max) break;
      }
      setSuggestions(first.concat(second.slice(0, max - first.length)));
      if (suggestionDiv) {
         setDownside(
            containerDiv.getBoundingClientRect().bottom +
               suggestionDiv.getBoundingClientRect().height +
               4 <
               window.innerHeight,
         );
      }
   };
   const suggestionClicked = (e: MouseEvent & DivTargeted) => {
      local.onInput?.(e.currentTarget.textContent);
      local.onChange?.(e.currentTarget.textContent);
   };
   return (
      <div
         ref={containerDiv}
         class={`inline-block relative ${local.class ?? ""}`}
      >
         <input
            class="w-full px-2"
            {...others}
            value={local.value}
            onBlur={handleBlur}
            onInput={handleInput}
            onKeyUp={handleKeyPress}
         />
         <Show when={suggestions().length}>
            <div
               ref={suggestionDiv}
               class={`absolute border bg-(--bg-body) z-100 inset-x-0 px-2 ${
                  atDownside()
                     ? "top-[calc(100%+4px)]"
                     : "bottom-[calc(100%+4px)]"
               }`}
            >
               <For each={suggestions()}>
                  {(s) => <div onClick={suggestionClicked}>{s}</div>}
               </For>
            </div>
         </Show>
      </div>
   );
};
