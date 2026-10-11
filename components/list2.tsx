import { For, type JSX, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";

export default <T,>(
   props: {
      activeClass?: string;
      onItemSelect?: (item: T) => void;
      options: readonly T[];
      showFunc: (t: T) => string;
      value: T;
   } & JSX.HTMLAttributes<HTMLDivElement>,
) => {
   const [local, others] = splitProps(props, [
      "activeClass",
      "class",
      "onItemSelect",
      "options",
      "showFunc",
      "value",
   ]);
   const handleClick = (item: T, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onItemSelect(item);
   };
   return (
      <For each={local.options}>
         {(option) => (
            <div
               onClick={[handleClick, option]}
               class={`${local.class ?? ""} ${local.value === option ? local.activeClass : ""}`}
               {...others}
            >
               {local.showFunc(option)}
            </div>
         )}
      </For>
   );
};
