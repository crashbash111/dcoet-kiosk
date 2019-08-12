<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    public function category()
    {
        return $this->belongsTo( Category::class );
    }

    public function images()
    {
        return $this->hasMany( Image::class );
    }
}
