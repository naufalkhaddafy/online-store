<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductSingleResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->latest()->paginate(12);

        return inertia('Products/Index', [
            'title' => 'Products',
            'products' => ProductListResource::collection($products)->additional([
                'meta' => ['has_pages' => $products->hasPages()],
            ]),
        ]);
    }

    public function show(Product $product)
    {
        return inertia('Products/Show', [
            'product' => ProductSingleResource::make($product->load('category')),
        ]);
    }

    public function list(Request $request)
    {
        $products = Product::query()
            ->with(['variations', 'category'])
            ->latest()
            ->paginate(12);

        return inertia('Products/List', [
            'products' => ProductListResource::collection($products)->additional([
                'meta' => ['has_pages' => $products->hasPages()],
            ]),
        ]);
    }

    public function create()
    {
        return inertia('Products/Form', [
            'product' => new Product,
            'page_settings' => [
                'title' => 'Create Product',
                'url' => route('products.store'),
                'method' => 'POST',
            ],
            'categories' => Category::query()->select('id', 'name')->get(),
        ]);
    }
    public function store(ProductRequest $request)
    {
        $product = Product::query()->create([
            'picture' => $request->file('picture')->store('images/products'),
            'name' => $name = $request->name,
            'slug' => str($name)->slug(),
            'description' => $request->description,
            'category_id' => $request->cagetory_id,
            'price' => $request->price,
            'weight' => $request->weight,
        ]);

        $product->variations()->createMany($request->variations);

        flashMessage('Saved!', 'Product has been created.');

        return back();
    }

    public function edit(Product $product)
    {
        return inertia('Products/Form', [
            'product' => $product->load('variations'),
            'page_settings' => [
                'title' => 'Update Product',
                'url' => route('products.update', $product),
                'method' => 'PUT',
            ],
            'categories' => Category::query()->select('id', 'name')->get(),
        ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->update([
            'picture' => $request->file('picture')->store('images/products'),
            'name' => $name = $request->name,
            'slug' => str($name)->slug(),
            'description' => $request->description,
            'category_id' => $request->cagetory_id,
            'price' => $request->price,
            'weight' => $request->weight,
        ]);

        $product->variations()->delete();
        $product->variations()->createMany($request->variations);

        flashMessage('Updated!', 'Product has been updated.');

        return back();
    }

    public function destroy(Product $product)
    {
        if ($product->picture) {
            Storage::delete($product->picture);
        }
        $product->variations()->delete();
        $product->delete();

        return back();
    }
}
