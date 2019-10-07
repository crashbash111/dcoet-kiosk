<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;
use App\Page;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        foreach( $categories as $category )
        {
            $category->numPages = Page::where( "category_id", $category->id )->count();
        }
        return json_encode( $categories );
    }

    public function store( Request $request )
    {
        $this->validate( $request, [
            "name" => "required",
            "description" => "required"
        ]);

        $category = new Category;
        $category->name = $request->input( "name" );
        $category->description = $request->input( "description" );

        $category->save();

        return $category;
    }

    public function show( $id )
    {
        $category = Category::find( $id );
        $category->numPages = Page::where( "category_id", $id )->count();
        return json_encode( $category );
    }

    public function update( Request $request, $id )
    {
        $this->validate( $request, [
            "name" => "required",
            "description" => "required"
        ]);

        $category = Category::find( $id );

        $category->name = $request->input( "name" );
        $category->description = $request->input( "description" );

        $category->save();
    }

    public function destroy( $id )
    {
        $category = Category::find( $id );
    }

    //create store edit update show delete
}
