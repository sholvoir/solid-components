import { createSignal, Index, type JSX, splitProps } from "solid-js";
import DropdownCommon from "./dropdown-common.tsx";
import type { DivTargeted } from "./targeted.ts";

export default (
   props: {
      activeClass?: string;
      index: number;
      onSelect: (i: number) => void;
      options: readonly string[];
      popupClass?: string;
   } & Omit<JSX.HTMLAttributes<HTMLButtonElement>, "onSelect">,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "index",
      "onChange",
      "options",
   ]);
   const [isOpen, setOpen] = createSignal(false);
   const handleItemClick = (i: number, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onSelect(i);
      setOpen(false);
   };
   return (
      <DropdownCommon
         current={local.options[local.index]}
         open={[isOpen, setOpen]}
         {...others}
      >
         <Index each={local.options}>
            {(option, i) => (
               <div
                  onClick={[handleItemClick, i]}
                  class={`px-2 ${i === local.index ? local.activeClass : ""}`}
               >
                  {option()}
               </div>
            )}
         </Index>
      </DropdownCommon>
   );
};
