export const disableGlobalContextMenu = function () {
  if (typeof window !== 'undefined') {
    document.body.oncontextmenu = () => false;
  }
};
