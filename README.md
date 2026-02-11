### Tech Stack

#### Backend:

Laravel 12 (PHP Framework)

Sanctum (API Token Authentication)

MySQL 

#### Frontend:

React 19

Inertia.js (Laravel + React integration)

TailwindCSS (Responsive UI)

Axios (HTTP client)

#### Other Tools:

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
php artisan migrate:fresh
```

### Seeder Command

```shell
php artisan db:seed
```

The seeder generates:

#### Please use default user credentials for testing
1 default user

Email: test@example.com

Password: password

```shell
Email: test@example.com
Password: password
```

3 customers

2 users per customer

2 sites per customer

2 meters per site

2 bills per site

### Important note

For a better understanding of the API endpoints and the overall code flow, please refer to the following documents:  
- `CodeFlow.txt` – explains the project’s code structure and workflow, using examples like registration. 
- `APIDocumentation.txt` – contains detailed information about some API endpoints and how to test them.  
 