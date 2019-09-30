<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Video;

class VideoController extends Controller
{
    public function index()
    {
        return Video::all();
    }

    public function create()
    {

    }

    public function store( Request $request )
    {

    }

    public function show( $id )
    {

    }

    public function edit( $id )
    {

    }

    public function update( Request $request, $id )
    {

    }

    public function destroy( $id )
    {
        Video::findOrFail( $id )->delete();
    }
}
