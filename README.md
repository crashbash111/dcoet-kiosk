![image](https://github.com/crashbash111/dcoet-kiosk/assets/50429378/c8442c42-36c6-43fc-8757-6cda7c504f29)

# About
A web-based touch solution developed for the Deep Cove Outdoor Education Trust. Designed to be displayed on touch screen kiosks, and served on a local server on-site with no local internet access.

[![Technologies Used](https://skillicons.dev/icons?i=react,laravel,js,html,css,sass)]([https://skillicons.dev](https://skillicons.dev/icons?i=react,laravel,js,html,css,sass))

## Screenshots

Designed to be easy to use on touch-based kisoks

![animals-category-scroll](https://github.com/crashbash111/dcoet-kiosk/assets/50429378/f135ecc4-6e45-4889-aa21-6abdbef791a5)

Includes a content management system to modify kiosk content

![admin-kioskpages2](https://github.com/crashbash111/dcoet-kiosk/assets/50429378/86149603-36f9-47be-9ee6-3e9421b7fc06)

## How to load project
To load this project you will need to have the following installed on your system:
<ul>
    <li>Composer</li>
    <li>Node.js</li>
    <li>PHP 8.2.4</li>
    <li>MySQL (or other database solution)</li>
</ul>

To set up a branch for general use, run the following:
 - "npm install"
 - "composer install"
 - "composer update"
 - Create an .env file that links to an SQL database. A dump of a basic database is stored in a .SQL file at root.
 - "php artisan storage:link" (You may have to delete the storage directory under /public for this to function correctly.
 - "php artisan key:generate"
 - "php artisan jwt:secret"

Serving the application can be done by running:
 - "npm run dev"
 - "php artisan serve"
