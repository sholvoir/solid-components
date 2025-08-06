import { createSignal } from "solid-js";
import BButton from '../components/button-base.tsx';
import RButton from '../components/button-ripple.tsx';
import Checkbox from '../components/checkbox.tsx';
import { countryCodes } from "../components/country-code.ts";
import DropDown from '../components/dropdown.tsx';
import InputText from '../components/input-text.tsx';
import InputTextArea from '../components/input-textarea.tsx';
import MSelect from '../components/select-multi.tsx';
import SSelect from '../components/select-single.tsx';
import Tab from '../components/tab.tsx'

export default () => {
    const [enable1, setEnable1] = createSignal(false);
    const [enable2, setEnable2] = createSignal(false);
    const cindex = createSignal(0);
    const [checkbox1, setCheckbox1] = createSignal(false);
    const checkbox2 = createSignal(true);
    const [n, setN] = createSignal('');
    const txt = createSignal('Tfhsak');
    const sslec = createSignal(1);
    const mslec = createSignal([3, 5]);
    const [code, setCode] = createSignal(1);
    const options = [
        { value: '1', label: "a" },
        { value: '2', label: "p" },
        { value: '3', label: "c" },
        { value: '4', label: "d" },
        { value: '5', label: "e" },
        { value: '6', label: "f" },
        { value: '7', label: "g" },
        { value: '8', label: "h" }
    ];
    const [suggestions] = createSignal(['abc', 'abd', 'gwetf', 'fsdfa']);
    const xx = () => console.log("OnChange, n: ", n());
    return <div class="p-2 flex flex-col gap-2 h-dvh">
        <BButton onClick={()=>console.log(setEnable1(e=>!e))}>ButtonAntiShake</BButton>
        <BButton disabled>DisabledButtonAntiShake</BButton>
        <RButton disabled={!enable2()}>ButtonRipple</RButton>
        <RButton disabled>DisabledButtonRipple</RButton>
        <Checkbox binding={[checkbox1, setCheckbox1]} disabled={enable1()}
            label="Enabled Checkbox" onChange={()=>setEnable2(checkbox1())} />
        <Checkbox binding={checkbox2} disabled label="Disabled Checkbox" />
        <InputText binding={[n, setN]} options={suggestions()} onChange={xx} />
        <InputTextArea binding={txt} />
        {code()}
        <DropDown class="border rounded" cindex={[code, setCode]} options={countryCodes.map(o=>o.label)} title="Unied States"/>
        <div class="grow flex flex-col"><Tab cindex={cindex} class="grow bg-[var(--bg-tab)]">
            <div title="Single Select"><SSelect cindex={sslec} options={options.map(o=>o.label)}/></div>
            <fieldset class="border px-2">
                <legend>Multi Select</legend>
                <MSelect indices={mslec} options={options.map(o=>o.label)}/>
            </fieldset>
        </Tab></div>
    </div>;
}