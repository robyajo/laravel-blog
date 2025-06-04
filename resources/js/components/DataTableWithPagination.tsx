import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useForm } from '@inertiajs/react';
import { debounce } from 'lodash';

interface Column<T> {
    header: string;
    accessorKey: keyof T;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: (item: T) => React.ReactNode;
    caption?: string;
    pagination: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    filters: {
        search: string;
        per_page: number;
    };
    routeName: string;
    isLoading?: boolean;
}

export function DataTableWithPagination<T>({
    data,
    columns,
    actions,
    caption,
    pagination,
    filters,
    routeName,
    isLoading = false,
}: DataTableProps<T>) {
    const form = useForm();

    const handleSearch = debounce((value: string) => {
        form.get(
            route(routeName, {
                search: value,
                page: 1,
                per_page: filters.per_page,
            }),
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }, 300);

    const handlePerPage = (value: string) => {
        form.get(
            route(routeName, {
                per_page: value,
                search: filters.search,
                page: 1,
            }),
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handlePageChange = (page: number) => {
        form.get(
            route(routeName, {
                page,
                search: filters.search,
                per_page: filters.per_page,
            }),
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                {isLoading ? (
                    <Skeleton className="h-10 w-[300px]" />
                ) : (
                    <Input
                        type="search"
                        placeholder="Search..."
                        defaultValue={filters?.search ?? ''}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-[300px]"
                    />
                )}
            </div>

            <Table>
                {caption && <TableCaption>{caption}</TableCaption>}
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={String(column.accessorKey)} className={column.className}>
                                {isLoading ? <Skeleton className="h-4 w-[100px]" /> : column.header}
                            </TableHead>
                        ))}
                        {actions && <TableHead className="text-center">Action</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading
                        ? Array.from({ length: filters.per_page }).map((_, index) => (
                              <TableRow key={index}>
                                  {columns.map((column) => (
                                      <TableCell key={String(column.accessorKey)}>
                                          <Skeleton className="h-4 w-full" />
                                      </TableCell>
                                  ))}
                                  {actions && (
                                      <TableCell className="space-x-2 text-center">
                                          <Skeleton className="mx-auto h-9 w-[100px]" />
                                      </TableCell>
                                  )}
                              </TableRow>
                          ))
                        : data.map((item, index) => (
                              <TableRow key={index}>
                                  {columns.map((column) => (
                                      <TableCell key={String(column.accessorKey)} className={column.className}>
                                          {String(item[column.accessorKey])}
                                      </TableCell>
                                  ))}
                                  {actions && <TableCell className="space-x-2 text-center">{actions(item)}</TableCell>}
                              </TableRow>
                          ))}
                </TableBody>
            </Table>

            <div className="flex flex-col items-center justify-between gap-4 border-t px-4 py-4 sm:flex-row">
                {isLoading ? (
                    <>
                        <Skeleton className="h-4 w-[250px]" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-[70px]" />
                            <Skeleton className="h-8 w-[300px]" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-muted-foreground text-sm">
                            Showing {Math.min((pagination.current_page - 1) * filters.per_page + 1, pagination.total)}-
                            {Math.min(pagination.current_page * filters.per_page, pagination.total)} from {pagination.total} items
                            {pagination.total > filters.per_page && ` (Page ${pagination.current_page} of ${pagination.last_page})`}
                        </div>

                        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                            <div className="flex items-center gap-2">
                                <Select value={String(filters.per_page)} onValueChange={handlePerPage}>
                                    <SelectTrigger className="h-8 w-[70px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[5, 10, 20, 50].map((size) => (
                                            <SelectItem key={size} value={String(size)}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Pagination className="justify-center sm:justify-end">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (pagination.current_page > 1) handlePageChange(pagination.current_page - 1);
                                            }}
                                            className={pagination.current_page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                        />
                                    </PaginationItem>

                                    {pagination.current_page > 3 && (
                                        <>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(1);
                                                    }}
                                                    isActive={pagination.current_page === 1}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            {pagination.current_page > 4 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                        </>
                                    )}

                                    {Array.from({ length: Math.min(3, pagination.last_page) }, (_, i) => {
                                        let pageNum: number;
                                        if (pagination.current_page <= 2) {
                                            pageNum = i + 1;
                                        } else if (pagination.current_page >= pagination.last_page - 1) {
                                            pageNum = pagination.last_page - 2 + i;
                                        } else {
                                            pageNum = pagination.current_page - 1 + i;
                                        }

                                        if (pageNum < 1 || pageNum > pagination.last_page) {
                                            return null;
                                        }

                                        return (
                                            <PaginationItem key={pageNum}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(pageNum);
                                                    }}
                                                    isActive={pagination.current_page === pageNum}
                                                >
                                                    {pageNum}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    {pagination.current_page < pagination.last_page - 2 && (
                                        <>
                                            {pagination.current_page < pagination.last_page - 3 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(pagination.last_page);
                                                    }}
                                                    isActive={pagination.current_page === pagination.last_page}
                                                >
                                                    {pagination.last_page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (pagination.current_page < pagination.last_page) handlePageChange(pagination.current_page + 1);
                                            }}
                                            className={
                                                pagination.current_page >= pagination.last_page ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
