import { Index, type JSX, splitProps } from "solid-js";
import { headerClass, tabItemClass } from "./tab-common.ts";
import type { DivTargeted } from "./targeted.ts";

export default (
   props: {
      activeClass: string;
      index: number;
      onTabSelected: (i: number) => void;
      options: readonly string[];
   } & JSX.HTMLAttributes<HTMLElement>,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "class",
      "index",
      "onTabSelected",
      "options",
   ]);
   const handleClick = (i: number, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onTabSelected(i);
   };
   return (
      <header class={`${headerClass} ${local.class ?? ""}`} {...others}>
         <Index each={local.options}>
            {(option, i) => (
               <div
                  class={`${tabItemClass} ${local.index === i ? local.activeClass : ""}`}
                  onClick={[handleClick, i]}
               >
                  {option()}
               </div>
            )}
         </Index>
      </header>
   );
};
