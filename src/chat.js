angular.module('ChattyApp', [])
	.controller('ChatController', ['$scope', function ($scope) {
		$scope.messages = [];
		var socket = io.connect('/');
		socket.on('history', function (oldMessages) {
			$scope.$apply(function () {
				$scope.messages = oldMessages;
			});
		});
		socket.on('newMessage', function (message) {
			$scope.$apply(function () {
				$scope.messages.unshift(message);
			});
		});

		$scope.sendMsg = function () {
			socket.emit('newMessage', { nick: $scope.nick, message: $scope.message });
		};
	}]);

