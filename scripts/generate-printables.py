#!/usr/bin/env python3
"""Build the two production-ready Snackville Studio printables."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "printables"
PREVIEWS = PUBLIC / "images" / "printables"
OUT.mkdir(parents=True, exist_ok=True)
PREVIEWS.mkdir(parents=True, exist_ok=True)


def font(size, bold=False):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSerif-Regular.ttf",
    ]
    for path in paths:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def map_poster():
    source = PUBLIC / "images" / "snackville-interactive-map.jpeg"
    output = OUT / "snackville-map-a3.pdf"
    width, height = landscape(A3)
    pdf = canvas.Canvas(str(output), pagesize=(width, height), pageCompression=1)
    # Full bleed and deliberately no frame/title/footer: the official art is the poster.
    pdf.drawImage(str(source), 0, 0, width=width, height=height, preserveAspectRatio=False, mask="auto")
    pdf.showPage()
    pdf.save()
    image = Image.open(source).convert("RGB")
    image.thumbnail((1600, 1131), Image.Resampling.LANCZOS)
    image.save(PREVIEWS / "snackville-map-poster.webp", "WEBP", quality=88, method=6)


def badge_sheet():
    width, height = 2480, 3508
    paper = Image.new("RGB", (width, height), "#fff8e9")
    draw = ImageDraw.Draw(paper)
    draw.rectangle((72, 72, width - 72, height - 72), outline="#d3aa5d", width=5)
    draw.text((width / 2, 145), "SNACK SQUAD BADGES", anchor="ma", font=font(110, True), fill="#582342")
    draw.text((width / 2, 292), "Print · cut around the dotted line · pin or tape with a grown-up", anchor="ma", font=font(42), fill="#72533b")

    people = [
        ("PIPER", "snack-squad/piper.webp", "#c72f56"),
        ("CROISSANT KITTY", "snack-squad/croissant-kitty.webp", "#df9f3d"),
        ("TOAST KITTY", "snack-squad/toast-kitty.webp", "#629a78"),
        ("SANDWICH KITTY", "snack-squad/sandwich-kitty-no-ears.webp", "#76539d"),
    ]
    centers = [(680, 1120), (1800, 1120), (680, 2480), (1800, 2480)]
    radius = 470
    for (name, rel, color), (cx, cy) in zip(people, centers):
        # generous dotted scissor path outside the medal
        for angle in range(0, 360, 8):
            import math
            a1, a2 = math.radians(angle), math.radians(angle + 4)
            box = (cx - radius - 32, cy - radius - 32, cx + radius + 32, cy + radius + 32)
            draw.arc(box, angle, angle + 4, fill="#7b5a3c", width=4)
        draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=color, outline="#5b2341", width=28)
        draw.ellipse((cx - radius + 35, cy - radius + 35, cx + radius - 35, cy + radius - 35), outline="#f2cd75", width=22)
        draw.ellipse((cx - radius + 68, cy - radius + 68, cx + radius - 68, cy + radius - 68), fill="#fff0d0", outline="#7b4d32", width=8)
        character = Image.open(PUBLIC / "images" / "characters" / rel).convert("RGBA")
        character.thumbnail((650, 690), Image.Resampling.LANCZOS)
        x = int(cx - character.width / 2)
        y = int(cy - character.height / 2 - 24)
        paper.paste(character, (x, y), character)
        label_box = (cx - 350, cy + 290, cx + 350, cy + 405)
        draw.rounded_rectangle(label_box, radius=28, fill="#35172e", outline="#f2cd75", width=7)
        size = 44 if len(name) > 12 else 54
        draw.text((cx, cy + 347), name, anchor="mm", font=font(size, True), fill="#fff4d7")

    draw.text((width / 2, height - 160), "Four friends. Four strengths. One Snack Squad.", anchor="ms", font=font(48, True), fill="#582342")
    paper.save(OUT / "snack-squad-badges-a4.pdf", "PDF", resolution=300.0)
    preview = paper.copy()
    preview.thumbnail((1000, 1414), Image.Resampling.LANCZOS)
    preview.save(PREVIEWS / "snack-squad-badges.webp", "WEBP", quality=90, method=6)


if __name__ == "__main__":
    map_poster()
    badge_sheet()
    print("Generated A3 map and A4 badge sheet")
