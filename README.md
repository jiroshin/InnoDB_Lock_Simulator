# InnoDB_Lock_Simulator
URL: https://jiroshin.github.io/InnoDB_Lock_Simulator/

![demo](https://raw.githubusercontent.com/jiroshin/InnoDB_Lock_Simulator/master/8c010ce9752670b77a083f63c513f5f3.gif)

## これは何?
MySQLのデフォルトストレージエンジンInnoDBのロックの挙動をイメージするために作られたおもちゃ。
おもちゃなので軽い気持ちでポチポチと遊んでください(^o^)/
ただし、あくまで作者の頭の中のindex走査のイメージを可視化したものであって、正しくInnoDBの挙動を表しているものではないのでご注意ください。

## 動作検証用のdocker-compose.yml
docker-compose.ymlとinit.shを同階層において docker-compose up して下さい。  
`docker-compose.yml`
```
# 
# 接続コマンド: mysql -u root -h 127.0.0.1 -p
#
version: '3'
services:
 mysql:
   image: mysql:5.7
   command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake
   ports:
     - "3306:3306"
   environment:
     - MYSQL_ROOT_PASSWORD=mysql
   volumes:
     - ./init.sh:/docker-entrypoint-initdb.d/init.sh:ro
```
`init.sh`
```
mysql -u root -p$MYSQL_ROOT_PASSWORD -v <<SQL
    CREATE DATABASE IF NOT EXISTS test_db;
    CREATE TABLE test_db.accounts (id INTEGER AUTO_INCREMENT, balance INTEGER NOT NULL, PRIMARY KEY (id));
    INSERT INTO test_db.accounts VALUES(1,100);
    INSERT INTO test_db.accounts VALUES(2,200);
    INSERT INTO test_db.accounts VALUES(3,300);
    INSERT INTO test_db.accounts VALUES(4,400);
    INSERT INTO test_db.accounts VALUES(5,500);
    INSERT INTO test_db.accounts VALUES(10,1000);
    INSERT INTO test_db.accounts VALUES(20,2000);
SQL
```
