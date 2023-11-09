import { ResourceKey } from 'i18next';

export default async function loadTranslations() {
  const files = import.meta.glob('./*/*.json');

  const translations = await Promise.all(
    Object.entries(await files).map(async ([file, module]) => {
      const moduleValue = (await module()) as { default: Record<string, ResourceKey> };
      return [
        file.replace(/^\.\//, '').split('/')[0],
        { [file.replace(/^\.\//, '').split('/')[1]]: moduleValue.default },
      ];
    })
  );

  return Object.fromEntries(translations);
}
