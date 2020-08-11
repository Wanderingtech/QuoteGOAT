module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userId: {type: DataTypes.INTEGER, allowNull: false},
    userName: {type: DataTypes.STRING, allowNull: false},
    fullName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false} });

  User.associate = function (models) {
    User.belongsTo(models.Quote, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return User;
};