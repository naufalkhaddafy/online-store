<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = \Spatie\Permission\Models\Role::create([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);

        \App\Models\User::find(1)->assignRole($role);
    }
}
