<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Score;

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
                $this->winner($request);
                $this->resetPlay($request);
                return response()->json(['hit' => true, 'suggestion' => 0, 'moves' => $numberOfMoves, 'gif' => $this->gif('congratulations')]);
            } else if ($request->value > $getPlay) {
                $this->addMoves($request);
                return response()->json(['hit' => false, 'suggestion' => -1, 'moves' => $numberOfMoves, 'gif' => $this->gif('missed')]);
                
            } else {
                $this->addMoves($request);
                return response()->json(['hit' => false, 'suggestion' => 1, 'moves' => $numberOfMoves, 'gif' => $this->gif('missed')]);
            }
        } else {
            //$request->cookie();
            $this->start($request);
            return response()->json(['hit' => false, 'suggestion' => 0, 'moves' => $numberOfMoves]);
        }
        
    }

    private function start(Request $request)
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

    private function winner(Request $request)
    {
        $numMoves = (int) $this->numberOfMoves($request);
        $user = User::where('id', $request->userid)->first();
        $user->score = $user->score + (1 / $numMoves);
        $user->update();
        $date = new \DateTime();
        $score = new Score;
        $score->id_user = $request->userid;
        $score->created = $date->getTimestamp();
        $score->score = $user->score;
        $score->attempts = $numMoves;
        $score->save();
        return $user;
    }

    private function gif($result)
    {
        if ($result == 'missed') {
            $url = 'http://api.giphy.com/v1/gifs/random?tag=sad&api_key=cukiTAAFqsEo4jHogANyyEMYcPrye0ZF&limit=1';
        } else {
            $url = 'http://api.giphy.com/v1/gifs/random?tag=congratulations&api_key=cukiTAAFqsEo4jHogANyyEMYcPrye0ZF&limit=1';
        }
        $get = file_get_contents($url);
        $json = json_decode($get, true);
        return $json['data']['images']['downsized_large']['url'];
    }

}
