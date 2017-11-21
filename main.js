var app = angular.module("mainApp", []);

app.controller("mainController", function($scope) {
  $scope.players = [
    {
      name: 'Player 1',
      scores: [],
      total: 0
    },
    {
      name: 'Player 2',
      scores: [],
      total: 0
    }
  ];

  $scope.addPlayer = function() {
    var num = $scope.players.length + 1;
    $scope.players.push({
      name: 'Player ' + num,
      scores: [],
      total: 0
    });
  }

  $scope.editName = function($event, player) {
    player.isEditing = true;
  }

  $scope.saveName = function(player) {
    player.isEditing = false;
  }

  $scope.addScore = function(player) {
    if (!player.scores.length || player.scores[player.scores.length - 1].value !== null) {
      var score = { value: null, isEditing: true };
      player.scores.push(score);
    }
  }

  $scope.saveScore = function(player, score) {
    score.isEditing = false;
    if (score.value === null || score.value === undefined) {
      player.scores.splice(player.scores.indexOf(score), 1);
    }
    $scope.totalScoreForPlayer(player);
  }

  $scope.totalScoreForPlayer = function(player) {
    player.total = player.scores.reduce(function(total, s) {
      return Number(total) + Number(s.value);
    }, 0);
  }
});

app.directive("focusWhen", function($timeout) {
  return {
    restrict: 'A',
    scope: {
      'focusWhen': '='
    },
    link: function($scope, $element, $attrs) {
      $scope.$watch('focusWhen', function() {
        if ($scope.focusWhen) {
          $timeout(function() {
            $element[0].click();
            $element[0].focus();
          }, 1);
        }
      });
    }
  }
});
