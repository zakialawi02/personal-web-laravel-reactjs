<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <link type="image/png" href="/favicon.png" rel="icon" />
        <meta name="description" content="Zakialawi Personal Blog & web platform" />
        <meta name="keywords" content="resume,  portfolio, cv, ahmad zaki alawi, zakialawi, blog, personal, web, developer, laravel, wep programming, webgis, gis, geospatial, surveyor, tutorials, tips, ahmad zaki alawi, geomatika, geomatics, geography" />
        <meta name="author" content="Ahmad Zaki Alawi" />

        {{-- <meta property="og:title" content="Ahmad Zaki Alawi" /> --}}
        {{-- <meta property="og:type" content="website" /> --}}
        {{-- <meta property="og:url" content="https://ahmadzaki.me" /> --}}
        {{-- <meta property="og:image" content="/favicon.png" /> --}}
        {{-- <meta property="og:description" content="This is a page specific description" /> --}}

        {{-- <meta name="robots" content="index, follow" /> --}}

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>

    <body class="font-sans antialiased" style="margin-bottom: 0 !important">
        @inertia
    </body>

</html>
