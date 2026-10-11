import { createSignal } from "solid-js";
import SSelect from "../components/select-single.tsx";
import SSelect2 from "../components/select-single2.tsx";

export default () => {
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
   const options = [
      { value: "1", label: "a" },
      { value: "2", label: "p" },
      { value: "3", label: "c" },
      { value: "4", label: "d" },
      { value: "5", label: "e" },
      { value: "6", label: "f" },
      { value: "7", label: "g" },
      { value: "8", label: "h" },
   ];
   const [sslec1, setSslec] = createSignal(2);
   const [sslec2, setSslec2] = createSignal(options[0]);
   return (
      <div class="flex">
         <div class="border grow">
            <div>{sslec1()}</div>
            <div>
               <SSelect index={sslec1()} onChange={setSslec} options={arr} />
            </div>
         </div>
         <div class="border grow">
            <div>
               {sslec2().label} - {sslec2().value}
            </div>
            <div>
               <SSelect2
                  value={sslec2()}
                  onChange={setSslec2}
                  options={options}
                  showFunc={(t) => t.label}
               />
            </div>
         </div>
      </div>
   );
};
