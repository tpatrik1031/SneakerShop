import UserController from '@/actions/App/Http/Controllers/UserController';
import DataTable from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataTableDataProps, DataTableFiltersProps, User } from '@/types';
import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface UserListProps {
    users: DataTableDataProps<User>;
    filters: DataTableFiltersProps;
}

export default function UserList({ users, filters }: UserListProps) {
    const { t } = useLaravelReactI18n();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('User list'),
            href: UserController.index().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Users')} />
            <div className="h-full flex-1 flex-col gap-4 p-6">
                <DataTable
                    listUrl={UserController.index().url}
                    items={users}
                    filters={filters}
                    columns={[
                        { key: 'name', label: 'Name', sortable: true },
                        { key: 'email', label: 'Email', sortable: true },
                        {
                            key: 'email_verified_at',
                            label: 'Email verified at',
                            render: (item: User) =>
                                item.email_verified_at ? new Date(item.email_verified_at).toLocaleDateString() : t('Email not verified'),
                            sortable: true,
                        },
                        {
                            key: 'created_at',
                            label: 'Created at',
                            render: (item: User) => new Date(item.created_at).toLocaleDateString(),
                            sortable: true,
                        },
                        {
                            key: 'updated_at',
                            label: 'Updated at',
                            render: (item: User) => new Date(item.updated_at).toLocaleDateString(),
                            sortable: true,
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
