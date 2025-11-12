import { cn } from '@/lib/utils';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { HTMLAttributes } from 'react';

export default function LanguageToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { t, currentLocale, setLocale } = useLaravelReactI18n();

    const tabs: { value: 'hu' | 'en'; label: string }[] = [
        { value: 'hu', label: t('Hungarian') },
        { value: 'en', label: t('English') }
    ];

    const changeLocale = (value: 'hu' | 'en') => {
        localStorage.setItem('lang', value);
        setLocale(value);
    };

    return (
        <div
            className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => changeLocale(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        currentLocale() === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60'
                    )}
                >
                    <span className="text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
