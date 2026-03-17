interface ApiEntry {
  method: string;
  url: string;
  status: number;
  responseTime: number;
}

function filterSlowApis(entries: ApiEntry[], threshold: number): ApiEntry[] {
  return entries.filter(entry => entry.responseTime > threshold);
}

const entries: ApiEntry[] = [
  { method: "GET", url: "/api/users", status: 200, responseTime: 120 },
  { method: "POST", url: "/api/login", status: 401, responseTime: 850 },
  { method: "GET", url: "/api/items", status: 200, responseTime: 2100 },
];

console.log(filterSlowApis(entries, 1000));
