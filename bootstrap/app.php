<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
        //this is new middleware that i created it
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleCheck::class,

        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Register the custom exception handler popup.
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (app()->environment('production') && in_array($response->getStatusCode(), [500, 503, 401, 404, 403])) {
                return Inertia::render('Errors', ['status' => $response->getStatusCode()])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            } elseif (app()->environment('production') && $response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
    })->create();
