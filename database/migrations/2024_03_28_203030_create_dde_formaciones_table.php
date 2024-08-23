<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dde_formaciones', function (Blueprint $table) {
            $table->integer('id_formacion')->unsigned()->autoIncrement();
            $table->integer('persona_id')->unsigned();
            $table->integer('institucion_id')->nullable()->unsigned();
            $table->integer('grado_academico_id')->nullable()->unsigned();
            $table->integer('area_formacion_id')->nullable()->unsigned();
            $table->date('gestion_formacion')->nullable();
            $table->string('estado_formacion', 10)->nullable(); //si es irregular o carrera
            $table->timestamps();
            $table->timestamp('fecha_inicio')->nullable()->default(null);
            $table->timestamp('fecha_fin')->nullable()->default(null);

            $table->foreign('grado_academico_id')->references('id_grado_academico')->on('dde_grado_academicos');
            $table->foreign('area_formacion_id')->references('id_area_formacion')->on('dde_area_formaciones')->onDelete('cascade');    
            $table->foreign('institucion_id')->references('id_institucion')->on('dde_instituciones');         
            $table->foreign('persona_id')->references('id_persona')->on('dde_personas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dde_formaciones');
    }
};
