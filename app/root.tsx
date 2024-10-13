import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "#app/tailwind.css";
import Nav from "./components/Nav";

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
      <Nav />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
