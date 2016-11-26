angular.module('Service',[])

.service('Dinner',['$http',"$rootScope",function  ($http,$rootScope) {
			return{
				"getList":function  () {
					$http.get("groups.json",{})
					.then(function  (res) {
//						console.log(res);
						$rootScope.$broadcast("dinnerList",res.data)
					},function  (error) {
						console.log(error)
					})
				}
			}
		}])