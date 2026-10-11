import { createSignal } from "solid-js";
import MSelect from "../components/select-multi.tsx";
import MSelect2 from "../components/select-multi2.tsx";

export default () => {
   const [mslec1, setMslec1] = createSignal([1, 3]);
   const [mslec2, setMslec2] = createSignal([]);
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
   return (
      <div class="flex">
         <div class="border grow">
            <div>{mslec1().join(",")}</div>
            <MSelect indexes={mslec1()} onChange={setMslec1} options={arr} />
         </div>
         <div class="border grow">
            <pre>
               {mslec2()
                  .map((t) => `${t.value} - ${t.label}`)
                  .join("\n")}
            </pre>
            <MSelect2
               values={mslec2()}
               onChange={setMslec2}
               options={options}
               showFunc={(t) => t.label}
            />
         </div>
      </div>
   );
};
