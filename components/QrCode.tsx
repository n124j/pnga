import qrcode from 'qrcode-generator';

/** Draws a QR code as inline SVG (works without JavaScript once the page is built). */
export default function QrCode({ value, label }: { value: string; label: string }) {
  const qr = qrcode(0, 'M');
  qr.addData(value);
  qr.make();
  const count = qr.getModuleCount();
  const quiet = 4;
  const size = count + quiet * 2;
  let path = '';
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) path += `M${c + quiet} ${r + quiet}h1v1h-1z`;
    }
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label} className="h-56 w-56 bg-white" shapeRendering="crispEdges">
      <path d={path} fill="#000" />
    </svg>
  );
}
