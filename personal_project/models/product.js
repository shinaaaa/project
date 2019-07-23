module.exports = (sequelize, DataTypes) => {
    /* product 테이블에 칼럼의 스펙 작성 */
    return sequelize.define('product', {
        db_product: {
            /* 크기가 20인 문자열 */
            type: DataTypes.STRING(20),
            /* NULL 값 입력 안됨 */
            allowNull: false,
            unique: true,
        },
        db_origin: {
            /* 크기가 20인 문자열 */
            type: DataTypes.STRING(20),
            /* NULL 값 입력 안됨 */
            allowNull: false,
        },
        db_Date_of_Manufacture: {
            /* 크기가 20인 문자열 */
            type: DataTypes.STRING(20),
            /* NULL 값 입력 안됨 */
            allowNull: false,
        }
    });
};