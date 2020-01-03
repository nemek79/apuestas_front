// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlBase: 'http://localhost:8180/api/',
  urlEstadisticasBase: 'http://localhost:8181/api/',
  version: 'v0.7.0',
  datatableOptions: {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    language: {
      processing:     'cargando...',
      search:         'Buscar',
      lengthMenu:    'Mostrar _MENU_ registros',
      info:           'Mostrando _START_ a _END_ de _TOTAL_ registros',
      infoEmpty:      'Mostrando 0 a 0 de 0 registros',
      infoFiltered:   '(filtrado de _MAX_ elementos en total)',
      infoPostFix:    '',
      loadingRecords: 'Cargando datos...',
      zeroRecords:    'No se han encontrado datos.',
      emptyTable:     'No se han encontrado datos',
      paginate: {
          first:      'Primero',
          previous:   'Anterior',
          next:       'Siguiente',
          last:       'Último'
      },
      aria: {
          sortAscending:  '',
          sortDescending: ''
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
