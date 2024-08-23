<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Puesto;
use App\Models\Requisito;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PuestoController extends Controller
{
    public function getList()
    {
        $puestos = Puesto::select(['denominacion_puesto', 'item_puesto', 'id'])->get();
        return $this->sendSuccess($puestos);
    }

    public function getById($puestoId)
    {
        $puesto = Puesto::with(['persona_actual'])->select(['denominacion_puesto', 'item_puesto', 'id', 'persona_actual_id'])->find($puestoId);
        return $this->sendSuccess($puesto);
    }

    public function getByItem($item_puesto)
    {
        $puesto = Puesto::where('item_puesto', $item_puesto)
            ->with('departamento', 'departamento.gerencia', 'persona_actual')
            ->first();

        if ($puesto) {
           // RECODE: solo deberia asignarse cuando el puesto cambie de responsable
            // if ($puesto->persona_actual_id) {
            //     $puesto->persona_anterior_id = $puesto->persona_actual_id;

            //     $puesto->save();
            // }


            // recuperar interinos
            // 'fch_inicio_interinato',  //importante
            // 'fch_fin_interinato',     //importante
            $puesto->interinos = $puesto->interinos()->where('fch_inicio_interinato', '<=', Carbon::now()->toDateString())->where('fch_fin_interinato', '>=', Carbon::now()->toDateString())->where('estado_designacion_interinato', 0)->get();

            return $this->sendObject($puesto);
        } else {
            return null;
        }
    }

    public function getByItemActual($item_puesto)
    {
        $puesto = Puesto::where('item_puesto', $item_puesto)
            ->with('departamento', 'departamento.gerencia', 'persona_actual')
            ->first();

        if ($puesto) {
            if ($puesto->persona_actual_id) {

                $puesto->persona_anterior_id = $puesto->persona_actual_id;

                $puesto->save();
            }
            return $this->sendObject($puesto);
        } else {
            return null;
        }
    }


    public function getRequisitoPuesto($puestoId)
    {
        $requisito = Requisito::where('puesto_id', $puestoId)->first();
        return $this->sendObject($requisito);
    }

    public function getPuestoDetalle(){
        $totalPuestos = Puesto::count();

        $puestosOcupados = Puesto::where('estado_id', 2)->count();

        $puestosAcefalos = Puesto::where('estado_id', 1)->count();

        return [
            'total_puestos' => $totalPuestos,
            'puestos_ocupados' => $puestosOcupados,
            'puestos_acefalos' => $puestosAcefalos
        ];
    }
}
