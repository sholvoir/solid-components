import { For, type JSX, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";

export default <T,>(
   props: {
      activeClass: string;
      current?: T;
      func: (t: T) => string;
      onTabSelected: (t: T) => void;
      options: readonly T[];
   } & JSX.HTMLAttributes<HTMLElement>,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "class",
      "current",
      "func",
      "onTabSelected",
      "options",
   ]);
   const handleClick = (o: T, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onTabSelected(o);
   };
   return (
      <header class={`flex gap-2 ${local.class ?? ""}`} {...others}>
         <For each={local.options}>
            {(option) => (
               <div
                  class={`min-w-16 px-2 py-1 cursor-pointer text-center rounded-t-lg ${
                     option === local.current ? local.activeClass : ""
                  }`}
                  onClick={[handleClick, option]}
               >
                  {local.func(option)}
               </div>
            )}
         </For>
      </header>
   );
};
