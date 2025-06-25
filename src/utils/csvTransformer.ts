import { normalizeState } from "./stateUtils";
import { separateFullName } from "./nameUtils";
import { formatDate, formatPhone } from "./formatters";
import type { InputRow, TransformedRow } from "./types";

export function transformData(data: InputRow[]): TransformedRow[] {
  return data
    .filter((row: InputRow) =>
      Object.values(row).some((val) => val && val.trim())
    ) // Remove empty rows
    .map((row: InputRow): TransformedRow => {
      const { name, paternalSurname, maternalSurname } = separateFullName(
        row["full name"]
      );

      return {
        createdAt: formatDate(row["created_time"]),
        name,
        paternalSurname,
        maternalSurname,
        phone: formatPhone(row["número_de_teléfono"]),
        email: row["correo_electrónico"] || "",
        state: normalizeState(row["estado"]),
        completed: row["lead_status"]?.toLowerCase() === "complete",
        origen: "Meta",
      };
    });
}

export function downloadCSV(csvContent: string): void {
  if (!csvContent) {
    alert("No se ha procesado ningún archivo.");
    return;
  }

  // UTF-8 encoding with accents
  const bomBlob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(bomBlob);
  link.download = "target.csv";
  link.setAttribute("charset", "utf-8");
  link.click();
}
