import { type JSX, splitProps } from "solid-js";
import type { DivTargeted } from "./targeted.ts";
import "./checkbox.css";

export default (
   props: {
      disabled?: boolean;
      label?: string;
      onChange: (v: boolean) => void;
      value: boolean;
   } & JSX.HTMLAttributes<HTMLDivElement>,
) => {
   const [local, others] = splitProps(props, [
      "class",
      "disabled",
      "label",
      "onChange",
      "value",
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
