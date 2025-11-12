export const NumberOnly = (evt: KeyboardEvent): void => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    if (!allowedKeys.includes(evt.key)) {
      evt.preventDefault();
    }
  };