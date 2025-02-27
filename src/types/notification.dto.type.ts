
// NOTIFICATION_API_BODY_TYPE -> is a type, which used as a payload to the notification API
export interface NOTIFICATION_API_BODY_TYPE {
  serviceType: string  // email OR telegram
  domainName: string  // name of API
  content: string  // content to send (msg)
  recipient: string  // user email or telegram chatId
}