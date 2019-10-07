<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Powerpoint;
use App\PPT_Image;

class PowerpointController extends Controller
{
    //

    public function index()
    {
        $all = Powerpoint::all();

        foreach( $all as $a )
        {
            $a->ppt_images = PPT_Image::where( "powerpoint_id", $a->id )->get();
        }

        return json_encode( $all );
    }

    public function store( Request $request )
    {
        $this->validate( $request, [
            "title" => "required",
            "photos" => "required",
        ]);

        $ppt = new Powerpoint;
        $ppt->title = $request->input( "title" );

        $ppt->save();

        $allowedExtensions = [ "jpg", "jpeg", "png" ];

        $files = $request->file( "photos" );

        foreach( $files as $file )
        {
            //return "there";
            $fileNameWithExt = $file->getClientOriginalName();

            $fileName = pathinfo( $fileNameWithExt, PATHINFO_FILENAME );

            $fileName = strtr($fileName, [' ' => '']);

            $extension = $file->getClientOriginalExtension();
            $check = in_array( $extension, $allowedExtensions );

            if( $check )
            {
                //return $file;

                $img = new PPT_Image;
                //filename to store
                $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                //upload image
                $path = $file->storeAs( 'public/ppt_images', $fileNameToStore );
                $img->filepath = $fileNameToStore;
                $img->powerpoint_id = $ppt->id;

                $img->save();
            }
        }

        return $request;
    }

    public function update( Request $request, $id )
    {

    }

    public function show( $id )
    {
        $ppt = Powerpoint::find( $id );
        $ppt->ppt_images;
        //$ppt->photos = PPT_Image::where( "powerpoint_id", $id )->get();
        return json_encode( $ppt );
    }

    public function destroy( $id )
    {

    }
}
