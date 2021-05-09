/**
 * token密钥
 */
export const secretKey = 'secret';

/**
 * 单数据库实例
 */
export const orm = {
  type: 'mysql',
  host: 'rm-uf620870t514w80lzto.mysql.rds.aliyuncs.com',
  port: 3306,
  username: 'midway',
  password: '77O3Fb_8vWo6X7&-',
  database: 'midway_demo',
  synchronize: true, //同步创建表,生产上设为false
  logging: false,
};
