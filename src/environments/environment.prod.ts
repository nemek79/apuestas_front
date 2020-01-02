export const environment = {
  production: true,
  urlBase: 'http://vir2al.es:8180/api/',
  version: 'v0.7',
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
