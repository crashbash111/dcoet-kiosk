<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Video;

class VideoController extends Controller
{
    public function index()
    {
        return Video::all();
    }

    public function create()
    { }

    public function store(Request $request)
    {
        $this->validate($request, [
            "title" => "required",
            "description" => "required",
            "video" => "required|max:10000000",
            "length" => "required",
        ]);

        $video = new Video;
        $video->title = $request->input("title");
        $video->description = $request->input("description");
        $video->copyright = $request->input("copyright");
        $filesize = $request->header( "content-length" );
        $video->size = $filesize;
        $video->length = $request->input( "length" );

        $file = $request->file("video");

        $fileNameWithExt = $file->getClientOriginalName();
        $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
        $fileName = strtr($fileName, [' ' => '']);
        $extension = $file->getClientOriginalExtension();

        $fileNameToStore = $fileName . "_" . time() . "." . $extension;
        
        //upload image
        Storage::putFileAs( 'videos', $file, $fileNameToStore );
        //$path = $file->storeAs('/public/kiosk_images', $fileNameToStore);

        $video->file_path = $fileNameToStore;

        $video->save();

        return $video;
    }

    public function show($id)
    { }

    public function edit($id)
    { }

    public function update(Request $request, $id)
    { }

    public function destroy($id)
    {
        Video::findOrFail($id)->delete();
    }
}
