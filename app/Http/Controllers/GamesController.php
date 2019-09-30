<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\FindingGameScores;

class GamesController extends Controller
{
    public function findingGame()
    {
        return view( "pages.Game.finding" );
    }

    public function findingGamePost( Request $request )
    {
        $this->validate( $request, [
            "name" => "required",
            "score" => "required"
        ] );

        $initials = $request->input( "name" );
        $score = $request->input( "score" );

        $highscore = new FindingGameScores();
        $highscore->initials = $initials;
        $highscore->score = $score;

        $highscore->save();

        return response()->json( json_encode( $highscore ) );
    }

    public function findinghighscores()
    {
        return json_encode( FindingGameScores::orderBy( "score", "DESC" )->orderBy( "initials", "ASC" )->orderBy( "created_at", "DESC" )->take(10)->get() );
    }
}
