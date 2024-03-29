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
use Intervention\Image\Facades\Image as InterventionImage;

class PagesController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:users", ["except" => ["index", "show", "mostViewed", "leastViewed"]]);
    }

    public function index()
    {
        $pages = Page::all();
        foreach ($pages as $page) {
            $page->images = Image::where("page_id", $page->id)->get();
            $page->stats = Stat::where("page_id", $page->id)->get();
            $page->audios = Audio::where("page_id", $page->id)->get();
        }
        return json_encode($pages);
    }

    public function mostViewed()
    {
        $pages = Page::orderBy("times_viewed", "desc")->take(10)->get();

        foreach ($pages as $page) {
            $page->categoryname = Category::find($page->category_id)->name;
        }

        return json_encode($pages);
    }

    public function leastViewed()
    {
        $pages = Page::orderBy("times_viewed", "asc")->take(10)->get();

        foreach ($pages as $page) {
            $page->categoryname = Category::find($page->category_id)->name;
        }

        return json_encode($pages);
    }

    public function show($id)
    {
        $page = Page::find($id);

        $page->times_viewed = $page->times_viewed + 1;

        $page->save();

        // $page->categoryName = $page->category->name;
        $page->images = Image::where("page_id", $id)->get();
        $page->stats = Stat::where("page_id", $id)->get();
        $page->audios = Audio::where("page_id", $id)->get();

        return json_encode($page);
    }

    public function createThumbnail($path, $width, $height)
    {
        $img = InterventionImage::make($path)->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save($path);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            "heading" => "required",
            "shortdesc" => "required",
            "photos" => "required|max:1000000",
        ]);

        $page = new Page;
        $page->heading = $request->input('heading');
        $page->shortdesc = $request->input('shortdesc');
        $page->longdesc = $request->input('longdesc');
        $page->category_id = $request->input('category');

        $page->save();

        $allowedFileExtension = ['jpg', "JPG", 'jpeg', "JPEG", 'png', "PNG" ];

        $files = $request->file("photos");

        $x = 0;
        foreach ($files as $file) {
            $fileNameWithExt = $file->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

            $fileName = strtr($fileName, [' ' => '', '(' => '_', ')' => '_', "'" => "_" ]);

            
            //$fileName = preg_replace('/[^a-z0-9]+/', '_', strtolower($fileName));

            $extension = $file->getClientOriginalExtension();
            $check = in_array($extension, $allowedFileExtension);

            if ($check) {
                $img = new Image;
                //filename to store
                $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                //return $fileNameToStore;
                $smallThumb = $fileName . "_small_" . time() . "." . $extension;
                $mediumThumb = $fileName . "_medium_" . time() . "." . $extension;
                $largeThumb = $fileName . "_large_" . time() . "." . $extension;
                //upload image
                $path = $file->storeAs('/public/kiosk_images', $fileNameToStore);
                $path_s = $file->storeAs('/public/kiosk_images', $smallThumb);
                $path_m = $file->storeAs('/public/kiosk_images', $mediumThumb);
                $path_l = $file->storeAs('/public/kiosk_images', $largeThumb);

                $smallPath = public_path('storage/kiosk_images/' . $smallThumb);
                $this->createThumbnail($smallPath, 150, 93);

                $mediumPath = public_path('storage/kiosk_images/' . $mediumThumb);
                $this->createThumbnail($mediumPath, 300, 185);

                $largePath = public_path('storage/kiosk_images/' . $largeThumb);
                $this->createThumbnail($largePath, 550, 340);

                $img->alt = "";
                $img->image_name = $fileNameToStore;
                $img->page_id = $page->id;
                $img->copyright = "";
                $img->thumbnail_small = $smallThumb;
                $img->thumbnail_medium = $mediumThumb;
                $img->thumbnail_large = $largeThumb;

                $img->copyright = $request->input('copyright_new')[$x++];

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

        $filesx = $request->file("audios");

        $allowedFileExtension = ['wav', "WAV", 'mp3', "MP3", 'ogg', "OGG"];

        if (is_array($filesx)) {
            foreach ($filesx as $file) {
                $fileNameWithExt = $file->getClientOriginalName();
                $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

                $fileName = strtr($fileName, [' ' => '', '(' => '_', ')' => '_', "'" => "_" ]);
                //$fileName = preg_replace('/[^a-z0-9]+/', '_', strtolower($fileName));

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

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "heading" => "required",
            "shortdesc" => "required",
            //"photos" => "required",
        ]);

        $page = Page::find($id);
        $page->heading = $request->input('heading');
        $page->shortdesc = $request->input('shortdesc');
        $page->longdesc = $request->input('longdesc');
        $page->category_id = $request->input('category');

        $page->save();

        //return $request->all();

        //return $request->all();

        $allowedFileExtension = ['jpg', "JPG", 'jpeg', "JPEG", 'png', "PNG" ];
        //$files = $request->all()[ "photos" ];

        $files = $request->file("photos");

        //return $request->file( "image_1" );

        //return $files;

        //remove old images

        if (is_array($request->input("copyright_ids"))) {
            foreach ($request->input("copyright_ids") as $copy) {
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

                $fileName = strtr($fileName, [' ' => '', '(' => '_', ')' => '_', "'" => "_" ]);
                //$fileName = preg_replace('/[^a-z0-9]+/', '_', strtolower($fileName));

                $extension = $file->getClientOriginalExtension();
                $check = in_array($extension, $allowedFileExtension);

                if ($check) {
                    //return $file;

                    $img = new Image;
                    //filename to store
                    $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                    $smallThumb = $fileName . "_small_" . time() . "." . $extension;
                    $mediumThumb = $fileName . "_medium_" . time() . "." . $extension;
                    $largeThumb = $fileName . "_large_" . time() . "." . $extension;
                    //upload image
                    $path = $file->storeAs('/public/kiosk_images', $fileNameToStore);
                    $path_s = $file->storeAs('/public/kiosk_images', $smallThumb);
                    $path_m = $file->storeAs('/public/kiosk_images', $mediumThumb);
                    $path_l = $file->storeAs('/public/kiosk_images', $largeThumb);

                    $smallPath = public_path('storage/kiosk_images/' . $smallThumb);
                    $this->createThumbnail($smallPath, 150, 93);

                    $mediumPath = public_path('storage/kiosk_images/' . $mediumThumb);
                    $this->createThumbnail($mediumPath, 300, 185);

                    $largePath = public_path('storage/kiosk_images/' . $largeThumb);
                    $this->createThumbnail($largePath, 550, 340);

                    $img->alt = "";
                    $img->image_name = $fileNameToStore;
                    $img->page_id = $page->id;
                    $img->copyright = "";
                    $img->thumbnail_small = $smallThumb;
                    $img->thumbnail_medium = $mediumThumb;
                    $img->thumbnail_large = $largeThumb;

                    $img->copyright = $request->input('copyright_new')[$x++];

                    $img->save();

                    // $img = new Image;
                    // //filename to store
                    // $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                    // //upload image
                    // $path = $file->storeAs('/public/kiosk_images', $fileNameToStore);
                    // $img->alt = "";
                    // $img->image_name = $fileNameToStore;
                    // $img->page_id = $page->id;
                    // $img->copyright = $request->input("copyright_new")[$x++];

                    // $img->save();
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

                $fileName = strtr($fileName, [' ' => '', '(' => '_', ')' => '_', "'" => "_" ]);
                //$fileName = preg_replace('/[^a-z0-9]+/', '_', strtolower($fileName));

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

                    $file = Storage::get('/public/kiosk_images/' . $d->image_name);

                    unlink(storage_path('app/public/kiosk_images/' . $d->image_name));

                    unlink(storage_path('app/public/kiosk_images/' . $d->thumbnail_small));

                    unlink(storage_path('app/public/kiosk_images/' . $d->thumbnail_medium));

                    unlink(storage_path('app/public/kiosk_images/' . $d->thumbnail_large));

                    // return $file;

                    // if ($file != null) {
                    //     Storage::delete($file);
                    // }

                    $d->delete();
                }

                $x++;
            }
        }

        $audiosToDelete = $request->input("audiosToDelete");

        $x = 0;

        if (is_array($audiosToDelete)) {
            while ($x < sizeof($audiosToDelete)) {
                if ($page->audio->find($audiosToDelete[$x]) != null) {
                    $a = $page->audio->find($audiosToDelete[$x]);

                    $file = Storage::get('/public/audio_files/' . $a->filepath);

                    unlink(storage_path('app/public/audio_files/' . $a->filepath));

                    //Storage::delete( $file );

                    //return '/public/audio_files/' . $a->filepath;

                    //return ( $file );

                    // if ($file != null) {
                    //     unlink( public_path() . "/storage/audio_files/" . $a->filepath );
                    //     ('public/audio_files/' . $a->filepath);
                    //     return "not null";
                    //     Storage::delete($file);
                    //     $deleted = Storage::disk('public')->delete( '/public/audio_files/' . $a->filepath );
                    // }

                    $a->delete();
                }

                $x++;
            }
        }

        return $page;
    }

    public function destroy($id)
    {
        $stats = Stat::where('page_id', $id)->get();
        foreach ($stats as $stat) {
            $stat->delete();
        }
        $images = Image::where('page_id', $id)->get();
        foreach ($images as $image) {
            unlink(storage_path('app/public/kiosk_images/' . $image->image_name));
            unlink(storage_path('app/public/kiosk_images/' . $image->thumbnail_small));
            unlink(storage_path('app/public/kiosk_images/' . $image->thumbnail_medium));
            unlink(storage_path('app/public/kiosk_images/' . $image->thumbnail_large));
            $image->delete();
        }
        $audios = Audio::where( 'page_id', $id )->get();
        foreach( $audios as $audio )
        {
            unlink(storage_path('app/public/audio_files/' . $audio->filepath));
            $audio->delete();
        }
        Page::findOrFail($id)->delete();
        return "Deleted";
    }
}
