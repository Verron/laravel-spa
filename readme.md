1. git clone git@github.com:Verron/laravel-spa.git
2. Setup .env (database connection)
3. composer install
4. php artisan migrate
5. Setup User (example below can be called in tinker)
    ```php
    \App\User::create(['email'=>'setup@system.local', 'password'=>bcrypt('setup'),'name'=>'Setup User']);
    ```
6. php artisan passport:install
7. npm install
8. npm run dev
9. php artisan serve
