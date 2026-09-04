<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <link type="image/png" href="/favicon.png" rel="icon" />
        <meta name="description" content="Ahmad Zaki Alawi is a Software Engineer & Full-Stack Web Developer specializing in scalable web applications, robust REST APIs, modern frontends, and WebGIS solutions using Laravel, React, and PostgreSQL/MySQL." />
        <meta name="keywords" content="Ahmad Zaki Alawi, Software Engineer, Full-Stack Developer, Web Developer, Laravel, React, JavaScript, TypeScript, REST API, PostgreSQL, MySQL, WebGIS" />
        <meta name="author" content="Ahmad Zaki Alawi" />

        <meta property="og:title" content="Ahmad Zaki Alawi — Software Engineer & Full-Stack Developer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={{ url()->current() }} />
        <meta property="og:image" content="/assets/img/pasfoto.jpg" />
        <meta property="og:description" content="Ahmad Zaki Alawi is a Software Engineer & Full-Stack Web Developer specializing in scalable web applications, robust REST APIs, modern frontends, and WebGIS solutions using Laravel, React, and PostgreSQL/MySQL." />

        <meta name="robots" content="index, follow" />

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
