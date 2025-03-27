import React from "react";

export function useConfirmActionDialogState() {
  const [isDialogOpen, setIsDialogOpen] = React.useState({
    ariakit: false,
    internal: false,
  });

  const showDialog = React.useCallback(() => {
    setIsDialogOpen((open) =>
      open.ariakit && open.internal ? open : { ariakit: true, internal: true }
    );
  }, []);

  const hideDialog = React.useCallback(() => {
    setIsDialogOpen((open) =>
      !open.ariakit && !open.internal
        ? open
        : { ariakit: false, internal: false }
    );
  }, []);

  const hideAriakitDialog = React.useCallback(() => {
    setIsDialogOpen((open) =>
      open.ariakit ? { ...open, ariakit: false } : open
    );
  }, []);

  return {
    ariakitDialogOpenState: isDialogOpen.ariakit || isDialogOpen.internal,
    showAriakitDialog: isDialogOpen.ariakit,
    showDialog,
    hideDialog,
    hideAriakitDialog,
    _setIsDialogOpen: setIsDialogOpen,
  };
}
