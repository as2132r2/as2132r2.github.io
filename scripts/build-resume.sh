#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
runtime_python="${CODEX_BUNDLED_PYTHON:-python3}"
renderer="${DOCX_RENDERER:-render_docx.py}"

"$runtime_python" "$repo_dir/scripts/build_resume.py"
"$runtime_python" "$renderer" "$repo_dir/resume/李鑫-简历-公开版.docx" --output_dir "$repo_dir/tmp/rendered" --emit_pdf
cp "$repo_dir/tmp/rendered/李鑫-简历-公开版.pdf" "$repo_dir/resume/李鑫-简历-公开版.pdf"
cp "$repo_dir/resume/李鑫-简历-公开版.pdf" "$repo_dir/resume/releases/v$(cat "$repo_dir/VERSION")/李鑫-简历-公开版.pdf"
