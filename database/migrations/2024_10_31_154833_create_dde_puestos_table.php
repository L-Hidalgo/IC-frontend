<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('dde_puestos', function (Blueprint $table) {
            $table->increments('id_puesto');
            $table->integer('item_puesto')->nullable();
            $table->string('denominacion_puesto', 50)->nullable();
            $table->integer('salario_puesto')->nullable();
            $table->string('salario_literal_puesto', 50)->nullable();
            $table->text('objetivo_puesto')->nullable();
            $table->unsignedInteger('estado_id'); 
            $table->unsignedInteger('departamento_id');
            $table->unsignedInteger('persona_actual_id')->nullable();
            $table->integer('persona_anterior_id')->nullable()->unsigned();
            $table->timestamps();
            $table->timestamp('fecha_inicio')->nullable()->default(null);
            $table->timestamp('fecha_fin')->nullable()->default(null);
        
            $table->foreign('departamento_id')->references('id_departamento')->on('dde_departamentos');
            $table->foreign('estado_id')->references('id_estado')->on('dde_estados');
            $table->foreign('persona_actual_id')->references('id_persona')->on('dde_personas')->nullable(); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dde_puestos');
    }
};
