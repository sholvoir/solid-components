import { createSignal } from "solid-js";
import InputNumber from "../components/input-number.tsx";
import InputText from "../components/input-text.tsx";

export default () => {
   const [log, setLog] = createSignal("");
   const appendLog = (m: string) => setLog((l) => (l ? `${l}\n${m}` : m));
   const [num, setNum] = createSignal(3);
   const [text, setText] = createSignal("");
   const suggestions = ["abc", "abd", "gwetf", "fsdfa"];
   return (
      <div>
         <pre>{log()}</pre>
         <span>{num()}</span>
         <InputNumber value={num()} onInput={setNum} />
         <span>{text()}</span>
         <InputText
            value={text()}
            onInput={setText}
            onChange={(m) => appendLog(`OnChange: ${m}`)}
            options={suggestions}
         />
      </div>
   );
};
