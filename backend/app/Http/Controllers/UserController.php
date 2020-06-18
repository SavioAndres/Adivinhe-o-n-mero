<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //php artisan make:controller UserController --resource

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function showMe(Request $request)
    {
        return User::findOrFail($request->userid);
    }

    public function scores(Request $request, $id)
    {
        return Score::where('id_user', $id)->get();
    }

}
