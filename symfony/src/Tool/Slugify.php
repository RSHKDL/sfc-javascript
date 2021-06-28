<?php

namespace App\Tool;

/**
 * Class Slugify
 * Transliterate does not work :
 * @see https://github.com/nunomaduro/phpinsights/issues/43
 */
final class Slugify
{
    public function slugify(string $text, bool $slug = true): string
    {
        // replace non letter or digits by - or _
        if ($slug) {
            $text = preg_replace('#[^\\pL\d]+#u', '-', $text);
        } else {
            $text = preg_replace('#[^\\pL\d]+#u', '_', $text);
        }
        // trim
        $text = trim($text, '-');
        // transliterate
        /*
        if (function_exists('iconv'))
        {
            $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        }*/
        // lowercase
        $text = strtolower($text);
        // remove unwanted characters
        return preg_replace('#[^-\w]+#', '', $text);
    }
}