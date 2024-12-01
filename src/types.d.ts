type UserRole = "admin" | "buyer" | "seller" | "driver" | "shopper";
type DocumentTypes = "CC" | "CE" | "NIT" | "PP" | "PPT";
type DeliveryMethod = "pickup" | "delivery";
type PaymentMethod = "cash" | "online";
type StatusOrder =
  | "awaiting_confirmation"
  | "awaiting_payment"
  | "awaiting_shipment"
  | "sending"
  | "awaiting_finish"
  | "finished";
