import { createSignal } from "solid-js";
import Tab from "../components/tab.tsx";
import Tab2 from "../components/tab2.tsx";

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
   const [index, setIndex] = createSignal(0);
   const [current, setCurrent] = createSignal(options[0]);
   return (
      <div class="p-2 flex flex-col gap-2 h-dvh">
         <div class="border">
            <Tab
               activeClass="bg-(--bg-tab)"
               index={index()}
               onTabSelected={setIndex}
               options={arr}
            />
            <div class="p-2 bg-(--bg-tab)">{index()}</div>
         </div>
         <div class="border">
            <Tab2
               activeClass="bg-(--bg-tab)"
               current={current()}
               showFunc={(t) => t.label ?? ""}
               options={options}
               onTabSelected={setCurrent}
            />
            <div class="p-2 bg-(--bg-tab)">{current()?.value}</div>
         </div>
      </div>
   );
};
