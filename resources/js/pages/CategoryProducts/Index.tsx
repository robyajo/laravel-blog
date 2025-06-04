import { DataTableWithPagination } from '@/components/DataTableWithPagination';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import { Megaphone } from 'lucide-react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category Products',
        href: '/category-products',
    },
];
interface CategoryProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    category_id: number;
    user_id: number;
    slug: string;
    is_active: boolean;
}

interface PageProps {
    categoryProducts: {
        data: CategoryProduct[];
        current_page: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        total: number;
        per_page: number;
    };
    filters: {
        search: string;
        per_page: number;
    };
    flash: {
        message?: string;
    };
}
export default function Index() {
    const [open, setOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<CategoryProduct | null>(null);
    const { categoryProducts, flash, filters } = usePage().props as unknown as PageProps;
    const form = useForm();
    const processing = form.processing;

    // Add search handler with debounce
    const handleSearch = debounce((value: string) => {
        form.get(
            route('cat_products.index', {
                search: value,
                page: 1, // Reset to first page when searching
            }),
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }, 300);

    const handleDelete = (product: CategoryProduct) => {
        setProductToDelete(product);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            form.delete(route('cat_products.destroy', productToDelete.id));
            setOpen(false);
            setProductToDelete(null);
        }
    };

    const handlePerPage = (value: string) => {
        form.get(
            route('cat_products.index', {
                per_page: value,
                search: filters?.search,
                page: 1,
            }),
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const columns: { header: string; accessorKey: keyof CategoryProduct; className?: string }[] = [
        { header: 'ID', accessorKey: 'id', className: 'w-[100px] font-medium' },
        { header: 'Name', accessorKey: 'name' },
        { header: 'Price', accessorKey: 'price' },
        { header: 'Description', accessorKey: 'description' },
    ];

    const renderActions = (item: CategoryProduct) => (
        <>
            <Link href={route('cat_products.edit', item.id)}>
                <Button className="bg-slate-600 hover:bg-slate-700">Edit</Button>
            </Link>
            <Button disabled={processing} onClick={() => handleDelete(item)} className="bg-red-500 hover:bg-red-700">
                Delete
            </Button>
        </>
    );

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete product: {productToDelete?.name}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} disabled={processing}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Category Products" />

                <div className="m-4">
                    <div>
                        {flash.message && (
                            <Alert>
                                <Megaphone className="h-4 w-4" />
                                <AlertTitle>Notification!</AlertTitle>
                                <AlertDescription>{flash.message}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>
                {categoryProducts.data.length > 0 && (
                    <div className="m-4">
                        <DataTableWithPagination
                            data={categoryProducts.data}
                            columns={columns}
                            actions={renderActions}
                            caption="A list of your recent products."
                            pagination={categoryProducts}
                            filters={filters}
                            routeName="cat_products.index"
                        />
                    </div>
                )}
            </AppLayout>
        </>
    );
}
