import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTableDataProps, DataTableFiltersProps } from '@/types';
import { router } from '@inertiajs/react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import debounce from 'lodash.debounce';
import { ArrowDown, ArrowUp, ArrowUpDown, Check, X } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';

export interface DataTableProps<T> {
    listUrl: string;
    items: DataTableDataProps<T>;
    filters: DataTableFiltersProps;
    columns: {
        key: keyof T | string;
        label: string;
        sortable?: boolean;
        render?: (item: T) => React.ReactNode;
    }[];
    perPageOptions?: number[];
    debounceLength?: number;
}

export default function DataTable<T>({ listUrl, items, filters, columns, perPageOptions = [10, 25, 50], debounceLength = 300 }: DataTableProps<T>) {
    const { t } = useLaravelReactI18n();
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (value: string) => {
        router.get(
            listUrl,
            {
                ...filters,
                search: value,
                page: items.current_page ?? 1,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const debouncedSearch = useMemo(() => debounce(handleSearch, debounceLength), [filters, listUrl]);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        debouncedSearch(search);
        return () => debouncedSearch.cancel();
    }, [search]);

    const toggleSort = (field: string) => {
        const isSameField = filters.sort === field;
        const newDirection = isSameField && filters.direction === 'asc' ? 'desc' : 'asc';

        router.get(
            listUrl,
            {
                ...filters,
                sort: field,
                direction: newDirection,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handlePageChange = (page: number) => {
        router.get(
            listUrl,
            {
                ...filters,
                page,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handlePerPageChange = (value: number) => {
        router.get(
            listUrl,
            {
                ...filters,
                per_page: value,
                page: 1,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const clearFilters = () => {
        setSearch('');
        router.get(
            listUrl,
            {
                per_page: perPageOptions[0],
                page: 1,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const currentPage = items.current_page;
    const lastPage = items.last_page;

    const getPaginationRange = (current: number, total: number, delta: number = 2): (number | string)[] => {
        const range: (number | string)[] = [];
        const left = Math.max(1, current - delta);
        const right = Math.min(total, current + delta);

        if (left > 1) {
            range.push(1);
            if (left > 2) range.push('...');
        }

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < total) {
            if (right < total - 1) range.push('...');
            range.push(total);
        }

        return range;
    };

    const pageRange = getPaginationRange(currentPage, lastPage);

    const goToPage = (page: number) => {
        router.get(
            listUrl,
            {
                ...filters,
                page,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        setSearch(filters.search || '');
    }, [filters.search]);

    const hasActiveFilters = !!filters.search || !!filters.sort || !!filters.direction;

    return (
        <div className='flex w-full flex-col gap-4'>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <Input placeholder={t('Search...')} value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />

                <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                            <X className="ml-2 h-4 w-4" />
                            {t('Clear filters')}
                        </Button>
                    )}
                </div>
            </div>

            <div className="w-full flex items-center gap-2">
                <div className="w-full overflow-x-auto">
                    <Table className="min-w-max table-auto">
                        <TableHeader>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableHead key={String(column.key)} className="px-2">
                                        {column.sortable ? (
                                            <Button variant="link" onClick={() => toggleSort(String(column.key))} className="!p-0">
                                                {t(column.label)}
                                                {filters.sort === column.key ? (
                                                    filters.direction === 'asc' ? (
                                                        <ArrowUp className="ml-2 h-4 w-4" />
                                                    ) : (
                                                        <ArrowDown className="ml-2 h-4 w-4" />
                                                    )
                                                ) : (
                                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                                )}
                                            </Button>
                                        ) : (
                                            <Button variant="link" className="!p-0">
                                                {t(column.label)}
                                            </Button>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.data.length ? (
                                items.data.map((item: T, idx) => (
                                    <TableRow key={idx}>
                                        {columns.map((column) => (
                                            <TableCell key={String(column.key)}>
                                                {column.render ? column.render(item) : (item[column.key as keyof T] as React.ReactNode)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        {t('No results.')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    aria-disabled={currentPage === 1}
                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) goToPage(currentPage - 1);
                                    }}
                                />
                            </PaginationItem>

                            {pageRange.map((page, index) => (
                                <PaginationItem key={index}>
                                    {typeof page === 'number' ? (
                                        <PaginationLink
                                            href="#"
                                            isActive={page === currentPage}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                goToPage(page);
                                            }}
                                        >
                                            {page}
                                        </PaginationLink>
                                    ) : (
                                        <PaginationEllipsis />
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    aria-disabled={currentPage === lastPage}
                                    className={currentPage === lastPage ? 'pointer-events-none opacity-50' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < lastPage) goToPage(currentPage + 1);
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <span className="text-muted-foreground text-sm">{t('Rows per page')}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="text-sm">
                                    {filters.per_page || perPageOptions[0]}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {perPageOptions.map((option, index) => {
                                    const isSelected = String(filters.per_page) === String(option);
                                    const isLast = index === perPageOptions.length - 1;

                                    return (
                                        <DropdownMenuItem
                                            key={option}
                                            onSelect={() => handlePerPageChange(option)}
                                            className={`cursor-pointer px-3 py-2 text-end text-sm ${isSelected ? 'text-primary font-semibold' : ''} ${!isLast ? 'border-border border-b' : ''} hover:bg-muted transition-colors`}
                                        >
                                            {isSelected && <Check className="mr-2 inline-block h-4 w-4" />}
                                            {option}
                                        </DropdownMenuItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <span>
                            {t('Page')}: {items.current_page}
                        </span>
                        <span> | </span>
                        <span>
                            {t('Results')}: {items.total}{' '}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
