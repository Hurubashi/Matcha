export default class ResTemplate {
  static success(data: Object): Object {
    return {
      success: true,
      data: data
    }
  }

  static error(message: String): Object {
    return {
      success: false,
      errorMsg: message
    }
  }
}
