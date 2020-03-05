/**
 * @class Notifications <Singleton>
 */
class Notifications {
  constructor(messaging) {
    this.messaging = messaging;
  }

  /**
   * @public
   * @param {Object} message
   */
  async send(message) {
    try {
      console.log(await this.messaging.send(message));
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = messaging => new Notifications(messaging);
