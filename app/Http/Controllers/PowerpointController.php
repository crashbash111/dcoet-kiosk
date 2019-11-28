<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Powerpoint;
use App\PPT_Image;

class PowerpointController extends Controller
{
    public function __construct()
    {
        $this->middleware( "auth:users", ["except" => ["index", "show" ] ] );
    }

    public function index()
    {
        $all = Powerpoint::all();

        foreach ($all as $a) {
            $a->ppt_images = PPT_Image::where("powerpoint_id", $a->id)->get();
            $a->length = sizeof($a->ppt_images);
        }

        return json_encode($all);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            "title" => "required",
            "photos" => "required",
        ]);

        $ppt = new Powerpoint;
        $ppt->title = $request->input("title");

        $ppt->save();

        $allowedExtensions = [ "jpg", "JPG", "jpeg", "JPEG", "png", "PNG" ];

        $files = $request->file("photos");

        foreach ($files as $file) {
            //return "there";
            $fileNameWithExt = $file->getClientOriginalName();

            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

            //$fileName = strtr($fileName, [' ' => '', '(' => '_', ')' => '_', "'" => "_" ]);
            $fileName = preg_replace('/[^a-z0-9]+/', '_', strtolower($fileName));

            // $fileName = strtr( $fileName, [ '(' => '_' ] );
            // $fileName= strtr( $fileName, [ ')' = '_' ] );

            $extension = $file->getClientOriginalExtension();
            $check = in_array($extension, $allowedExtensions);

            if ($check) {
                //return $file;

                $img = new PPT_Image;
                //filename to store
                $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                //upload image
                $path = $file->storeAs('public/ppt_images', $fileNameToStore);
                $img->filepath = $fileNameToStore;
                $img->powerpoint_id = $ppt->id;

                $img->save();
            }
        }

        return $request;
    }

    public function update(Request $request, $id)
    { }

    public function show($id)
    {
        $ppt = Powerpoint::find($id);
        $ppt->ppt_images;
        //$ppt->photos = PPT_Image::where( "powerpoint_id", $id )->get();
        return json_encode($ppt);
    }

    public function destroy($id)
    {
        $images = PPT_Image::where('powerpoint_id', $id)->get();
        foreach ($images as $image) {
            unlink(storage_path('app/public/ppt_images/' . $image->filepath));
            $image->delete();
        }
        $ppt = Powerpoint::find($id);
        $ppt->delete();
        return "Deleted!";
    }
}
