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

    public function audio()
    {
        return $this->hasMany( Audio::class );
    }

    public function stats()
    {
        return $this->hasMany( Stat::class );
    }
}
