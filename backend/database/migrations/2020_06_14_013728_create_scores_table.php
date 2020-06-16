<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->bigInteger('id_user')->unsigned();
            $table->integer('created');
            $table->float('score');
            $table->integer('attempts');
            $table->timestamps();

            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');

            $table->primary(['id_user', 'created']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scores');
    }
}
