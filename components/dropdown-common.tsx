import { type JSX, Show, type Signal, splitProps } from "solid-js";
import ButtonBase from "./button-base";
import "./dropdown.css";
import { usePopup } from "./use-popup";

export default (
   props: {
      current: string;
      open: Signal<boolean>;
      popupClass?: string;
   } & JSX.HTMLAttributes<HTMLButtonElement>,
) => {
   const [local, others] = splitProps(props, [
      "class",
      "current",
      "open",
      "children",
      "popupClass",
   ]);
   const [isOpen, setOpen] = local.open;
   const { els, adjustSide } = usePopup();
   return (
      <ButtonBase
         ref={(el) => (els.container = el)}
         class={`relative px-2 inline-flex gap-2 justify-between items-center ${
            local.class ?? ""
         }`}
         {...others}
         onClick={() => setOpen((x) => !x) && adjustSide()}
      >
         <span>{local.current}</span>
         <span class="icon--mdi icon--mdi--chevron-down text-[150%] align-bottom" />
         <Show when={isOpen()}>
            <div
               ref={(el) => (els.popup = el)}
               class={` max-h-64 z-100 border overflow-y-auto text-left ${
                  local.popupClass ?? ""
               } absolute left-0 w-full bg-(--bg-body)`}
            >
               {local.children}
            </div>
         </Show>
      </ButtonBase>
   );
};
