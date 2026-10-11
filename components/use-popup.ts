const sty = "calc(100% + 4px)";
export const usePopup = () => {
   const els: {
      container?: HTMLElement;
      popup?: HTMLElement;
   } = {};
   const adjustSide = () => {
      if (els.popup) {
         const crect = els.container.getBoundingClientRect();
         const prect = els.popup.getBoundingClientRect();
         const shouldDown =
            crect.bottom + prect.height + 4 < window.innerHeight;
         els.popup.style.top = shouldDown ? sty : undefined;
         els.popup.style.bottom = shouldDown ? undefined : sty;
      }
   };
   return { els, adjustSide };
};
