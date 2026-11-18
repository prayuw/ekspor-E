const fs = require('fs');

const testHtml = `
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: sans-serif; background: #f8fafc; padding: 20px; }
.route-map {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}
.route-map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
}
.ais-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #059669;
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 10px;
  border-radius: 999px;
}
.ais-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #10b981;
}
.route-map-ship-tag {
  font-size: 12px; color: #334155;
  background: #f1f5f9; padding: 4px 10px; border-radius: 6px;
  border: 1px solid #e2e8f0;
}
.route-map-footer {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 12px; padding: 14px 18px;
  background: #ffffff; border-top: 1px solid #f1f5f9;
}
.stat-item span:first-child { font-size: 11px; font-weight: 700; color: #64748b; }
.stat-item strong { display: block; font-size: 13.5px; color: #0f172a; margin-top: 2px; }
</style>
</head>
<body>
<h2>Light Map Test</h2>
</body>
</html>
`;

fs.writeFileSync('c:/laragon/www/ekspor-e-prototipe/scratch/test_light_map.html', testHtml);
console.log('Test file written');
