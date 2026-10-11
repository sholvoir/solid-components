import { For, type JSX, splitProps } from "solid-js";
import { headerClass, tabItemClass } from "./tab-common.ts";
import type { DivTargeted } from "./targeted.ts";

export default <T,>(
   props: {
      activeClass: string;
      current: T;
      onTabSelected: (t: T) => void;
      options: readonly T[];
      showFunc: (t: T) => string;
   } & JSX.HTMLAttributes<HTMLElement>,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "class",
      "current",
      "onTabSelected",
      "options",
      "showFunc",
   ]);
   const handleClick = (o: T, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onTabSelected(o);
   };
   return (
      <header class={`${headerClass} ${local.class ?? ""}`} {...others}>
         <For each={local.options}>
            {(option) => (
               <div
                  class={`${tabItemClass} ${option === local.current ? local.activeClass : ""}`}
                  onClick={[handleClick, option]}
               >
                  {local.showFunc(option)}
               </div>
            )}
         </For>
      </header>
   );
};
