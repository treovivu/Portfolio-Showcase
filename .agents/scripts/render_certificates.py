from pathlib import Path

import fitz


INPUTS = [
    Path("attached_assets/Merit_1789411231221.pdf"),
    Path("attached_assets/Merit1_1789411238115.pdf"),
    Path("attached_assets/Merit2_1789411244546.pdf"),
]
OUTPUT_DIR = Path(".agents/outputs/president-list")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for input_path in INPUTS:
        document = fitz.open(input_path)
        for page_number, page in enumerate(document):
            pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            output_path = OUTPUT_DIR / f"{input_path.stem}-page-{page_number + 1}.png"
            pixmap.save(output_path)
            print(f"{input_path} page {page_number + 1} -> {output_path}")
        document.close()


if __name__ == "__main__":
    main()