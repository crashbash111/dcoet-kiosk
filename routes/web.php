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
Route::get( "/", "PagesController@index" );

Route::get( "/pages/all", "PagesController@all" );
Route::get( "/pages/allCategories", "PagesController@allCategories" );
Route::get( "/allGames", "PagesController@allGames" );

Route::get( "/category/{id}", [ "uses" => "PagesController@category" ] );

Route::get( "/category/{id}/pages", [ "uses" => "PagesController@categoryPages" ] );

Route::resource( "pages", "PagesController" );

Route::get( "/powerpoints/all", "PowerpointController@all" );
Route::resource( "powerpoints", "PowerpointController" );

Route::resource( "categories", "CategoryController" );

Route::get( "/test1", "PagesController@test1" );
Route::get( "/test2", "PagesController@test2" );
Route::get( "/data1", "PagesController@data1" );
Route::get( "/data2/{id}", ["uses" => "PagesController@data2" ] );
Route::get( "/dataPests", "PagesController@dataPests" );
Route::get( "/admin", "PagesController@admin" );
Route::get( "/allBirds", [ "uses" => "PagesController@allBirds" ] );

//Route::get( "/{id}", ["uses" => "PagesController@page" ] );