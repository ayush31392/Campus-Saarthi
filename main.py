import io
import os
import re
from flask import Flask, request, jsonify, send_file, send_from_directory
from dotenv import load_dotenv

from services.ai_report_enhancer import enhance_event_data_with_ai
from services.docx_template_builder import build_vgu_14point_docx

load_dotenv()

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), "public")
app = Flask(__name__, static_folder=PUBLIC_DIR, static_url_path="")


@app.post("/api/generate-ai-report")
def generate_ai_report():
    payload = request.get_json(silent=True) or {}
    activity_title = payload.get("activityTitle", "").strip()
    if not activity_title:
        return jsonify({"detail": "Activity Title and event details are required."}), 400

    try:
        enriched_data = enhance_event_data_with_ai(payload)
        docx_bytes = build_vgu_14point_docx(enriched_data)

        safe_filename = re.sub(r"[^a-zA-Z0-9_-]", "_", activity_title)[:50] or "VGU_Event_Report"

        return send_file(
            io.BytesIO(docx_bytes),
            mimetype="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            as_attachment=True,
            download_name=f"{safe_filename}_14Point_Report.docx",
        )
    except Exception as exc:
        return jsonify({"detail": f"AI Report generation failed: {str(exc)}"}), 500


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    target = os.path.join(PUBLIC_DIR, path)
    if path and os.path.isfile(target):
        return send_from_directory(PUBLIC_DIR, path)
    return send_from_directory(PUBLIC_DIR, "index.html")


if __name__ == "__main__":
    port = int(os.getenv("PORT", 3000))
    app.run(host="0.0.0.0", port=port, debug=True)