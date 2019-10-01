<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BannedWord;

class BannedWordController extends Controller
{
    public function index()
    {
        $words = BannedWord::all();
        return json_encode( $words );
    }

    public function show( $id )
    {
        $word = BannedWord::find( $id );
        return json_encode( $word );
    }

    public function store( Request $request )
    {
        $this->validate( $request, [
            "word" => "required",
        ]);

        $word = new BannedWord;
        $word->word = $request->input( "word" );

        $word->save();

        return $word;
    }

    public function update( Request $request, $id )
    {
        $this->validate( $request, [
            "word" => "required",
        ]);

        $word = BannedWord::find( $id );

        $word->word = $request->input( "word" );

        $word->save();

        return $word;
    }

    public function destroy( $id )
    {
        $word = BannedWord::find( $id );
        $word->delete();
    }
}
