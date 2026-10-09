import { For, type JSX, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";

export default <T,>(
   props: {
      activeClass?: string;
      func: (t: T) => string;
      onItemSelect?: (t: T) => void;
      options: Array<T>;
      value?: T;
   } & JSX.HTMLAttributes<HTMLDivElement>,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "class",
      "func",
      "onItemSelect",
      "options",
      "value",
   ]);
   const handleClick = (option: T, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onItemSelect(option);
   };
   return (
      <For each={local.options}>
         {(option) => (
            <div
               onClick={[handleClick, option]}
               class={`${local.class ?? ""} ${local.value === option ? local.activeClass : ""}`}
               {...others}
            >
               {local.func(option)}
            </div>
         )}
      </For>
   );
};
