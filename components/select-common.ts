export const itemClass = (c?: string) =>
   `flex gap-1 cursor-pointer items-center ${c ?? ""}`;
export const spanClass = (c: boolean) =>
   `align-bottom icon--material-symbols ${
      c
         ? "icon--material-symbols--check-box-outline"
         : "icon--material-symbols--check-box-outline-blank"
   }`;
