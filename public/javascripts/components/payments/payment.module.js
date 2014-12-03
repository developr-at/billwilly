(function () {
	'use strict';

	angular
		.module('app.payments', [
	    	'googlechart',
	    	'smart-table',
		])
	    .config(config);

	function config($stateProvider) {
		$stateProvider.state('payments', {
			url: '/payments',
			templateUrl: 'views/payments.ejs',
			controller: 'PaymentCtrl as payment'
		});
	}

})();