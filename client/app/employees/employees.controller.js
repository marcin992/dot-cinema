'use strict';

angular.module('dotCinemaApp')
  .controller('EmployeesCtrl', function ($scope, Employees, User, $modal, Auth, toastr) {

    $scope.employees = [];

    $scope.hasAccess = Auth.isManager();

    $scope.columns = [{
      dbName: 'name',
      guiName: 'Imię',
      type: 'text'
    }, {
      dbName: 'surname',
      guiName: 'Nazwisko',
      type: 'text'
    }, {
      dbName: 'pesel',
      guiName: 'PESEL',
      type: 'text'
    }, {
      dbName: 'role',
      guiName: 'Uprawnienia',
      type: 'text',
      customValue: function(row) {
        return row.user.role;
      }
    }];

    $scope.customActions = [{
      name: 'Godziny pracy',
      state: 'TimesheetByEmployer',
      param: 'ID'
    }];

    $scope.deleteCondition = Auth.isAdmin();

    $scope.update = function(employee) {
      return Employees.updateEmployee(employee)
        .then(() => {
          return User.update({id: employee.user._id}, {
            nick: employee.user.nick,
            email: employee.user.email,
            role: employee.user.role
          });
        });
    };

    $scope.delete = function(employee) {
      return Employees.deleteEmployee(employee._id)
        .then(() => {
          return Employees.getEmployees();
        }).then(employees => {
          $scope.employees = employees;
        });
    };

    $scope.create = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/employees/employeeEditor.html',
        controller: 'EmployeeEditorCtrl',
        resolve: {
          row: function() {
            return {
              name: '',
              surname: '',
              pesel: '',
              phone: '',
              date_joined: null,
              date_out: null,
              user: {
                nick: '',
                email: '',
                password: '',
                role: ''
              }
            };
          },
          mode: function() {
            return 'create';
          },
          columns: function() {
            return Employees.getColumns()
          }
        }
      });

      modalInstance.result.then(result => {
        Auth.createUserNoToken(result.user, (err, user) => {
          if(err) {
            return toastr.error(err.data.message, 'Błąd');
          }
          return Employees.createEmployee(_.extend(result, {
            user_id: user._id
          })).then(result => {
            Employees.getEmployees().then(employees => {
              $scope.employees = employees;
            });
          }, err => {
            Auth.deleteUser(user._id);
            return toastr.error(err.data.message, 'Błąd');
          });
        })
      });
    };

    $scope.select = function(row) {
      var modalInstance = $modal.open({
        templateUrl: 'app/employees/employeeEditor.html',
        controller: 'EmployeeEditorCtrl',
        resolve: {
          row: function() {
            return row;
          },
          mode: function() {
            return 'update';
          },
          columns: function() {
            return Employees.getColumns()
          }

        }
      });

      modalInstance.result.then(result => {
        $scope.update(result);
      });
    };

    Employees.getEmployees().then(function(employees) {
      $scope.employees = employees;
    });


  });
