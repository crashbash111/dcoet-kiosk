<img src="http://www.deepcovehostel.co.nz/graphics/logo.png" alt="Deep Cove Logo">
## How to load project
To load this project you will need to have the following installed on your system:
<ul>
    <li>Composer</li>
    <li>Laravel</li>
    <li>Node.js</li>
    <li>Database Software such as MySQL</li>
    <li>Something to serve the application such as Apache</li>
</ul>

To set up a branch for general use, run the following:
 - "npm install"
 - "composer install"
 - "composer update"
 - Create an .env file that links to an SQL database. A dump of a basic database is stored in a .SQL file at root.
 - "php artisan storage:link" (You may have to delete the storage directory under /public for this to function correctly.

Serving the application can be done by running:
 - "npm run dev"
 - "php artisan serve"
