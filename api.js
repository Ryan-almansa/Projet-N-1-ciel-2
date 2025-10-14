import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://192.168.0.50:20000",
    changeOrigin: true,
    pathRewrite: {},
    xfwd: true
  })
);

app.use(express.static("/var/www/html"));

app.listen(20001, "0.0.0.0", () => {
  console.log("🌐 Proxy actif sur http://192.168.0.50:20001");
});
