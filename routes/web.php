<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get( "/", "DefaultController@index" );



Route::get( "/findingGame", [ "uses" => "GamesController@findingGame" ] );
Route::post( "/findingGamePost", [ "middleware" => "cors", "uses" => "GamesController@findingGamePost" ] );
Route::get( "/findinghighscores", [ "uses" => "GamesController@findinghighscores" ] );

//Route::get( "/allGames", "PagesController@allGames" );

Route::get( "/category/{id}", [ "uses" => "PagesController@category" ] );

Route::get( "/category/{id}/pages", [ "uses" => "PagesController@categoryPages" ] );

//Route::get( "/powerpoints/all", "PowerpointController@all" );

Route::resource( "bannedwords", "BannedWordController" );

Auth::routes();

