import { Index, type JSX, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";

export default (
   props: {
      activeClass: string;
      cindex: number;
      onTabSelected: (i: number) => void;
      options: readonly string[];
   } & JSX.HTMLAttributes<HTMLElement>,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "class",
      "cindex",
      "onTabSelected",
      "options",
   ]);
   const handleClick = (i: number, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onTabSelected(i);
   };
   return (
      <header class={`flex gap-2 ${local.class ?? ""}`} {...others}>
         <Index each={local.options}>
            {(option, i) => (
               <div
                  class={`min-w-16 px-2 py-1 cursor-pointer text-center rounded-t-md ${
                     local.cindex === i ? local.activeClass : ""
                  }`}
                  onClick={[handleClick, i]}
               >
                  {option()}
               </div>
            )}
         </Index>
      </header>
   );
};
