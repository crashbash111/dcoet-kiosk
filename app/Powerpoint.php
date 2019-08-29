<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Powerpoint extends Model
{
    //

    public function ppt_images()
    {
        return $this->hasMany( PPT_Image::class );
    }
}
