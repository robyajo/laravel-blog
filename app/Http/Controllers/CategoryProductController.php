<?php

namespace App\Http\Controllers;

use App\Models\CategoryProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search');
        $perPage = request('per_page', 10);

        $query = CategoryProduct::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            });

        $categoryProducts = $query->paginate($perPage)->withQueryString();
        $total = $query->count();

        return Inertia::render('CategoryProducts/Index', [
            'categoryProducts' => $categoryProducts,
            'filters' => [
                'search' => $search,
                'per_page' => (int)$perPage
            ],
            'total' => $total,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CategoryProducts/Create');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $list = CategoryProduct::findOrFail($id);
        $list->delete();
        return redirect()->route('cat_products.index')->with('success', 'Category deleted successfully!');
    }
}
