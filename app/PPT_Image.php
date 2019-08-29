<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PPT_Image extends Model
{
    //

    public function powerpoint()
    {
        return $this->belongsTo( Powerpoint::class );
    }
}
