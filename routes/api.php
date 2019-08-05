<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

\Illuminate\Support\Facades\Route::get('/info', function () {
    return response()->json([
        'version' => '0.0.0-alpha',
        'laravel_version' => \Illuminate\Foundation\Application::VERSION,
    ]);
});

\Illuminate\Support\Facades\Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
