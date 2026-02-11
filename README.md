### Tech Stack

##### Backend:

Laravel 12 (PHP Framework)

Sanctum (API Token Authentication)

MySQL 

##### Frontend:

React 19

Inertia.js (Laravel + React integration)

TailwindCSS (Responsive UI)

Axios (HTTP client)

##### Other Tools:

Vite (Frontend bundler)

Composer (PHP dependency manager)

npm / Node.js (JS dependency manager)

### Setup Instructions & Run command

```shell
composer install
```

```shell
npm install
```

```shell
php artisan serve
```

```shell
npm run dev
```

### Migration command

For Migration

```shell
php artisan migrate
```

For fresh ( Drop all existing table & migrate again)

```shell
php artisan migrate --fresh
```

### Seeder Command

```shell
php artisan db:seed
```

The seeder generates:

1 default user

Email: test@example.com

Password: password

3 customers

2 users per customer

2 sites per customer

2 meters per site

2 bills per site