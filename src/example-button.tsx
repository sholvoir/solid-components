import { createSignal } from "solid-js";
import BButton from "../components/button-base.tsx";
import RButton from "../components/button-ripple.tsx";

export default () => {
   const [enable1, setEnable1] = createSignal(false);
   const [enable2, setEnable2] = createSignal(false);
   const [log, setLog] = createSignal("");
   const appendLog = (m: string) => setLog((l) => (l ? `${l}\n${m}` : m));
   const handleClick1 = () => {
      setEnable1((e) => !e);
      appendLog("Button1 Clicked");
   };
   const handleClick2 = () => {
      appendLog("Button2 Clicked");
   };
   const handleClick3 = () => {
      setEnable2((e) => !e);
      appendLog("Button3 Clicked");
   };
   const handleClick4 = () => {
      appendLog("Button4 Clicked");
   };
   const btclass = "px-2 bg-(--bg-tab) border rounded-lg";
   return (
      <div>
         <pre>{log()}</pre>
         <div>
            <BButton class={btclass} onClick={handleClick1}>
               ButtonAntiShake1
            </BButton>
            <BButton
               class={btclass}
               disabled={!enable1()}
               onClick={handleClick2}
            >
               ButtonAntiShake2
            </BButton>
         </div>
         <div>
            <RButton class={btclass} onClick={handleClick3}>
               ButtonRipple3
            </RButton>
            <RButton
               class={btclass}
               disabled={!enable2()}
               onClick={handleClick4}
            >
               ButtonRipple4
            </RButton>
         </div>
      </div>
   );
};
