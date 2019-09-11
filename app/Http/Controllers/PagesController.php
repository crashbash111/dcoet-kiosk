<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
use App\Page;
use App\Category;
use App\Image;
use App\Audio;
use App\Stat;

class PagesController extends Controller
{
    public function index()
    {
        return view("pages.index");
    }

    public function all()
    {
        $pages = Page::all();
        foreach ($pages as $page) {
            $page->categoryName = $page->category->name;
            $page->images = Image::where( "page_id", $page->id )->get();
            $page->stats = Stat::where("page_id", $page->id)->get();
        }
        return json_encode($pages);
    }

    public function allCategories()
    {
        $categories = Category::all();
        return json_encode($categories);
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

    public function category($id)
    {
        $category = Category::where('id', $id)->first();
        return json_encode($category);
    }

    public function categoryPages($id)
    {
        $pages = Page::where('category_id', $id)->get();
        foreach ($pages as $page) {
            $page->images;
        }
        return json_encode($pages);
    }

    public function create()
    { }

    public function store(Request $request)
    {

        $this->validate($request, [
            "heading" => "required",
            "text" => "required",
            "photos" => "required|max:10000",
        ]);

        $page = new Page;
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

        foreach ($files as $file) {
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

        //return $request->file( "image_1" );

        //return $files;

        foreach ($files as $file) {
            //return "there";
            $fileNameWithExt = $file->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

            $fileName = strtr($fileName, [' ' => '']);

            $extension = $file->getClientOriginalExtension();
            $check = in_array($extension, $allowedFileExtension);

            if ($check) {
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

        return $page;
    }

    public function show($id)
    {
        $page = Page::find($id);
        $page->categoryName = $page->category->name;
        $page->images = Image::where( "page_id", $id )->get();
        $page->stats = Stat::where("page_id", $id)->get();
        $page->audios = Audio::where( "page_id", $id )->get();
        return json_encode($page);
    }

    public function edit($id)
    { }

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

        if ($request->hasFile("photos")) {
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

        $files = $request->file( "audios" );

        //return $files;

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

        $audiosToDelete = $request->input( "audiosToDelete" );

        $x = 0;

        if( is_array( $audiosToDelete ) )
        {
            while( $x < sizeof( $audiosToDelete ) )
            {
                if( $page->audios->find( $audiosToDelete[ $x ] != null ) )
                {
                    $a = $page->audios->find( $audiosToDelete[ $x ] );

                    $file = Storage::get( '/public/audio_files/' . $a->filepath );

                    if( $file != null ) {
                        Storage::delete( $file );
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

    public function test1()
    {
        return view("pages.test1");
    }

    public function test2()
    {
        return view("pages.test2");
    }

    public function data1()
    {
        $obj['heading'] = "Kiwi";
        $obj['text'] = "Kiwis are indigenous to New Zealand. They are small, flightless birds that roam the forest floor. Critically endangered, they require special care.";
        $obj['imgUrl'] = "https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg";

        $json = json_encode($obj);

        return $json;
    }

    public function allBirds()
    {
        $obj["id"] = "1";
        $obj["heading"] = "Kiwi";
        $obj["text"] = "Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.";
        $obj["img"] = [
            "https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg",
            "https://www.hakaimagazine.com/wp-content/uploads/header-gulf-birds.jpg"
        ];
        $obj["category"] = "Birds";

        $obj1["id"] = "2";
        $obj1["heading"] = "Kakapo";
        $obj1["text"] = "Kakapo are useless birds.";
        $obj1["img"] = [
            "https://www.doc.govt.nz/thumbs/hero/contentassets/22c4c0407c1142ffbd70ef6ff029d722/stella-the-kakapo-codfish-1600.jpg",
            "https://www.doc.govt.nz/thumbs/hero/contentassets/3165d836813b40b897f7c7cf3551f798/kakapo-chick-dianne-mason-hero.jpg",
            "http://nzbirdsonline.org.nz/sites/all/files/Kakapo_DvW2007.jpg"
        ];
        $obj1["category"] = "Birds";

        $ob = [$obj, $obj1];

        return json_encode($ob);
    }

    public function data2($id)
    {

        $obj["id"] = "0";
        $obj["heading"] = "Kiwi";
        $obj["text"] = "Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.";
        $obj["img"] = [
            "https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg",
            "https://www.hakaimagazine.com/wp-content/uploads/header-gulf-birds.jpg"
        ];

        $obj1["id"] = "1";
        $obj1["heading"] = "Kakapo";
        $obj1["text"] = "Kakapo are useless birds.";
        $obj1["img"] = [
            "https://www.doc.govt.nz/thumbs/hero/contentassets/22c4c0407c1142ffbd70ef6ff029d722/stella-the-kakapo-codfish-1600.jpg",
            "https://www.doc.govt.nz/thumbs/hero/contentassets/3165d836813b40b897f7c7cf3551f798/kakapo-chick-dianne-mason-hero.jpg",
            "http://nzbirdsonline.org.nz/sites/all/files/Kakapo_DvW2007.jpg"
        ];

        $ob = [$obj, $obj1];

        return json_encode($ob[$id]);
    }

    public function dataPests()
    {
        $o2["id"] = "2";
        $o2["heading"] = "Stoat";
        $o2["text"] = "Stoats are small weasel creatures that ravage the nests of native endangered species.";
        $o2["img"] = "https://www.rnz.co.nz/assets/news/146558/eight_col_stoat.jpg?1522350517";

        $ob = [$o2];

        return json_encode($ob);
    }

    public function admin()
    {
        return view('pages.admin');
    }

    public function page($id)
    {
        return $id;
    }
}
