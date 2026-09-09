#!/usr/bin/env python3
"""
Empacota o site num HTML único, autocontido, para publicar como prévia
navegável (artifact) enquanto não existe domínio.

Uso:
    npm run build          # gera out/
    python3 scripts/build-preview.py

Saída: preview/elevate-preview.html

O que ele faz, e por quê:
  - inlina o CSS gerado pelo Next (o artifact não serve arquivos soltos)
  - troca a Sora auto-hospedada pelo Google Fonts, que é o único host de
    fontes que a CSP do artifact aceita
  - converte os SVGs da marca em data URI
  - remove todo o JavaScript. Consequência: o hero orbital não anima na
    prévia, então o script captura um frame real do canvas via Playwright e
    o aplica como imagem de fundo. Não é mockup — é o render de verdade,
    congelado.
  - devolve só o conteúdo do <body> mais <title>/<style>: o publicador do
    artifact injeta doctype, html, head e body por conta própria.
"""

import base64
import functools
import http.server
import pathlib
import re
import socketserver
import threading

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
DEST = ROOT / "preview"
PORT = 4321

VIEWS = [
    ("desktop", 1440, 900, 1, "center right"),
    ("mobile", 390, 844, 2, "center bottom"),
]


def serve():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(OUT))
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def capture_frames():
    """Um frame do canvas por viewport, direto dos pixels — nada de DOM por cima."""
    from playwright.sync_api import sync_playwright

    frames = {}
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for name, w, h, dsf, _ in VIEWS:
            page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=dsf)
            page.goto(f"http://127.0.0.1:{PORT}/", wait_until="networkidle")
            page.wait_for_timeout(4000)  # deixa as órbitas desenharem o rastro
            uri = page.evaluate("document.querySelector('canvas')?.toDataURL('image/png')")
            if uri:
                frames[name] = uri
            page.close()
        browser.close()
    return frames


def data_uri_svg(name):
    raw = (OUT / "brand" / name).read_text(encoding="utf-8")
    return "data:image/svg+xml;base64," + base64.b64encode(raw.encode()).decode()


def main():
    if not (OUT / "index.html").exists():
        raise SystemExit("out/ não existe — rode `npm run build` antes.")

    httpd = serve()
    try:
        frames = capture_frames()
    finally:
        httpd.shutdown()

    html = (OUT / "index.html").read_text(encoding="utf-8")
    css = next(OUT.glob("_next/static/chunks/*.css")).read_text(encoding="utf-8")

    css = css.replace("/brand/pattern.svg", data_uri_svg("pattern.svg"))
    css = re.sub(r"@font-face\s*\{[^}]*\}", "", css)
    css += "\n:root{--font-sora:'Sora',system-ui,sans-serif}\nbody{background:#000;color:#fff}\n"

    if frames:
        css += ".hero-still{position:absolute;inset:0;background-repeat:no-repeat;background-size:cover}\n"
        for name, _, _, _, pos in VIEWS:
            if name not in frames:
                continue
            rule = f".hero-still{{background-image:url({frames[name]});background-position:{pos}}}"
            css += (rule if name == "desktop" else f"@media (max-width:767px){{{rule}}}") + "\n"

    body = re.search(r"<body[^>]*>(.*)</body>", html, re.S).group(1)
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S)
    body = re.sub(r"<canvas[^>]*></canvas>", '<div class="hero-still" aria-hidden="true"></div>', body)
    body = body.replace("/brand/icon.svg", data_uri_svg("icon.svg"))
    # a rota do quiz ainda não existe; na prévia o CTA rola até o preço
    body = body.replace('href="/quiz/"', 'href="#vagas"')

    doc = (
        "<title>Elevate League</title>\n"
        '<link rel="preconnect" href="https://fonts.googleapis.com"/>\n'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
        'family=Sora:wght@400;700&display=swap"/>\n'
        f"<style>{css}</style>\n{body}\n"
    )

    DEST.mkdir(exist_ok=True)
    target = DEST / "elevate-preview.html"
    target.write_text(doc, encoding="utf-8")
    print(f"{target}  ({len(doc) / 1024:.0f} KB, frames: {', '.join(frames) or 'nenhum'})")


if __name__ == "__main__":
    main()
