<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
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
            "video" => "required|max:1000000000",
            "length" => "required",
        ]);

        $video = new Video;
        $video->title = $request->input("title");
        $video->description = $request->input("description");
        $video->copyright = $request->input("copyright");
        $filesize = $request->header("content-length");
        $video->size = $filesize;
        $video->length = $request->input("length");

        $file = $request->file("video");

        $fileNameWithExt = $file->getClientOriginalName();
        $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
        $fileName = strtr($fileName, [' ' => '']);
        $extension = $file->getClientOriginalExtension();

        $fileNameToStore = $fileName . "_" . time() . "." . $extension;

        //upload image
        Storage::putFileAs('public/videos', $file, $fileNameToStore);
        //$path = $file->storeAs('/public/kiosk_images', $fileNameToStore);

        $video->file_path = $fileNameToStore;

        $video->save();

        return $video;
    }

    public function show($id)
    {
        $video = Video::find($id);
        return json_encode($video);
    }

    public function showStream($id)
    {
        $video = Video::find( $id );

        $path = 'storage/videos/' . $video->file_path;

        $file_location = public_path( $path );

        //return $file_location;

        $extension = pathinfo($file_location, PATHINFO_EXTENSION);

        $mimetypes = new \Illuminate\Http\Testing\MimeType;

        $mime = $mimetypes->get($extension);

        $filesize = File::size($file_location);

        $headers = [
            "Content-type" => $mime,
            "Content-length" => $filesize,
            "Content-disposition" => 'attachment; filename="' . basename($file_location) . '"',
        ];

        return Response::stream(function () use ($file_location) {
            $stream = fopen($file_location, 'r');
            fpassthru($stream);
        }, 200, $headers);
    }

    public function edit($id)
    { }

    public function update(Request $request, $id)
    { }

    public function destroy($id)
    {
        Video::findOrFail($id)->delete();
    }
}
