<?php

namespace Database\Seeders;

use App\Contracts\RajaOngkir\LocationInterface;
use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubdistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(LocationInterface $location): void
    {
        City::get()->each(function ($city) use ($location) {
            $response = $location->getSubdistrict($city);
            $subdistricts = collect($response['rajaongkir']['results']);
            $this->commarnd->getOutput()->progressStart(count($subdistricts));
            $subdistricts->each(function ($subdistrict) use ($city) {
                $city->subdistricts()->create([
                    'id' => $subdistrict['subdistrict_id'],
                    'name' => $subdistrict['subdistrict_name'],
                ]);
                $this->command->getOutput()->progressAdvance();
            });
            $this->command->getOutput()->progressFinish();
        });
    }
}
