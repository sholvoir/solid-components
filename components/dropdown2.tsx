import { createSignal, For, type JSX, splitProps } from "solid-js";
import DropdownCommon from "./dropdown-common.tsx";
import type { DivTargeted } from "./targeted.ts";

export default <T,>(
   props: {
      activeClass?: string;
      onSelect: (item: T) => void;
      options: readonly T[];
      popupClass?: string;
      showFunc?: (t: T) => string;
      value: T;
   } & Omit<JSX.HTMLAttributes<HTMLButtonElement>, "onSelect">,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "onChange",
      "options",
      "showFunc",
      "value",
   ]);
   const [isOpen, setOpen] = createSignal(false);
   const handleItemClick = (item: T, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onSelect(item);
      setOpen(false);
   };
   return (
      <DropdownCommon
         current={local.showFunc?.(local.value)}
         open={[isOpen, setOpen]}
         {...others}
      >
         <For each={local.options}>
            {(option) => (
               <div
                  onClick={[handleItemClick, option]}
                  class={`px-2 ${option === local.value ? local.activeClass : ""}`}
               >
                  {option.label ?? option.value}
               </div>
            )}
         </For>
      </DropdownCommon>
   );
};
