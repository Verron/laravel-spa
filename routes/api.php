<?php

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Foundation\Application;

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

Route::get('/info', function () {
    $vueRouter = [];

    if (File::exists(base_path('node_modules/vue-router/package.json'))) {
        $vueRouter = json_decode(File::get(base_path('node_modules/vue-router/package.json')), true);
    }

    return response()->json([
        'version' => '0.1.0-alpha',
        'laravel_version' => Application::VERSION,
        'vue_router_version' => Arr::get($vueRouter, 'version', null),
    ]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
