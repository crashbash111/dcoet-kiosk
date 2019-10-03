<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Storage;
use App\Page;
use App\Category;
use App\Image;
use App\Audio;
use App\Stat;

class PagesController extends Controller
{
    public function __construct()
    {
        $this->middleware( "auth:users", [ "except" => [ "index", "show" ] ] );
    }

    public function video()
    {
        $file_location = public_path( 'storage/videos/september.mp4' );

        $extension = pathinfo( $file_location, PATHINFO_EXTENSION );

        $mimetypes = new \Illuminate\Http\Testing\MimeType;

        $mime = $mimetypes->get( $extension );
        
        $filesize = File::size( $file_location );

        $headers = [
            "Content-type" => $mime,
            "Content-length" => $filesize,
            "Content-disposition" => 'attachment; filename="' . basename( $file_location ) . '"',
        ];

        return Response::stream(function () use ($file_location) {
            $stream = fopen($file_location, 'r');
            fpassthru($stream);
         }, 200, $headers);
    }

    public function index()
    {
        $pages = Page::all();
        return json_encode( $pages );
    }

    public function allGames()
    {
        $game1["Name"] = "Litter Rush";
        $game1["Description"] = "A game about raising awareness about conservation";
        $game1["link"] = "litter-rush.html";
        $game1["img"] = "https://upload.wikimedia.org/wikipedia/commons/5/5d/Restless_flycatcher04.jpg";

        $games = [$game1];

        return json_encode($games);
    }

    public function categoryPages($id)
    {
        $pages = Page::where('category_id', $id)->get();
        foreach ($pages as $page) {
            $page->images;
        }
        return json_encode($pages);
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            "heading" => "required",
            "text" => "required",
            "photos" => "required|max:1000000",
        ]);

        $page = new Page;
        $page->heading = $request->input('heading');
        $page->text = $request->input('text');
        $page->category_id = $request->input('category');

        $page->save();

        $allowedFileExtension = ['jpg', 'jpeg', 'png'];

        $files = $request->file("photos");

        foreach ($files as $file) {
            $fileNameWithExt = $file->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

            $fileName = strtr($fileName, [' ' => '']);

            $extension = $file->getClientOriginalExtension();
            $check = in_array($extension, $allowedFileExtension);

            if ($check) {
                $img = new Image;
                //filename to store
                $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                //upload image
                $path = $file->storeAs('/public/kiosk_images', $fileNameToStore);
                $img->alt = "";
                $img->image_name = $fileNameToStore;
                $img->page_id = $page->id;
                $img->copyright = "JonoThen Kerr";

                $img->save();
            }
        }

        $statsNames = $request->input("statsNames");
        $statsValues = $request->input("statsValues");

        $x = 0;

        if (is_array($statsNames)) {
            while ($x < sizeof($statsNames)) {
                $s = new Stat;

                $s->name = $statsNames[$x];
                $s->value = $statsValues[$x];
                $s->page_id = $page->id;

                $s->save();

                $x++;
            }
        }

        $files = $request->file("audios");

        if (is_array($files)) {
            foreach ($files as $file) {
                $fileNameWithExt = $file->getClientOriginalName();
                $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

                $fileName = strtr($fileName, [' ' => '']);

                $extension = $file->getClientOriginalExtension();
                $check = in_array($extension, $allowedFileExtension);

                if ($check) {

                    $a = new Audio;
                    //filename to store
                    $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                    //upload image
                    $path = $file->storeAs('/public/audio_files', $fileNameToStore);
                    $a->filepath = $fileNameToStore;
                    $a->page_id = $page->id;

                    $a->save();
                }
            }
        }

        return response()->json([
            "success" => true,
            "message" => "Page saved successfully.",
        ]);
    }

    public function show($id)
    {
        $page = Page::find($id);
        $page->categoryName = $page->category->name;
        $page->images = Image::where("page_id", $id)->get();
        $page->stats = Stat::where("page_id", $id)->get();
        $page->audios = Audio::where("page_id", $id)->get();
        return json_encode($page);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "heading" => "required",
            "text" => "required",
            //"photos" => "required",
        ]);

        $page = Page::find($id);
        $page->heading = $request->input('heading');
        $page->text = $request->input('text');
        $page->category_id = $request->input('category');

        $page->save();

        //return $request->all();

        //return $request->all();

        $allowedFileExtension = ['jpg', 'jpeg', 'png'];
        //$files = $request->all()[ "photos" ];

        $files = $request->file("photos");

        //return $request->file( "image_1" );

        //return $files;

        //remove old images

        if (is_array($request->input("copyright_ids")))
        {
            foreach ($request->input("copyright_ids") as $copy)
            {
                $im = Image::find($copy);
                $im->copyright = $request->input("copyright_texts")[array_search($copy, $request->input("copyright_ids"))];
                $im->save();
            }
        }

        if ($request->hasFile("photos")) {
            $x = 0;
            foreach ($files as $file) //add new images
            {
                //return "there";
                $fileNameWithExt = $file->getClientOriginalName();
                $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

                $fileName = strtr($fileName, [' ' => '']);

                $extension = $file->getClientOriginalExtension();
                $check = in_array($extension, $allowedFileExtension);

                if ($check) {
                    //return $file;

                    $img = new Image;
                    //filename to store
                    $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                    //upload image
                    $path = $file->storeAs('/public/kiosk_images', $fileNameToStore);
                    $img->alt = "";
                    $img->image_name = $fileNameToStore;
                    $img->page_id = $page->id;
                    $img->copyright = $request->input("copyright_new")[$x++];

                    $img->save();
                }
            }
        }

        $statsIds = $request->input("statsIds");
        $statsNames = $request->input("statsNames");
        $statsValues = $request->input("statsValues");

        $x = 0;

        if (is_array($statsNames)) {
            while ($x < sizeof($statsNames)) {
                if ($page->stats->find($statsIds[$x]) != null) {
                    $s = $page->stats->find($statsIds[$x]);
                } else {
                    $s = new Stat;
                }

                $s->name = $statsNames[$x];
                $s->value = $statsValues[$x];
                $s->page_id = $page->id;

                $s->save();

                $x++;
            }
        }

        $files = $request->file("audios");

        //return $files;

        if (is_array($files)) {
            foreach ($files as $file) {
                //return "there";
                $fileNameWithExt = $file->getClientOriginalName();
                $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

                $fileName = strtr($fileName, [' ' => '']);

                $extension = $file->getClientOriginalExtension();
                //$check = in_array($extension, $allowedFileExtension);

                if (true) {
                    //return $file;

                    $a = new Audio;
                    //filename to store
                    $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                    //upload image
                    $path = $file->storeAs('/public/audio_files', $fileNameToStore);
                    $a->filepath = $fileNameToStore;
                    $a->page_id = $page->id;

                    $a->save();
                }
            }
        }

        $statsToDelete = $request->input("statsToDelete");

        $x = 0;

        if (is_array($statsToDelete)) {
            while ($x < sizeof($statsToDelete)) {
                if ($page->stats->find($statsToDelete[$x]) != null) {
                    $d = $page->stats->find($statsToDelete[$x]);

                    $d->delete();
                }

                $x++;
            }
        }

        $imagesToDelete = $request->input("imagesToDelete");

        $x = 0;

        if (is_array($imagesToDelete)) {
            while ($x < sizeof($imagesToDelete)) {
                if ($page->images->find($imagesToDelete[$x]) != null) {
                    $d = $page->images->find($imagesToDelete[$x]);

                    $file = Storage::get('/public/kiosk_images/' . $d->file_name);

                    if ($file != null) {
                        Storage::delete($file);
                    }

                    $d->delete();
                }

                $x++;
            }
        }

        $audiosToDelete = $request->input("audiosToDelete");

        $x = 0;

        if (is_array($audiosToDelete)) {
            while ($x < sizeof($audiosToDelete)) {
                if ($page->audios->find($audiosToDelete[$x] != null)) {
                    $a = $page->audios->find($audiosToDelete[$x]);

                    $file = Storage::get('/public/audio_files/' . $a->filepath);

                    if ($file != null) {
                        Storage::delete($file);
                    }

                    $a->delete();
                }

                $x++;
            }
        }

        return $page;
    }

    public function destroy($id)
    {
        Page::findOrFail($id)->delete();
    }
}
