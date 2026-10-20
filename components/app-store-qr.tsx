import { QRCodeSVG } from "qrcode.react";
import { APP_STORE_URL } from "@/lib/links";

export function AppStoreQr() {
  return (
    <QRCodeSVG
      value={APP_STORE_URL}
      size={176}
      level="M"
      marginSize={0}
      bgColor="#ffffff"
      fgColor="#1c1c1e"
      title="QR code for X&O Battle on the App Store"
    />
  );
}
