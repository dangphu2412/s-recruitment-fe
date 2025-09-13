import { useIntl } from 'react-intl';

export function useTranslate() {
  const { formatMessage } = useIntl();

  return {
    formatMessage
  };
}

export type Lang = {
  code: string;
  label: string;
};

export const LanguageMap = {
  EN: 'en',
  VI: 'vi'
} as const;

export const LANGS: Array<Lang> = [
  {
    code: LanguageMap.EN,
    label: 'English'
  },
  {
    code: LanguageMap.VI,
    label: 'Việt Nam'
  }
];
