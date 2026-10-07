import { createSignal, For, type JSX, Show, splitProps } from "solid-js";
import ButtonBase from "./button-base.tsx";
import type { DivTargeted } from "./targeted.ts";
import "./dropdown.css";
import type { ILabelValue } from "./label-value.ts";

export default (
   props: {
      value: ILabelValue;
      options: Array<ILabelValue>;
      onChange: (o: ILabelValue) => void;
      activeClass?: string;
   } & JSX.HTMLAttributes<HTMLButtonElement>,
) => {
   const [local, others] = splitProps(props, [
      "value",
      "label",
      "cindex",
      "options",
      "onChange",
      "activeClass",
      "class",
   ]);
   const [isOpen, setOpen] = createSignal(false);
   const handleItemClick = (
      option: ILabelValue,
      e: MouseEvent & DivTargeted,
   ) => {
      e.stopPropagation();
      local.onChange(option);
      setOpen(false);
   };
   return (
      <ButtonBase
         class={`relative px-2 flex gap-2 justify-between items-center ${
            local.class ?? ""
         }`}
         {...others}
         onClick={() => setOpen((x) => !x)}
      >
         <span>{local.value.label ?? local.value.value}</span>
         <span class="icon--mdi icon--mdi--chevron-down text-[150%] align-bottom" />
         <Show when={isOpen()}>
            <div
               class="absolute top-[calc(100%+4px)] max-h-64 z-100 bg-(--bg-body)
                inset-x-0 border overflow-y-auto text-left"
            >
               <For each={local.options}>
                  {(option) => (
                     <div
                        onClick={[handleItemClick, option]}
                        class={`px-2 ${option.value === local.value.value ? local.activeClass : ""}`}
                     >
                        {option.label ?? option.value}
                     </div>
                  )}
               </For>
            </div>
         </Show>
      </ButtonBase>
   );
};
