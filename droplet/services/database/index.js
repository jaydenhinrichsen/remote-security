/**
 * @class Database <Singleton>
 * @description Simple wrapper around firestore
 */
class Database {
  constructor(db) {
    this.db = db;
  }

  /**
   * @public
   * @description Add a document to a collection
   * @param {String} collection
   * @param {Object} data
   * @returns {Promise}
   */
  async addDoc(collection, data) {
    try {
      let ref = this.db.collection(collection);

      return await ref.add(data);
    } catch (error) {
      return error;
    }
  }

  /**
   * @public
   * @description Query a collection, if params are omitted return the entire collection
   * @param {String} collection
   * @param {Array} params
   * @returns {Promise}
   */
  async query(collection, params) {
    try {
      let ref = this.db.collection(collection);

      const snapshot = params
        ? await ref.where(...params).get()
        : await ref.get();

      let docs = [];
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          docs.push(doc.data());
        });
      }

      return docs;
    } catch (error) {
      return error;
    }
  }
}

module.exports = db => new Database(db);
