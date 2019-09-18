<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\FindingGameScores;

class GamesController extends Controller
{
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

        return $highscore;
    }
}
