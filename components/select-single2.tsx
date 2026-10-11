import { For, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";
import "./checkbox.css";
import { itemClass, spanClass } from "./select-common.ts";

export default <T,>(props: {
   onChange: (v: T) => void;
   options: readonly T[];
   showFunc: (t: T) => string;
   value: T;
}) => {
   const [local, others] = splitProps(props, [
      "class",
      "onChange",
      "options",
      "showFunc",
      "value",
   ]);
   const handleClick = (o: T, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      props.onChange(o);
   };
   return (
      <For each={props.options}>
         {(option) => (
            <div
               class={itemClass(local.class)}
               onClick={[handleClick, option]}
               {...others}
            >
               <span class={spanClass(option === props.value)} />
               <span>{local.showFunc(option)}</span>
            </div>
         )}
      </For>
   );
};
