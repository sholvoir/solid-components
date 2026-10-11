import { createSignal } from "solid-js";
import Checkbox from "../components/checkbox.tsx";

export default () => {
   const [value, setValue] = createSignal(false);
   return (
      <div>
         <Checkbox
            value={value()}
            label="Enabled Checkbox"
            onChange={setValue}
         />
         <Checkbox
            value={value()}
            disabled
            label="Disabled Checkbox"
            onChange={setValue}
         />
      </div>
   );
};
