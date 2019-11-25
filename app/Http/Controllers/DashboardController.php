<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Page;
use App\Category;
use App\Powerpoint;
use App\Video;

class DashboardController extends Controller
{
    public function mostViewed()
    {
        $pages = Page::orderBy("times_viewed", "desc")->take(3)->get();

        foreach ($pages as $page) {
            $page->categoryname = Category::find($page->category_id)->name;
        }

        return json_encode($pages);
    }

    public function leastViewed()
    {
        $pages = Page::orderBy("times_viewed", "asc")->take(3)->get();

        foreach ($pages as $page) {
            $page->categoryname = Category::find($page->category_id)->name;
        }

        return json_encode($pages);
    }

    public function misc()
    {
        $pagesCount = Page::all()->count();
        $categoriesCount = Category::all()->count();
        $presentationsCount = Powerpoint::all()->count();
        $videosCount = Video::all()->count();
        $misc = [
            "pagesCount" => $pagesCount,
            "categoriesCount" => $categoriesCount,
            "presentationsCount" => $presentationsCount,
            "videosCount" => $videosCount
        ];
        return json_encode( $misc );
    }
}
