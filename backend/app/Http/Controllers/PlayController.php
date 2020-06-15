<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class PlayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all(['id', 'name', 'score', 'photo', 'seal','longitude', 'latitude']);
    }

    public function play(Request $request)
    {
        $numberOfMoves = $this->numberOfMoves($request);
        if ($numberOfMoves != null) {
            $getPlay = $this->getPlay($request);
            if ($request->value == $getPlay) {
                $this->resetPlay($request);
                return response()->json(['hit' => true, 'suggestion' => 0, 'moves' => $numberOfMoves]);
            } else if ($request->value > $getPlay) {
                $this->addMoves($request);
                return response()->json(['hit' => false, 'suggestion' => -1, 'moves' => $numberOfMoves, 'a' => $request->cookie('lumen_session')]);
                
            } else {
                $this->addMoves($request);
                return response()->json(['hit' => false, 'suggestion' => 1, 'moves' => $numberOfMoves]);
            }
        } else {
            return response()->json(['hit' => false, 'suggestion' => 0, 'moves' => $numberOfMoves, 'a' => $request->cookie('lumen_session')]);
        }
        
    }

    public function start(Request $request)
    {
        $session = $request->session();
        $session->put('play', random_int(0, 1000));
        $session->put('moves', 1);
    }

    private function getPlay(Request $request)
    {
        $session = $request->session();
        return $session->get('play');
    }

    private function numberOfMoves(Request $request)
    {
        $session = $request->session();
        return $session->get('moves');
    }

    private function addMoves(Request $request)
    {
        $session = $request->session();
        $num = $session->get('moves');
        $session->put('moves', $num + 1);
    }

    private function resetPlay(Request $request)
    {
        $session = $request->session();
        $session->put('moves', null);
    }

}
