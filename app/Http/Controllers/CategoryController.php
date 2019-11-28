<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;
use App\Page;
use App\Stat;
use App\Image;
use App\Audio;
use App\Http\Controllers\PagesController;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:users", ["except" => ["index", "show"]]);
    }

    public function index()
    {
        $categories = Category::all();
        foreach ($categories as $category) {
            $category->numPages = Page::where("category_id", $category->id)->count();
        }
        return json_encode($categories);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            "name" => "required",
            "description" => "required"
        ]);

        $category = new Category;
        $category->name = $request->input("name");
        $category->description = $request->input("description");

        $category->save();

        return $category;
    }

    public function show($id)
    {
        $category = Category::find($id);
        $category->numPages = Page::where("category_id", $id)->count();
        return json_encode($category);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "required",
            "description" => "required"
        ]);

        $category = Category::find($id);

        $category->name = $request->input("name");
        $category->description = $request->input("description");

        $category->save();
    }

    public function destroy($id, $reassign)
    {
        //return $reassign;
        $category = Category::find($id);
        if ($reassign != -1) {
            $pages = Page::where('category_id', $id)->get();
            foreach ($pages as $page) {
                $page->category_id = intval($reassign);
                $page->save();
            }
        } else {
            $pages = Page::where('category_id', $id)->get();
            foreach ($pages as $page) {
                $stats = Stat::where('page_id', $page->id)->get();
                foreach ($stats as $stat) {
                    $stat->delete();
                }
                $images = Image::where('page_id', $page->id)->get();
                foreach ($images as $image) {
                    unlink(storage_path('app/public/kiosk_images/' . $image->image_name));
                    unlink(storage_path('app/public/kiosk_images/' . $image->thumbnail_small));
                    unlink(storage_path('app/public/kiosk_images/' . $image->thumbnail_medium));
                    unlink(storage_path('app/public/kiosk_images/' . $image->thumbnail_large));
                    $image->delete();
                }
                $audios = Audio::where('page_id', $page->id)->get();
                foreach ($audios as $audio) {
                    unlink(storage_path('app/public/audio_files/' . $audio->filepath));
                    $audio->delete();
                }
                Page::findOrFail($page->id)->delete();
            }
        }
        $category->delete();
        return "Done";
        //return json_encode( $category );
    }

    //create store edit update show delete
}
