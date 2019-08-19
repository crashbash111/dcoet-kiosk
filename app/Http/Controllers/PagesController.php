<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Page;
use App\Category;
use App\Image;

class PagesController extends Controller
{
    public function index()
    {
        return view( "pages.index" );
    }

    public function all()
    {
        $pages = Page::all();
        foreach( $pages as $page )
        {
            $page->categoryName = $page->category->name;
            $page->imgs = $page->images;
        }
        return json_encode( $pages );
    }

    public function allCategories()
    {
        $categories = Category::all();
        return json_encode( $categories );
    }

    public function allGames()
    {
        $game1[ "Name" ] = "Litter Rush";
        $game1[ "Description" ] = "A game about raising awareness about conservation";
        $game1[ "link" ] = "litter-rush.html";
        $game1[ "img" ] = "https://upload.wikimedia.org/wikipedia/commons/5/5d/Restless_flycatcher04.jpg";

        $games = [ $game1 ];

        return json_encode( $games );
    }

    public function category( $id )
    {
        $category = Category::where( 'id', $id )->first();
        return json_encode( $category );
    }

    public function categoryPages( $id )
    {
        $pages = Page::where( 'category_id', $id )->get();
        foreach( $pages as $page )
        {
            $page->images;
        }
        return json_encode( $pages );
    }

    public function create()
    {

    }

    public function store( Request $request )
    {
        $this->validate( $request, [
            "heading" => "required",
            "text" => "required",
            "image_1" => "image|nullable|max:1999",
            "image_1_alt" => "nullable",
            "image_2" => "image|nullable|max:1999",
            "image_2_alt" => "nullable",
            "image_3" => "image|nullable|max:1999",
            "image_3_alt" => "nullable",
            "image_4" => "image|nullable|max:1999",
            "image_4_alt" => "nullable",
            "image_5" => "image|nullable|max:1999",
            "image_5_alt" => "nullable",
            "image_6" => "image|nullable|max:1999",
            "image_6_alt" => "nullable"
        ]);

        $page = new Page;
        $page->heading = $request->input( 'heading' );
        $page->text = $request->input( 'text' );
        $page->category_id = $request->input( 'category' );

        $page->save();

        $images = [ "image_1", "image_2", "image_3", "image_4", "image_5", "image_6" ];
        $image_alts = [ $request->image_1_alt, $request->image_2_alt, $request->image_3_alt, $request->image_4_alt, $request->image_5_alt, $request->image_6_alt ];

        for( $i = 0; $i < 6; ++$i )
        {
            if( $request->hasFile( $images[ $i ] ) )
            {
                $img = new Image;
                //get filename with ext
                $fileNameWithExt = $request->file( $images[ $i ] )->getClientOriginalName();
                //get filename without ext
                $fileName = pathinfo( $fileNameWithExt, PATHINFO_FILENAME );
                //get extension
                $extension = pathinfo( $fileNameWithExt, PATHINFO_EXTENSION );
                //filename to store
                $fileNameToStore = $fileName . "_" . time() . "." . $extension;
                //upload image
                $path = $request->file( $images[ $i ] )->storeAs( 'public/kiosk_images', $fileNameToStore );
                $img->alt = $image_alts[ $i ];
                $img->image_name = $fileNameToStore;
                $img->page_id = $page->id;

                $img->save();
            }
        }

        return $page;
    }

    public function show( $id )
    {
        $page = Page::find( $id );
        $page->categoryName = $page->category->name;
        $page->image = $page->images;
        $page->img = [ "https://upload.wikimedia.org/wikipedia/commons/5/5d/Restless_flycatcher04.jpg" ];
        return json_encode( $page );
    }

    public function edit( $id )
    {

    }

    public function update( Request $request, $id )
    {

    }

    public function destroy( $id )
    {
        Page::findOrFail( $id )->delete();
    }

    public function test1()
    {
        return view( "pages.test1" );
    }

    public function test2()
    {
        return view( "pages.test2" );
    }

    public function data1()
    {
        $obj[ 'heading' ] = "Kiwi";
        $obj[ 'text' ] = "Kiwis are indigenous to New Zealand. They are small, flightless birds that roam the forest floor. Critically endangered, they require special care.";
        $obj[ 'imgUrl' ] = "https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg";

        $json = json_encode( $obj );

        return $json;
    }

    public function allBirds()
    {
        $obj[ "id" ] = "1";
        $obj[ "heading" ] = "Kiwi";
        $obj[ "text" ] = "Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.";
        $obj[ "img" ] = [ "https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg",
    "https://www.hakaimagazine.com/wp-content/uploads/header-gulf-birds.jpg" ];
        $obj[ "category" ] = "Birds";

        $obj1[ "id" ] = "2";
        $obj1[ "heading" ] = "Kakapo";
        $obj1[ "text" ] = "Kakapo are useless birds.";
        $obj1[ "img" ] = [ "https://www.doc.govt.nz/thumbs/hero/contentassets/22c4c0407c1142ffbd70ef6ff029d722/stella-the-kakapo-codfish-1600.jpg",
                            "https://www.doc.govt.nz/thumbs/hero/contentassets/3165d836813b40b897f7c7cf3551f798/kakapo-chick-dianne-mason-hero.jpg",
                            "http://nzbirdsonline.org.nz/sites/all/files/Kakapo_DvW2007.jpg"
        ];
        $obj1[ "category" ] = "Birds";

        $ob = [ $obj, $obj1 ];

        return json_encode( $ob );
    }

    public function data2( $id )
    {
        
        $obj[ "id" ] = "0";
        $obj[ "heading" ] = "Kiwi";
        $obj[ "text" ] = "Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.Kiwis are small flightless birds that are native to New Zealand. They have long beaks.";
        $obj[ "img" ] = [ "https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg",
    "https://www.hakaimagazine.com/wp-content/uploads/header-gulf-birds.jpg" ];

    $obj1[ "id" ] = "1";
        $obj1[ "heading" ] = "Kakapo";
        $obj1[ "text" ] = "Kakapo are useless birds.";
        $obj1[ "img" ] = [ "https://www.doc.govt.nz/thumbs/hero/contentassets/22c4c0407c1142ffbd70ef6ff029d722/stella-the-kakapo-codfish-1600.jpg",
                            "https://www.doc.govt.nz/thumbs/hero/contentassets/3165d836813b40b897f7c7cf3551f798/kakapo-chick-dianne-mason-hero.jpg",
                            "http://nzbirdsonline.org.nz/sites/all/files/Kakapo_DvW2007.jpg"
        ];

        $ob = [ $obj, $obj1 ];

        return json_encode( $ob[ $id ] );
    }

    public function dataPests()
    {
        $o2[ "id" ] = "2";
        $o2[ "heading" ] = "Stoat";
        $o2[ "text" ] = "Stoats are small weasel creatures that ravage the nests of native endangered species.";
        $o2[ "img" ] = "https://www.rnz.co.nz/assets/news/146558/eight_col_stoat.jpg?1522350517";

        $ob = [ $o2 ];

        return json_encode( $ob );
    }

    public function admin()
    {
        return view( 'pages.admin' );
    }

    public function page( $id )
    {
        return $id;
    }
}