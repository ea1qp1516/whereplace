
/* Setup general page controller */
MetronicApp.controller('GeneralPageController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, $cookieStore) {
    $scope.$on('$viewContentLoaded', function() {
    	// initialize core components
    	Metronic.initAjax();
    });


}]);
