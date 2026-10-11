import { For, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";
import "./checkbox.css";
import { itemClass, spanClass } from "./select-common.ts";

export default <T,>(
   props: {
      onChange: (vs: Array<T>) => void;
      options: readonly T[];
      showFunc: (t: T) => string;
      values: Array<T>;
   } & JSX.HTMLAttributes<HTMLDivElement>,
) => {
   const [local, others] = splitProps(props, [
      "class",
      "onChange",
      "options",
      "showFunc",
      "values",
   ]);
   const handleClick = (o: T, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.onChange(
         local.values.includes(o)
            ? local.values.filter((v) => v !== o)
            : [...local.values, o],
      );
   };
   return (
      <For each={local.options}>
         {(option) => (
            <div
               class={itemClass(local.class)}
               onClick={[handleClick, option]}
               {...others}
            >
               <span class={spanClass(local.values.includes(option))} />
               <span>{local.showFunc(option)}</span>
            </div>
         )}
      </For>
   );
};
