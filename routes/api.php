<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::group([ "prefix] => "user", "namespace" => "User", ] )

Route::group(['middleware' => ['web'] ], function () {

    Route::resource( "pages", "PagesController", [ "except" => [ "edit", "create" ] ] );
    
    Route::resource( "powerpoints", "PowerpointController", [ "except" => [ "edit", "create" ] ] );
    Route::resource( "categories", "CategoryController", [ "except" => [ "edit", "create" ] ] );
    Route::resource( "videos", "VideoController", [ "except" => [ "edit", "create" ] ] );
    Route::get( "/videos/{id}/stream", [ "uses" => "VideoController@showStream" ] );

    Route::post('login','User\AuthController@login');
    Route::post('register', 'User\AuthController@register' )->middleware( "cors" );
    Route::post('logout','Auth\LoginController@logout');
    Route::post('password/email','Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('password/reset','Auth\ResetPasswordController@reset');
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
