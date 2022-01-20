/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./resources/assets/js/job_expired/job_expired.js ***!
  \********************************************************/
$(document).ready(function () {
  var tableName = '#jobsExpiredTbl';
  $(tableName).DataTable({
    processing: true,
    serverSide: true,
    'order': [[0, 'asc']],
    ajax: {
      url: expiredJobsUrl
    },
    columnDefs: [{
      'targets': [3],
      'orderable': false,
      'className': 'text-center',
      'width': '9%'
    }, {
      'targets': [2],
      'width': '15%'
    }, {
      'targets': [1],
      'width': '15%'
    }],
    columns: [{
      data: function data(row) {
        var element = document.createElement('textarea');
        var url = jobsUrl + '/' + row.id;
        element.innerHTML = row.job_title;
        return '<a href="' + url + '">' + element.value + '</a>';
      },
      name: 'job_title'
    }, {
      data: function data(row) {
        return moment(row.created_at, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, YYYY');
      },
      name: 'created_at'
    }, {
      data: function data(row) {
        var todayDate = new Date().toISOString().split('T')[0];

        if (todayDate > row.job_expiry_date) {
          return '<span class="text-danger">' + moment(row.job_expiry_date, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, YYYY') + '</span>';
        }

        return moment(row.job_expiry_date, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, YYYY');
      },
      name: 'job_expiry_date'
    }, {
      data: function data(row) {
        var url = jobsUrl + '/' + row.id;
        var data = [{
          'id': row.id,
          'url': url + '/edit'
        }];
        return prepareTemplateRender('#jobsExpired', data);
      },
      name: 'id'
    }]
  });
});
$(document).on('click', '.delete-btn', function (event) {
  var tableName = '#jobsExpiredTbl';
  var jobId = $(event.currentTarget).data('id');
  deleteItem(jobsUrl + '/' + jobId, tableName, Lang.get('messages.job.expired_job'));
});
/******/ })()
;