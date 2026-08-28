#!/usr/bin/env python3
"""Serve a fixture directory the way the Framer host serves the real site.

Two behaviours the stock http.server does not give us and the pipeline needs:

  * extensionless routes. /about is served from about.html, / from index.html.
  * base substitution. Fixture files contain __BASE__ and __CDN__ placeholders
    so a test can point the pipeline at ephemeral local ports without baking
    port numbers into the fixtures.

Usage: fixture-server.py --dir DIR --port N [--base URL] [--cdn URL]
Prints the bound port on stdout, then serves until killed.
"""

from __future__ import annotations

import argparse
import functools
import http.server
import threading
from pathlib import Path

TEXT_SUFFIXES = {".html", ".xml", ".txt"}


class Handler(http.server.SimpleHTTPRequestHandler):
    root: Path
    base: str
    cdn: str

    def log_message(self, *a):  # keep test output readable
        pass

    def resolve(self, path: str) -> Path | None:
        path = path.split("?", 1)[0].split("#", 1)[0].lstrip("/")
        candidates = [path or "index.html"]
        if path and not Path(path).suffix:
            candidates.append(path + ".html")
        for c in candidates:
            target = (self.root / c).resolve()
            if self.root.resolve() in target.parents or target == self.root.resolve():
                if target.is_file():
                    return target
        return None

    def do_GET(self):
        target = self.resolve(self.path)
        if target is None:
            self.send_error(404, "not found")
            return
        body = target.read_bytes()
        if target.suffix in TEXT_SUFFIXES:
            body = (
                body.decode("utf-8")
                .replace("__BASE__", self.base)
                .replace("__CDN__", self.cdn)
                .encode("utf-8")
            )
        ctype = "text/html" if target.suffix == ".html" else self.guess_type(str(target))
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_HEAD(self):
        target = self.resolve(self.path)
        if target is None:
            self.send_error(404, "not found")
            return
        self.send_response(200)
        self.end_headers()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", required=True)
    ap.add_argument("--port", type=int, default=0)
    ap.add_argument("--base", default="")
    ap.add_argument("--cdn", default="")
    args = ap.parse_args()

    handler = functools.partial(Handler)
    Handler.root = Path(args.dir).resolve()
    Handler.base = args.base
    Handler.cdn = args.cdn

    server = http.server.ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(server.server_address[1], flush=True)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        pass
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
