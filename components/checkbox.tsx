import { type JSX, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";
import "./checkbox.css";

export default (
   props: {
      value: boolean;
      onChange: (v: boolean) => void;
      label?: string;
      disabled?: boolean;
   } & JSX.HTMLAttributes<HTMLDivElement>,
) => {
   const [local, others] = splitProps(props, [
      "class",
      "value",
      "label",
      "disabled",
      "onChange",
   ]);
   const handleClick = (e: MouseEvent & DivTargeted) => {
      e.stopPropagation();
      local.disabled || local.onChange(!local.value);
   };
   return (
      <div
         class={`${local.disabled ? "opacity-50" : ""} ${local.class ?? ""}`}
         {...others}
         aria-disabled={local.disabled}
         onClick={handleClick}
      >
         <span
            class={`text-[150%] align-bottom icon--material-symbols ${
               local.value
                  ? "icon--material-symbols--check-box-outline"
                  : "icon--material-symbols--check-box-outline-blank"
            }`}
         />
         {local.label}
      </div>
   );
};
