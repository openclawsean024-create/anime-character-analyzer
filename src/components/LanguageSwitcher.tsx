import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-sm font-medium border border-white/20"
      title={t('language')}
    >
      <Globe size={16} />
      <span>{i18n.language === 'zh' ? '中文' : 'EN'}</span>
    </button>
  );
}
