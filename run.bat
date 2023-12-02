@echo off
start cmd /k "npm run dev"
start cmd /k "php artisan serve"
start cmd /k "php artisan queue:work"
