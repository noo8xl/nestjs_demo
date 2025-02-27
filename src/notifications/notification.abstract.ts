import { NOTIFICATION_API_BODY_TYPE } from "../types/notification.dto.type";

// NotificationI -> describe a notif service API usage
export abstract class NotificationI {
  abstract sendCustomerMessage(payload: NOTIFICATION_API_BODY_TYPE): Promise<void>;
  abstract sendError(msg: string): Promise<void>;
}