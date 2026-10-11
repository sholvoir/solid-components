import { createSignal } from "solid-js";
import List from "../components/list.tsx";
import List2 from "../components/list2.tsx";

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
   const [list1, setList1] = createSignal(0);
   const [list2, setList2] = createSignal(options[0]);
   return (
      <div class="flex">
         <div class="grow">
            <div>
               list1: {list1()} - {arr[list1()]}
            </div>
            <div class="border px-2">
               <List
                  activeClass="bg-(--bg-tab)"
                  index={list1()}
                  onItemSelect={setList1}
                  options={arr}
               />
            </div>
         </div>
         <div class="grow">
            <div>
               list2: {list2()?.label} - {list2()?.value}
            </div>
            <div class="border px-2">
               <List2
                  activeClass="bg-(--bg-tab)"
                  onItemSelect={setList2}
                  options={options}
                  showFunc={(t) => t.label}
                  value={list2()}
               />
            </div>
         </div>
      </div>
   );
};
