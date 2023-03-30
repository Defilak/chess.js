<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit39254bb1ca55ec65afc1d63d732749b4
{
    public static $prefixLengthsPsr4 = array (
        'D' => 
        array (
            'Defi\\Chess\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Defi\\Chess\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit39254bb1ca55ec65afc1d63d732749b4::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit39254bb1ca55ec65afc1d63d732749b4::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit39254bb1ca55ec65afc1d63d732749b4::$classMap;

        }, null, ClassLoader::class);
    }
}
