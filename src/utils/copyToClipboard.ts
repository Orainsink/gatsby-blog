export const copyToClipboard = async (code: string) => {
  if (typeof code !== 'string') return;
  await navigator.clipboard.writeText(code);
};
