<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\FindingGameScores;

class GamesController extends Controller
{
    public function index()
    {
        $file_path = "./storage/game_cover_images/";

        $games = Array(
            (object)array( "id" => 1, "heading" => "Litter Rush", "image_path" => $file_path . "litter.png" ),
            (object)array( "id" => 2, "heading" => "Finding", "image_path" => $file_path . "finding.png" ),
            (object)array( "id" => 3, "heading" => "Memory", "image_path" => $file_path . "memory.png" )
        );

        return json_encode( $games );
    }

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
