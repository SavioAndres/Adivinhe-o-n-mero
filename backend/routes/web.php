<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return 'Área de backend da aplicação \'Adivinhe o número\'';
});

$router->post('createaccount', 'AccountController@store');
$router->post('login', 'AccountController@authenticate');
$router->get('ranking', 'PlayController@index');

$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->put('editaccount', 'AccountController@edit');
    $router->delete('deleteccount', 'AccountController@delete');
    $router->post('play', 'PlayController@play');
    $router->get('user', 'UserController@showMe');
    $router->get('user/{id}', 'UserController@show');
    $router->get('scoresuser/{id}', 'UserController@scores');
    $router->put('updateaccount', 'AccountController@update');
    $router->delete('deleteaccount', 'AccountController@destroy');
});