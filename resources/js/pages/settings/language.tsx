import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import LanguageToggleTab from '@/components/language-tabs';
import LanguageController from '@/actions/App/Http/Controllers/Settings/LanguageController'

export default function Appearance() {

    const { t } = useLaravelReactI18n();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Language settings'),
            href: LanguageController.edit().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t("Language settings")} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t("Language settings")} description={t("Update your account's language settings")} />
                    <LanguageToggleTab/>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
