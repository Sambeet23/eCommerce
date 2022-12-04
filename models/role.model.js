module.exports = (sequelize, Squelize) => {
    const Role = sequelize.define("role", {
        id: {
            type: Squelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Squelize.STRING
        }
    })
    return Role;
}