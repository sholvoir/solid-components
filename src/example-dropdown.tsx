import { createSignal } from "solid-js";
import { countryCodes } from "../components/country-code.ts";
import DropDown from "../components/dropdown.tsx";
import DropDown2 from "../components/dropdown2.tsx";

export default () => {
   const [code, setCode] = createSignal({
      value: "86",
      label: "+86 (CN) China",
   });
   const [index, setIndex] = createSignal(0);
   const arr = [
      "aaa",
      "pppp",
      "cdsf",
      "dsdf",
      "efdf",
      "gfga",
      "fafsd",
      "hsdfas",
   ];
   return (
      <div>
         <span>index: {index()}</span>
         <DropDown
            activeClass="bg-(--bg-tab)"
            class="border rounded w-48"
            index={index()}
            onSelect={setIndex}
            options={arr}
         />
         <span>
            {code().value} -- {code().label}
         </span>
         <DropDown2
            activeClass="bg-(--bg-tab)"
            class="border rounded w-96"
            onSelect={setCode}
            options={countryCodes}
            showFunc={(c) => c.label}
            value={code()}
         />
      </div>
   );
};
