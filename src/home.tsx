import { createSignal } from "solid-js";
import BButton from "../components/button-base.tsx";
import RButton from "../components/button-ripple.tsx";
import Checkbox from "../components/checkbox.tsx";
import { countryCodes } from "../components/country-code.ts";
import DropDown from "../components/dropdown.tsx";
import DropDown2 from "../components/dropdown2.tsx";
import InputText from "../components/input-text.tsx";
import type { ILabelValue } from "../components/label-value.ts";
import ListFor from "../components/list-for.tsx";
import ListIndex from "../components/list-index.tsx";
import MSelect from "../components/select-multi.tsx";
import MSelect2 from "../components/select-multi2.tsx";
import SSelect from "../components/select-single.tsx";
import SSelect2 from "../components/select-single2.tsx";
import Tab1 from "../components/tab-for.tsx";
import Tab2 from "../components/tab-index.tsx";

export default () => {
   const [enable1, setEnable1] = createSignal(false);
   const [enable2, setEnable2] = createSignal(false);
   const [cindex1, setCIndex1] = createSignal(0);
   const [current, setCurrent] = createSignal<ILabelValue>();
   const [checkbox1, setCheckbox1] = createSignal(false);
   const [text, setText] = createSignal("");
   const [sslec, setSslec] = createSignal("c");
   const [code, setCode] = createSignal({
      value: "86",
      label: "+86 (CN) China",
   });
   const [num, setNum] = createSignal(3);
   const arr = ["a", "p", "c", "d", "e", "g", "f", "h"];

   const [suggestions] = createSignal(["abc", "abd", "gwetf", "fsdfa"]);
   const xx = () => console.log("OnChange, text: ", text());
   const [sslec2, setSslec2] = createSignal("5");
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
   const [mslec1, setMslec1] = createSignal(["a", "p"]);
   const [mslec2, setMslec2] = createSignal(["1", "5"]);
   const [clist1, setClist1] = createSignal<ILabelValue>();
   const [clist2, setClist2] = createSignal(0);
   return (
      <div class="p-2 flex flex-col gap-2 h-dvh">
         <BButton onClick={() => setEnable1((e) => !e)}>
            ButtonAntiShake
         </BButton>
         <BButton disabled>DisabledButtonAntiShake</BButton>
         <RButton disabled={!enable2()}>ButtonRipple</RButton>
         <RButton disabled>DisabledButtonRipple</RButton>
         <Checkbox
            value={checkbox1()}
            disabled={enable1()}
            label="Enabled Checkbox"
            onChange={(v) => setEnable2(setCheckbox1(v))}
         />
         <Checkbox
            value={checkbox1()}
            disabled
            label="Disabled Checkbox"
            onChange={(v) => setCheckbox1(v)}
         />
         <InputText
            value={text()}
            options={suggestions()}
            onInput={setText}
            onChange={xx}
         />
         {num()}
         <DropDown
            class="border rounded"
            value={num()}
            onChange={(n) => setNum(+n)}
            options={["1", "3", "9", "6"]}
         />
         {`${code().value} -- ${code().label}`}
         <DropDown2
            class="border rounded"
            value={code()}
            onChange={setCode}
            options={countryCodes}
            title="Unied States"
         />
         <div>
            clist1: {clist1()?.label} - {clist1()?.value}
         </div>
         <div class="border px-2">
            <ListFor
               activeClass="bg-(--bg-tab)"
               options={options}
               func={(t) => t.label}
               value={clist1()}
               onItemSelect={setClist1}
            />
         </div>
         <div>clist2: {clist2()}</div>
         <div class="border px-2">
            <ListIndex
               activeClass="bg-(--bg-tab)"
               cindex={clist2()}
               onItemSelect={setClist2}
               options={arr}
            />
         </div>
         <div>{sslec()}</div>
         <div>
            <SSelect value={sslec()} onChange={setSslec} options={arr} />
         </div>
         <div>{sslec2()}</div>
         <div>
            <SSelect2 value={sslec2()} onChange={setSslec2} options={options} />
         </div>
         <fieldset class="border px-2 flex gap-2">
            <legend>Multi Select</legend>
            <div>
               <div>{mslec1().join(",")}</div>
               <MSelect values={mslec1()} onChange={setMslec1} options={arr} />
            </div>
            <div>
               <div>{mslec2().join(",")}</div>
               <MSelect2
                  values={mslec2()}
                  onChange={setMslec2}
                  options={options}
               />
            </div>
         </fieldset>
         <div class="border">
            <Tab1
               activeClass="bg-(--bg-tab)"
               current={current()}
               func={(t) => t.label ?? ""}
               onTabSelected={setCurrent}
               options={options}
            />
            <div class="p-2 bg-(--bg-tab)">{current()?.value}</div>
         </div>
         <div class="border">
            <Tab2
               activeClass="bg-(--bg-tab)"
               cindex={cindex1()}
               onTabSelected={setCIndex1}
               options={arr}
            />
            <div class="p-2 bg-(--bg-tab)">{cindex1()}</div>
         </div>
      </div>
   );
};
