<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Illuminate\Support\Facades\Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

Illuminate\Support\Facades\Route::post('/login', 'Auth\LoginController@login');
Illuminate\Support\Facades\Route::post('/logout', 'Auth\LoginController@logout');