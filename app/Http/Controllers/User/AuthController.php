<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use JWTAuth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = new User;
    }

    public function register( Request $request )
    {
        $validator = Validator::make( $request->only( "name", 'email', 'password' ), [
            "email" => "required|email",
            "name" => "required|string",
            "password" => "required|string|min:6",
        ] );

        if( $validator->fails() )
        {
            return response()->json( [
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ], 400);
        }

        $check_email = $this->user->where( "email", $request->email )->count();

        if( $check_email > 0 )
        {
            return response()->json([
                "success" => false,
                "message" => "This email is already taken",
            ], 400);
        }

        $registerComplete = $this->user::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make( $request->password ),
        ]);

        if( $registerComplete )
        {
            return $this->login( $request );
        }
    }

    public function login( Request $request )
    {
        //return $request;

        $validator = Validator::make( $request->only( 'email', 'password' ), [
            "email" => "required|email",
            "password" => "required|string|min:6",
        ] );

        if( $validator->fails() )
        {
            return response()->json( [
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ], 400 );
        }

        $jwt_token = null;

        $input = $request->only( "email", "password" );

        if( !$jwt_token = auth( "users" )->attempt( $input ) )
        {
            return response()->json( [
                "success" => false,
                "message" => "Invalid email or password"
            ], 400);
        }

        return response()->json( [
            "success" => true,
            "token" => $jwt_token,
        ]);
    }
}
