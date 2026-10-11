import { Index, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";
import "./checkbox.css";
import { itemClass, spanClass } from "./select-common.ts";

export default (
   props: {
      index: number;
      onChange: (i: number) => void;
      options: readonly string[];
   } & JSX.HTMLAttributes<HTMLDivElement>,
) => {
   const [local, others] = splitProps(props, [
      "index",
      "class",
      "onChange",
      "options",
   ]);
   const handleClick = (i: number, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onChange(i);
   };
   return (
      <Index each={local.options}>
         {(option, i) => (
            <div
               class={itemClass(local.class)}
               onClick={[handleClick, i]}
               {...others}
            >
               <span class={spanClass(i === local.index)} />
               <span>{option()}</span>
            </div>
         )}
      </Index>
   );
};
