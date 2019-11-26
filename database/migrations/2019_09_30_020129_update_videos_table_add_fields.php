<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateVideosTableAddFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('videos', function (Blueprint $table)
        {
            $table->string( "title" );
            $table->string( "description" );
            $table->string( "copyright" );
            $table->integer( "size" ); //size measured in bytes
            $table->integer( "length" ); //length measured in seconds
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('videos', function (Blueprint $table)
        {
            $table->dropColumn( "title" );
            $table->dropColumn( "description" );
            $table->dropColumn( "copyright" );
        });
    }
}
