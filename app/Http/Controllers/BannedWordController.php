<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BannedWord;
use App\GameGameScore;
use App\GameTimedScore;
use App\FindingGameScores;

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
        $all = GameGameScore::all();

        foreach( $all as $a )
        {
            if( $a->initials == $request->input( "word" ) )
            {
                $a->delete();
            }
        }

        $all = GameTimedScore::all();

        foreach( $all as $a )
        {
            if( $a->initials == $request->input( "word" ) )
            {
                $a->delete();
            }
        }

        $all = FindingGameScores::all();

        foreach( $all as $a )
        {
            if( $a->initials == $request->input( "word" ) )
            {
                $a->delete();
            }
        }

        $this->validate( $request, [
            "word" => "required",
        ]);

        $word = new BannedWord;
        $word->word = $request->input( "word" );

        $word->save();

        // foreach(  as $row )
        // {
        //     $row->delete();
        // }

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
        return "Deleted!";
    }
}
