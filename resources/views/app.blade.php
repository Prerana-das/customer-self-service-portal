<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Customer Self Service Portal</title>

    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="manifest" href="/manifest.json">
    <script src="{{ asset('js/jquery.min.js') }}" ></script>
    {{-- @routes --}}
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/Website/app.jsx'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
