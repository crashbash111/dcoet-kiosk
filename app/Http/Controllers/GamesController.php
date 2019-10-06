<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\FindingGameScores;
use App\Game;
use Validator;

class GamesController extends Controller
{
    public function index()
    {
        $file_path = "./storage/game_cover_images/";

        // $games = Array(
        //     (object)array( "id" => 1, "name" => "Litter Rush", "image_path" => $file_path . "litter.png" ),
        //     (object)array( "id" => 2, "heading" => "Finding", "image_path" => $file_path . "finding.png" ),
        //     (object)array( "id" => 3, "heading" => "Memory", "image_path" => $file_path . "memory.png" )
        // );

        $games = Game::all();

        return json_encode( $games );
    }

    public function highscores( $id )
    {
        if( $id == 1 ) //litter rush
        {

        }
        if( $id == 2 ) //finding
        {
            return $this->findinghighscores();
        }
        if( $id == 3 ) //memory
        {

        }
    }

    public function update( Request $request, $id )
    {
        $validator = Validator::make( $request->only( 'enabled' ), [
            "enabled" => "required"
        ] );

        if( $validator->fails() )
        {
            return response()->json( [
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ], 400);
        }

        $game = Game::find( $id );
        $game->enabled = $request->input( "enabled" );
        $game->save();

        response()->json( [ "success" => true, "message" => "ree" ], 200 );
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
