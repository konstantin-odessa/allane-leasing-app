# AllaneLeasingApp

This is a leasing application that allows users to manage leasing contracts, vehicles, and customers. The application provides full CRUD (Create, Read, Update, and Delete) functionality for all of these entities, enabling users to easily add, view, modify, and remove data as needed. However, please note that there may be some limitations with the CRUD functionality due to known issues (please see the known issues section for more information).

### Known Issues

There are some restrictions with the backend docker image that affect PUT and DELETE operations due to CORS limitations. As the front end app operates on port `4200` and the docker image runs on port `8080`, a CORS issue arises. As a result, only retrieval and creation operations are currently available.

### How to deploy project locally

- Run bash script `docker-be-starter.sh`. It will start docker image locally.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
