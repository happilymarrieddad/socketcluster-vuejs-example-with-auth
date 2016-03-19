var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
	async.series([
		db.createTable.bind(db,'users', {
			id: { type: "int", primaryKey:true, autoIncrement: true, notNull: true },
			first: { type: "string", length:100 },
			last: { type: "string", length:100 },
			email: { type: "string", length:100 },
			password: { type: "string", length:100 },
			visible: { type: "smallint", length:1 },
			updated_at: { type: "timestamp" },
			created_at: { type: "timestamp" }
		}),
		db.runSql.bind(db,'CREATE TRIGGER usersInsert BEFORE INSERT ON users FOR EACH ROW SET NEW.created_at=CURRENT_TIMESTAMP'),
        db.addIndex.bind(db, 'users','users_pk', ['id'], 'unique')

	], callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};
