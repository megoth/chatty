angular.module('ChattyApp', [])
	.controller('ChatController', ['$scope', function ($scope) {
		$scope.messages = [];
		$scope.nick = "test";
		$scope.message = "test";
		var socket = io.connect('/');
		socket.on('history', function (oldMessages) {
			$scope.$apply(function () {
				$scope.messages = oldMessages;
			});
		});
		socket.on('newMessage', function (message) {
			console.log("NEW MESSAGE", message);
			$scope.$apply(function () {
				$scope.messages.unshift(message);
			});
		});

		$scope.sendMsg = function () {
			console.log("SENDING MSG");
			socket.emit('newMessage', { nick: $scope.nick, message: $scope.message });
		};
	}]);

