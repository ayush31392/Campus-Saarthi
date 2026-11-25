import io
import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

UN_SDG_TITLES = {
    1: "SDG 1: No Poverty",
    2: "SDG 2: Zero Hunger",
    3: "SDG 3: Good Health and Well-being",
    4: "SDG 4: Quality Education",
    5: "SDG 5: Gender Equality",
    6: "SDG 6: Clean Water and Sanitation",
    7: "SDG 7: Affordable and Clean Energy",
    8: "SDG 8: Decent Work and Economic Growth",
    9: "SDG 9: Industry, Innovation and Infrastructure",
    10: "SDG 10: Reduced Inequalities",
    11: "SDG 11: Sustainable Cities and Communities",
    12: "SDG 12: Responsible Consumption and Production",
    13: "SDG 13: Climate Action",
    14: "SDG 14: Life Below Water",
    15: "SDG 15: Life on Land",
    16: "SDG 16: Peace, Justice and Strong Institutions",
    17: "SDG 17: Partnerships for the Goals",
}

CONTENT_ITEMS = [
    "Proposal by the Coordinator/Convener to Principal along with budget, and permission for the venue",
    "Invitation to the resource person",
    "Acceptance along with the bio-data",
    "Poster/brochure/Banner (Not photo)",
    "Programme schedule",
    "Circular",
    "Registration/Attendance of the participants",
    "Certificates (sample)",
    "All participants filled Feedback, analysis – action",
    "Resource person filled Feedback –plan of action",
    "Budget utilization sheet",
    "Press note/Newspaper publication",
    "One-page photos [ GPS Tagged] with at least 6 with description as per the format [ Soft copy]",
]

ANNEXURE_DIVIDER_TITLES = [
    "PROPOSAL BY THE COORDINATOR/CONVENER TO PRINCIPAL ALONG WITH BUDGET, AND PERMISSION FOR THE VENUE",
    "INVITATION TO THE RESOURCE PERSON",
    "ACCEPTANCE ALONG WITH THE BIO-DATA",
    "ABOUT THE RESOURCE PERSONS",
    "POSTER/BROCHURE/BANNER (NOT PHOTO)",
    "CIRCULAR",
    "ATTENDANCE",
    "CERTIFICATES (SAMPLE)",
    "ALL PARTICIPANTS FILLED FEEDBACK, ANALYSIS – ACTION",
    "RESOURCE PERSON FILLED FEEDBACK –PLAN OF ACTION",
    "BUDGET UTILISATION SHEET",
    "PRESS NOTE/NEWSPAPER PUBLICATION",
    "ONE PAGE PHOTOS [ GPS TAGGED] WITH AT LEAST 6 WITH DESCRIPTION AS PER THE FORMAT [ SOFT COPY]",
]


def _set_cell_shading(cell, hex_color: str):
    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shading)


def _set_cell_margins(cell, top=80, bottom=80, left=120, right=120):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement("w:tcMar")
    for side, val in [("top", top), ("bottom", bottom), ("left", left), ("right", right)]:
        node = OxmlElement(f"w:{side}")
        node.set(qn("w:w"), str(val))
        node.set(qn("w:type"), "dxa")
        tcMar.append(node)
    tcPr.append(tcMar)


def _format_cell(
    cell,
    text: str = "",
    bold: bool = False,
    align=WD_ALIGN_PARAGRAPH.LEFT,
    shading: str = None,
    font_size: float = 10.5,
):
    cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    _set_cell_margins(cell)
    if shading:
        _set_cell_shading(cell, shading)

    p = cell.paragraphs[0]
    p.alignment = align
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    if text:
        run = p.add_run(str(text))
        run.bold = bold
        run.font.name = "Times New Roman"
        run.font.size = Pt(font_size)
    return p


def _add_bullets_to_cell(cell, items: list, shading: str = None):
    cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    _set_cell_margins(cell)
    if shading:
        _set_cell_shading(cell, shading)

    if not items:
        _format_cell(cell, "—")
        return

    for idx, item in enumerate(items):
        p = cell.paragraphs[0] if idx == 0 else cell.add_paragraph()
        p.style = "List Bullet"
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(str(item))
        run.font.name = "Times New Roman"
        run.font.size = Pt(10.5)


def build_vgu_14point_docx(data: dict) -> bytes:
    """
    Generates an in-memory .docx file adhering strictly to VGU's
    14 POINT EVENT REPORT FORMAT template.
    """
    doc = Document()

    # Page margins (0.65 inch)
    for section in doc.sections:
        section.top_margin = Inches(0.65)
        section.bottom_margin = Inches(0.65)
        section.left_margin = Inches(0.65)
        section.right_margin = Inches(0.65)

    # Default style
    normal_style = doc.styles["Normal"]
    normal_style.font.name = "Times New Roman"
    normal_style.font.size = Pt(11)

    ai = data.get("aiEnhanced") or {}
    demo = data.get("demographics") or {}

    primary_sdg_num = int(data.get("primarySdg") or 11)
    primary_sdg_label = UN_SDG_TITLES.get(primary_sdg_num, f"SDG {primary_sdg_num}")

    activity_title = ai.get("refinedActivityTitle") or data.get("activityTitle", "")
    activity_type = ai.get("refinedTypeOfActivity") or data.get("activityType", "")
    duration = data.get("duration", "")
    default_dvo = (
        f"{data.get('eventDate', '')}"
        f"{f' ({duration})' if duration else ''}, "
        f"{data.get('venue', '')}, "
        f"{data.get('organizingUnit', '')}"
    )
    date_venue_org = ai.get("refinedDateVenueOrganizingUnit") or default_dvo

    sdg_list = ai.get("sdgListFormatted") or [primary_sdg_label]
    targets_text = ai.get("targetsAddressedFormatted") or data.get("sdgTargets", "")
    objectives = ai.get("objectives") or data.get("objectives") or []
    key_activities = ai.get("keyActivities") or data.get("keyActivities") or []
    outcomes = ai.get("outcomes") or data.get("outcomes") or []

    students_vgu = int(demo.get("studentsVGU") or 0)
    students_outside = int(demo.get("studentsOutside") or 0)
    faculty_vgu = int(demo.get("facultyVGU") or 0)
    faculty_outside = int(demo.get("facultyOutside") or 0)
    industry_total = int(demo.get("industryVGU") or 0) + int(demo.get("industryOutside") or 0)

    # --- Header Logo / University Title ---
    logo_path = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "vgu-header-logo.png")
    if os.path.exists(logo_path):
        p_logo = doc.add_paragraph()
        p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_logo.add_run().add_picture(logo_path, width=Inches(3.6))
    else:
        p_uni = doc.add_paragraph()
        p_uni.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_uni = p_uni.add_run("VIVEKANANDA GLOBAL UNIVERSITY, JAIPUR")
        r_uni.bold = True
        r_uni.font.size = Pt(15)
        r_uni.font.color.rgb = RGBColor(139, 30, 30)

    # --- Top Metadata Lines (Exact Template Format) ---
    dept_name = (data.get("department") or "Department of Architecture & Planning").upper()
    for line in [
        f"DATE OF EVENT: {data.get('eventDate', '')}",
        f"DEPARTMENT NAME: {dept_name}",
        f"SDG No: SDG {primary_sdg_num}",
    ]:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        r = p.add_run(line)
        r.bold = True
        r.font.size = Pt(11)

    p_sum = doc.add_paragraph()
    p_sum.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sum.paragraph_format.space_before = Pt(8)
    p_sum.paragraph_format.space_after = Pt(6)
    r_sum = p_sum.add_run("SUMMARY")
    r_sum.bold = True
    r_sum.font.size = Pt(13)

    # --- SUMMARY TABLE (10 rows x 6 columns matching merged layout) ---
    table = doc.add_table(rows=10, cols=6)
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    # Column widths (Total ~ 7.2 inches)
    col_widths = [Inches(2.1), Inches(1.02), Inches(1.02), Inches(1.02), Inches(1.02), Inches(1.02)]
    for row in table.rows:
        for idx, width in enumerate(col_widths):
            row.cells[idx].width = width

    # Row 0: Title of Activity
    _format_cell(table.cell(0, 0), "Title of Activity", bold=True, shading="F2F2F2")
    merged_0 = table.cell(0, 1).merge(table.cell(0, 5))
    _format_cell(merged_0, activity_title, bold=True)

    # Row 1: Type of Activity
    _format_cell(
        table.cell(1, 0),
        "Type of Activity (FDP/Conference/Workshop/Expert lecture etc.)",
        bold=True,
        shading="F2F2F2",
    )
    merged_1 = table.cell(1, 1).merge(table.cell(1, 5))
    _format_cell(merged_1, activity_type)

    # Row 2: Date, Venue, Organizing Unit
    _format_cell(table.cell(2, 0), "Date, Venue, Organizing Unit", bold=True, shading="F2F2F2")
    merged_2 = table.cell(2, 1).merge(table.cell(2, 5))
    _format_cell(merged_2, date_venue_org)

    # Row 3: SDG(s) and Target(s) Addressed
    _format_cell(table.cell(3, 0), "SDG(s) and Target(s) Addressed", bold=True, shading="F2F2F2")
    merged_3 = table.cell(3, 1).merge(table.cell(3, 5))
    _set_cell_margins(merged_3)
    p_sdg_lbl = merged_3.paragraphs[0]
    p_sdg_lbl.add_run("SDG(s) Addressed:").bold = True
    for sdg_item in sdg_list:
        p_item = merged_3.add_paragraph(str(sdg_item))
        p_item.paragraph_format.space_before = Pt(1)
        p_item.paragraph_format.space_after = Pt(1)
    p_tgt_lbl = merged_3.add_paragraph()
    p_tgt_lbl.paragraph_format.space_before = Pt(4)
    p_tgt_lbl.add_run("Target(s) Addressed:").bold = True
    p_tgt_val = merged_3.add_paragraph(str(targets_text))
    p_tgt_val.paragraph_format.space_before = Pt(1)

    # Row 4: Objectives (3 bullet points)
    _format_cell(table.cell(4, 0), "Objectives (3 bullet points)", bold=True, shading="F2F2F2")
    merged_4 = table.cell(4, 1).merge(table.cell(4, 5))
    _add_bullets_to_cell(merged_4, objectives)

    # Rows 5, 6, 7: Participants (numbers) sub-matrix
    merged_part_lbl = table.cell(5, 0).merge(table.cell(7, 0))
    _format_cell(merged_part_lbl, "Participants (numbers)", bold=True, shading="F2F2F2")

    merged_stu_hdr = table.cell(5, 1).merge(table.cell(5, 2))
    _format_cell(merged_stu_hdr, "Students", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="F2F2F2")

    merged_fac_hdr = table.cell(5, 3).merge(table.cell(5, 4))
    _format_cell(merged_fac_hdr, "Faculty", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="F2F2F2")

    merged_ind_hdr = table.cell(5, 5).merge(table.cell(6, 5))
    _format_cell(merged_ind_hdr, "Industry Person", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="F2F2F2")

    _format_cell(table.cell(6, 1), "VGU", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="FAFAFA")
    _format_cell(table.cell(6, 2), "Outside/ Abroad", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="FAFAFA")
    _format_cell(table.cell(6, 3), "VGU", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="FAFAFA")
    _format_cell(table.cell(6, 4), "Outside/ Abroad", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="FAFAFA")

    _format_cell(table.cell(7, 1), str(students_vgu), align=WD_ALIGN_PARAGRAPH.CENTER)
    _format_cell(table.cell(7, 2), str(students_outside), align=WD_ALIGN_PARAGRAPH.CENTER)
    _format_cell(table.cell(7, 3), str(faculty_vgu), align=WD_ALIGN_PARAGRAPH.CENTER)
    _format_cell(table.cell(7, 4), str(faculty_outside), align=WD_ALIGN_PARAGRAPH.CENTER)
    _format_cell(table.cell(7, 5), str(industry_total), align=WD_ALIGN_PARAGRAPH.CENTER)

    # Row 8: Key Activities (3–5 bullet points)
    _format_cell(table.cell(8, 0), "Key Activities (3–5 bullet points)", bold=True, shading="F2F2F2")
    merged_8 = table.cell(8, 1).merge(table.cell(8, 5))
    _add_bullets_to_cell(merged_8, key_activities)

    # Row 9: Outcomes / Impact
    _format_cell(
        table.cell(9, 0),
        "Outcomes / Impact (2–3 bullet points, linked to SDG targets)",
        bold=True,
        shading="F2F2F2",
    )
    merged_9 = table.cell(9, 1).merge(table.cell(9, 5))
    _add_bullets_to_cell(merged_9, outcomes)

    # --- PAGE BREAK -> CONTENT INDEX TABLE ---
    doc.add_page_break()

    p_cnt = doc.add_paragraph()
    p_cnt.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_cnt.paragraph_format.space_after = Pt(8)
    r_cnt = p_cnt.add_run("CONTENT")
    r_cnt.bold = True
    r_cnt.font.size = Pt(13)

    docs_map = {int(d["id"]): d for d in (data.get("documents") or []) if "id" in d}

    c_table = doc.add_table(rows=14, cols=3)
    c_table.style = "Table Grid"
    c_table.alignment = WD_TABLE_ALIGNMENT.CENTER

    c_widths = [Inches(0.75), Inches(5.45), Inches(1.0)]
    for row in c_table.rows:
        for idx, w in enumerate(c_widths):
            row.cells[idx].width = w

    _format_cell(c_table.cell(0, 0), "S.no", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="F2F2F2")
    _format_cell(c_table.cell(0, 1), "Title", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="F2F2F2")
    _format_cell(c_table.cell(0, 2), "Pg.No", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, shading="F2F2F2")

    for idx, item_title in enumerate(CONTENT_ITEMS, start=1):
        doc_info = docs_map.get(idx)
        display_title = item_title
        if doc_info and doc_info.get("uploaded") and doc_info.get("fileName"):
            display_title = f"{item_title} [Attached: {doc_info['fileName']}]"

        pg_no = "6" if idx == 1 else (str(5 + idx) if (doc_info and doc_info.get("uploaded")) else "")
        _format_cell(c_table.cell(idx, 0), str(idx), align=WD_ALIGN_PARAGRAPH.CENTER)
        _format_cell(c_table.cell(idx, 1), display_title)
        _format_cell(c_table.cell(idx, 2), pg_no, align=WD_ALIGN_PARAGRAPH.CENTER)

    p_note = doc.add_paragraph()
    p_note.paragraph_format.space_before = Pt(10)
    r_note = p_note.add_run(
        "** NOTE** SCANNING OF THE DOCUMENT SHOULD BE DONE USING SCANNER. DONOT USE MOBILE SCANNERS."
    )
    r_note.bold = True
    r_note.font.size = Pt(10.5)

    # --- 13 ANNEXURE SEPARATOR PAGES ---
    for idx, heading_text in enumerate(ANNEXURE_DIVIDER_TITLES, start=1):
        doc.add_page_break()
        p_annex = doc.add_paragraph()
        p_annex.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_annex.paragraph_format.space_before = Pt(180)
        r_a = p_annex.add_run(f"ANNEXURE {idx}")
        r_a.bold = True
        r_a.font.size = Pt(12)

        p_head = doc.add_paragraph()
        p_head.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_head.paragraph_format.space_before = Pt(12)
        r_h = p_head.add_run(heading_text)
        r_h.bold = True
        r_h.font.size = Pt(14)

    buffer = io.BytesIO()
    doc.save(buffer)
    buffer.seek(0)
    return buffer.getvalue()