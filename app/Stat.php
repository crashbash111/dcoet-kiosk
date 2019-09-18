<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{
    public function page()
    {
        return $this->belongsTo( Page::class );
    }
}
