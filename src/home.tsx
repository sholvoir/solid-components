import { createSignal, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { ButtonTargeted } from "../components/targeted";
import ExampleButton from "./example-button";
import ExampleCheckbox from "./example-checkbox";
import ExampleDropdown from "./example-dropdown";
import ExampleInput from "./example-input";
import ExampleList from "./example-list";
import ExampleSelectMulti from "./example-select-multi";
import ExampleSelectSingle from "./example-select-single";
import ExampleTab from "./example-tab";

const DIALOGS = [
   "#example-button",
   "#example-checkbox",
   "#example-dropdown",
   "#example-input",
   "#example-list",
   "#example-select-multi",
   "#example-select-single",
   "#example-tab",
] as const;
type TDialog = (typeof DIALOGS)[number];

export default () => {
   const menuClass = "px-2 border rounded-lg bg-(--bg-tab)";
   const [page, setPage] = createSignal<TDialog>("#example-tab");
   const dialogs: Record<TDialog, () => JSX.Element> = {
      "#example-button": () => <ExampleButton />,
      "#example-checkbox": () => <ExampleCheckbox />,
      "#example-dropdown": () => <ExampleDropdown />,
      "#example-input": () => <ExampleInput />,
      "#example-list": () => <ExampleList />,
      "#example-select-multi": () => <ExampleSelectMulti />,
      "#example-select-single": () => <ExampleSelectSingle />,
      "#example-tab": () => <ExampleTab />,
   };
   const handleClick = (e: MouseEvent & ButtonTargeted) => {
      setPage(e.currentTarget.name);
   };
   return (
      <>
         <div class="flex gap-1 flex-wrap">
            <button
               type="button"
               class={menuClass}
               name="#example-button"
               onclick={handleClick}
            >
               example-button
            </button>
            <button
               type="button"
               class={menuClass}
               name="#example-checkbox"
               onclick={handleClick}
            >
               example-checkbox
            </button>
            <button
               type="button"
               class={menuClass}
               name="#example-dropdown"
               onclick={handleClick}
            >
               example-dropdown
            </button>
            <button
               type="button"
               class={menuClass}
               name="#example-input"
               onclick={handleClick}
            >
               example-input
            </button>
            <button
               type="button"
               class={menuClass}
               name="#example-list"
               onclick={handleClick}
            >
               example-list
            </button>
            <button
               type="button"
               class={menuClass}
               name="#example-select-multi"
               onclick={handleClick}
            >
               example-select-multi
            </button>
            <button
               type="button"
               class={menuClass}
               name="#example-select-single"
               onclick={handleClick}
            >
               example-select-multi
            </button>
            <button
               type="button"
               class={menuClass}
               name="#example-tab"
               onclick={handleClick}
            >
               example-tab
            </button>
         </div>
         <Dynamic component={dialogs[page()]}></Dynamic>
      </>
   );
};
