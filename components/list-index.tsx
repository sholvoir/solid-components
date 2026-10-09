import { Index, type JSX, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";

export default (
   props: {
      activeClass?: string;
      cindex: number;
      onItemSelect: (i: number) => void;
      options: readonly string[];
   } & JSX.HTMLAttributes<HTMLDivElement>,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "cindex",
      "class",
      "onItemSelect",
      "options",
   ]);
   const handleClick = (i: number, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onItemSelect(i);
   };
   return (
      <Index each={local.options}>
         {(option, i) => (
            <div
               onClick={[handleClick, i]}
               class={`${local.class ?? ""} ${local.cindex === i ? local.activeClass : ""}`}
               {...others}
            >
               {option()}
            </div>
         )}
      </Index>
   );
};
