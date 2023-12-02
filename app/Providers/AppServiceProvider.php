<?php
namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Inertia::share('user', function (Request $request) {
            return $request->session()->get('user') ? $request->session()->get('user') : null;
        });
    }
}
