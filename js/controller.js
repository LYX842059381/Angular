angular.module('Controller',[])

.controller('homeController',["$scope","Dinner",function  ($scope,Dinner) {
//			Dinner.dinnerList();
//			$scope.$on("resData",function  (event,keys) {
//				$scope.allData = keys;
//				
//				
//				$scope.resList = keys[0].items;
//				$scope.dinnerTitle = keys[0].name;
//				
//				
//			if(localStorage.dinner){
//
//				arr = JSON.parse(localStorage.dinner);
//
//				//把存储在localStorage里面的数量赋值给$scope.list
//
//				for(var i=0;i<arr.length;i++){
//					for(var j=0;j<$scope.resList.length;j++){
//						if($scope.resList[j].name == arr[i].name){
//							$scope.resList[j].num = arr[i].num;
//						}
//					};
//
//
//					$scope.totalNum += arr[i].num;
//				};
//					
//			};
//			})
//			
//			
//			var q =0;
//			$scope.change = function  (idx) {
//
//				$scope.allData[q].ifChose = false;
//				
//				$scope.allData[idx].ifChose = true;
////				console.log($scope.allData[idx])
//				q=idx;
//				
//				$scope.resList = $scope.allData[idx].items;
//				$scope.dinnerTitle = $scope.allData[idx].name;
//				
//				
//			if(localStorage.dinner){
//
//				arr = JSON.parse(localStorage.dinner);
//
//				//把存储在localStorage里面的数量赋值给$scope.list
//
//				for(var i=0;i<arr.length;i++){
//					for(var j=0;j<$scope.resList.length;j++){
//						if($scope.resList[j].name == arr[i].name){
//							$scope.resList[j].num = arr[i].num;
//						}
//					};
//
//				};
//
//			};
//			
//		}
//			
//			
//			
//			
//			$scope.totalNum = 0;
////			$scope.totalPrice = 0;
//			var arr = [];
//			if ($scope.totalNum = 0) {
//				$scope.ifon = false;
//				console.log($scope.totalNum)
//				console.log($scope.ifon)
//			}else{
//				$scope.ifon = true;
//			}
//			
//			$scope.tianjia = function  (index) {
//				++$scope.totalNum;
//				++$scope.resList[index].num;
//
//				var oturn = false;
//				angular.forEach(arr,function(val,key){
//					if(val.name == $scope.resList[index].name){
//
//						oturn = true;
//					}
//				});
//
//				if(!oturn){
//					arr.push($scope.resList[index]);
//				};
//				
//				localStorage.dinner = angular.toJson(arr);
//			}
//			
//			$scope.jianshao = function  (index) {
//				if($scope.resList[index].num <= 0){
//					$scope.resList[index].num = 0;
//				}else{
//					--$scope.resList[index].num;
//					
//					//计算当前的总数
//					$scope.totalNum -=1;
//
//					//把localStorage里面的数据提出来
//					var arr = [];
//					arr = JSON.parse(localStorage.dinner);
//
//					angular.forEach(arr,function(val,key){
//						if(val.name == $scope.resList[index].name){
//							--val.num;	
//						}
//						
//					});
//
//					localStorage.dinner = JSON.stringify(arr);
//					
//				}
//			}

			//页面已进入，总价默认为0
			$scope.totalPrice = 0;
			//页面一进入，总数默认为0
			$scope.totalNum = 0;

			getTotalPrice();


			//默认导航第一个显示
			var i = 0;

			//来调用数据请求的接口
			//同步/异步
			//ajax 异步的
			Dinner.getList();

			//定时器
			$scope.$on('dinnerList', function(event,data){
				//获取整个的数据 data
				$scope.allData = data;

				//默认显示主菜的数据
				//dinnerList 右侧列表的变量
				$scope.dinnerList = data[0].items;  //菜品数据
				$scope.dinnerTitle = data[0].name;  //右侧的标题

				//给右侧数据添加一个num变量
				angular.forEach($scope.dinnerList,function(val,key){
					val.num = 0;
				});


				init();

			});

			function init(){
				//页面已进入就要判断localStorage有没有存储商品
				if(localStorage.dinner){
					var arr = [];
					arr = JSON.parse(localStorage.dinner);

					for(var i=0;i<arr.length;i++){
						for(var j=0;j<$scope.dinnerList.length;j++){
							if($scope.dinnerList[j].id == arr[i].id){
								$scope.dinnerList[j].num = arr[i].num
							}
						}
					};
				}
			};
				

			//菜单点击事件
			$scope.changeNav = function(index){
				//index 当前菜单的索引

				//第一种实现方式
					//首先把所有菜单的数据里面的ifChose改为false
					// angular.forEach($scope.allData,function(val,key){
					// 	val.ifChose = false;
					// });
					//把当前点击的菜单数据ifChose改成true
					//$scope.allData[index].ifChose = true;

				//第二种实现方式
					//把之前激活的导航先给他去掉
					$scope.allData[i].ifChose = false;

					//把当前点击的菜单数据ifChose改成true
					$scope.allData[index].ifChose = true;

					//把当前的索引赋值给i
					i = index;

				//把右侧的菜品数据，切换成当前点击的导航下的菜品数据
				$scope.dinnerList = $scope.allData[index].items;
				//处理右侧标题
				$scope.dinnerTitle = $scope.allData[index].name;

				//给右侧数据添加一个num变量
				angular.forEach($scope.dinnerList,function(val,key){
					val.num = 0;
				});

				init();
			};


			//菜品加数量的方法
			$scope.add = function(index){
				++$scope.dinnerList[index].num;
				//当前点击的菜品数据 $scope.dinnerList[index]

				//计算当前的总价
				$scope.totalPrice += $scope.dinnerList[index].price;
				//计算当前的总数
				$scope.totalNum +=1;

				var arr = [];
				//首先得判断localStorage.dinner有没有数据，如果没有数据直接把他解析出来，会报错
				if(localStorage.dinner){
					arr = JSON.parse(localStorage.dinner);
				};
				

				//判断当前菜品数据在localStorage.dinner里面有没有，如果有，就直接把他的数量加1
				var flag = true;
				for(var i=0;i<arr.length;i++){
					if(arr[i].id == $scope.dinnerList[index].id){
						++arr[i].num;
						flag = false;
					}
				};

				//如果没有存储当前菜品数据，那就把当前数据push到arr
				if(flag){
					arr.push($scope.dinnerList[index]);
				};
				

				localStorage.dinner = JSON.stringify(arr);

			};


			//菜品减法
			$scope.reduce = function(index){

				if($scope.dinnerList[index].num <= 0){
					$scope.dinnerList[index].num = 0;
				}else{
					--$scope.dinnerList[index].num;
					//计算当前的总价
					$scope.totalPrice -= $scope.dinnerList[index].price;
					//计算当前的总数
					$scope.totalNum -=1;
					//把localStorage里面的数据提出来
					var arr = [];
					arr = JSON.parse(localStorage.dinner);

					angular.forEach(arr,function(val,key){
						if(val.id == $scope.dinnerList[index].id){
							--val.num;
						}
					});

					localStorage.dinner = JSON.stringify(arr);
				}
			};
			
			localStorage.zongshu = JSON.stringify($scope.totalNum)

			//计算总价以及总数
			function getTotalPrice(){
				var arr = [];
				if(localStorage.dinner){
					arr = JSON.parse(localStorage.dinner);
				}
				

				angular.forEach(arr,function(val,key){
					$scope.totalPrice += val.num*val.price;
					$scope.totalNum += val.num;
				})
			}
			

		}])


.controller('indentController',['$scope',function  ($scope) {
	$scope.ifchose = false;
	$scope.tan = function  () {
		$scope.ifchose = true;
	}
	
	$scope.quxiao = function  () {
		$scope.ifchose = false;
	}
//	
//			$scope.shopList = JSON.parse(localStorage.dinner);
//			
////			if($scope.shopList[index].num == 0){
////					$scope.shopList.splice(index,1)
////				};
//
//			//减法
//			$scope.jian = function(index){
//				--$scope.shopList[index].num;
//
//				if($scope.shopList[index].num == 0){
//					$scope.shopList.splice(index,1)
//				};
//
//
//				//把当前修改好了的数据，再把它存回到localStorage
//				localStorage.dinner = JSON.stringify($scope.shopList);
//			};
//
//
//			//加法
//			$scope.jia = function(index){
//				++$scope.shopList[index].num;
//				//把当前修改好了的数据，再把它存回到localStorage
//				localStorage.dinner = JSON.stringify($scope.shopList);
//			};

		$scope.shopList = JSON.parse(localStorage.dinner);


			//减法
			$scope.jian = function(index){
				--$scope.shopList[index].num;

				if($scope.shopList[index].num == 0){
					$scope.shopList.splice(index,1)
				};


				//把当前修改好了的数据，再把它存回到localStorage
				localStorage.dinner = JSON.stringify($scope.shopList);
			};


			//加法
			$scope.jia = function(index){
				++$scope.shopList[index].num;
				//把当前修改好了的数据，再把它存回到localStorage
				localStorage.dinner = JSON.stringify($scope.shopList);
			};


		
			
}])
.controller('xiangqingController',['$scope',function  ($scope) {
	
}])