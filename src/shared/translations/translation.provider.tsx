import { PropsWithChildren, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import { LanguageMap } from './translation';

export function TranslationProvider({ children }: Readonly<PropsWithChildren>) {
  const { locale = LanguageMap.VI } = useRouter();
  const [messages, setMessages] = useState<Record<string, string> | undefined>(
    undefined
  );

  useEffect(() => {
    import(`../../locales/${locale}.json`).then(mod => {
      setMessages(mod.default);
    });
  }, [locale]);

  return (
    // @ts-ignore
    <IntlProvider locale={locale} messages={messages}>
      {children as any}
    </IntlProvider>
  );
}
