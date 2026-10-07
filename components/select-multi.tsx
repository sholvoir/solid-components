import { For } from "solid-js";
import type { DivTargeted } from "./targeted.ts";
import "./checkbox.css";

export default (props: {
   values: Array<string>;
   onChange: (vs: Set<string>) => void;
   options: Iterable<string>;
}) => {
   const handleClick = (o: string, e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      props.onChange(
         props.values.includes(o)
            ? props.values.filter((v) => v !== o)
            : [...props.values, o],
      );
   };
   return (
      <For each={props.options}>
         {(option) => (
            <div
               class="flex gap-1 cursor-pointer items-center"
               onClick={[handleClick, option]}
            >
               <span
                  class={`align-bottom icon--material-symbols ${
                     props.values.includes(option)
                        ? "icon--material-symbols--check-box-outline"
                        : "icon--material-symbols--check-box-outline-blank"
                  }`}
               />
               <span>{option}</span>
            </div>
         )}
      </For>
   );
};
