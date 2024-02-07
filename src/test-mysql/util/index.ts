import mysql = require('mysql2/promise');
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/user';

// export const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'root',
//   database: 'docker_practice',
// });

export const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'docker_practice',
  waitForConnections: true, // waitForConnections 是指如果现在没有可用连接了，那就等待，设置为 false 就是直接返回报错
  connectionLimit: 10, // 是指定最多有多少个连接，比如 10 个，那就是只能同时用 10个，再多需要排队等。
  maxIdle: 10, // maxIdle 是指定最多有多少个空闲的，超过这个数量的空闲连接会被释放。
  idleTimeout: 60000, // idleTimeout 是指空闲的连接多久会断开
  queueLimit: 0, // queueLimit 是可以排队的请求数量，超过这个数量就直接返回报错说没有连接了。设置为 0 就是排队没有上限
  enableKeepAlive: true, // 是保持心跳用的，用默认的就好
  keepAliveInitialDelay: 0, // 是保持心跳用的，用默认的就好
});

// 使用orm
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'docker_practice',
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
});
