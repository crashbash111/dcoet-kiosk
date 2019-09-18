<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return json_encode( Category::all() );
    }

    public function create()
    {

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
        return json_encode( $category );
    }

    public function edit( $id )
    {

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
