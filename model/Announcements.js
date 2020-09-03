module.exports = function(sequelize, DataTypes) {
    const Announcements = sequelize.define("Announcements", {
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return Announcements;
};