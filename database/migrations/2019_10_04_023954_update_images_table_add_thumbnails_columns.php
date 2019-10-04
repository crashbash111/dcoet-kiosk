<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateImagesTableAddThumbnailsColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('images', function (Blueprint $table)
        {
            $table->string( "thumbnail_small" )->nullable();
            $table->string( "thumbnail_medium" )->nullable();
            $table->string( "thumbnail_large" )->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('images', function (Blueprint $table)
        {
            $table->dropColumn( "thumbnail_small" );
            $table->dropColumn( "thumbnail_medium" );
            $table->dropColumn( "thumbnail_large" );
        });
    }
}
