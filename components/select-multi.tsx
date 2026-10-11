import { Index, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";
import "./checkbox.css";
import { itemClass, spanClass } from "./select-common.ts";

export default (
   props: {
      indexes: Array<number>;
      onChange: (is: Array<number>) => void;
      options: readonly string[];
   } & JSX.HTMLAttributes<HTMLDivElement>,
) => {
   const [local, others] = splitProps(props, [
      "class",
      "indexes",
      "onChange",
      "options",
   ]);
   const handleClick = (i: number, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onChange(
         local.indexes.includes(i)
            ? local.indexes.filter((v) => v !== i)
            : [...local.indexes, i],
      );
   };
   return (
      <Index each={local.options}>
         {(option, i) => (
            <div
               class={itemClass(local.class)}
               onClick={[handleClick, i]}
               {...others}
            >
               <span class={spanClass(local.indexes.includes(i))} />
               <span>{option()}</span>
            </div>
         )}
      </Index>
   );
};
