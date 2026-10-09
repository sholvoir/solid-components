import {
   type Accessor,
   createSignal,
   Index,
   type JSX,
   Show,
   splitProps,
} from "solid-js";
import ButtonBase from "./button-base.tsx";
import type { DivTargeted } from "./targeted.ts";
import "./dropdown.css";
import { usePopup } from "./use-popup.ts";

export default (
   props: {
      activeClass?: string;
      onChange: (v: string) => void;
      options: readonly string[];
      value: string;
   } & JSX.HTMLAttributes<HTMLButtonElement>,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "class",
      "onChange",
      "options",
      "value",
   ]);
   const { els, adjustSide } = usePopup();
   const [isOpen, setOpen] = createSignal(false);
   const handleButtonClick = () => {
      if (setOpen((x) => !x)) adjustSide();
   };
   const handleItemClick = (
      v: Accessor<string>,
      e: MouseEvent & DivTargeted,
   ) => {
      e.stopPropagation();
      setOpen(false);
      local.onChange(v());
   };
   return (
      <ButtonBase
         ref={(el) => (els.container = el)}
         class={`relative px-2 flex gap-2 justify-between items-center ${
            local.class ?? ""
         }`}
         {...others}
         onClick={handleButtonClick}
      >
         <span>{local.value}</span>
         <span class="icon--mdi icon--mdi--chevron-down text-[150%] align-bottom" />
         <Show when={isOpen()}>
            <div
               ref={(el) => (els.popup = el)}
               class="absolute max-h-64 z-100 bg-(--bg-body) inset-x-0 border overflow-y-auto text-left"
            >
               <Index each={local.options}>
                  {(option) => (
                     <div
                        onClick={[handleItemClick, option]}
                        class={`px-2 ${option === local.value ? local.activeClass : ""}`}
                     >
                        {option}
                     </div>
                  )}
               </Index>
            </div>
         </Show>
      </ButtonBase>
   );
};
