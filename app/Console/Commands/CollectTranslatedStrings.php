<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CollectTranslatedStrings extends Command
{
    // The name and signature of the console command.
    protected $signature = 'collect:translations';

    // The console command description.
    protected $description = 'Collect all strings wrapped in t() from files in a folder and check against lang/hu.json';

    public function handle()
    {
        // Define the folder path
        $folderPath = resource_path('js');

        // Define the path to the Hungarian translations file
        $langFilePath = lang_path('en.json');

        // Check if the lang file exists
        if (!File::exists($langFilePath)) {
            $this->error("The file {$langFilePath} does not exist.");
            return;
        }

        // Load the existing translations from the Hungarian language file
        $existingTranslations = json_decode(File::get($langFilePath), true);

        // Check if JSON decoding is successful
        if ($existingTranslations === null) {
            $this->error("Failed to decode JSON from {$langFilePath}.");
            return;
        }

        // Check if the folder exists
        if (!File::exists($folderPath)) {
            $this->error("The folder {$folderPath} does not exist.");
            return;
        }

        // Collect all files in the directory and subdirectories
        $files = File::allFiles($folderPath);

        $strings = [];

        // Loop through each file and search for t() wrapped strings
        foreach ($files as $file) {
            $content = File::get($file);

            // Improved regex to capture strings inside t() function
            preg_match_all('/t\s*\(\s*[\'"]([^\'"]+)[\'"]\s*\)/', $content, $matches);

            if ($matches && isset($matches[1])) {
                $strings = array_merge($strings, $matches[1]);
            }
        }

        // Remove duplicates
        $strings = array_unique($strings);

        // If we found strings, display them and check if they exist in the hu.json file
        if (!empty($strings)) {
            $this->info("Found the following translations:");

            foreach ($strings as $string) {
                // Check if the string is not already in the existing Hungarian translations
                if (!array_key_exists($string, $existingTranslations)) {
                    $this->line($string);
                }
            }
        } else {
            $this->info("No translations found.");
        }
    }
}
