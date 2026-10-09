#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
runtime_python="${CODEX_BUNDLED_PYTHON:-python3}"
renderer="${DOCX_RENDERER:-render_docx.py}"

output_dir="${RESUME_OUTPUT_DIR:-$repo_dir/dist}"
render_dir="$repo_dir/tmp/resume-rendered"

RESUME_OUTPUT_DIR="$output_dir" "$runtime_python" "$repo_dir/scripts/build_resume.py"
"$runtime_python" "$renderer" "$output_dir/李鑫-简历-投递版.docx" --output_dir "$render_dir" --emit_pdf
cp "$render_dir/李鑫-简历-投递版.pdf" "$output_dir/李鑫-简历-投递版.pdf"
