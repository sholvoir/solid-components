import { createSignal, type JSX, splitProps } from "solid-js";
import type { InputTargeted } from "./targeted.ts";

export default (
   props: {
      value: number;
      onInput: (n: number) => void;
      invalidClass?: string;
   } & JSX.InputHTMLAttributes<HTMLInputElement>,
) => {
   const [local, others] = splitProps(props, ["class"]);
   const [invalid, setInvalid] = createSignal(false);
   const handleInput = (e: InputEvent & InputTargeted) => {
      const num = +e.currentTarget.value;
      if (!setInvalid(Number.isNaN(num))) props.onInput(num);
   };
   return (
      <input
         class={`${
            invalid() ? (props.invalidClass ?? "text-red-500") : ""
         } ${local.class ?? ""}`}
         {...others}
         value={props.value}
         onInput={handleInput}
      />
   );
};
