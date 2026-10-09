import { createSignal, Index, type JSX, Show, splitProps } from "solid-js";
import type { DivTargeted, InputTargeted } from "./targeted.ts";
import { usePopup } from "./use-popup.ts";

export default (
   props: {
      maxSuggest?: number;
      onChange?: (v: string) => void;
      onInput?: (v: string) => void;
      options: Iterable<string>;
   } & JSX.InputHTMLAttributes<HTMLInputElement>,
) => {
   const [local, others] = splitProps(props, [
      "class",
      "maxSuggest",
      "onChange",
      "onInput",
      "options",
      "value",
   ]);
   const { els, adjustSide } = usePopup();

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
      adjustSide();
   };
   const suggestionClicked = (e: MouseEvent & DivTargeted) => {
      local.onInput?.(e.currentTarget.textContent);
      local.onChange?.(e.currentTarget.textContent);
   };
   return (
      <div
         ref={(el) => (els.container = el)}
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
               ref={(el) => (els.popup = el)}
               class="absolute border bg-(--bg-body) z-100 inset-x-0 px-2"
            >
               <Index each={suggestions()}>
                  {(s) => <div onClick={suggestionClicked}>{s}</div>}
               </Index>
            </div>
         </Show>
      </div>
   );
};
